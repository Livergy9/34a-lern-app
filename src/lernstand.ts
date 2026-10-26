import { useMemo } from 'react';
import { FRAGEN, frageById } from './data/fragen';
import { GLOSSAR } from './data/glossar';
import { LERNBEGRIFFE } from './data/lernbegriffe';
import { PRUEFUNG, SACHGEBIETE } from './data/sachgebiete';
import { Frage, GlossarEintrag } from './data/types';
import { heute, plusTage, tageZwischen } from './datum';
import { frageFrei, karteFrei } from './premium';
import { FrageStand, useApp } from './state';

// Ein Tag zählt für die Lernserie, wenn das gewählte Tagesziel erreicht wurde (siehe state.tsx, zielTage)
export const NEUE_KARTEN_PRO_RUNDE = 10;

export const ALLE_KARTEN: GlossarEintrag[] = [...GLOSSAR, ...LERNBEGRIFFE];

export function mischen<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Empfehlung bei eingetragenem Prüfungsdatum: offene Fragen auf die Tage bis zur Prüfung verteilen (mit Puffer).
// Das echte Tagesziel wählt der Nutzer selbst (10/20/30). Ohne Datum: keine Empfehlung.
export function empfohlenesZiel(offen: number, tageBis: number | null): number | null {
  if (tageBis === null || tageBis <= 0) return null;
  const lernTage = Math.max(1, tageBis - 1); // letzter Tag vor der Prüfung bleibt frei für die Simulation
  const roh = Math.ceil((offen * 1.3) / lernTage);
  const gerundet = Math.ceil(roh / 5) * 5;
  return Math.min(60, Math.max(10, gerundet));
}

export function berechneSerie(zielTage: string[]): number {
  const set = new Set(zielTage);
  let tag = heute();
  if (!set.has(tag)) tag = plusTage(tag, -1); // heute noch nicht geschafft → Serie läuft noch
  let n = 0;
  while (set.has(tag)) {
    n++;
    tag = plusTage(tag, -1);
  }
  return n;
}

// Prozent richtig erst ab so vielen beantworteten Fragen zeigen (sonst z. B. „100 %“ nach einer einzigen Frage)
export const MIN_FUER_QUOTE = 5;

export function quote(liste: Frage[], stand: Record<string, FrageStand>, minBeantwortet = MIN_FUER_QUOTE) {
  let p = 0, m = 0, n = 0;
  for (const f of liste) {
    const s = stand[f.id];
    if (s) { p += s.punkte; m += s.max; n++; }
  }
  return m && n >= minBeantwortet ? p / m : null;
}

// Prüfungsreife (Anzeige auf dem Start). Bewusst KEINE Punktzahl für den Nutzer:
// unsere Fragen sind nicht die echten, und „7 von 120“ liest sich am Anfang wie „schlecht“.
// Die Stufe hängt von zwei Dingen ab:
//  - quote:     wie gut (Anteil richtiger Punkte der beantworteten Fragen)
//  - abdeckung: wie viel Stoff geübt (beantwortet / alle Fragen je Sachgebiet, gewichtet mit den Prüfungspunkten)
// „Gut vorbereitet“ nur mit fast ganzem Stoff → Gratis-Nutzer (30 %) kommen höchstens bis „Auf gutem Weg“.
// `anteil` (Schätzung mit ALLEN Fragen, unbeantwortet = 0) treibt nur noch den Balken.
export type ReifeStufe = 'leer' | 'amAnfang' | 'aufGutemWeg' | 'gutVorbereitet';
export const REIFE_GRENZEN = {
  aufGutemWeg: { quote: 0.6, abdeckung: 0.2 },
  gutVorbereitet: { quote: 0.75, abdeckung: 0.9 },
};
// Erst ab so vielen beantworteten Fragen eine Einschätzung zeigen
export const MIN_FUER_REIFE = 20;

export function reifeStufe(beantwortet: number, quote: number, abdeckung: number, premium: boolean): ReifeStufe {
  if (beantwortet < MIN_FUER_REIFE) return 'leer';
  const g = REIFE_GRENZEN;
  if (premium && quote >= g.gutVorbereitet.quote && abdeckung >= g.gutVorbereitet.abdeckung) return 'gutVorbereitet';
  if (quote >= g.aufGutemWeg.quote && abdeckung >= g.aufGutemWeg.abdeckung) return 'aufGutemWeg';
  return 'amAnfang';
}

