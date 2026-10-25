import { Sachgebiet } from './types';

// Reihenfolge = Reihenfolge in der App.
// Fragen/Punkte je Sachgebiet: Verteilung seit 01.07.2025 (82 Fragen, 120 Punkte) – vor Release mit IHK abgleichen.
export const SACHGEBIETE: Sachgebiet[] = [
  { id: 'oeffentlich', name: 'Öffentliche Sicherheit und Ordnung, Gewerberecht', kurz: 'Gewerberecht', icon: 'business-outline', farbe: '#1666F0', fragenInPruefung: 12, punkteInPruefung: 19 },
  { id: 'datenschutz', name: 'Datenschutzrecht', kurz: 'Datenschutz', icon: 'lock-closed-outline', farbe: '#0E9384', fragenInPruefung: 5, punkteInPruefung: 8 },
  { id: 'bgb', name: 'Bürgerliches Gesetzbuch', kurz: 'BGB', icon: 'book-outline', farbe: '#6D5BD0', fragenInPruefung: 13, punkteInPruefung: 21 },
  { id: 'strafrecht', name: 'Straf- und Strafverfahrensrecht, Waffenrecht', kurz: 'Strafrecht', icon: 'scale-outline', farbe: '#C4320A', fragenInPruefung: 18, punkteInPruefung: 29 },
  { id: 'uvv', name: 'Unfallverhütungsvorschriften', kurz: 'Unfallverhütung', icon: 'medkit-outline', farbe: '#CA8504', fragenInPruefung: 8, punkteInPruefung: 13 },
  { id: 'menschen', name: 'Umgang mit Menschen', kurz: 'Umgang mit Menschen', icon: 'people-outline', farbe: '#DD2590', fragenInPruefung: 19, punkteInPruefung: 19 },
  { id: 'technik', name: 'Grundzüge der Sicherheitstechnik', kurz: 'Sicherheitstechnik', icon: 'hardware-chip-outline', farbe: '#475467', fragenInPruefung: 7, punkteInPruefung: 11 },
];

export const sachgebietById = (id: string) => SACHGEBIETE.find((s) => s.id === id)!;

// Echte Prüfung: 82 Fragen, 120 Punkte, 120 Minuten, bestanden ab 60 Punkten (= 50 %)
export const PRUEFUNG = { fragen: 82, punkte: 120, minuten: 120, bestehenProzent: 50 };
