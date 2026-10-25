import { Frage } from '../types';

// Unfallverhütungsvorschriften
// ENTWURF – selbst formuliert, nicht aus anderen Quellen. Vor dem Release fachlich prüfen (geprueft: true setzen).
// unsicher: true = Claude ist sich nicht sicher → besonders genau prüfen.
export const FRAGEN: Frage[] = [
  {
    id: 'uv-001', sachgebiet: 'uvv', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Welche [[Unfallverhütungsvorschrift]] gilt speziell für Wach- und Sicherungsdienste?',
    antworten: [
      'DGUV Vorschrift 1',
      'DGUV Vorschrift 23 „Wach- und Sicherungsdienste“',
      'Die Straßenverkehrsordnung',
      'Die Arbeitsstättenverordnung',
      'Es gibt keine besondere Vorschrift.',
    ],
    richtig: [1],
    erklaerung: 'Die DGUV Vorschrift 23 regelt speziell die Sicherheit bei Wach- und Sicherungsdiensten, z. B. Ausrüstung, Diensthunde und Kontrollgänge.',
    rechtsgrundlage: 'DGUV Vorschrift 23',
  },
  {
    id: 'uv-002', sachgebiet: 'uvv', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Unter welcher Nummer erreichen Sie in Deutschland Feuerwehr und Rettungsdienst?',
    antworten: ['110', '112', '115', '116 117', '19222'],
    richtig: [1],
    erklaerung: '112 ist der Notruf für Feuerwehr und Rettungsdienst. 110 ist der Polizeinotruf.',
  },
];
