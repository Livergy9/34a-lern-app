import { Frage, SachgebietId } from '../types';
import { FRAGEN as OEFFENTLICH } from './oeffentlich';
import { FRAGEN as DATENSCHUTZ } from './datenschutz';
import { FRAGEN as BGB } from './bgb';
import { FRAGEN as STRAFRECHT } from './strafrecht';
import { FRAGEN as UVV } from './uvv';
import { FRAGEN as MENSCHEN } from './menschen';
import { FRAGEN as TECHNIK } from './technik';

// Eine Datei pro Sachgebiet. Format: Single Choice = 5 Antworten, Multiple Choice = 6 Antworten (wie IHK seit 07/2025).
export const FRAGEN: Frage[] = [...OEFFENTLICH, ...DATENSCHUTZ, ...BGB, ...STRAFRECHT, ...UVV, ...MENSCHEN, ...TECHNIK];

const nachGebiet = new Map<string, Frage[]>();
for (const f of FRAGEN) nachGebiet.set(f.sachgebiet, [...(nachGebiet.get(f.sachgebiet) ?? []), f]);

export const fragenFuer = (sachgebiet: SachgebietId | string): Frage[] => nachGebiet.get(sachgebiet) ?? [];

const byId = new Map(FRAGEN.map((f) => [f.id, f]));
export const frageById = (id: string) => byId.get(id);
