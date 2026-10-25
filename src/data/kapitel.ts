import { Kapitel, SachgebietId } from './types';

// Lernkapitel: kurze Texte zum Lesen vor dem Üben. Einfache Sprache, kurze Sätze.
// Fachbegriffe mit [[Begriff]] oder [[Anzeigetext|glossarId]] markieren. Zeilen mit "• " werden Aufzählungspunkte.
// ENTWURF – vor dem Release fachlich prüfen (geprueft: true setzen).
export const KAPITEL: Kapitel[] = [
  // ── Öffentliche Sicherheit und Ordnung, Gewerberecht ──
  {
    id: 'oe-k1', sachgebiet: 'oeffentlich', geprueft: false,
    titel: 'Das Bewachungsgewerbe und die Erlaubnis',
    abschnitte: [
      {
        text: 'Wer gewerbsmäßig Leben oder Eigentum fremder Personen bewacht, betreibt ein [[Bewachungsgewerbe]]. Dafür braucht der Unternehmer eine [[Erlaubnis]] nach § 34a der Gewerbeordnung (GewO).',
      },
      {
        ueberschrift: 'Wer erteilt die Erlaubnis?',
        text: 'Die Erlaubnis erteilt die [[zuständige Behörde|behoerde]], meistens das Gewerbe- oder Ordnungsamt. Die IHK erteilt keine Erlaubnis. Sie bietet die Unterrichtung an und nimmt die Sachkundeprüfung ab.',
      },
      {
        ueberschrift: 'Voraussetzungen für den Unternehmer',
        text: '• Er ist zuverlässig (z. B. keine schweren Vorstrafen).\n• Er hat geordnete Vermögensverhältnisse.\n• Er hat eine Haftpflichtversicherung.\n• Er hat die Sachkundeprüfung bestanden.',
      },
      {
        ueberschrift: 'Unterrichtung oder Sachkundeprüfung?',
        text: 'Für einfache Bewachungsaufgaben reicht bei Wachpersonen die Unterrichtung bei der IHK. Für schwierigere Aufgaben ist die Sachkundeprüfung Pflicht, zum Beispiel:\n• Kontrollgänge im öffentlichen Verkehrsraum oder in Bereichen mit öffentlichem Verkehr\n• Schutz vor Ladendieben (Ladendetektiv)\n• Einlasskontrolle bei Diskotheken\n• leitende Tätigkeit bei der Bewachung von Flüchtlingsunterkünften oder großen Veranstaltungen',
      },
      {
        ueberschrift: 'Bewacherregister',
        text: 'Bewachungsunternehmen und Wachpersonen werden im bundesweiten Bewacherregister erfasst. Bevor eine Wachperson arbeiten darf, prüft die Behörde ihre Zuverlässigkeit.',
      },
    ],
  },
  {
    id: 'oe-k2', sachgebiet: 'oeffentlich', geprueft: false,
    titel: 'Welche Rechte hat eine Sicherheitskraft?',
    abschnitte: [
      {
        ueberschrift: 'Das Gewaltmonopol des Staates',
        text: 'In Deutschland gilt das [[Gewaltmonopol]]: Zwang anwenden dürfen grundsätzlich nur der Staat und seine Behörden, vor allem die Polizei. Eine private Sicherheitskraft ist keine Polizei. Sie hat keine hoheitlichen Befugnisse.',
      },
      {
        ueberschrift: 'Nur Jedermannrechte',
        text: 'Eine Sicherheitskraft hat nur die Rechte, die jeder Mensch hat – die [[Jedermannrechte|jedermannrecht]]. Die wichtigsten sind:\n• [[Notwehr]] und Nothilfe\n• [[Notstand]]\n• [[Selbsthilfe]]\n• [[vorläufige Festnahme|festnahme]]\nDazu kommt das [[Hausrecht]], das der Auftraggeber an die Sicherheitskraft überträgt.',
      },
      {
        ueberschrift: 'Verhältnismäßigkeit',
        text: 'Jede Maßnahme muss [[verhältnismäßig|verhaeltnismaessigkeit]] sein. Das heißt:\n• geeignet: Die Maßnahme hilft wirklich.\n• erforderlich: Es gibt kein milderes Mittel, das genauso gut hilft.\n• angemessen: Der Schaden steht nicht außer Verhältnis zum Nutzen.\nMerksatz: Immer zuerst reden, dann – wenn nötig – das mildeste Mittel.',
      },
      {
        ueberschrift: 'Grundrechte beachten',
        text: 'Auch Sicherheitskräfte müssen die Grundrechte achten. Besonders wichtig sind die Würde des Menschen (Art. 1 Grundgesetz), die Freiheit der Person und die körperliche Unversehrtheit (Art. 2 GG) und die Gleichbehandlung (Art. 3 GG).',
      },
    ],
  },
  {
    id: 'oe-k3', sachgebiet: 'oeffentlich', geprueft: false,
    titel: 'Pflichten im Wachdienst',
    abschnitte: [
      {
        text: 'Die Bewachungsverordnung (BewachV) regelt viele Pflichten von Unternehmen und Wachpersonen. Verstöße sind oft eine [[Ordnungswidrigkeit]] und werden mit einem Bußgeld bestraft.',
      },
      {
        ueberschrift: 'Ausweis und Kennzeichnung',
        text: '• Wachpersonen müssen im Dienst einen Dienstausweis mitführen.\n• Bei bestimmten Tätigkeiten, z. B. Kontrollgängen im öffentlichen Raum oder am Einlass von Diskotheken, müssen sie ein sichtbares Schild mit Namen oder Kennnummer tragen.\n• Die Dienstkleidung darf nicht mit Uniformen von Polizei oder Bundeswehr verwechselt werden können.',
      },
      {
        ueberschrift: 'Waffen',
        text: 'Waffen dürfen Wachpersonen im Dienst nur tragen, wenn die Behörde zugestimmt hat und die Person die nötige Erlaubnis und Ausbildung hat.',
      },
      {
        ueberschrift: 'Die Behörde kann eingreifen',
        text: 'Die Behörde kann eine Erlaubnis widerrufen oder einer Person die Tätigkeit verbieten, wenn sie nicht zuverlässig ist. So eine Entscheidung der Behörde ist ein [[Verwaltungsakt]]. Dagegen kann man sich mit Widerspruch oder Klage wehren.',
      },
    ],
  },

  // ── Datenschutz ──
  {
    id: 'ds-k1', sachgebiet: 'datenschutz', geprueft: false,
    titel: 'Was sind personenbezogene Daten?',
    abschnitte: [
      {
        text: '[[Personenbezogene Daten|personenbezogene-daten]] sind alle Informationen, mit denen man einen Menschen erkennen kann. Beispiele:\n• Name, Adresse, Geburtsdatum\n• Foto und Videoaufnahme\n• Autokennzeichen\n• Telefonnummer, E-Mail-Adresse',
      },
      {
        ueberschrift: 'Die Gesetze',
        text: 'Die wichtigsten Gesetze sind die Datenschutz-Grundverordnung (DSGVO) der EU und das Bundesdatenschutzgesetz (BDSG).',
      },
      {
        ueberschrift: 'Besonders geschützte Daten',
        text: 'Manche Daten sind besonders sensibel und besonders geschützt, z. B. Gesundheit, Religion, politische Meinung, Herkunft oder sexuelle Orientierung.',
      },
    ],
  },
  {
    id: 'ds-k2', sachgebiet: 'datenschutz', geprueft: false,
    titel: 'Grundregeln des Datenschutzes',
    abschnitte: [
      {
        ueberschrift: 'Nur mit Rechtsgrundlage',
        text: 'Daten dürfen nur verarbeitet werden, wenn es erlaubt ist. Erlaubt ist es zum Beispiel:\n• mit Einwilligung der Person\n• zur Erfüllung eines Vertrags\n• wegen einer gesetzlichen Pflicht\n• bei einem berechtigten Interesse, das stärker ist als das Interesse der Person',
      },
      {
        ueberschrift: 'Die wichtigsten Grundsätze',
        text: '• [[Zweckbindung]]: Daten nur für den Zweck nutzen, für den sie gesammelt wurden.\n• [[Datenminimierung]]: nur so viele Daten wie nötig.\n• Speicherbegrenzung: Daten löschen, wenn sie nicht mehr gebraucht werden.\n• Richtigkeit: Daten müssen stimmen.\n• Vertraulichkeit: Daten vor Unbefugten schützen.',
      },
      {
        ueberschrift: 'Im Wachdienst',
        text: 'Was du im Dienst erfährst, bleibt vertraulich. Gib keine Daten an Unbefugte weiter – auch nicht an Freunde oder in sozialen Netzwerken. Besucherlisten, Schlüsselbücher und Protokolle müssen sicher aufbewahrt werden.',
      },
    ],
  },
  {
    id: 'ds-k3', sachgebiet: 'datenschutz', geprueft: false,
    titel: 'Videoüberwachung und Rechte der Betroffenen',
    abschnitte: [
      {
        ueberschrift: 'Videoüberwachung',
        text: 'Kameras in öffentlich zugänglichen Räumen (z. B. Geschäft, Bahnhof, Parkhaus) sind nur erlaubt, wenn es einen berechtigten Zweck gibt, etwa Schutz vor Diebstahl. Die Überwachung muss so früh wie möglich erkennbar sein, z. B. durch ein Hinweisschild. Aufnahmen müssen gelöscht werden, wenn sie nicht mehr gebraucht werden.',
      },
      {
        ueberschrift: 'Rechte der Betroffenen',
        text: '• Auskunft: Jeder darf fragen, welche Daten über ihn gespeichert sind.\n• Berichtigung: Falsche Daten müssen korrigiert werden.\n• Löschung: Nicht mehr nötige Daten müssen gelöscht werden.\n• Beschwerde: Man kann sich bei der Datenschutz-Aufsichtsbehörde beschweren.',
      },
    ],
  },

  // ── BGB ──
  {
    id: 'bgb-k1', sachgebiet: 'bgb', geprueft: false,
    titel: 'Besitz und Eigentum',
    abschnitte: [
      {
        ueberschrift: 'Der Unterschied',
        text: '[[Eigentum]] heißt: Die Sache gehört mir rechtlich (§ 903 BGB).\n[[Besitz]] heißt: Ich habe die Sache tatsächlich in meiner Gewalt (§ 854 BGB).\nBeispiel: Wer ein Auto mietet, ist Besitzer. Eigentümer bleibt die Autovermietung.',
      },
      {
        ueberschrift: 'Die Sicherheitskraft als Besitzdiener',
        text: 'Eine Wachperson übt die tatsächliche Gewalt für ihren Auftraggeber aus und muss seinen Weisungen folgen. Sie ist deshalb Besitzdiener (§ 855 BGB). Besitzer bleibt der Auftraggeber.',
      },
      {
        ueberschrift: 'Verbotene Eigenmacht',
        text: 'Wer einem Besitzer ohne dessen Willen den Besitz wegnimmt oder ihn dabei stört, handelt mit verbotener Eigenmacht (§ 858 BGB). Dagegen darf man sich wehren:\n• Besitzwehr: Man darf verbotene Eigenmacht mit Gewalt abwehren (§ 859 Abs. 1 BGB).\n• Besitzkehr: Wird eine Sache weggenommen, darf man sie dem Täter [[auf frischer Tat|frische-tat]] oder bei sofortiger Verfolgung wieder abnehmen (§ 859 Abs. 2 BGB).\nDiese Rechte darf auch der Besitzdiener für den Besitzer ausüben (§ 860 BGB).',
      },
    ],
  },
  {
    id: 'bgb-k2', sachgebiet: 'bgb', geprueft: false,
    titel: 'Notwehr, Notstand und Selbsthilfe im BGB',
    abschnitte: [
      {
        ueberschrift: 'Notwehr (§ 227 BGB)',
        text: 'Wer in [[Notwehr]] handelt, handelt nicht rechtswidrig und muss keinen Schadensersatz zahlen. Notwehr ist die Verteidigung, die erforderlich ist, um einen gegenwärtigen, rechtswidrigen Angriff abzuwehren.',
      },
      {
        ueberschrift: 'Notstand (§ 228 und § 904 BGB)',
        text: '• Defensiver [[Notstand]] (§ 228 BGB): Eine Sache bedroht mich, z. B. ein angreifender Hund. Ich darf diese Sache beschädigen, wenn es nötig ist und der Schaden nicht außer Verhältnis zur Gefahr steht.\n• Aggressiver Notstand (§ 904 BGB): Ich benutze oder beschädige eine fremde, unbeteiligte Sache, um eine viel größere Gefahr abzuwenden, z. B. eine Scheibe einschlagen, um einen Feuerlöscher zu holen. Der Eigentümer muss das dulden, kann aber Schadensersatz verlangen.',
      },
      {
        ueberschrift: 'Selbsthilfe (§ 229 BGB)',
        text: '[[Selbsthilfe]] ist nur erlaubt, wenn die Polizei oder ein Gericht nicht rechtzeitig helfen kann und sonst der Anspruch verloren ginge. Dann darf man z. B. eine Sache wegnehmen oder einen fluchtverdächtigen Schuldner festhalten. Danach muss man sofort die Behörden einschalten (§ 230 BGB). Wer sich irrt, muss Schadensersatz zahlen (§ 231 BGB).',
      },
    ],
  },
  {
    id: 'bgb-k3', sachgebiet: 'bgb', geprueft: false,
    titel: 'Hausrecht, Haftung und Fundsachen',
    abschnitte: [
      {
        ueberschrift: 'Hausrecht',
        text: 'Wer das [[Hausrecht]] hat, bestimmt, wer ein Gebäude oder Gelände betreten und dort bleiben darf. Es steht dem Eigentümer oder Besitzer zu, zum Beispiel dem Mieter. Er kann es an eine Sicherheitskraft übertragen. Diese darf dann z. B. ein Hausverbot aussprechen.',
      },
      {
        ueberschrift: 'Schadensersatz',
        text: 'Wer vorsätzlich oder fahrlässig das Leben, den Körper, die Gesundheit, die Freiheit oder das Eigentum eines anderen widerrechtlich verletzt, muss den Schaden ersetzen (§ 823 BGB). Für Fehler seiner Mitarbeiter kann auch der Arbeitgeber haften.',
      },
      {
        ueberschrift: 'Fundsachen',
        text: 'Wer eine verlorene Sache findet, muss den Fund dem Verlierer, dem Eigentümer oder der zuständigen Behörde (Fundbüro) melden (§ 965 BGB). Funde in Geschäftsräumen oder Verkehrsmitteln gibt man dort ab, z. B. beim Hausherrn oder an der Information.',
      },
    ],
  },

  // ── Strafrecht ──
  {
    id: 'st-k1', sachgebiet: 'strafrecht', geprueft: false,
    titel: 'Grundbegriffe des Strafrechts',
    abschnitte: [
      {
        ueberschrift: 'Keine Strafe ohne Gesetz',
        text: 'Eine Tat kann nur bestraft werden, wenn die Strafbarkeit gesetzlich bestimmt war, bevor die Tat begangen wurde (Art. 103 Abs. 2 GG, § 1 StGB).',
      },
      {
        ueberschrift: 'Vorsatz und Fahrlässigkeit',
        text: '[[Vorsatz]] heißt: wissen und wollen. [[Fahrlässigkeit]] heißt: nicht aufpassen, obwohl man hätte aufpassen müssen. Strafbar ist grundsätzlich nur vorsätzliches Handeln. Fahrlässiges Handeln nur, wenn das Gesetz es ausdrücklich sagt, z. B. fahrlässige Körperverletzung (§ 15 StGB).',
      },
      {
        ueberschrift: 'Verbrechen und Vergehen',
        text: '• [[Verbrechen]]: mindestens ein Jahr Freiheitsstrafe angedroht, z. B. Raub.\n• Vergehen: geringere Mindeststrafe oder Geldstrafe, z. B. Diebstahl, Hausfriedensbruch.\nDer Versuch eines Verbrechens ist immer strafbar, der Versuch eines Vergehens nur, wenn das Gesetz es sagt.',
      },
      {
        ueberschrift: 'Strafbar durch Nichtstun',
        text: 'Auch wer nichts tut, kann sich strafbar machen – wenn er eine [[Garantenstellung]] hat, also rechtlich verpflichtet ist, einen Schaden zu verhindern (§ 13 StGB). Eine Sicherheitskraft hat durch ihren Vertrag oft so eine Pflicht für das bewachte Objekt.',
      },
    ],
  },
  {
    id: 'st-k2', sachgebiet: 'strafrecht', geprueft: false,
    titel: 'Notwehr und Notstand im Strafrecht',
    abschnitte: [
      {
        ueberschrift: 'Notwehr (§ 32 StGB)',
        text: 'Wer in [[Notwehr]] handelt, handelt nicht rechtswidrig. Voraussetzungen:\n• Angriff: Ein Mensch bedroht ein Rechtsgut, z. B. Körper, Eigentum, Freiheit.\n• gegenwärtig: Der Angriff passiert gerade oder steht direkt bevor.\n• rechtswidrig: Der Angreifer darf das nicht.\n• erforderlich: Man wählt von mehreren gleich wirksamen Mitteln das mildeste.\nWer einem anderen hilft, handelt in Nothilfe – das ist auch Notwehr.',
      },
      {
        ueberschrift: 'Keine Notwehr',
        text: '• Rache nach dem Angriff\n• Angriff ist schon vorbei\n• Verteidigung ist viel stärker als nötig\nWer aus Verwirrung, Furcht oder Schrecken die Grenzen der Notwehr überschreitet, wird nicht bestraft (Notwehrexzess, § 33 StGB).',
      },
      {
        ueberschrift: 'Rechtfertigender Notstand (§ 34 StGB)',
        text: 'Wer eine Gefahr für Leben, Körper, Freiheit, Eigentum oder ein anderes Rechtsgut nur abwenden kann, indem er ein anderes Rechtsgut verletzt, handelt nicht rechtswidrig – wenn das geschützte Interesse das verletzte deutlich überwiegt. Beispiel: Tür eintreten, um einen Menschen aus einem Brand zu retten.',
      },
    ],
  },
  {
    id: 'st-k3', sachgebiet: 'strafrecht', geprueft: false,
    titel: 'Wichtige Straftaten',
    abschnitte: [
      {
        ueberschrift: 'Gegen Personen',
        text: '• [[Körperverletzung]] (§ 223 StGB): jemanden körperlich misshandeln oder an der Gesundheit schädigen. Gefährlich wird sie z. B. mit Waffe oder gemeinsam mit anderen (§ 224 StGB).\n• [[Nötigung]] (§ 240 StGB): jemanden mit Gewalt oder Drohung zu etwas zwingen.\n• Freiheitsberaubung (§ 239 StGB): jemanden einsperren oder festhalten, ohne dass es erlaubt ist.\n• Beleidigung (§ 185 StGB): jemanden in seiner Ehre verletzen.',
      },
      {
        ueberschrift: 'Gegen Eigentum und Vermögen',
        text: '• Diebstahl (§ 242 StGB): eine fremde bewegliche Sache wegnehmen mit [[Zueignungsabsicht]].\n• Raub (§ 249 StGB): Diebstahl mit Gewalt oder Drohung gegen eine Person.\n• Räuberischer Diebstahl (§ 252 StGB): Der Dieb wird auf frischer Tat erwischt und wendet Gewalt an, um die Beute zu behalten.\n• Betrug (§ 263 StGB): jemanden täuschen und dadurch sein Vermögen schädigen.\n• Sachbeschädigung (§ 303 StGB): eine fremde Sache beschädigen oder zerstören.',
      },
      {
        ueberschrift: 'Weitere',
        text: '• [[Hausfriedensbruch]] (§ 123 StGB): ohne Erlaubnis eindringen oder trotz Aufforderung nicht gehen. Wird nur auf Antrag verfolgt.\n• Unterlassene Hilfeleistung (§ 323c StGB): bei Unglücksfällen nicht helfen, obwohl es nötig und zumutbar ist.',
      },
    ],
  },
  {
    id: 'st-k4', sachgebiet: 'strafrecht', geprueft: false,
    titel: 'Festnahme und Strafverfahren',
    abschnitte: [
      {
        ueberschrift: 'Vorläufige Festnahme (§ 127 Abs. 1 StPO)',
        text: 'Jeder darf eine Person [[vorläufig festnehmen|festnahme]], wenn sie [[auf frischer Tat|frische-tat]] betroffen oder verfolgt wird UND\n• sie der Flucht verdächtig ist oder\n• ihre Identität nicht sofort festgestellt werden kann.\nEs muss eine Straftat sein – eine Ordnungswidrigkeit reicht nicht.',
      },
      {
        ueberschrift: 'Wie festhalten?',
        text: 'Erlaubt ist nur, was zum Festhalten nötig ist, z. B. am Arm festhalten. Schläge oder Fesseln, die nicht nötig sind, sind nicht erlaubt. Die Polizei muss sofort informiert werden. Die Festnahme endet, wenn die Polizei übernimmt.',
      },
      {
        ueberschrift: 'Wer verfolgt Straftaten?',
        text: 'Die [[Strafverfolgung]] ist Aufgabe des Staates. Die [[Staatsanwaltschaft]] leitet das Ermittlungsverfahren, die Polizei unterstützt sie. Jeder kann eine Strafanzeige bei der Polizei oder der Staatsanwaltschaft erstatten. Manche Taten werden nur verfolgt, wenn der Verletzte einen Strafantrag stellt – dafür hat er drei Monate Zeit.',
      },
    ],
  },
  {
    id: 'st-k5', sachgebiet: 'strafrecht', geprueft: false,
    titel: 'Grundlagen des Waffenrechts',
    abschnitte: [
      {
        ueberschrift: 'Erwerben, besitzen, führen',
        text: '• Besitzen: Man hat die tatsächliche Gewalt über die Waffe.\n• Führen: Man trägt die Waffe außerhalb der eigenen Wohnung, Geschäftsräume oder des eigenen befriedeten Grundstücks.\n• Für Erwerb und Besitz von Schusswaffen braucht man in der Regel eine Waffenbesitzkarte, zum Führen einen Waffenschein.',
      },
      {
        ueberschrift: 'Kleiner Waffenschein',
        text: 'Für das Führen von Schreckschuss-, Reizstoff- und Signalwaffen braucht man den kleinen Waffenschein.',
      },
      {
        ueberschrift: 'Im Wachdienst',
        text: 'Wachpersonen dürfen Waffen nur mit Zustimmung der Behörde und mit der nötigen Erlaubnis tragen. Auf öffentlichen Veranstaltungen ist das Führen von Waffen grundsätzlich verboten (§ 42 WaffG).',
      },
    ],
  },

  // ── Unfallverhütung ──
  {
    id: 'uv-k1', sachgebiet: 'uvv', geprueft: false,
    titel: 'Unfallverhütung im Wachdienst',
    abschnitte: [
      {
        text: 'Für den Wach- und Sicherungsdienst gilt eine eigene [[Unfallverhütungsvorschrift]]: die DGUV Vorschrift 23 „Wach- und Sicherungsdienste“. Sie wird von der Berufsgenossenschaft erlassen, der gesetzlichen Unfallversicherung.',
      },
      {
        ueberschrift: 'Pflichten des Unternehmers',
        text: '• Gefahren beurteilen und Schutzmaßnahmen festlegen\n• Mitarbeiter vor dem ersten Einsatz und danach mindestens einmal im Jahr unterweisen\n• Persönliche Schutzausrüstung zur Verfügung stellen\n• Dienstanweisungen schriftlich geben',
      },
      {
        ueberschrift: 'Pflichten der Wachperson',
        text: '• Anweisungen zur Sicherheit befolgen\n• Schutzausrüstung benutzen\n• Mängel und Gefahren sofort melden\n• Nicht unter Alkohol oder Drogen arbeiten\n• Sich nicht unnötig in Gefahr bringen',
      },
    ],
  },
  {
    id: 'uv-k2', sachgebiet: 'uvv', geprueft: false,
    titel: 'Richtig handeln bei Gefahr',
    abschnitte: [
      {
        ueberschrift: 'Kontrollgänge',
        text: '• Taschenlampe mitnehmen, auch tagsüber.\n• Auf Stolperstellen, Löcher und Absturzkanten achten.\n• Gefährliche Bereiche nicht allein betreten.\n• Bei Alleinarbeit soll ein Personen-Notsignal-Gerät helfen, damit im Notfall Hilfe kommt.',
      },
      {
        ueberschrift: 'Notruf: 112',
        text: 'Beim Notruf diese Fragen beantworten:\n• Wo ist es passiert?\n• Was ist passiert?\n• Wie viele Verletzte?\n• Welche Verletzungen?\n• Warten auf Rückfragen – nicht einfach auflegen.',
      },
      {
        ueberschrift: 'Bei einem Brand',
        text: 'Reihenfolge: Brand melden – Menschen in Sicherheit bringen – Löschversuch nur ohne eigene Gefahr. Fluchtwege und Notausgänge müssen immer frei sein. Aufzüge im Brandfall nicht benutzen.',
      },
    ],
  },

  // ── Umgang mit Menschen ──
  {
    id: 'um-k1', sachgebiet: 'menschen', geprueft: false,
    titel: 'Gute Kommunikation',
    abschnitte: [
      {
        ueberschrift: 'Mehr als Worte',
        text: 'Wir sprechen nicht nur mit Worten (verbal), sondern auch mit Körper, Gesicht und Stimme (nonverbal). Oft wirkt die Körpersprache stärker als das, was wir sagen.',
      },
      {
        ueberschrift: 'Vier Seiten einer Nachricht',
        text: 'Jede Nachricht hat vier Seiten (Modell von Schulz von Thun):\n• Sachinhalt: Worüber informiere ich?\n• Selbstkundgabe: Was zeige ich von mir?\n• Beziehung: Was halte ich vom anderen?\n• Appell: Was soll der andere tun?\nMissverständnisse entstehen, wenn der Empfänger eine andere Seite hört als gemeint.',
      },
      {
        ueberschrift: 'So redest du professionell',
        text: '• Freundlich grüßen und sich vorstellen\n• Die Person mit „Sie“ ansprechen\n• Ruhig und klar sprechen\n• Aktiv zuhören: nachfragen, zusammenfassen\n• Ich-Botschaften statt Vorwürfe: „Ich bitte Sie, hier nicht zu rauchen“ statt „Sie halten sich nicht an die Regeln“',
      },
    ],
  },
  {
    id: 'um-k2', sachgebiet: 'menschen', geprueft: false,
    titel: 'Konflikte und Deeskalation',
    abschnitte: [
      {
        text: '[[Deeskalation]] heißt: einen Konflikt beruhigen, bevor er gefährlich wird. Für Sicherheitskräfte ist das die wichtigste Fähigkeit.',
      },
      {
        ueberschrift: 'Was hilft',
        text: '• Ruhe bewahren und selbst ruhig sprechen\n• Abstand halten (mehr als eine Armlänge)\n• Dem anderen zuhören und ihn ernst nehmen\n• Nicht provozieren, nicht drohen, nicht auslachen\n• Dem anderen einen Ausweg lassen, damit er sein Gesicht wahren kann\n• Früh Kollegen oder die Polizei holen',
      },
      {
        ueberschrift: 'Eigensicherung',
        text: 'Deine eigene Sicherheit geht vor. Stell dich so hin, dass du einen Fluchtweg hast. Behalte die Hände der Person im Blick. Gehe nicht allein in unklare Situationen.',
      },
    ],
  },
  {
    id: 'um-k3', sachgebiet: 'menschen', geprueft: false,
    titel: 'Wahrnehmung, Vorurteile und Stress',
    abschnitte: [
      {
        ueberschrift: 'Wahrnehmung',
        text: 'Wir nehmen nicht alles wahr, sondern wählen aus. Der erste Eindruck kann täuschen. Ein bekannter Fehler: Eine auffällige Eigenschaft (z. B. teure Kleidung) bestimmt das ganze Bild von einer Person (Halo-Effekt).',
      },
      {
        ueberschrift: 'Vorurteile',
        text: 'Ein Vorurteil ist eine feste Meinung über Menschen, ohne sie zu kennen. Sicherheitskräfte müssen alle Menschen gleich behandeln – egal welche Herkunft, Religion, Hautfarbe, Geschlecht oder Behinderung.',
      },
      {
        ueberschrift: 'Stress',
        text: 'Bei Stress steigen Puls und Anspannung, man denkt schlechter nach. Gegen Stress helfen:\n• ruhig und tief atmen\n• gute Vorbereitung und klare Abläufe\n• genug Schlaf, Pausen und Bewegung\n• nach schweren Einsätzen darüber reden',
      },
    ],
  },
  {
    id: 'um-k4', sachgebiet: 'menschen', geprueft: false,
    titel: 'Besondere Situationen',
    abschnitte: [
      {
        ueberschrift: 'Menschenmengen',
        text: 'Bei großen Menschenmengen kann Panik entstehen. Wichtig: ruhig bleiben, klare und kurze Anweisungen geben, Fluchtwege freihalten und rechtzeitig informieren.',
      },
      {
        ueberschrift: 'Überfall',
        text: 'Bei einem bewaffneten Überfall geht das Leben vor. Keine Gegenwehr, keine Heldentaten. Den Täter möglichst genau beobachten (Größe, Kleidung, Sprache, Fluchtrichtung) und danach sofort die Polizei rufen.',
      },
      {
        ueberschrift: 'Betrunkene und verwirrte Menschen',
        text: 'Diese Menschen reagieren oft unberechenbar. Sprich langsam und einfach, halte Abstand und hole früh Unterstützung. Hilflose Personen nicht allein lassen – wenn nötig Rettungsdienst rufen.',
      },
    ],
  },

  // ── Sicherheitstechnik ──
  {
    id: 'te-k1', sachgebiet: 'technik', geprueft: false,
    titel: 'Mechanische und elektronische Sicherung',
    abschnitte: [
      {
        ueberschrift: 'Erst mechanisch, dann elektronisch',
        text: 'Mechanische Sicherungen (Zäune, Gitter, Schlösser, einbruchhemmende Türen und Fenster) halten Täter auf. Elektronische Sicherungen melden einen Angriff. Am besten wirken beide zusammen.',
      },
      {
        ueberschrift: 'Gefahrenmeldeanlagen',
        text: 'Eine Gefahrenmeldeanlage erkennt Gefahren und löst Alarm aus. Beispiele:\n• Einbruchmeldeanlage (EMA)\n• Überfallmeldeanlage (ÜMA), z. B. mit stillem Alarm\n• Brandmeldeanlage (BMA)',
      },
      {
        ueberschrift: 'Melder',
        text: '• Magnetkontakt: meldet das Öffnen von Türen und Fenstern\n• Glasbruchmelder: meldet eine zerbrochene Scheibe\n• Bewegungsmelder (Passiv-Infrarot): erkennt Wärmebewegung im Raum\n• Lichtschranke: meldet, wenn jemand einen Strahl unterbricht',
      },
      {
        ueberschrift: 'Falschalarm',
        text: 'Viele Alarme sind Falschalarme, z. B. durch Bedienfehler oder Tiere. Trotzdem muss jeder Alarm ernst genommen und nach Anweisung überprüft werden.',
      },
    ],
  },
  {
    id: 'te-k2', sachgebiet: 'technik', geprueft: false,
    titel: 'Zutritt, Video und Leitstelle',
    abschnitte: [
      {
        ueberschrift: 'Zutrittskontrolle',
        text: 'Die [[Zutrittskontrolle]] prüft, ob jemand einen Bereich betreten darf. Man unterscheidet:\n• Wissen: PIN oder Code\n• Besitz: Karte, Schlüssel, Transponder\n• Biometrie: Fingerabdruck, Gesicht\nAm sichersten ist eine Kombination, z. B. Karte und PIN.',
      },
      {
        ueberschrift: 'Videoüberwachung',
        text: 'Kameras helfen beim Beobachten und Aufklären. Dabei gelten die Regeln des Datenschutzes: Zweck, Hinweisschild, Löschung.',
      },
      {
        ueberschrift: 'Notruf- und Serviceleitstelle',
        text: 'Viele Alarmanlagen melden an eine Leitstelle (NSL). Dort wird der Alarm bewertet, und die Leitstelle schickt einen Interventionsdienst oder alarmiert Polizei oder Feuerwehr.',
      },
      {
        ueberschrift: 'Wächterkontrolle',
        text: 'Mit einem Wächterkontrollsystem wird nachgewiesen, dass die Wachperson bei einem Kontrollgang bestimmte Punkte zu bestimmten Zeiten erreicht hat.',
      },
    ],
  },
];

export const kapitelFuer = (id: SachgebietId | string) => KAPITEL.filter((k) => k.sachgebiet === id);
export const kapitelById = (id: string) => KAPITEL.find((k) => k.id === id);
