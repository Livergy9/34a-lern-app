import { Frage } from '../types';

// Öffentliche Sicherheit und Ordnung, Gewerberecht
// ENTWURF – selbst formuliert, nicht aus anderen Quellen. Vor dem Release fachlich prüfen (geprueft: true setzen).
// unsicher: true = Claude ist sich nicht sicher → besonders genau prüfen.
export const FRAGEN: Frage[] = [
  {
    id: 'oe-001', sachgebiet: 'oeffentlich', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Wer erteilt die [[Erlaubnis]] für das [[Bewachungsgewerbe]] nach § 34a GewO?',
    antworten: [
      'Die Industrie- und Handelskammer (IHK)',
      'Die [[zuständige Behörde|behoerde]], z. B. das Gewerbe- oder Ordnungsamt',
      'Die Polizei des jeweiligen Bundeslandes',
      'Die Agentur für Arbeit',
      'Der Bundesverband der Sicherheitswirtschaft',
    ],
    richtig: [1],
    erklaerung: 'Die Erlaubnis erteilt die zuständige Behörde (meist Gewerbe- oder Ordnungsamt). Die IHK nimmt nur die Unterrichtung und die Sachkundeprüfung ab.',
    rechtsgrundlage: '§ 34a Abs. 1 GewO',
  },
  {
    id: 'oe-002', sachgebiet: 'oeffentlich', typ: 'multi', schwierigkeit: 2, geprueft: false,
    text: 'Für welche Tätigkeiten ist die Sachkundeprüfung vorgeschrieben?',
    antworten: [
      'Kontrollgänge im öffentlichen Verkehrsraum',
      'Bewachung eines umzäunten Baustellengeländes ohne Publikumsverkehr',
      'Schutz vor Ladendieben (Ladendetektiv)',
      'Empfangsdienst an der Rezeption eines Hotels',
      'Bewachung im Einlassbereich einer Diskothek',
      'Reinigung von Bürogebäuden',
    ],
    richtig: [0, 2, 4],
    erklaerung: 'Für besonders konfliktträchtige Tätigkeiten reicht die Unterrichtung nicht aus. Dazu gehören u. a. Kontrollgänge im öffentlichen Verkehrsraum, Ladendetektive und der Einlassbereich von Diskotheken.',
    rechtsgrundlage: '§ 34a Abs. 1a Satz 2 GewO',
  },
  {
    id: 'oe-003', sachgebiet: 'oeffentlich', typ: 'single', schwierigkeit: 2, geprueft: false,
    text: 'Was bedeutet das staatliche [[Gewaltmonopol]] für eine Sicherheitskraft?',
    antworten: [
      'Sie hat dieselben Befugnisse wie ein Polizeibeamter.',
      'Sie darf Gewalt anwenden, wann immer der Auftraggeber es verlangt.',
      'Sie hat grundsätzlich nur die Rechte, die jeder Bürger hat (Jedermannsrechte).',
      'Sie darf Personen jederzeit durchsuchen.',
      'Sie darf Bußgelder verhängen.',
    ],
    richtig: [2],
    erklaerung: 'Zwang auszuüben ist Aufgabe des Staates. Private Sicherheitskräfte haben keine hoheitlichen Befugnisse, sondern nur Jedermannsrechte wie Notwehr oder die vorläufige Festnahme.',
  },
  {
    id: 'oe-004', sachgebiet: 'oeffentlich', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Was gilt für den Dienstausweis einer Wachperson im Dienst?',
    antworten: [
      'Er muss nur bei Nachtdiensten mitgeführt werden.',
      'Er bleibt im Büro des Unternehmens.',
      'Er ersetzt den Personalausweis.',
      'Er muss mitgeführt und auf Verlangen vorgezeigt werden.',
      'Er ist nur für den Unternehmer selbst vorgeschrieben.',
    ],
    richtig: [3],
    erklaerung: 'Wachpersonen müssen im Dienst einen Dienstausweis bei sich haben und ihn auf Verlangen vorzeigen, z. B. gegenüber Behörden oder betroffenen Personen.',
    rechtsgrundlage: 'Bewachungsverordnung (BewachV)',
  },
];
