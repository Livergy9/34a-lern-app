// Prüft die Inhalte auf Formfehler: npx tsx scripts/pruefe-inhalte.ts
import { FRAGEN } from '../src/data/fragen';
import { GLOSSAR, findeGlossar } from '../src/data/glossar';
import { LERNBEGRIFFE } from '../src/data/lernbegriffe';
import { KAPITEL } from '../src/data/kapitel';
import { SACHGEBIETE } from '../src/data/sachgebiete';
import { UEBERSETZUNGEN } from '../src/data/uebersetzungen';

const fehler: string[] = [];
const TERM = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
const pruefeBegriffe = (wo: string, text: string) => {
  for (const m of text.matchAll(TERM)) if (!findeGlossar(m[2] ?? m[1])) fehler.push(`${wo}: Begriff [[${m[0]}]] nicht im Glossar`);
};

const ids = new Set<string>();
for (const f of FRAGEN) {
  if (ids.has(f.id)) fehler.push(`${f.id}: ID doppelt`);
  ids.add(f.id);
  if (f.typ === 'single' && f.antworten.length !== 5) fehler.push(`${f.id}: Single Choice braucht 5 Antworten (hat ${f.antworten.length})`);
  if (f.typ === 'multi' && f.antworten.length !== 6) fehler.push(`${f.id}: Multiple Choice braucht 6 Antworten (hat ${f.antworten.length})`);
  if (f.typ === 'single' && f.richtig.length !== 1) fehler.push(`${f.id}: Single Choice braucht genau 1 richtige Antwort`);
  if (f.typ === 'multi' && (f.richtig.length < 2 || f.richtig.length > 4)) fehler.push(`${f.id}: Multiple Choice braucht 2–4 richtige Antworten`);
  if (f.richtig.some((r) => r < 0 || r >= f.antworten.length)) fehler.push(`${f.id}: richtige Antwort außerhalb`);
  if (new Set(f.richtig).size !== f.richtig.length) fehler.push(`${f.id}: richtige Antwort doppelt`);
  if (new Set(f.antworten).size !== f.antworten.length) fehler.push(`${f.id}: Antwort doppelt`);
  if (!f.erklaerung || f.erklaerung.length < 20) fehler.push(`${f.id}: Erklärung fehlt/zu kurz`);
  const ue = UEBERSETZUNGEN[f.id];
  if (!ue || ue.some((x) => !x.trim())) fehler.push(`${f.id}: Übersetzung (EN/RO) fehlt oder unvollständig`);
  [f.text, ...f.antworten, f.erklaerung].forEach((t) => pruefeBegriffe(f.id, t));
}
const kartenIds = new Set<string>();
for (const g of [...GLOSSAR, ...LERNBEGRIFFE]) {
  if (kartenIds.has(g.id)) fehler.push(`Glossar/Lernbegriff ${g.id}: ID doppelt`);
  kartenIds.add(g.id);
}
for (const k of KAPITEL) k.abschnitte.forEach((a) => pruefeBegriffe(k.id, (a.ueberschrift ?? '') + ' ' + a.text));

console.log('Fragen pro Sachgebiet:');
for (const sg of SACHGEBIETE) {
  const l = FRAGEN.filter((f) => f.sachgebiet === sg.id);
  console.log(`  ${sg.kurz.padEnd(22)} ${String(l.length).padStart(3)}  (Multi: ${l.filter((f) => f.typ === 'multi').length}, unsicher: ${l.filter((f) => f.unsicher).length})`);
}
console.log(`  Gesamt: ${FRAGEN.length} Fragen, ${GLOSSAR.length} Glossarbegriffe, ${LERNBEGRIFFE.length} Lernbegriffe, ${KAPITEL.length} Kapitel`);
// Verteilung der richtigen Antworten bei Single Choice (sollte gemischt sein)
const pos = [0, 0, 0, 0, 0];
FRAGEN.filter((f) => f.typ === 'single').forEach((f) => pos[f.richtig[0]]++);
console.log(`  Single Choice richtige Position A–E: ${pos.join(' / ')}`);
if (fehler.length) {
  console.log(`\n${fehler.length} Fehler:\n` + fehler.join('\n'));
  process.exit(1);
}
console.log('\nKeine Formfehler gefunden.');
