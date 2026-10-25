// Erzeugt die Prüflisten in pruefung/ (eine Datei pro Sachgebiet): npx tsx scripts/pruefliste.ts
import { mkdirSync, writeFileSync } from 'fs';
import { FRAGEN } from '../src/data/fragen';
import { SACHGEBIETE } from '../src/data/sachgebiete';
import { KAPITEL } from '../src/data/kapitel';

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
console.log('Prüflisten geschrieben.');
