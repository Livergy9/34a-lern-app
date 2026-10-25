// Erzeugt die Prüflisten in pruefung/ (eine Datei pro Sachgebiet) und die Übersetzungs-Prüflisten in pruefung/uebersetzung/:
// npx tsx scripts/pruefliste.ts
import { mkdirSync, writeFileSync } from 'fs';
import { FRAGEN } from '../src/data/fragen';
import { SACHGEBIETE } from '../src/data/sachgebiete';
import { KAPITEL } from '../src/data/kapitel';
import { GLOSSAR } from '../src/data/glossar';
import { LERNBEGRIFFE } from '../src/data/lernbegriffe';
import { UEBERSETZUNGEN } from '../src/data/uebersetzungen';

const ohne = (t: string) => t.replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1');
const B = ['A', 'B', 'C', 'D', 'E', 'F'];
mkdirSync('pruefung', { recursive: true });

SACHGEBIETE.forEach((sg, nr) => {
  const liste = FRAGEN.filter((f) => f.sachgebiet === sg.id);
  const zeilen = [
    `# Prüfliste ${nr + 1}: ${sg.name}`,
    '',
    `${liste.length} Fragen. ✅ = als richtig markierte Antwort. ⚠️ = Claude ist unsicher, bitte besonders genau prüfen.`,
    '',
  ];
  liste.forEach((f, i) => {
    zeilen.push(`## ${i + 1}. [${f.id}] ${f.unsicher ? '⚠️ ' : ''}${f.typ === 'multi' ? '(Mehrfachauswahl) ' : ''}${ohne(f.text)}`, '');
    f.antworten.forEach((a, j) => zeilen.push(`- ${f.richtig.includes(j) ? '✅' : '❌'} ${B[j]}) ${ohne(a)}`));
    zeilen.push('', `**Erklärung:** ${ohne(f.erklaerung)}`);
    if (f.rechtsgrundlage) zeilen.push('', `**Rechtsgrundlage:** ${f.rechtsgrundlage}`);
    zeilen.push('');
  });
  writeFileSync(`pruefung/${nr + 1}-${sg.id}.md`, zeilen.join('\n'));
});

const kap = ['# Prüfliste 8: Lernkapitel', ''];
for (const k of KAPITEL) {
  kap.push(`## [${k.id}] ${k.titel}`, '');
  for (const a of k.abschnitte) {
    if (a.ueberschrift) kap.push(`**${a.ueberschrift}**`, '');
    kap.push(ohne(a.text).split('\n').join('\n\n'), '');
  }
}
writeFileSync('pruefung/8-kapitel.md', kap.join('\n'));
// ── Übersetzungen prüfen (eine Datei pro Sachgebiet + Fachbegriffe) ──
mkdirSync('pruefung/uebersetzung', { recursive: true });
SACHGEBIETE.forEach((sg, nr) => {
  const liste = FRAGEN.filter((f) => f.sachgebiet === sg.id);
  const z = [
    `# Übersetzung prüfen ${nr + 1}: ${sg.name}`,
    '',
    `${liste.length} Fragen. Zu jeder Frage: deutscher Text, dann Englisch (EN) und Rumänisch (RO). Die Antworten bleiben in der App Deutsch und werden nicht übersetzt.`,
    '',
  ];
  liste.forEach((f, i) => {
    const u = UEBERSETZUNGEN[f.id];
    z.push(`## ${i + 1}. [${f.id}]`, '');
    z.push(`**Frage DE:** ${ohne(f.text)}`, '');
    z.push(`- EN: ${u?.[0] ?? '— FEHLT —'}`, `- RO: ${u?.[2] ?? '— FEHLT —'}`, '');
    z.push(`**Erklärung DE:** ${ohne(f.erklaerung)}`, '');
    z.push(`- EN: ${u?.[1] ?? '— FEHLT —'}`, `- RO: ${u?.[3] ?? '— FEHLT —'}`, '');
  });
  writeFileSync(`pruefung/uebersetzung/U${nr + 1}-${sg.id}.md`, z.join('\n'));
});

const begriffe = [...GLOSSAR, ...LERNBEGRIFFE];
const g = ['# Übersetzung prüfen 8: Fachbegriffe und Lernwörter', '', `${begriffe.length} Begriffe mit Übersetzung und einfacher Erklärung.`, ''];
for (const b of begriffe) {
  g.push(`## [${b.id}] ${b.begriff}`, '');
  g.push(`- Übersetzung EN: ${b.uebersetzung.en}`, `- Übersetzung RO: ${b.uebersetzung.ro}`, '');
  g.push(`**Erklärung DE:** ${b.erklaerung.de}`, '', `- EN: ${b.erklaerung.en}`, `- RO: ${b.erklaerung.ro}`, '');
}
writeFileSync('pruefung/uebersetzung/U8-fachbegriffe.md', g.join('\n'));
console.log('Prüflisten geschrieben (Inhalt + Übersetzung).');
