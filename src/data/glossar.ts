import { GlossarEintrag } from './types';

// Glossar = Wörter, die man ohne gutes Deutsch nicht versteht – vor allem Rechtsbegriffe.
// Sie sind in Fragen und Lernkapiteln antippbar. Einfache Lernwörter stehen in lernbegriffe.ts (nur Karteikarten).
// ENTWURF: Übersetzungen und Erklärungen müssen vor dem Release geprüft werden (geprueft: true setzen).
export const GLOSSAR: GlossarEintrag[] = [
  {
    id: 'bewachungsgewerbe', begriff: 'Bewachungsgewerbe', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'security services business', ro: 'activitate de pază' },
    erklaerung: {
      de: 'Ein Gewerbe, das Leben oder Eigentum fremder Personen gegen Bezahlung bewacht.',
      en: 'A business that protects the life or property of other people for payment.',
      ro: 'O afacere care protejează, contra plată, viața sau bunurile altor persoane.',
    },
    geprueft: false,
  },
  {
    id: 'erlaubnis', begriff: 'Erlaubnis', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'licence / permit', ro: 'autorizație' },
    erklaerung: {
      de: 'Eine behördliche Genehmigung. Ohne sie darf man das Gewerbe nicht betreiben.',
      en: 'An official permission. Without it, you may not run the business.',
      ro: 'O aprobare oficială. Fără ea nu ai voie să desfășori activitatea.',
    },
    geprueft: false,
  },
  {
    id: 'behoerde', begriff: 'zuständige Behörde', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'competent authority', ro: 'autoritatea competentă' },
    erklaerung: {
      de: 'Das Amt, das für eine bestimmte Sache verantwortlich ist, z. B. das Gewerbe- oder Ordnungsamt.',
      en: 'The public office responsible for a matter, e.g. the trade or public order office.',
      ro: 'Instituția publică responsabilă de o anumită problemă, de ex. biroul de comerț sau de ordine publică.',
    },
    geprueft: false,
  },
  {
    id: 'gewaltmonopol', begriff: 'Gewaltmonopol', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'state monopoly on the use of force', ro: 'monopolul statului asupra forței' },
    erklaerung: {
      de: 'Nur der Staat (z. B. Polizei) darf Zwang anwenden. Private haben nur die Rechte, die jeder Bürger hat.',
      en: 'Only the state (e.g. the police) may use force. Private persons only have the rights every citizen has.',
      ro: 'Doar statul (de ex. poliția) are voie să folosească forța. Persoanele private au doar drepturile pe care le are orice cetățean.',
    },
    geprueft: false,
  },
  {
    id: 'personenbezogene-daten', begriff: 'personenbezogene Daten', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'personal data', ro: 'date cu caracter personal' },
    erklaerung: {
      de: 'Alle Informationen, mit denen man eine Person erkennen kann, z. B. Name, Adresse, Foto.',
      en: 'Any information that can identify a person, e.g. name, address, photo.',
      ro: 'Orice informație prin care poate fi identificată o persoană, de ex. nume, adresă, fotografie.',
    },
    geprueft: false,
  },
  {
    id: 'zweckbindung', begriff: 'Zweckbindung', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'purpose limitation', ro: 'limitarea scopului' },
    erklaerung: {
      de: 'Daten dürfen nur für den Zweck genutzt werden, für den sie erhoben wurden.',
      en: 'Data may only be used for the purpose it was collected for.',
      ro: 'Datele pot fi folosite doar în scopul pentru care au fost colectate.',
    },
    geprueft: false,
  },
  {
    id: 'datenminimierung', begriff: 'Datenminimierung', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'data minimisation', ro: 'minimizarea datelor' },
    erklaerung: {
      de: 'Man sammelt nur so viele Daten, wie wirklich nötig sind.',
      en: 'You only collect as much data as is really necessary.',
      ro: 'Se colectează doar atâtea date câte sunt cu adevărat necesare.',
    },
    geprueft: false,
  },
  {
    id: 'besitz', begriff: 'Besitz', sachgebiet: 'bgb',
    uebersetzung: { en: 'possession', ro: 'posesie' },
    erklaerung: {
      de: 'Wer eine Sache tatsächlich hat und darüber verfügt, ist Besitzer – auch wenn sie ihm nicht gehört.',
      en: 'Whoever actually holds and controls a thing is the possessor – even if it does not belong to them.',
      ro: 'Cine deține efectiv un lucru și dispune de el este posesor – chiar dacă lucrul nu îi aparține.',
    },
    geprueft: false,
  },
  {
    id: 'eigentum', begriff: 'Eigentum', sachgebiet: 'bgb',
    uebersetzung: { en: 'ownership', ro: 'proprietate' },
    erklaerung: {
      de: 'Wem eine Sache rechtlich gehört, ist Eigentümer – auch wenn er sie gerade nicht hat.',
      en: 'Whoever legally owns a thing is the owner – even if they do not have it right now.',
      ro: 'Cel căruia un lucru îi aparține legal este proprietar – chiar dacă nu îl are la el în acel moment.',
    },
    geprueft: false,
  },
  {
    id: 'hausrecht', begriff: 'Hausrecht', sachgebiet: 'bgb',
    uebersetzung: { en: 'right to control the premises', ro: 'dreptul de a decide accesul în incintă' },
    erklaerung: {
      de: 'Das Recht zu bestimmen, wer ein Gebäude oder Gelände betreten und dort bleiben darf.',
      en: 'The right to decide who may enter and stay in a building or on a property.',
      ro: 'Dreptul de a decide cine poate intra și rămâne într-o clădire sau pe un teren.',
    },
    geprueft: false,
  },
  {
    id: 'selbsthilfe', begriff: 'Selbsthilfe', sachgebiet: 'bgb',
    uebersetzung: { en: 'self-help (enforcing a claim yourself)', ro: 'autoapărarea unui drept (justiție proprie)' },
    erklaerung: {
      de: 'Man setzt einen eigenen Anspruch selbst durch, weil die Polizei nicht rechtzeitig helfen kann.',
      en: 'You enforce your own legal claim yourself because the police cannot help in time.',
      ro: 'Îți aperi singur un drept, pentru că poliția nu poate interveni la timp.',
    },
    geprueft: false,
  },
  {
    id: 'notstand', begriff: 'Notstand', sachgebiet: 'bgb',
    uebersetzung: { en: 'necessity (state of emergency)', ro: 'stare de necesitate' },
    erklaerung: {
      de: 'Man beschädigt eine Sache oder greift in Rechte ein, um eine größere Gefahr abzuwenden.',
      en: 'You damage a thing or interfere with rights to prevent a greater danger.',
      ro: 'Deteriorezi un lucru sau încalci un drept pentru a evita un pericol mai mare.',
    },
    geprueft: false,
  },
  {
    id: 'notwehr', begriff: 'Notwehr', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'self-defence', ro: 'legitimă apărare' },
    erklaerung: {
      de: 'Verteidigung gegen einen gegenwärtigen, rechtswidrigen Angriff auf sich oder andere.',
      en: 'Defending yourself or others against a present, unlawful attack.',
      ro: 'Apărarea ta sau a altora împotriva unui atac actual și ilegal.',
    },
    geprueft: false,
  },
  {
    id: 'festnahme', begriff: 'vorläufige Festnahme', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'provisional arrest (citizen’s arrest)', ro: 'reținere provizorie' },
    erklaerung: {
      de: 'Jeder darf einen Täter kurz festhalten, bis die Polizei kommt – nur unter bestimmten Voraussetzungen.',
      en: 'Anyone may briefly hold an offender until the police arrive – only under certain conditions.',
      ro: 'Oricine poate reține pe scurt un făptaș până vine poliția – doar în anumite condiții.',
    },
    geprueft: false,
  },
  {
    id: 'frische-tat', begriff: 'auf frischer Tat', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'caught in the act', ro: 'în flagrant' },
    erklaerung: {
      de: 'Der Täter wird während der Tat oder direkt danach bemerkt.',
      en: 'The offender is noticed during the act or immediately afterwards.',
      ro: 'Făptașul este observat în timpul faptei sau imediat după.',
    },
    geprueft: false,
  },
  {
    id: 'zueignungsabsicht', begriff: 'Zueignungsabsicht', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'intent to appropriate', ro: 'intenția de însușire' },
    erklaerung: {
      de: 'Der Täter will die Sache wie ein Eigentümer behalten oder nutzen.',
      en: 'The offender wants to keep or use the thing as if they were the owner.',
      ro: 'Făptașul vrea să păstreze sau să folosească bunul ca și cum ar fi proprietarul.',
    },
    geprueft: false,
  },
  {
    id: 'verbrechen', begriff: 'Verbrechen', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'felony (serious crime)', ro: 'infracțiune gravă' },
    erklaerung: {
      de: 'Eine Straftat mit mindestens einem Jahr Freiheitsstrafe. Leichtere Straftaten heißen Vergehen.',
      en: 'A crime punishable by at least one year in prison. Less serious crimes are called misdemeanours (Vergehen).',
      ro: 'O infracțiune pedepsită cu cel puțin un an de închisoare. Faptele mai ușoare se numesc „Vergehen”.',
    },
    geprueft: false,
  },
  {
    id: 'strafverfolgung', begriff: 'Strafverfolgung', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'criminal prosecution', ro: 'urmărire penală' },
    erklaerung: {
      de: 'Der Staat ermittelt Straftaten und bringt Täter vor Gericht.',
      en: 'The state investigates crimes and brings offenders to court.',
      ro: 'Statul cercetează infracțiunile și îi aduce pe făptași în fața instanței.',
    },
    geprueft: false,
  },
  {
    id: 'staatsanwaltschaft', begriff: 'Staatsanwaltschaft', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'public prosecutor’s office', ro: 'parchet' },
    erklaerung: {
      de: 'Behörde, die Ermittlungen leitet und Anklage erhebt. Die Polizei hilft ihr dabei.',
      en: 'The authority that leads investigations and brings charges. The police support it.',
      ro: 'Instituția care conduce cercetările și formulează acuzarea. Poliția o ajută.',
    },
    geprueft: false,
  },
  {
    id: 'unfallverhuetung', begriff: 'Unfallverhütungsvorschrift', sachgebiet: 'uvv',
    uebersetzung: { en: 'accident prevention regulation', ro: 'normă de prevenire a accidentelor' },
    erklaerung: {
      de: 'Regeln der Berufsgenossenschaft, damit bei der Arbeit niemand verletzt wird.',
      en: 'Rules of the statutory accident insurance so that no one gets hurt at work.',
      ro: 'Reguli ale asigurării de accidente de muncă, pentru ca nimeni să nu fie rănit la lucru.',
    },
    geprueft: false,
  },
  {
    id: 'deeskalation', begriff: 'Deeskalation', sachgebiet: 'menschen',
    uebersetzung: { en: 'de-escalation', ro: 'dezescaladare' },
    erklaerung: {
      de: 'Einen Konflikt beruhigen, damit er nicht schlimmer wird.',
      en: 'Calming a conflict down so that it does not get worse.',
      ro: 'Calmarea unui conflict, ca să nu se agraveze.',
    },
    geprueft: false,
  },
  {
    id: 'zutrittskontrolle', begriff: 'Zutrittskontrolle', sachgebiet: 'technik',
    uebersetzung: { en: 'access control', ro: 'controlul accesului' },
    erklaerung: {
      de: 'Prüfen, wer einen Bereich betreten darf, z. B. mit Ausweis, Karte oder Code.',
      en: 'Checking who may enter an area, e.g. with an ID, card or code.',
      ro: 'Verificarea cine are voie să intre într-o zonă, de ex. cu legitimație, card sau cod.',
    },
    geprueft: false,
  },
  {
    id: 'jedermannrecht', begriff: 'Jedermannrecht', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'rights of every citizen', ro: 'drepturile oricărui cetățean' },
    erklaerung: {
      de: 'Rechte, die jeder Mensch hat – nicht nur die Polizei. Dazu gehören z. B. Notwehr, Notstand und die vorläufige Festnahme. Sicherheitskräfte haben nur diese Rechte.',
      en: 'Rights that every person has – not only the police. They include self-defence, necessity and provisional arrest. Security staff only have these rights.',
      ro: 'Drepturi pe care le are orice om – nu doar poliția. De ex. legitima apărare, starea de necesitate și reținerea provizorie. Agenții de pază au doar aceste drepturi.',
    },
    geprueft: false,
  },
  {
    id: 'verhaeltnismaessigkeit', begriff: 'Verhältnismäßigkeit', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'proportionality', ro: 'proporționalitate' },
    erklaerung: {
      de: 'Eine Maßnahme muss geeignet, nötig und angemessen sein. Man wählt immer das mildeste Mittel, das wirkt.',
      en: 'A measure must be suitable, necessary and appropriate. You always choose the mildest means that works.',
      ro: 'O măsură trebuie să fie potrivită, necesară și adecvată. Se alege mereu mijlocul cel mai blând care funcționează.',
    },
    geprueft: false,
  },
  {
    id: 'ordnungswidrigkeit', begriff: 'Ordnungswidrigkeit', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'administrative offence', ro: 'contravenție' },
    erklaerung: {
      de: 'Ein leichter Verstoß gegen eine Vorschrift. Die Strafe ist ein Bußgeld, keine Freiheitsstrafe.',
      en: 'A minor breach of a rule. The penalty is a fine, not prison.',
      ro: 'O încălcare ușoară a unei reguli. Sancțiunea este o amendă, nu închisoare.',
    },
    geprueft: false,
  },
  {
    id: 'verwaltungsakt', begriff: 'Verwaltungsakt', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'administrative act (official decision)', ro: 'act administrativ' },
    erklaerung: {
      de: 'Eine Entscheidung einer Behörde in einem einzelnen Fall, z. B. eine Erlaubnis oder ein Verbot.',
      en: 'A decision by an authority in a single case, e.g. a permit or a ban.',
      ro: 'O decizie a unei autorități într-un caz concret, de ex. o autorizație sau o interdicție.',
    },
    geprueft: false,
  },
  {
    id: 'vorsatz', begriff: 'Vorsatz', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'intent', ro: 'intenție' },
    erklaerung: {
      de: 'Der Täter weiß, was er tut, und will es – oder er nimmt die Folgen bewusst in Kauf.',
      en: 'The offender knows what they are doing and wants it – or knowingly accepts the consequences.',
      ro: 'Făptașul știe ce face și vrea asta – sau acceptă conștient urmările.',
    },
    geprueft: false,
  },
  {
    id: 'fahrlaessigkeit', begriff: 'Fahrlässigkeit', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'negligence', ro: 'culpă (neglijență)' },
    erklaerung: {
      de: 'Der Täter will den Schaden nicht, passt aber nicht so gut auf, wie er müsste.',
      en: 'The offender does not want the damage but is not as careful as they should be.',
      ro: 'Făptașul nu vrea paguba, dar nu este atât de atent cât ar trebui.',
    },
    geprueft: false,
  },
  {
    id: 'hausfriedensbruch', begriff: 'Hausfriedensbruch', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'trespass', ro: 'violare de domiciliu' },
    erklaerung: {
      de: 'Jemand dringt ohne Erlaubnis in eine Wohnung, ein Geschäft oder ein eingezäuntes Grundstück ein – oder geht nicht, obwohl er gehen soll.',
      en: 'Someone enters a home, shop or fenced property without permission – or does not leave when told to.',
      ro: 'Cineva intră fără permisiune într-o locuință, un magazin sau un teren împrejmuit – sau nu pleacă deși i se cere.',
    },
    geprueft: false,
  },
  {
    id: 'noetigung', begriff: 'Nötigung', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'coercion', ro: 'constrângere' },
    erklaerung: {
      de: 'Jemand zwingt einen anderen mit Gewalt oder mit einer Drohung, etwas zu tun oder nicht zu tun.',
      en: 'Someone forces another person, by violence or threat, to do or not do something.',
      ro: 'Cineva obligă pe altcineva, prin forță sau amenințare, să facă sau să nu facă ceva.',
    },
    geprueft: false,
  },
  {
    id: 'koerperverletzung', begriff: 'Körperverletzung', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'bodily harm', ro: 'vătămare corporală' },
    erklaerung: {
      de: 'Jemand verletzt einen anderen Menschen körperlich oder schadet seiner Gesundheit.',
      en: 'Someone physically hurts another person or damages their health.',
      ro: 'Cineva rănește fizic o altă persoană sau îi afectează sănătatea.',
    },
    geprueft: false,
  },
  {
    id: 'garantenstellung', begriff: 'Garantenstellung', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'duty to prevent harm (guarantor position)', ro: 'poziție de garant' },
    erklaerung: {
      de: 'Eine Person hat eine besondere Pflicht, einen Schaden zu verhindern, z. B. durch ihren Arbeitsvertrag. Tut sie dann nichts, kann sie sich strafbar machen.',
      en: 'A person has a special duty to prevent harm, e.g. through their employment contract. If they do nothing, they can be criminally liable.',
      ro: 'O persoană are o obligație specială de a preveni un rău, de ex. prin contractul de muncă. Dacă nu face nimic, poate răspunde penal.',
    },
    geprueft: false,
  },
];

const byId = new Map(GLOSSAR.map((g) => [g.id, g]));
const byBegriff = new Map(GLOSSAR.map((g) => [g.begriff.toLowerCase(), g]));

export const findeGlossar = (key: string): GlossarEintrag | undefined =>
  byId.get(key) ?? byBegriff.get(key.toLowerCase());