export function pruefungsreife(alle: Frage[], stand: Record<string, FrageStand>, premium: boolean) {
  let beantwortet = 0, pSumme = 0, mSumme = 0;
  const gebiete = SACHGEBIETE.map((sg) => {
    const liste = alle.filter((f) => f.sachgebiet === sg.id);
    let summe = 0, n = 0;
    for (const f of liste) {
      const s = stand[f.id];
      if (s && s.max > 0) { summe += s.punkte / s.max; n++; pSumme += s.punkte; mSumme += s.max; }
    }
    beantwortet += n;
    const anteil = liste.length ? summe / liste.length : 0;
    const geuebt = liste.length ? n / liste.length : 0;
    return { sg, anteil, geuebt, punkte: anteil * sg.punkteInPruefung, offenePunkte: (1 - anteil) * sg.punkteInPruefung };
  });
  const punkte = gebiete.reduce((a, g) => a + g.punkte, 0);
  const anteil = punkte / PRUEFUNG.punkte;
  const abdeckung = gebiete.reduce((a, g) => a + g.geuebt * g.sg.punkteInPruefung, 0) / PRUEFUNG.punkte;
  const quote = mSumme ? pSumme / mSumme : 0;
  const stufe = reifeStufe(beantwortet, quote, abdeckung, premium);
  // Größte Lücke = Sachgebiet, in dem die meisten Prüfungspunkte noch fehlen
  const luecke = [...gebiete].sort((a, b) => b.offenePunkte - a.offenePunkte)[0];
  return { punkte, anteil, abdeckung, quote, stufe, beantwortet, gebiete, luecke: luecke && luecke.offenePunkte >= 1 ? luecke : null };
}

// Premium-Hinweis erst, wenn der Gratis-Nutzer den Großteil seiner Gratis-Fragen geübt hat
export const PREMIUM_HINWEIS_AB = 0.8;

// Auswahl für „Heute lernen“: erst offene Fehler, dann neue Fragen, dann lange nicht gesehene
export function waehleTagesFragen(pool: Frage[], stand: Record<string, FrageStand>, anzahl: number): Frage[] {
  const fehler = mischen(pool.filter((f) => stand[f.id]?.fehlerOffen));
  const neu = pool.filter((f) => !stand[f.id]);
  const alt = pool
    .filter((f) => stand[f.id] && !stand[f.id].fehlerOffen)
    .sort((a, b) => (stand[a.id].zuletzt < stand[b.id].zuletzt ? -1 : 1));
  const fehlerAnteil = fehler.slice(0, Math.ceil(anzahl / 2));
  const rest = [...neu, ...alt].slice(0, anzahl - fehlerAnteil.length);
  return mischen([...fehlerAnteil, ...rest]);
}

export function useLernstand() {
  const app = useApp();
  return useMemo(() => {
    const d = heute();
    const frei = FRAGEN.filter((f) => frageFrei(f, app.premium));
    const bearbeitet = (liste: Frage[]) => liste.filter((f) => app.fragen[f.id]).length;
    const fehler = frei.filter((f) => app.fragen[f.id]?.fehlerOffen);
    const gemerkt = app.lesezeichen.map((id) => frageById(id)).filter((f): f is Frage => !!f && frageFrei(f, app.premium));
    const offen = frei.filter((f) => !app.fragen[f.id] || app.fragen[f.id].fehlerOffen).length;

    const tageBis = app.pruefungsDatum ? tageZwischen(d, app.pruefungsDatum) : null;
    const ziel = app.tagesziel;
    const empfohlen = empfohlenesZiel(offen, tageBis);
    const heuteErledigt = app.tage[d] ?? 0;
    const serie = berechneSerie(app.zielTage);

    const karten = ALLE_KARTEN.filter((k) => karteFrei(k, app.premium));
    const kartenFaellig = karten.filter((k) => app.karten[k.id] && app.karten[k.id].faellig <= d);
    const kartenNeu = karten.filter((k) => !app.karten[k.id]);
    const kartenSicher = karten.filter((k) => (app.karten[k.id]?.box ?? 0) >= 3).length;

    const letzteTage = Array.from({ length: 7 }, (_, i) => {
      const t = plusTage(d, i - 6);
      return { datum: t, anzahl: app.tage[t] ?? 0, geschafft: app.zielTage.includes(t) };
    });

    return {
      frei, bearbeitet, fehler, gemerkt, offen,
      tageBis, ziel, empfohlen, heuteErledigt, serie, letzteTage,
      karten, kartenFaellig, kartenNeu, kartenSicher,
      lerntageGesamt: app.zielTage.length,
    };
  }, [app.fragen, app.karten, app.tage, app.zielTage, app.tagesziel, app.lesezeichen, app.premium, app.pruefungsDatum]);
}
