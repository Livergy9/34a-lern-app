import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Frage, HilfeSprache } from './data/types';
import { heute, plusTage } from './datum';
import { vibriere } from './feedback';

export type Ergebnis = { punkte: number; max: number };

// Bewertung wie IHK seit 01.07.2025: Single Choice 1 Punkt, Multiple Choice 1 Punkt je richtig angekreuzter Antwort.
// Falsch angekreuzte Antworten bringen keinen Punkt, ziehen aber auch nichts ab (IHK-Merkblatt zum neuen Bewertungsschema:
// 2 richtige Antworten, 1 richtig + 1 falsch angekreuzt = 1 Punkt). Mehr Kreuze als richtige Antworten lässt die App nicht zu.
export function bewerte(frage: Frage, auswahl: number[]): Ergebnis {
  if (frage.typ === 'single') {
    const ok = auswahl.length === 1 && frage.richtig.includes(auswahl[0]);
    return { punkte: ok ? 1 : 0, max: 1 };
  }
  const max = frage.richtig.length;
  const treffer = auswahl.filter((a) => frage.richtig.includes(a)).length;
  return { punkte: Math.min(max, treffer), max };
}

// ── Gespeicherte Daten ──────────────────────────────────────────────
export type FrageStand = {
  punkte: number; // letzte Antwort
  max: number;
  versuche: number;
  richtigInFolge: number;
  fehlerOffen: boolean; // steht in „Meine Fehler“, bis 2× hintereinander richtig
  zuletzt: string; // Datum
};
export type KarteStand = { box: number; faellig: string }; // Leitner-Fach 1–5
export type PruefungEintrag = { datum: string; punkte: number; max: number; bestanden: boolean; fragen: number };

type Daten = {
  version: 1;
  hilfeSprache: HilfeSprache | null; // null = keine Übersetzungshilfe
  uebersetzungAn: boolean; // Frage und Erklärung zusätzlich in der Hilfesprache zeigen (bleibt an, bis man es ausschaltet)
  fragen: Record<string, FrageStand>;
  karten: Record<string, KarteStand>;
  lesezeichen: string[];
  tage: Record<string, number>; // Datum → erledigte Aufgaben (Fragen + Karten)
  tagesziel: number; // vom Nutzer gewählt: 10 / 20 / 30 Aufgaben
  zielTage: string[]; // Tage, an denen das Tagesziel erreicht wurde (zählt für die Lernserie)
  pruefungsDatum: string | null;
  onboardingFertig: boolean;
  premium: boolean; // Testmodus: in der Entwicklung frei umschaltbar, später echter Kauf
  pruefungen: PruefungEintrag[];
  gelesen: string[]; // Kapitel-IDs
  vibration: boolean; // kurze Vibration bei richtig/falsch und beim Tagesziel (in „Mehr“ abschaltbar)
};

const START: Daten = {
  version: 1,
  hilfeSprache: 'en',
  uebersetzungAn: false,
  fragen: {},
  karten: {},
  lesezeichen: [],
  tage: {},
  tagesziel: 20,
  zielTage: [],
  pruefungsDatum: null,
  onboardingFertig: false,
  premium: true,
  pruefungen: [],
  gelesen: [],
  vibration: true,
};

const SPEICHER_KEY = '34a-easy:v1';

// Leitner: Wartezeit in Tagen je Fach (Fach 1 = jeden Tag)
export const LEITNER_TAGE = [0, 1, 2, 4, 8, 16];
export const MAX_FACH = 5;
// Fehler gelten als gelernt nach so vielen richtigen Antworten hintereinander
export const RICHTIG_FUER_GELERNT = 2;

type AppState = Daten & {
  geladen: boolean;
  setHilfeSprache: (s: HilfeSprache | null) => void;
  setUebersetzungAn: (an: boolean) => void;
  beantworte: (frage: Frage, e: Ergebnis) => void;
  bewerteKarte: (id: string, gewusst: boolean) => void;
  toggleLesezeichen: (frageId: string) => void;
  setPruefungsDatum: (d: string | null) => void;
  setTagesziel: (n: number) => void;
  beendeOnboarding: () => void;
  zeigeEinfuehrung: () => void;
  setPremium: (p: boolean) => void;
  setVibration: (an: boolean) => void;
  speicherePruefung: (p: PruefungEintrag) => void;
  markiereGelesen: (kapitelId: string) => void;
  zuruecksetzen: () => void;
  glossarOffen: string | null;
  zeigeGlossar: (id: string | null) => void;
  zielMoment: boolean; // kurz true, wenn heute gerade das Tagesziel erreicht wurde (nicht gespeichert)
  schliesseZielMoment: () => void;
};

const Ctx = createContext<AppState | null>(null);

// Tagesziel zur Auswahl: Aufgaben pro Tag und ungefähre Dauer
export const ZIEL_STUFEN = [
  { wert: 10, titel: 'Locker', dauer: 'ca. 5 Min.' },
  { wert: 20, titel: 'Normal', dauer: 'ca. 10 Min.' },
  { wert: 30, titel: 'Intensiv', dauer: 'ca. 15 Min.' },
] as const;

