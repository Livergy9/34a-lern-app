// Datenformat der App. Inhalte (Fragen, Glossar, Sachgebiete) liegen getrennt vom Code
// in diesem Ordner, damit neue Inhalte ohne Code-Änderung ergänzt werden können.

export type HilfeSprache = 'en' | 'ro';

export type SachgebietId =
  | 'oeffentlich'
  | 'datenschutz'
  | 'bgb'
  | 'strafrecht'
  | 'uvv'
  | 'menschen'
  | 'technik';

export type Sachgebiet = {
  id: SachgebietId;
  name: string;
  kurz: string;
  icon: string; // Ionicons-Name
  fragenInPruefung: number; // laut Verteilung seit 01.07.2025 (mit IHK abgleichen)
  punkteInPruefung: number;
};

export type GlossarEintrag = {
  id: string;
  begriff: string; // deutscher Fachbegriff
  uebersetzung: Record<HilfeSprache, string>;
  erklaerung: { de: string } & Record<HilfeSprache, string>;
  geprueft: boolean; // Übersetzung von Savio/Muttersprachler geprüft?
};

export type Frage = {
  id: string;
  sachgebiet: SachgebietId;
  typ: 'single' | 'multi';
  // Fachbegriffe im Text: [[Begriff]] oder [[Anzeigetext|glossarId]]
  text: string;
  antworten: string[]; // Single Choice: 5, Multiple Choice: 6 (wie IHK seit 07/2025)
  richtig: number[]; // Indizes der richtigen Antworten
  erklaerung: string;
  rechtsgrundlage?: string;
  schwierigkeit: 1 | 2 | 3;
  geprueft: boolean; // fachlich von Savio geprüft?
};
