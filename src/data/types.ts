// Datenformat der App. Inhalte (Fragen, Glossar, Kapitel, Sachgebiete) liegen getrennt vom Code
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
  farbe: string;
  fragenInPruefung: number; // laut Verteilung seit 01.07.2025 (mit IHK abgleichen)
  punkteInPruefung: number;
};

export type GlossarEintrag = {
  id: string;
  begriff: string; // deutscher Fachbegriff
  sachgebiet: SachgebietId; // für Karteikarten
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
  richtig: number[]; // Indizes der richtigen Antworten (0 = A)
  erklaerung: string;
  rechtsgrundlage?: string;
  schwierigkeit: 1 | 2 | 3;
  geprueft: boolean; // fachlich geprüft?
  unsicher?: boolean; // Claude ist sich bei dieser Frage nicht sicher → beim Prüfen besonders genau ansehen
};

export type Kapitel = {
  id: string;
  sachgebiet: SachgebietId;
  titel: string;
  abschnitte: { ueberschrift?: string; text: string }[]; // Text darf [[Fachbegriffe]] enthalten, Zeilen mit "• " werden Aufzählung
  geprueft: boolean;
};
