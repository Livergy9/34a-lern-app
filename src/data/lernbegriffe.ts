import { GlossarEintrag } from './types';

// Lernwörter für die Karteikarten. Sie sind (wie das Glossar) in Fragen antippbar, wenn sie dort markiert sind.
// ENTWURF: Übersetzungen und Erklärungen müssen vor dem Release geprüft werden (geprueft: true setzen).
export const LERNBEGRIFFE: GlossarEintrag[] = [
  {
    id: 'sachkundepruefung', begriff: 'Sachkundeprüfung', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'competence examination', ro: 'examen de competență' },
    erklaerung: {
      de: 'Prüfung bei der IHK, die für bestimmte Bewachungstätigkeiten Pflicht ist.',
      en: 'An exam at the Chamber of Commerce (IHK) that is mandatory for certain security tasks.',
      ro: 'Examen la Camera de Comerț (IHK), obligatoriu pentru anumite activități de pază.',
    },
    geprueft: false,
  },
  {
    id: 'dienstausweis', begriff: 'Dienstausweis', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'service ID card', ro: 'legitimație de serviciu' },
    erklaerung: {
      de: 'Ausweis, der zeigt, dass man für ein Bewachungsunternehmen arbeitet.',
      en: 'An ID card that shows you work for a security company.',
      ro: 'Act care arată că lucrezi pentru o firmă de pază.',
    },
    geprueft: false,
  },
  {
    id: 'diebstahl', begriff: 'Diebstahl', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'theft', ro: 'furt' },
    erklaerung: {
      de: 'Jemand nimmt eine fremde bewegliche Sache weg, um sie zu behalten.',
      en: 'Someone takes another person’s movable thing in order to keep it.',
      ro: 'Cineva ia un bun mobil al altcuiva cu intenția de a-l păstra.',
    },
    geprueft: false,
  },
  {
    id: 'aktives-zuhoeren', begriff: 'aktives Zuhören', sachgebiet: 'menschen',
    uebersetzung: { en: 'active listening', ro: 'ascultare activă' },
    erklaerung: {
      de: 'Aufmerksam zuhören, nachfragen und das Gehörte mit eigenen Worten wiederholen.',
      en: 'Listening attentively, asking questions and repeating what you heard in your own words.',
      ro: 'Asculți atent, pui întrebări și repeți cu propriile cuvinte ce ai auzit.',
    },
    geprueft: false,
  },
  {
    id: 'nonverbal', begriff: 'nonverbale Kommunikation', sachgebiet: 'menschen',
    uebersetzung: { en: 'non-verbal communication', ro: 'comunicare nonverbală' },
    erklaerung: {
      de: 'Verständigung ohne Worte, z. B. durch Mimik, Gestik und Körperhaltung.',
      en: 'Communication without words, e.g. through facial expressions, gestures and posture.',
      ro: 'Comunicare fără cuvinte, de ex. prin mimică, gesturi și postură.',
    },
    geprueft: false,
  },
  {
    id: 'bewegungsmelder', begriff: 'Bewegungsmelder', sachgebiet: 'technik',
    uebersetzung: { en: 'motion detector', ro: 'detector de mișcare' },
    erklaerung: {
      de: 'Sensor, der Bewegungen im Raum erkennt und Alarm oder Licht auslöst.',
      en: 'A sensor that detects movement in a room and triggers an alarm or light.',
      ro: 'Senzor care detectează mișcarea într-o încăpere și declanșează alarma sau lumina.',
    },
    geprueft: false,
  },
  {
    id: 'unterrichtung', begriff: 'Unterrichtung', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'instruction course (IHK)', ro: 'curs de instruire (IHK)' },
    erklaerung: {
      de: 'Kurs bei der IHK mit Abschluss-Bescheinigung. Für Wachpersonen 40 Unterrichtsstunden. Reicht für einfache Bewachungsaufgaben, nicht für alle.',
      en: 'A course at the IHK with a certificate. 40 lessons for security staff. Enough for simple guarding tasks, not for all.',
      ro: 'Curs la IHK, cu adeverință. Pentru agenți de pază 40 de ore. Este suficient pentru sarcini simple, nu pentru toate.',
    },
    geprueft: false,
  },
  {
    id: 'bewacherregister', begriff: 'Bewacherregister', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'register of security companies and staff', ro: 'registrul firmelor și agenților de pază' },
    erklaerung: {
      de: 'Bundesweites Register, in dem Bewachungsunternehmen und Wachpersonen erfasst sind. Über das Register prüfen die Behörden zum Beispiel die Zuverlässigkeit.',
      en: 'A nationwide register of security companies and security staff. Authorities use it e.g. to check reliability.',
      ro: 'Registru la nivel național cu firmele și agenții de pază. Autoritățile verifică prin el de ex. dacă persoana este de încredere.',
    },
    geprueft: false,
  },
  {
    id: 'einwilligung', begriff: 'Einwilligung', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'consent', ro: 'consimțământ' },
    erklaerung: {
      de: 'Die Person sagt freiwillig und vorher Ja dazu, dass ihre Daten genutzt werden.',
      en: 'The person freely agrees in advance that their data may be used.',
      ro: 'Persoana este de acord, liber și dinainte, ca datele ei să fie folosite.',
    },
    geprueft: false,
  },
  {
    id: 'auskunftsrecht', begriff: 'Auskunftsrecht', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'right of access', ro: 'dreptul de acces la date' },
    erklaerung: {
      de: 'Jeder darf fragen, welche Daten über ihn gespeichert sind, und bekommt darüber Auskunft.',
      en: 'Everyone may ask which data is stored about them and must be told.',
      ro: 'Oricine poate întreba ce date sunt stocate despre el și trebuie să primească răspuns.',
    },
    geprueft: false,
  },
  {
    id: 'videoueberwachung', begriff: 'Videoüberwachung', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'video surveillance', ro: 'supraveghere video' },
    erklaerung: {
      de: 'Beobachtung mit Kameras. Sie braucht einen berechtigten Zweck und muss durch ein Schild erkennbar sein.',
      en: 'Monitoring with cameras. It needs a legitimate purpose and must be made visible with a sign.',
      ro: 'Supraveghere cu camere. Are nevoie de un scop legitim și trebuie semnalizată printr-un panou.',
    },
    geprueft: false,
  },
  {
    id: 'schadensersatz', begriff: 'Schadensersatz', sachgebiet: 'bgb',
    uebersetzung: { en: 'compensation for damage', ro: 'despăgubire' },
    erklaerung: {
      de: 'Wer einem anderen schuldhaft einen Schaden zufügt, muss ihn wiedergutmachen – meistens mit Geld.',
      en: 'Whoever culpably causes damage to someone must make up for it – usually with money.',
      ro: 'Cine produce din vina sa o pagubă altcuiva trebuie să o repare – de obicei cu bani.',
    },
    geprueft: false,
  },
  {
    id: 'fundsache', begriff: 'Fundsache', sachgebiet: 'bgb',
    uebersetzung: { en: 'found property', ro: 'obiect găsit' },
    erklaerung: {
      de: 'Eine verlorene Sache, die jemand findet. Der Finder muss sie dem Verlierer, dem Eigentümer oder dem Fundbüro melden.',
      en: 'A lost item that someone finds. The finder must report it to the loser, the owner or the lost-property office.',
      ro: 'Un lucru pierdut pe care îl găsește cineva. Cel care îl găsește trebuie să anunțe persoana care l-a pierdut, proprietarul sau biroul de obiecte găsite.',
    },
    geprueft: false,
  },
  {
    id: 'raub', begriff: 'Raub', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'robbery', ro: 'tâlhărie' },
    erklaerung: {
      de: 'Jemand nimmt eine fremde Sache weg und benutzt dabei Gewalt gegen eine Person oder droht mit Gefahr für Leib oder Leben.',
      en: 'Someone takes another person’s thing using violence against a person or threatening danger to life or limb.',
      ro: 'Cineva ia un bun al altcuiva folosind violență împotriva unei persoane sau amenințând cu pericol pentru viață sau sănătate.',
    },
    geprueft: false,
  },
  {
    id: 'sachbeschaedigung', begriff: 'Sachbeschädigung', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'criminal damage', ro: 'distrugere' },
    erklaerung: {
      de: 'Jemand beschädigt oder zerstört absichtlich eine fremde Sache.',
      en: 'Someone intentionally damages or destroys another person’s property.',
      ro: 'Cineva deteriorează sau distruge intenționat un bun al altcuiva.',
    },
    geprueft: false,
  },
  {
    id: 'psa', begriff: 'persönliche Schutzausrüstung', sachgebiet: 'uvv',
    uebersetzung: { en: 'personal protective equipment (PPE)', ro: 'echipament individual de protecție' },
    erklaerung: {
      de: 'Ausrüstung, die vor Verletzungen schützt, z. B. Sicherheitsschuhe, Warnweste, Handschuhe. Der Arbeitgeber stellt sie, der Beschäftigte muss sie benutzen.',
      en: 'Equipment that protects against injury, e.g. safety shoes, high-visibility vest, gloves. The employer provides it, the employee must use it.',
      ro: 'Echipament care protejează de răniri, de ex. bocanci de protecție, vestă reflectorizantă, mănuși. Angajatorul îl asigură, angajatul trebuie să îl folosească.',
    },
    geprueft: false,
  },
  {
    id: 'berufsgenossenschaft', begriff: 'Berufsgenossenschaft', sachgebiet: 'uvv',
    uebersetzung: { en: 'statutory accident insurance institution', ro: 'asigurarea legală de accidente de muncă' },
    erklaerung: {
      de: 'Gesetzliche Unfallversicherung der Unternehmen. Sie erlässt Unfallverhütungsvorschriften und zahlt nach Arbeitsunfällen.',
      en: 'The statutory accident insurance for companies. It issues accident prevention rules and pays after work accidents.',
      ro: 'Asigurarea legală de accidente pentru firme. Emite reguli de prevenire a accidentelor și plătește după accidentele de muncă.',
    },
    geprueft: false,
  },
  {
    id: 'fluchtweg', begriff: 'Fluchtweg', sachgebiet: 'uvv',
    uebersetzung: { en: 'escape route', ro: 'cale de evacuare' },
    erklaerung: {
      de: 'Weg, über den man ein Gebäude im Notfall schnell verlassen kann. Er muss immer frei bleiben.',
      en: 'A route to leave a building quickly in an emergency. It must always be kept clear.',
      ro: 'Drum pe care poți părăsi repede o clădire în caz de urgență. Trebuie să rămână mereu liber.',
    },
    geprueft: false,
  },
  {
    id: 'erste-hilfe', begriff: 'Erste Hilfe', sachgebiet: 'uvv',
    uebersetzung: { en: 'first aid', ro: 'prim ajutor' },
    erklaerung: {
      de: 'Sofortige Hilfe für Verletzte oder Kranke, bis der Rettungsdienst da ist.',
      en: 'Immediate help for injured or sick people until the emergency services arrive.',
      ro: 'Ajutor imediat pentru răniți sau bolnavi, până sosește ambulanța.',
    },
    geprueft: false,
  },
  {
    id: 'gefahrenmeldeanlage', begriff: 'Gefahrenmeldeanlage', sachgebiet: 'technik',
    uebersetzung: { en: 'alarm system', ro: 'sistem de alarmă' },
    erklaerung: {
      de: 'Technische Anlage, die Gefahren wie Einbruch oder Überfall erkennt und Alarm auslöst.',
      en: 'A technical system that detects dangers such as burglary or robbery and raises the alarm.',
      ro: 'Sistem tehnic care detectează pericole precum spargerea sau atacul și declanșează alarma.',
    },
    geprueft: false,
  },
  {
    id: 'brandmeldeanlage', begriff: 'Brandmeldeanlage', sachgebiet: 'technik',
    uebersetzung: { en: 'fire alarm system', ro: 'sistem de detecție a incendiilor' },
    erklaerung: {
      de: 'Anlage mit Rauch- oder Wärmemeldern. Sie erkennt einen Brand früh und gibt Alarm, oft direkt an die Feuerwehr.',
      en: 'A system with smoke or heat detectors. It detects a fire early and raises the alarm, often directly to the fire brigade.',
      ro: 'Sistem cu detectoare de fum sau căldură. Detectează devreme un incendiu și dă alarma, adesea direct la pompieri.',
    },
    geprueft: false,
  },
  {
    id: 'konflikt', begriff: 'Konflikt', sachgebiet: 'menschen',
    uebersetzung: { en: 'conflict', ro: 'conflict' },
    erklaerung: {
      de: 'Ein Streit oder Gegensatz zwischen Menschen, die unterschiedliche Ziele oder Meinungen haben.',
      en: 'A dispute or clash between people who have different goals or opinions.',
      ro: 'O ceartă sau o opoziție între oameni care au scopuri sau păreri diferite.',
    },
    geprueft: false,
  },
  {
    id: 'vorurteil', begriff: 'Vorurteil', sachgebiet: 'menschen',
    uebersetzung: { en: 'prejudice', ro: 'prejudecată' },
    erklaerung: {
      de: 'Eine feste Meinung über Menschen, ohne sie zu kennen – oft wegen Herkunft, Aussehen oder Religion.',
      en: 'A fixed opinion about people without knowing them – often because of origin, appearance or religion.',
      ro: 'O părere fixă despre oameni, fără a-i cunoaște – adesea din cauza originii, aspectului sau religiei.',
    },
    geprueft: false,
  },
  {
    id: 'ich-botschaft', begriff: 'Ich-Botschaft', sachgebiet: 'menschen',
    uebersetzung: { en: '“I” message', ro: 'mesaj la persoana I' },
    erklaerung: {
      de: 'Man spricht über die eigene Sicht („Ich bitte Sie …“) statt den anderen anzugreifen („Sie sind …“). Das beruhigt Gespräche.',
      en: 'You talk about your own view (“I would ask you …”) instead of attacking the other person (“You are …”). This calms conversations.',
      ro: 'Vorbești despre perspectiva ta („Vă rog …”) în loc să-l ataci pe celălalt („Sunteți …”). Asta calmează discuția.',
    },
    geprueft: false,
  },
];
