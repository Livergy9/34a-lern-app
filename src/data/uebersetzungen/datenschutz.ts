import type { UeEintrag } from './index';

// [Frage EN, Erklärung EN, Frage RO, Erklärung RO]
export const UE: Record<string, UeEintrag> = {
  'ds-001': [
    "What is personal data?",
    "Personal data is any information that can identify a person directly or indirectly – e.g. name, address, photo or car number plate.",
    "Ce sunt datele cu caracter personal?",
    "Date cu caracter personal sunt toate informațiile prin care o persoană poate fi identificată direct sau indirect – de ex. nume, adresă, fotografie sau număr de înmatriculare.",
  ],
  'ds-002': [
    "Which principles apply to the processing of personal data?",
    "Data may only be stored for a fixed purpose, only to the extent necessary and only for as long as necessary.",
    "Ce principii se aplică la prelucrarea datelor cu caracter personal?",
    "Datele pot fi stocate doar pentru un scop stabilit, doar în măsura necesară și doar atât timp cât este necesar.",
  ],
  'ds-003': [
    "What is the GDPR (DSGVO)?",
    "The General Data Protection Regulation (GDPR, German: DSGVO) is an EU regulation. It applies directly in all EU countries. In Germany, the Federal Data Protection Act (BDSG) adds further rules.",
    "Ce este GDPR (DSGVO)?",
    "Regulamentul general privind protecția datelor (GDPR, în germană DSGVO) este un regulament al UE. Se aplică direct în toate statele UE. În Germania, Legea federală privind protecția datelor (BDSG) completează regulile.",
  ],
  'ds-004': [
    "Which information is personal data?",
    "Personal data is all data that can identify a person – directly or indirectly. A number plate or a video image also counts. Anonymous statistics do not.",
    "Care informații sunt date cu caracter personal?",
    "Date cu caracter personal sunt toate datele prin care se poate identifica o persoană – direct sau indirect. Și un număr de înmatriculare sau o imagine video intră aici. Statisticile anonime nu.",
  ],
  'ds-005': [
    "Which data belongs to the specially protected data (special categories)?",
    "Specially protected are, for example, health data, religious and political beliefs, ethnic origin and data about sex life. They may only be processed under strict conditions.",
    "Ce date fac parte din datele protejate în mod special (categorii speciale)?",
    "Protejate în mod special sunt de ex. datele despre sănătate, convingerile religioase și politice, originea etnică și datele despre viața sexuală. Ele pot fi prelucrate doar în condiții stricte.",
  ],
  'ds-006': [
    "When is the processing of personal data allowed?",
    "Data may only be processed with a legal basis, e.g. consent, a contract, a legal obligation or an overriding legitimate interest.",
    "Când este permisă prelucrarea datelor cu caracter personal?",
    "Datele pot fi prelucrate doar dacă există un temei legal, de ex. consimțământ, contract, obligație legală sau un interes legitim preponderent.",
  ],
  'ds-007': [
    "What is required for valid consent to data processing?",
    "Consent must be given voluntarily, for a specific purpose and with knowledge of the facts. It can be withdrawn at any time for the future.",
    "Ce este necesar pentru un consimțământ valabil la prelucrarea datelor?",
    "Consimțământul trebuie dat de bunăvoie, pentru un scop anume și cunoscând situația. El poate fi retras oricând pentru viitor.",
  ],
  'ds-008': [
    "A visitor asks which data the company has stored about him. What right does he have?",
    "Everyone has a right to information about whether and which data is stored about them. The security guard passes the request on to the responsible department in the company.",
    "Un vizitator întreabă ce date a stocat firma despre el. Ce drept are?",
    "Oricine are dreptul să afle dacă și ce date sunt stocate despre el. Agentul de pază transmite cererea către departamentul responsabil din firmă.",
  ],
  'ds-009': [
    "When must personal data be deleted?",
    "Data must be deleted when it is no longer needed for its purpose, or when the person withdraws their consent and there is no other legal basis. Exception: a law requires it to be kept.",
    "Când trebuie șterse datele cu caracter personal?",
    "Datele trebuie șterse când nu mai sunt necesare pentru scopul lor sau când persoana își retrage consimțământul și nu există alt temei legal. Excepție: o lege cere păstrarea lor.",
  ],
  'ds-010': [
    "A shop monitors its sales area with cameras. What is required?",
    "With video surveillance of publicly accessible areas, the surveillance and the person responsible must be recognisable early, usually by a sign. Recordings are deleted as soon as they are no longer needed.",
    "Un magazin își supraveghează spațiul de vânzare cu camere. Ce este obligatoriu?",
    "La supravegherea video a spațiilor accesibile publicului, supravegherea și responsabilul trebuie să fie recunoscute din timp, de obicei printr-un panou. Înregistrările se șterg imediat ce nu mai sunt necesare.",
  ],
  'ds-011': [
    "How long may video surveillance recordings be stored?",
    "Video recordings must be deleted as soon as they are no longer needed for the purpose. If there is an incident, the relevant recordings may be kept to clear it up.",
    "Cât timp pot fi stocate înregistrările supravegherii video?",
    "Înregistrările video trebuie șterse imediat ce nu mai sunt necesare pentru scop. Dacă are loc un incident, înregistrările respective pot fi păstrate pentru clarificare.",
  ],
  'ds-012': [
    "You keep a visitor list at reception. Which details are needed for it?",
    "According to the principle of data minimisation, only the data that is really necessary for the purpose is recorded.",
    "Țineți o listă de vizitatori la recepție. Ce date sunt necesare pentru ea?",
    "Conform principiului minimizării datelor, se înregistrează doar datele care sunt cu adevărat necesare pentru scop.",
  ],
  'ds-013': [
    "A stranger calls and asks whether a certain employee is in the building today. How do you react?",
    "Giving information about people to strangers is an unlawful disclosure of personal data. If in doubt, give no information.",
    "Un necunoscut sună și întreabă dacă un anumit angajat este azi în clădire. Cum reacționați?",
    "A da informații despre persoane unor necunoscuți înseamnă transmiterea nepermisă de date personale. În caz de îndoială, nu dați informații.",
  ],
  'ds-014': [
    "You lose a USB stick with visitor data. What do you do?",
    "Losing personal data is a data breach. It must be reported immediately so that the company can react and meet its reporting obligations. Exact details (when, where) help to clear it up.",
    "Pierdeți un stick USB cu date ale vizitatorilor. Ce faceți?",
    "Pierderea datelor cu caracter personal este o încălcare a securității datelor. Trebuie raportată imediat, ca firma să poată reacționa și să-și îndeplinească obligațiile de notificare. Detaliile exacte (când, unde) ajută la clarificare.",
  ],
  'ds-015': [
    "Within what time must a company report a reportable data breach to the supervisory authority?",
    "A breach of the protection of personal data must be reported to the supervisory authority within 72 hours if possible, if there is a risk for the people affected.",
    "În ce termen trebuie o firmă să raporteze autorității de supraveghere o încălcare a securității datelor?",
    "O încălcare a protecției datelor cu caracter personal trebuie raportată autorității de supraveghere, dacă este posibil, în 72 de ore, dacă există un risc pentru persoanele afectate.",
  ],
  'ds-016': [
    "Who monitors compliance with data protection by companies in the federal states?",
    "The data protection supervisory authorities of the federal states are responsible for companies. You can also complain there.",
    "Cine supraveghează în landuri respectarea protecției datelor de către firme?",
    "Pentru firme sunt responsabile autoritățile de supraveghere a protecției datelor din landuri. Acolo se pot face și plângeri.",
  ],
  'ds-017': [
    "During an incident in a shopping centre, you photograph the people involved with your private phone and show the photos to friends. Is this allowed?",
    "Photos of people are personal data. Private recordings and passing them on to friends are not allowed and can lead to fines and penalties.",
    "La un incident într-un centru comercial, fotografiați persoanele implicate cu telefonul personal și arătați pozele prietenilor. Este permis?",
    "Fotografiile cu persoane sunt date cu caracter personal. Înregistrările private și transmiterea lor către prieteni nu sunt permise și pot duce la amenzi și pedepse.",
  ],
  'ds-018': [
    "What are the tasks of a company data protection officer?",
    "The data protection officer advises the company and its employees and monitors compliance with data protection. He is the contact person for questions.",
    "Care sunt sarcinile responsabilului cu protecția datelor dintr-o firmă?",
    "Responsabilul cu protecția datelor consiliază firma și angajații și supraveghează respectarea protecției datelor. El este persoana de contact pentru întrebări.",
  ],
};
