import { HilfeSprache } from '../types';
import { UE as OEFFENTLICH } from './oeffentlich';
import { UE as DATENSCHUTZ } from './datenschutz';
import { UE as BGB } from './bgb';
import { UE as STRAFRECHT } from './strafrecht';
import { UE as UVV } from './uvv';
import { UE as MENSCHEN } from './menschen';
import { UE as TECHNIK } from './technik';

// Übersetzungen von Frage und Erklärung (Antworten bleiben Deutsch, wie in der Prüfung).
// Format pro Frage-ID: [Frage EN, Erklärung EN, Frage RO, Erklärung RO]
// ENTWURF: von ChatGPT/Muttersprachlern prüfen lassen (Prüflisten in /pruefung).
export type UeEintrag = [string, string, string, string];

const ALLE: Record<string, UeEintrag> = { ...OEFFENTLICH, ...DATENSCHUTZ, ...BGB, ...STRAFRECHT, ...UVV, ...MENSCHEN, ...TECHNIK };

export function uebersetzung(frageId: string, sprache: HilfeSprache): { text: string; erklaerung: string } | null {
  const e = ALLE[frageId];
  if (!e) return null;
  return sprache === 'en' ? { text: e[0], erklaerung: e[1] } : { text: e[2], erklaerung: e[3] };
}

export const UEBERSETZUNGEN = ALLE;
