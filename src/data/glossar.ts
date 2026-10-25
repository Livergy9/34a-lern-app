import { GlossarEintrag } from './types';
import { LERNBEGRIFFE } from './lernbegriffe';

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
      de: 'Eine Genehmigung von einer Behörde. Ohne sie darf man z. B. kein Bewachungsgewerbe betreiben oder keine Schusswaffe besitzen.',
      en: 'A permission from an authority. Without it you may not, for example, run a security business or own a firearm.',
      ro: 'O aprobare de la o autoritate. Fără ea nu ai voie, de exemplu, să desfășori o activitate de pază sau să deții o armă de foc.',
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
  // Ergänzt am 25.10.2026: weitere wichtige Fachbegriffe aus den Fragen
  {
    id: 'speicherbegrenzung', begriff: 'Speicherbegrenzung', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'storage limitation', ro: 'limitarea stocării' },
    erklaerung: {
      de: 'Daten dürfen nur so lange gespeichert werden, wie sie für den Zweck gebraucht werden. Danach müssen sie gelöscht werden.',
      en: 'Data may only be stored for as long as it is needed for the purpose. After that it must be deleted.',
      ro: 'Datele pot fi stocate doar cât timp sunt necesare pentru scop. După aceea trebuie șterse.',
    },
    geprueft: false,
  },
  {
    id: 'datenpanne', begriff: 'Datenpanne', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'data breach', ro: 'încălcarea securității datelor' },
    erklaerung: {
      de: 'Personenbezogene Daten gehen verloren, werden gestohlen oder kommen in falsche Hände. Das muss sofort gemeldet werden.',
      en: 'Personal data is lost, stolen or gets into the wrong hands. This must be reported immediately.',
      ro: 'Date cu caracter personal sunt pierdute, furate sau ajung în mâini greșite. Acest lucru trebuie raportat imediat.',
    },
    geprueft: false,
  },
  {
    id: 'aufsichtsbehoerde', begriff: 'Aufsichtsbehörde', sachgebiet: 'datenschutz',
    uebersetzung: { en: 'supervisory authority', ro: 'autoritate de supraveghere' },
    erklaerung: {
      de: 'Ein Amt, das kontrolliert, ob Firmen den Datenschutz einhalten. Dort kann man sich auch beschweren.',
      en: 'An authority that checks whether companies follow data protection rules. You can also complain there.',
      ro: 'O autoritate care verifică dacă firmele respectă protecția datelor. Acolo se pot face și plângeri.',
    },
    geprueft: false,
  },
  {
    id: 'besitzdiener', begriff: 'Besitzdiener', sachgebiet: 'bgb',
    uebersetzung: { en: 'possession servant (person holding a thing for someone else)', ro: 'servitor al posesiei (deține lucrul pentru altcineva)' },
    erklaerung: {
      de: 'Eine Person, die eine Sache für einen anderen in der Hand hat und dessen Anweisungen folgen muss, z. B. eine Wachperson für den Auftraggeber.',
      en: 'A person who holds a thing for someone else and must follow their instructions, e.g. a guard for the client.',
      ro: 'O persoană care ține un lucru pentru altcineva și trebuie să-i urmeze instrucțiunile, de ex. un agent de pază pentru client.',
    },
    geprueft: false,
  },
  {
    id: 'verbotene-eigenmacht', begriff: 'verbotene Eigenmacht', sachgebiet: 'bgb',
    uebersetzung: { en: 'unlawful interference with possession', ro: 'tulburarea ilegală a posesiei' },
    erklaerung: {
      de: 'Jemand nimmt einem Besitzer eine Sache weg oder stört ihn im Besitz – ohne seinen Willen und ohne Erlaubnis durch ein Gesetz.',
      en: 'Someone takes a thing away from the possessor or disturbs their possession – against their will and without legal permission.',
      ro: 'Cineva ia un lucru de la posesor sau îl tulbură în posesie – fără voia lui și fără permisiune legală.',
    },
    geprueft: false,
  },
  {
    id: 'besitzwehr', begriff: 'Besitzwehr', sachgebiet: 'bgb',
    uebersetzung: { en: 'defence of possession', ro: 'apărarea posesiei' },
    erklaerung: {
      de: 'Der Besitzer darf sich mit Gewalt gegen verbotene Eigenmacht wehren, während sie passiert. Die Gewalt muss angemessen sein.',
      en: 'The possessor may use force to defend against unlawful interference while it is happening. The force must be appropriate.',
      ro: 'Posesorul se poate apăra cu forța împotriva tulburării ilegale a posesiei cât timp aceasta are loc. Forța trebuie să fie potrivită.',
    },
    geprueft: false,
  },
  {
    id: 'besitzkehr', begriff: 'Besitzkehr', sachgebiet: 'bgb',
    uebersetzung: { en: 'recovery of possession', ro: 'recuperarea posesiei' },
    erklaerung: {
      de: 'Der Besitzer darf sich eine weggenommene Sache sofort mit Gewalt zurückholen, wenn der Täter auf frischer Tat erwischt oder verfolgt wird.',
      en: 'The possessor may immediately take back a stolen thing by force if the offender is caught in the act or pursued.',
      ro: 'Posesorul își poate lua imediat înapoi cu forța un lucru luat, dacă făptașul este prins în flagrant sau urmărit.',
    },
    geprueft: false,
  },
  {
    id: 'geschaeftsfaehigkeit', begriff: 'Geschäftsfähigkeit', sachgebiet: 'bgb',
    uebersetzung: { en: 'legal capacity (to make contracts)', ro: 'capacitate de exercițiu' },
    erklaerung: {
      de: 'Die Fähigkeit, selbst wirksam Verträge zu schließen. Unter 7 Jahren: keine, von 7 bis 17: beschränkt, ab 18: voll.',
      en: 'The ability to make valid contracts yourself. Under 7: none, from 7 to 17: limited, from 18: full.',
      ro: 'Capacitatea de a încheia singur contracte valabile. Sub 7 ani: deloc, de la 7 la 17 ani: restrânsă, de la 18 ani: deplină.',
    },
    geprueft: false,
  },
  {
    id: 'hausverbot', begriff: 'Hausverbot', sachgebiet: 'bgb',
    uebersetzung: { en: 'ban from the premises', ro: 'interdicție de acces' },
    erklaerung: {
      de: 'Der Inhaber des Hausrechts verbietet einer Person, ein Gebäude oder Gelände zu betreten. Wer trotzdem kommt, begeht Hausfriedensbruch.',
      en: 'The holder of the domestic authority forbids a person to enter a building or site. Anyone who still comes commits trespass.',
      ro: 'Cel care are dreptul asupra spațiului interzice unei persoane să intre într-o clădire sau pe un teren. Cine vine totuși comite violare de domiciliu.',
    },
    geprueft: false,
  },
  {
    id: 'nothilfe', begriff: 'Nothilfe', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'defence of others', ro: 'apărarea altei persoane' },
    erklaerung: {
      de: 'Notwehr für eine andere Person: Man verteidigt jemanden, der gerade rechtswidrig angegriffen wird.',
      en: 'Self-defence for another person: you defend someone who is being unlawfully attacked right now.',
      ro: 'Legitima apărare pentru altă persoană: aperi pe cineva care este atacat ilegal chiar acum.',
    },
    geprueft: false,
  },
  {
    id: 'unterschlagung', begriff: 'Unterschlagung', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'embezzlement / misappropriation', ro: 'însușirea bunului găsit / delapidare' },
    erklaerung: {
      de: 'Jemand behält eine fremde Sache rechtswidrig für sich, die er schon hat, z. B. eine gefundene Geldbörse.',
      en: 'Someone unlawfully keeps another person\'s thing that they already have, e.g. a wallet they found.',
      ro: 'Cineva păstrează ilegal pentru sine un lucru străin pe care îl are deja, de ex. un portofel găsit.',
    },
    geprueft: false,
  },
  {
    id: 'strafantrag', begriff: 'Strafantrag', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'request for prosecution', ro: 'plângere prealabilă' },
    erklaerung: {
      de: 'Der Verletzte verlangt, dass der Täter bestraft wird. Bei manchen Taten wird nur mit Strafantrag ermittelt. Frist: drei Monate.',
      en: 'The injured person demands that the offender be punished. For some offences, there is only an investigation if this request is made. Deadline: three months.',
      ro: 'Victima cere pedepsirea făptașului. La unele fapte se face anchetă doar dacă există această plângere. Termen: trei luni.',
    },
    geprueft: false,
  },
  {
    id: 'antragsdelikt', begriff: 'Antragsdelikt', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'offence prosecuted only on request', ro: 'infracțiune urmărită doar la plângere' },
    erklaerung: {
      de: 'Eine Straftat, die nur verfolgt wird, wenn der Verletzte einen Strafantrag stellt, z. B. Hausfriedensbruch oder Beleidigung.',
      en: 'A criminal offence that is only prosecuted if the injured person files a request for prosecution, e.g. trespass or insult.',
      ro: 'O infracțiune care se urmărește doar dacă victima face plângere, de ex. violarea de domiciliu sau insulta.',
    },
    geprueft: false,
  },
  {
    id: 'gewahrsam', begriff: 'Gewahrsam', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'custody / actual control', ro: 'pază / detenție (control efectiv)' },
    erklaerung: {
      de: 'Die tatsächliche Herrschaft über eine Sache, z. B. die Ware im Laden gehört zum Gewahrsam des Ladeninhabers.',
      en: 'Actual control over a thing, e.g. the goods in a shop are in the shop owner\'s custody.',
      ro: 'Stăpânirea efectivă asupra unui lucru, de ex. marfa din magazin este în paza proprietarului magazinului.',
    },
    geprueft: false,
  },
  {
    id: 'unterlassene-hilfeleistung', begriff: 'unterlassene Hilfeleistung', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'failure to render assistance', ro: 'omisiunea de a acorda ajutor' },
    erklaerung: {
      de: 'Wer bei einem Unglücksfall nicht hilft, obwohl es nötig und zumutbar ist, macht sich strafbar. Oft reicht schon der Notruf.',
      en: 'Anyone who does not help in an accident although it is necessary and reasonable commits a criminal offence. Often an emergency call is enough.',
      ro: 'Cine nu ajută la un accident, deși este necesar și i se poate cere, comite o infracțiune. Adesea este suficient apelul de urgență.',
    },
    geprueft: false,
  },
  {
    id: 'waffenschein', begriff: 'Waffenschein', sachgebiet: 'strafrecht',
    uebersetzung: { en: 'firearms carry licence', ro: 'permis de port armă' },
    erklaerung: {
      de: 'Erlaubnis, eine Schusswaffe außerhalb der eigenen Wohnung oder Firma bei sich zu tragen (zu führen).',
      en: 'Permission to carry a firearm outside your own home or business.',
      ro: 'Permisiunea de a purta o armă de foc în afara propriei locuințe sau firme.',
    },
    geprueft: false,
  },
  {
    id: 'zuverlaessigkeit', begriff: 'Zuverlässigkeit', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'reliability (trustworthiness)', ro: 'încredere (fiabilitate)' },
    erklaerung: {
      de: 'Die Behörde prüft, ob man vertrauenswürdig ist, z. B. keine passenden Vorstrafen hat. Ohne Zuverlässigkeit darf man nicht im Bewachungsgewerbe arbeiten.',
      en: 'The authority checks whether you are trustworthy, e.g. have no relevant criminal record. Without reliability you may not work in the security business.',
      ro: 'Autoritatea verifică dacă ești de încredere, de ex. dacă nu ai condamnări relevante. Fără această încredere nu ai voie să lucrezi în pază.',
    },
    geprueft: false,
  },
  {
    id: 'dienstanweisung', begriff: 'Dienstanweisung', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'service instructions', ro: 'instrucțiuni de serviciu' },
    erklaerung: {
      de: 'Schriftliche Anweisung des Arbeitgebers: Was die Wachperson tun muss und was sie nicht darf.',
      en: 'Written instructions from the employer: what the guard must do and what they may not do.',
      ro: 'Instrucțiuni scrise de la angajator: ce trebuie să facă agentul de pază și ce nu are voie.',
    },
    geprueft: false,
  },
  {
    id: 'grundrechte', begriff: 'Grundrechte', sachgebiet: 'oeffentlich',
    uebersetzung: { en: 'fundamental rights', ro: 'drepturi fundamentale' },
    erklaerung: {
      de: 'Die wichtigsten Rechte jedes Menschen aus dem Grundgesetz, z. B. Menschenwürde, Gleichheit, Schutz der Wohnung.',
      en: 'The most important rights of every person in the Basic Law (German constitution), e.g. human dignity, equality, protection of the home.',
      ro: 'Cele mai importante drepturi ale fiecărui om din Legea fundamentală (constituția germană), de ex. demnitatea umană, egalitatea, protecția locuinței.',
    },
    geprueft: false,
  },
  {
    id: 'stabile-seitenlage', begriff: 'stabile Seitenlage', sachgebiet: 'uvv',
    uebersetzung: { en: 'recovery position', ro: 'poziția laterală de siguranță' },
    erklaerung: {
      de: 'So legt man eine bewusstlose Person hin, die normal atmet: auf die Seite, Kopf nach hinten, damit sie nicht erstickt.',
      en: 'How to lay down an unconscious person who is breathing normally: on their side, head tilted back, so they do not choke.',
      ro: 'Așa se așază o persoană inconștientă care respiră normal: pe o parte, cu capul dat pe spate, ca să nu se sufoce.',
    },
    geprueft: false,
  },
  {
    id: 'eigensicherung', begriff: 'Eigensicherung', sachgebiet: 'menschen',
    uebersetzung: { en: 'self-protection', ro: 'autoprotecție' },
    erklaerung: {
      de: 'Sich selbst schützen: Abstand halten, Hände im Blick, Fluchtweg frei, wenn möglich zu zweit arbeiten.',
      en: 'Protecting yourself: keep your distance, watch the hands, keep an escape route free, work in pairs if possible.',
      ro: 'Să te protejezi: păstrezi distanța, urmărești mâinile, ai o cale de retragere, dacă se poate lucrezi în doi.',
    },
    geprueft: false,
  },
];

// Antippbar sind Glossar-Begriffe und die Lernwörter (Karteikarten), damit jedes markierte Wort eine Erklärung hat
const ALLE = [...GLOSSAR, ...LERNBEGRIFFE];
const byId = new Map(ALLE.map((g) => [g.id, g]));
const byBegriff = new Map(ALLE.map((g) => [g.begriff.toLowerCase(), g]));

export const findeGlossar = (key: string): GlossarEintrag | undefined =>
  byId.get(key) ?? byBegriff.get(key.toLowerCase());
