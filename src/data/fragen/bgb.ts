import { Frage } from '../types';

// Bürgerliches Gesetzbuch
// ENTWURF – selbst formuliert, nicht aus anderen Quellen. Vor dem Release fachlich prüfen (geprueft: true setzen).
// unsicher: true = Claude ist sich nicht sicher → besonders genau prüfen.
export const FRAGEN: Frage[] = [
  {
    id: 'bgb-001', sachgebiet: 'bgb', typ: 'single', schwierigkeit: 2, geprueft: false,
    text: 'Ein Kunde leiht sich ein Fahrrad. Was hat er während der Leihe?',
    antworten: [
      'Er ist [[Eigentümer|eigentum]] des Fahrrads.',
      'Er hat den [[Besitz]] am Fahrrad, der Verleiher bleibt Eigentümer.',
      'Er hat weder Besitz noch Eigentum.',
      'Er wird nach drei Tagen automatisch Eigentümer.',
      'Besitz und Eigentum gehen beide auf ihn über.',
    ],
    richtig: [1],
    erklaerung: 'Besitzer ist, wer die tatsächliche Gewalt über eine Sache hat. Eigentümer ist, wem sie rechtlich gehört. Beim Leihen bekommt man nur den Besitz.',
    rechtsgrundlage: '§ 854 BGB (Besitz), § 903 BGB (Eigentum)',
  },
  {
    id: 'bgb-002', sachgebiet: 'bgb', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Woher hat eine Sicherheitskraft in einem Kaufhaus das [[Hausrecht]]?',
    antworten: [
      'Sie hat es automatisch durch ihre Sachkundeprüfung.',
      'Vom Ordnungsamt',
      'Es wurde ihr vom Hausrechtsinhaber (z. B. Eigentümer oder Mieter) übertragen.',
      'Aus dem Strafgesetzbuch',
      'Jede Sicherheitskraft hat überall Hausrecht.',
    ],
    richtig: [2],
    erklaerung: 'Das Hausrecht hat der Eigentümer oder berechtigte Besitzer (z. B. Mieter). Er kann es auf eine Sicherheitskraft übertragen, die es dann in seinem Auftrag ausübt.',
  },
  {
    id: 'bgb-003', sachgebiet: 'bgb', typ: 'single', schwierigkeit: 3, geprueft: false,
    text: 'Wann ist [[Selbsthilfe]] nach § 229 BGB erlaubt?',
    antworten: [
      'Immer, wenn man einen Anspruch hat',
      'Nur mit schriftlicher Erlaubnis des Arbeitgebers',
      'Nur wenn der Schaden über 1.000 Euro liegt',
      'Wenn obrigkeitliche Hilfe nicht rechtzeitig zu erreichen ist und sonst die Durchsetzung des Anspruchs vereitelt oder wesentlich erschwert würde',
      'Nur zwischen Familienangehörigen',
    ],
    richtig: [3],
    erklaerung: 'Selbsthilfe ist nur eine Ausnahme: Die Polizei oder ein Gericht kann nicht rechtzeitig helfen, und ohne sofortiges Handeln wäre der Anspruch verloren oder schwer durchsetzbar.',
    rechtsgrundlage: '§ 229 BGB',
  },
  {
    id: 'bgb-004', sachgebiet: 'bgb', typ: 'single', schwierigkeit: 2, geprueft: false,
    text: 'Ein fremder Hund greift Sie an. Sie wehren ihn ab und verletzen ihn dabei. Welche Rechtfertigung aus dem BGB kommt in Betracht?',
    antworten: [
      'Der defensive [[Notstand]], weil von dem Hund selbst die Gefahr ausgeht',
      'Selbsthilfe nach § 229 BGB',
      'Keine – Tiere dürfen niemals verletzt werden.',
      'Das Hausrecht',
      'Die vorläufige Festnahme',
    ],
    richtig: [0],
    erklaerung: 'Geht die Gefahr von einer Sache (rechtlich auch von einem Tier) aus, darf man sie beschädigen, wenn das zur Abwehr nötig ist und der Schaden nicht außer Verhältnis zur Gefahr steht.',
    rechtsgrundlage: '§ 228 BGB',
  },
];
