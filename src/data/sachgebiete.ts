import { Sachgebiet } from './types';

// Reihenfolge = Reihenfolge in der App.
// Fragen/Punkte je Sachgebiet: Verteilung seit 01.07.2025 (82 Fragen, 120 Punkte) – vor Release mit IHK abgleichen.
export const SACHGEBIETE: Sachgebiet[] = [
  { id: 'oeffentlich', name: 'Öffentliche Sicherheit und Ordnung, Gewerberecht', kurz: 'Gewerberecht', icon: 'business-outline', fragenInPruefung: 12, punkteInPruefung: 19 },
  { id: 'datenschutz', name: 'Datenschutzrecht', kurz: 'Datenschutz', icon: 'lock-closed-outline', fragenInPruefung: 5, punkteInPruefung: 8 },
  { id: 'bgb', name: 'Bürgerliches Gesetzbuch', kurz: 'BGB', icon: 'book-outline', fragenInPruefung: 13, punkteInPruefung: 21 },
  { id: 'strafrecht', name: 'Straf- und Strafverfahrensrecht, Waffenrecht', kurz: 'Strafrecht', icon: 'scale-outline', fragenInPruefung: 18, punkteInPruefung: 29 },
  { id: 'uvv', name: 'Unfallverhütungsvorschriften', kurz: 'Unfallverhütung', icon: 'medkit-outline', fragenInPruefung: 8, punkteInPruefung: 13 },
  { id: 'menschen', name: 'Umgang mit Menschen', kurz: 'Umgang mit Menschen', icon: 'people-outline', fragenInPruefung: 19, punkteInPruefung: 19 },
  { id: 'technik', name: 'Grundzüge der Sicherheitstechnik', kurz: 'Sicherheitstechnik', icon: 'hardware-chip-outline', fragenInPruefung: 7, punkteInPruefung: 11 },
];

export const sachgebietById = (id: string) => SACHGEBIETE.find((s) => s.id === id)!;

// Echte Prüfung
export const PRUEFUNG = { fragen: 82, punkte: 120, minuten: 120, bestehenProzent: 50 };