// Eine Aufgabe erledigt: Tageszähler erhöhen und merken, wenn das Tagesziel erreicht ist
const zaehleTag = (d: Daten): Pick<Daten, 'tage' | 'zielTage'> => {
  const t = heute();
  const anzahl = (d.tage[t] ?? 0) + 1;
  const zielTage = anzahl >= d.tagesziel && !d.zielTage.includes(t) ? [...d.zielTage, t] : d.zielTage;
  return { tage: { ...d.tage, [t]: anzahl }, zielTage };
};

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [daten, setDaten] = useState<Daten>(START);
  const [geladen, setGeladen] = useState(false);
  const [glossarOffen, zeigeGlossar] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [zielMoment, setZielMoment] = useState(false);
  const zielGemeldet = useRef<string | null | undefined>(undefined); // Tag, für den der Moment schon kam

  // Laden beim Start
  useEffect(() => {
    AsyncStorage.getItem(SPEICHER_KEY)
      .then((json) => {
        if (json) {
          const gespeichert = JSON.parse(json) as Partial<Daten>;
          // Ältere Speicherstände: Tage mit mind. 10 Aufgaben zählen als „Ziel erreicht“
          const zielTage = gespeichert.zielTage ?? Object.entries(gespeichert.tage ?? {}).filter(([, n]) => n >= 10).map(([t]) => t);
          setDaten({ ...START, ...gespeichert, zielTage, version: 1 });
        }
      })
      .catch(() => {})
      .finally(() => setGeladen(true));
  }, []);

  // Speichern bei jeder Änderung (kurz verzögert, damit nicht bei jedem Tipp geschrieben wird)
  useEffect(() => {
    if (!geladen) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      AsyncStorage.setItem(SPEICHER_KEY, JSON.stringify(daten)).catch(() => {});
    }, 300);
  }, [daten, geladen]);

  // Tagesziel gerade erreicht → kurzer Moment (Banner + Vibration). Nicht beim Laden auslösen.
  useEffect(() => {
    if (!geladen) return;
    const tag = heute();
    const erreicht = daten.zielTage.includes(tag);
    if (zielGemeldet.current === undefined) {
      zielGemeldet.current = erreicht ? tag : null; // Stand beim Laden merken, nichts anzeigen
      return;
    }
    if (erreicht && zielGemeldet.current !== tag) {
      zielGemeldet.current = tag;
      setZielMoment(true);
      setTimeout(() => vibriere('ziel', daten.vibration), 450); // nach der Vibration für die Antwort
    }
  }, [daten.zielTage, daten.vibration, geladen]);

  const value = useMemo<AppState>(() => {
    const aendere = (f: (d: Daten) => Daten) => setDaten(f);
    return {
      ...daten,
      geladen,
      glossarOffen,
      zeigeGlossar,
      zielMoment,
      schliesseZielMoment: () => setZielMoment(false),
      setHilfeSprache: (s) => aendere((d) => ({ ...d, hilfeSprache: s })),
      setUebersetzungAn: (an) => aendere((d) => ({ ...d, uebersetzungAn: an })),
      beantworte: (frage, e) =>
        aendere((d) => {
          const alt = d.fragen[frage.id];
          const voll = e.punkte === e.max;
          const richtigInFolge = voll ? (alt?.richtigInFolge ?? 0) + 1 : 0;
          const fehlerOffen = voll ? !!alt?.fehlerOffen && richtigInFolge < RICHTIG_FUER_GELERNT : true;
          const stand: FrageStand = {
            punkte: e.punkte, max: e.max, versuche: (alt?.versuche ?? 0) + 1, richtigInFolge, fehlerOffen, zuletzt: heute(),
          };
          return { ...d, fragen: { ...d.fragen, [frage.id]: stand }, ...zaehleTag(d) };
        }),
      bewerteKarte: (id, gewusst) =>
        aendere((d) => {
          const alt = d.karten[id];
          const box = gewusst ? Math.min(MAX_FACH, (alt?.box ?? 0) + 1) : 1;
          const faellig = gewusst ? plusTage(heute(), LEITNER_TAGE[box]) : heute();
          return { ...d, karten: { ...d.karten, [id]: { box, faellig } }, ...zaehleTag(d) };
        }),
      toggleLesezeichen: (frageId) =>
        aendere((d) => ({
          ...d,
          lesezeichen: d.lesezeichen.includes(frageId) ? d.lesezeichen.filter((x) => x !== frageId) : [...d.lesezeichen, frageId],
        })),
      setPruefungsDatum: (p) => aendere((d) => ({ ...d, pruefungsDatum: p })),
      setTagesziel: (n) =>
        aendere((d) => {
          // Wer heute schon genug hat, behält den Tag in der Serie
          const t = heute();
          const zielTage = (d.tage[t] ?? 0) >= n && !d.zielTage.includes(t) ? [...d.zielTage, t] : d.zielTage;
          return { ...d, tagesziel: n, zielTage };
        }),
      beendeOnboarding: () => aendere((d) => ({ ...d, onboardingFertig: true })),
      zeigeEinfuehrung: () => aendere((d) => ({ ...d, onboardingFertig: false })),
      setPremium: (p) => aendere((d) => ({ ...d, premium: p })),
      setVibration: (an) => aendere((d) => ({ ...d, vibration: an })),
      speicherePruefung: (p) => aendere((d) => ({ ...d, pruefungen: [p, ...d.pruefungen].slice(0, 30) })),
      markiereGelesen: (id) => aendere((d) => (d.gelesen.includes(id) ? d : { ...d, gelesen: [...d.gelesen, id] })),
      zuruecksetzen: () => aendere((d) => ({ ...START, hilfeSprache: d.hilfeSprache, premium: d.premium, tagesziel: d.tagesziel, vibration: d.vibration, onboardingFertig: true })),
    };
  }, [daten, geladen, glossarOffen, zielMoment]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp außerhalb von AppStateProvider');
  return c;
}
