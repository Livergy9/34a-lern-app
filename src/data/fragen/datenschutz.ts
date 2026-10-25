import { Frage } from '../types';

// Datenschutzrecht
// ENTWURF – selbst formuliert, nicht aus anderen Quellen. Vor dem Release fachlich prüfen (geprueft: true setzen).
// unsicher: true = Claude ist sich nicht sicher → besonders genau prüfen.
export const FRAGEN: Frage[] = [
  {
    id: 'ds-001', sachgebiet: 'datenschutz', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Was sind [[personenbezogene Daten]]?',
    antworten: [
      'Nur Daten, die auf Papier gespeichert sind',
      'Die Öffnungszeiten eines Einkaufszentrums',
      'Anonyme Statistiken ohne Bezug zu einer Person',
      'Informationen über eine bestimmte oder bestimmbare Person, z. B. Name und Adresse',
      'Die Wettervorhersage für den Einsatzort',
    ],
    richtig: [3],
    erklaerung: 'Personenbezogen sind alle Informationen, mit denen eine Person direkt oder indirekt erkannt werden kann – z. B. Name, Adresse, Foto oder Kfz-Kennzeichen.',
    rechtsgrundlage: 'Art. 4 Nr. 1 DSGVO',
  },
  {
    id: 'ds-002', sachgebiet: 'datenschutz', typ: 'multi', schwierigkeit: 2, geprueft: false,
    text: 'Welche Grundsätze gelten für die Verarbeitung personenbezogener Daten?',
    antworten: [
      '[[Zweckbindung]]',
      'Daten dürfen unbegrenzt gespeichert werden.',
      '[[Datenminimierung]]',
      'Daten dürfen immer an Dritte weitergegeben werden.',
      'Speicherbegrenzung',
      'Möglichst viele Daten auf Vorrat sammeln',
    ],
    richtig: [0, 2, 4],
    erklaerung: 'Daten dürfen nur für einen festgelegten Zweck, nur im nötigen Umfang und nur so lange wie nötig gespeichert werden.',
    rechtsgrundlage: 'Art. 5 DSGVO',
  },
];
