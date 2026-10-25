import { Frage } from './types';

// ENTWURF – Beispielfragen für den Prototyp, selbst formuliert (keine Fragen aus anderen Quellen).
// Jede Frage muss vor dem Release fachlich geprüft werden (geprueft: true setzen).
// Format: Single Choice = 5 Antworten, Multiple Choice = 6 Antworten (wie IHK seit 07/2025).
export const FRAGEN: Frage[] = [
  // ── Öffentliche Sicherheit und Ordnung, Gewerberecht ──
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
    text: 'Für welche Tätigkeiten ist die [[Sachkundeprüfung]] vorgeschrieben?',
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
    text: 'Was gilt für den [[Dienstausweis]] einer Wachperson im Dienst?',
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

  // ── Datenschutz ──
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

  // ── BGB ──
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

  // ── Straf- und Strafverfahrensrecht ──
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
    text: 'Was ist ein [[Diebstahl]] nach § 242 StGB?',
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

  // ── Unfallverhütung ──
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

  // ── Umgang mit Menschen ──
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
    text: 'Was gehört zum [[aktiven Zuhören|aktives-zuhoeren]]?',
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
    text: 'Was ist ein Beispiel für [[nonverbale Kommunikation|nonverbal]]?',
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

  // ── Sicherheitstechnik ──
  {
    id: 'te-001', sachgebiet: 'technik', typ: 'single', schwierigkeit: 2, geprueft: false,
    text: 'Worauf reagiert ein Passiv-Infrarot-[[Bewegungsmelder]]?',
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

export const fragenFuer = (sachgebiet: string) => FRAGEN.filter((f) => f.sachgebiet === sachgebiet);
