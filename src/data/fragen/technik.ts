import { Frage } from '../types';

// Grundzüge der Sicherheitstechnik
// ENTWURF – selbst formuliert, nicht aus anderen Quellen. Vor dem Release fachlich prüfen (geprueft: true setzen).
// unsicher: true = Claude ist sich nicht sicher → besonders genau prüfen.
export const FRAGEN: Frage[] = [
  {
    id: 'te-001', sachgebiet: 'technik', typ: 'single', schwierigkeit: 2, geprueft: false,
    text: 'Worauf reagiert ein Passiv-Infrarot-Bewegungsmelder?',
    antworten: [
      'Auf Geräusche im Raum',
      'Auf Veränderungen der Wärmestrahlung im Erfassungsbereich',
      'Auf Erschütterungen der Fensterscheibe',
      'Auf Rauch',
      'Auf das Öffnen einer Tür über einen Magnetkontakt',
    ],
    richtig: [1],
    erklaerung: 'Ein PIR-Melder erkennt, wenn sich eine Wärmequelle (z. B. ein Mensch) im Erfassungsbereich bewegt.',
  },
  {
    id: 'te-002', sachgebiet: 'technik', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Was ist die Aufgabe einer [[Zutrittskontrolle]]?',
    antworten: [
      'Die Temperatur im Gebäude zu regeln',
      'Festzustellen, wer einen Bereich betreten darf, und Unbefugte fernzuhalten',
      'Brände automatisch zu löschen',
      'Die Arbeitszeit der Mitarbeiter zu berechnen',
      'Videoaufnahmen zu speichern',
    ],
    richtig: [1],
    erklaerung: 'Zutrittskontrolle prüft, ob eine Person berechtigt ist, einen Bereich zu betreten – z. B. per Ausweis, Karte, Code oder Personenkontrolle.',
  },
];
