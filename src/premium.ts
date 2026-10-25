import { Frage, GlossarEintrag, Kapitel, SachgebietId } from './data/types';
import { fragenFuer } from './data/fragen';
import { kapitelFuer } from './data/kapitel';
import { GLOSSAR } from './data/glossar';
import { LERNBEGRIFFE } from './data/lernbegriffe';

// Was ist gratis, was ist Premium? Alles an einer Stelle, damit es leicht zu ändern ist.
// Entschieden 25.10.2026 (Variante A):
//  - In JEDEM Sachgebiet ist ein Teil gratis: Fragen, Lernkapitel und Karteikarten (gratisAnteil, mind. 1)
//  - Glossar immer gratis, eine Prüfungssimulation gratis
// Gratis sind jeweils die ersten Einträge in der Reihenfolge der Inhaltsdateien.
export const PREMIUM = {
  preisNormal: '9,99 €',
  preisStart: '4,99 €',
  gratisAnteil: 0.3, // 30 % pro Sachgebiet – hier ändern, falls mehr oder weniger gratis sein soll
  gratisPruefungen: 1,
};

export const gratisProzent = Math.round(PREMIUM.gratisAnteil * 100);

const anzahlGratis = (gesamt: number) => Math.max(1, Math.ceil(gesamt * PREMIUM.gratisAnteil));

// Die ersten X % einer Liste als Menge von IDs (einmal pro Sachgebiet berechnet)
const cache = new Map<string, Set<string>>();
function gratisIds(schluessel: string, liste: { id: string }[]): Set<string> {
  let ids = cache.get(schluessel);
  if (!ids) {
    ids = new Set(liste.slice(0, anzahlGratis(liste.length)).map((x) => x.id));
    cache.set(schluessel, ids);
  }
  return ids;
}

export function frageFrei(f: Frage, premium: boolean): boolean {
  return premium || gratisIds(`f:${f.sachgebiet}`, fragenFuer(f.sachgebiet)).has(f.id);
}

export function kapitelFrei(k: Kapitel, premium: boolean): boolean {
  return premium || gratisIds(`k:${k.sachgebiet}`, kapitelFuer(k.sachgebiet)).has(k.id);
}

const KARTEN: GlossarEintrag[] = [...GLOSSAR, ...LERNBEGRIFFE];
export function karteFrei(k: GlossarEintrag, premium: boolean): boolean {
  return premium || gratisIds(`c:${k.sachgebiet}`, KARTEN.filter((x) => x.sachgebiet === k.sachgebiet)).has(k.id);
}

export const pruefungFrei = (premium: boolean, bisher: number) => premium || bisher < PREMIUM.gratisPruefungen;
