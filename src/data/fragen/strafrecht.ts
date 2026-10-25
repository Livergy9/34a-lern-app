import { Frage } from '../types';

// Straf- und Strafverfahrensrecht, Waffenrecht
// ENTWURF – selbst formuliert, nicht aus anderen Quellen. Vor dem Release fachlich prüfen (geprueft: true setzen).
// unsicher: true = Claude ist sich nicht sicher → besonders genau prüfen.
export const FRAGEN: Frage[] = [
  {
    id: 'st-001', sachgebiet: 'strafrecht', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Was ist [[Notwehr]] nach § 32 StGB?',
    antworten: [
      'Jede Gewalt, die man nach einem Streit anwendet',
      'Die Bestrafung eines Täters nach der Tat',
      'Die Verteidigung, die erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen abzuwenden',
      'Ein Recht, das nur Polizeibeamte haben',
      'Die Verfolgung eines Täters, der bereits geflohen ist',
    ],
    richtig: [2],
    erklaerung: 'Notwehr setzt einen gegenwärtigen (gerade stattfindenden) und rechtswidrigen Angriff voraus. Die Verteidigung muss erforderlich sein – Rache oder Strafe nach dem Angriff ist keine Notwehr.',
    rechtsgrundlage: '§ 32 StGB',
  },
  {
    id: 'st-002', sachgebiet: 'strafrecht', typ: 'multi', schwierigkeit: 3, geprueft: false,
    text: 'Unter welchen Voraussetzungen darf jedermann eine Person [[vorläufig festnehmen|festnahme]]?',
    antworten: [
      'Die Person wird [[auf frischer Tat|frische-tat]] betroffen oder verfolgt.',
      'Es genügt ein vager Verdacht ohne konkrete Tat.',
      'Die Person ist der Flucht verdächtig.',
      'Nur Polizeibeamte dürfen festnehmen.',
      'Die Identität der Person kann nicht sofort festgestellt werden.',
      'Die Festnahme ist nur bei Verbrechen erlaubt.',
    ],
    richtig: [0, 2, 4],
    erklaerung: 'Das Jedermann-Festnahmerecht gilt, wenn jemand auf frischer Tat betroffen oder verfolgt wird UND entweder fluchtverdächtig ist oder seine Identität nicht sofort festgestellt werden kann.',
    rechtsgrundlage: '§ 127 Abs. 1 StPO',
  },
  {
    id: 'st-003', sachgebiet: 'strafrecht', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Was ist ein Diebstahl nach § 242 StGB?',
    antworten: [
      'Das Wegnehmen einer fremden beweglichen Sache in der Absicht, sie sich rechtswidrig zuzueignen',
      'Das Beschädigen einer fremden Sache',
      'Das Betreten eines fremden Grundstücks',
      'Das Ausleihen einer Sache ohne Rückgabefrist',
      'Das Finden einer verlorenen Sache',
    ],
    richtig: [0],
    erklaerung: 'Diebstahl bedeutet: Wegnahme einer fremden beweglichen Sache mit [[Zueignungsabsicht]] – der Täter will die Sache wie ein Eigentümer behalten oder nutzen.',
    rechtsgrundlage: '§ 242 StGB',
  },
  {
    id: 'st-004', sachgebiet: 'strafrecht', typ: 'single', schwierigkeit: 2, geprueft: false,
    text: 'Wann ist eine Straftat ein [[Verbrechen]]?',
    antworten: [
      'Wenn sie nachts begangen wird',
      'Wenn sie mit einer Freiheitsstrafe von mindestens einem Jahr bedroht ist',
      'Wenn mehrere Täter beteiligt sind',
      'Wenn der Schaden über 500 Euro liegt',
      'Jede Straftat ist ein Verbrechen.',
    ],
    richtig: [1],
    erklaerung: 'Verbrechen sind Taten mit einer Mindeststrafe von einem Jahr Freiheitsstrafe. Alle anderen Straftaten sind Vergehen.',
    rechtsgrundlage: '§ 12 StGB',
  },
  {
    id: 'st-005', sachgebiet: 'strafrecht', typ: 'single', schwierigkeit: 1, geprueft: false,
    text: 'Wer leitet die [[Strafverfolgung]] in Deutschland?',
    antworten: [
      'Die Bewachungsunternehmen',
      'Die Gewerbeämter',
      'Die [[Staatsanwaltschaft]], unterstützt von der Polizei',
      'Die IHK',
      'Der Geschädigte selbst',
    ],
    richtig: [2],
    erklaerung: 'Die Staatsanwaltschaft leitet das Ermittlungsverfahren. Die Polizei ermittelt in ihrem Auftrag. Sicherheitskräfte haben dabei keine eigenen Befugnisse.',
    rechtsgrundlage: '§§ 152, 160, 163 StPO',
  },
];
