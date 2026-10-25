import { Frage } from '../types';

// Umgang mit Menschen
// ENTWURF – selbst formuliert, nicht aus anderen Quellen. Vor dem Release fachlich prüfen (geprueft: true setzen).
// unsicher: true = Claude ist sich nicht sicher → besonders genau prüfen.
export const FRAGEN: Frage[] = [
  {
    id: 'um-001', sachgebiet: 'menschen', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Ein Besucher wird laut und beleidigend. Welches Verhalten dient der [[Deeskalation]]?',
    antworten: [
      'Ebenfalls laut werden, um Stärke zu zeigen',
      'Den Besucher auslachen',
      'Ruhig bleiben, Abstand halten und sachlich sprechen',
      'Sofort körperlich eingreifen',
      'Den Besucher ignorieren und weggehen, ohne etwas zu sagen',
    ],
    richtig: [2],
    erklaerung: 'Wer ruhig, sachlich und mit sicherem Abstand reagiert, nimmt Druck aus der Situation. Provokation oder Gewalt verschärfen den Konflikt.',
  },
  {
    id: 'um-002', sachgebiet: 'menschen', typ: 'multi', schwierigkeit: 2, geprueft: false,
    text: 'Was gehört zum aktiven Zuhören?',
    antworten: [
      'Nachfragen, wenn etwas unklar ist',
      'Den anderen häufig unterbrechen',
      'Das Gehörte mit eigenen Worten zusammenfassen',
      'Nebenbei auf das Handy schauen',
      'Blickkontakt halten',
      'Sofort Vorwürfe machen',
    ],
    richtig: [0, 2, 4],
    erklaerung: 'Aktives Zuhören zeigt dem Gegenüber, dass man ihn ernst nimmt: nachfragen, zusammenfassen und Aufmerksamkeit zeigen.',
  },
  {
    id: 'um-003', sachgebiet: 'menschen', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Was ist ein Beispiel für nonverbale Kommunikation?',
    antworten: [
      'Ein Telefongespräch',
      'Eine schriftliche Meldung',
      'Verschränkte Arme und ein ernster Gesichtsausdruck',
      'Eine Durchsage über Lautsprecher',
      'Eine E-Mail an den Vorgesetzten',
    ],
    richtig: [2],
    erklaerung: 'Nonverbal heißt ohne Worte: Körperhaltung, Mimik, Gestik und Abstand senden Botschaften – oft stärker als das Gesagte.',
  },
];
