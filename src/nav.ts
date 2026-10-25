import { createContext, useContext } from 'react';
import { Frage, SachgebietId } from './data/types';

// Einfache eigene Navigation (ohne Bibliothek): Tabs unten + ein Stapel von Bildschirmen darüber.
export type Tab = 'start' | 'lernen' | 'karten' | 'glossar' | 'mehr';

export type Route =
  | { name: 'quiz'; fragen: Frage[]; titel?: string }
  | { name: 'pruefung' }
  | { name: 'sachgebiet'; id: SachgebietId }
  | { name: 'kapitel'; id: string }
  | { name: 'kartenRunde'; sachgebiet?: SachgebietId }
  | { name: 'statistik' }
  | { name: 'premium' }
  | { name: 'lernplan' }
  | { name: 'durchsicht'; titel: string; eintraege: { frage: Frage; auswahl: number[] }[] };

export type Nav = {
  push: (r: Route) => void;
  ersetze: (r: Route) => void; // aktuellen Bildschirm austauschen
  zurueck: () => void;
  zumStart: () => void; // alle Bildschirme schließen
  geheZuTab: (t: Tab) => void;
  starteQuiz: (fragen: Frage[], titel?: string) => void; // filtert gesperrte Fragen, sonst Premium-Seite
};

export const NavCtx = createContext<Nav | null>(null);

export function useNav() {
  const n = useContext(NavCtx);
  if (!n) throw new Error('useNav außerhalb von NavCtx');
  return n;
}
