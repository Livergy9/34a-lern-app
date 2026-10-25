import React, { createContext, useContext, useMemo, useState } from 'react';
import { Frage, HilfeSprache } from './data/types';

export type Ergebnis = { punkte: number; max: number };

// Bewertung wie IHK seit 01.07.2025: Single Choice 1 Punkt, Multiple Choice 1 Punkt je richtiger Antwort.
// ANNAHME (mit IHK-Bewertungsschema abgleichen): falsch angekreuzte Antworten ziehen je 1 Punkt ab, minimal 0.
export function bewerte(frage: Frage, auswahl: number[]): Ergebnis {
  if (frage.typ === 'single') {
    const ok = auswahl.length === 1 && frage.richtig.includes(auswahl[0]);
    return { punkte: ok ? 1 : 0, max: 1 };
  }
  const max = frage.richtig.length;
  const treffer = auswahl.filter((a) => frage.richtig.includes(a)).length;
  const fehler = auswahl.length - treffer;
  return { punkte: Math.max(0, Math.min(max, treffer - fehler)), max };
}

type AppState = {
  hilfeSprache: HilfeSprache | null; // null = keine Übersetzungshilfe
  setHilfeSprache: (s: HilfeSprache | null) => void;
  fortschritt: Record<string, Ergebnis>; // letzte Antwort je Frage-ID
  speichereErgebnis: (frageId: string, e: Ergebnis) => void;
  glossarOffen: string | null;
  zeigeGlossar: (id: string | null) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [hilfeSprache, setHilfeSprache] = useState<HilfeSprache | null>('en');
  const [fortschritt, setFortschritt] = useState<Record<string, Ergebnis>>({});
  const [glossarOffen, zeigeGlossar] = useState<string | null>(null);

  const value = useMemo<AppState>(
    () => ({
      hilfeSprache,
      setHilfeSprache,
      fortschritt,
      speichereErgebnis: (frageId, e) => setFortschritt((f) => ({ ...f, [frageId]: e })),
      glossarOffen,
      zeigeGlossar,
    }),
    [hilfeSprache, fortschritt, glossarOffen]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp außerhalb von AppStateProvider');
  return c;
}
