import { Frage, GlossarEintrag, Kapitel, SachgebietId } from './data/types';
import { fragenFuer } from './data/fragen';
import { kapitelFuer } from './data/kapitel';

// Was ist gratis, was ist Premium? Alles an einer Stelle, damit es leicht zu ändern ist.
// VORSCHLAG (noch nicht endgültig entschieden):
//  - Ein Sachgebiet komplett gratis (Fragen, Kapitel, Karteikarten)
//  - In allen anderen Sachgebieten: die ersten Fragen und das erste Kapitel gratis
//  - Glossar immer gratis, eine Prüfungssimulation gratis
export const PREMIUM = {
  preisNormal: '9,99 €',
  preisStart: '4,99 €',
  gratisSachgebiete: ['oeffentlich'] as SachgebietId[],
  gratisFragenProGebiet: 10,
  gratisKapitelProGebiet: 1,
  gratisPruefungen: 1,
};

export const sachgebietGanzFrei = (id: SachgebietId, premium: boolean) => premium || PREMIUM.gratisSachgebiete.includes(id);

export function frageFrei(f: Frage, premium: boolean): boolean {
  if (sachgebietGanzFrei(f.sachgebiet, premium)) return true;
  return fragenFuer(f.sachgebiet).slice(0, PREMIUM.gratisFragenProGebiet).some((x) => x.id === f.id);
}

export function kapitelFrei(k: Kapitel, premium: boolean): boolean {
  if (sachgebietGanzFrei(k.sachgebiet, premium)) return true;
  return kapitelFuer(k.sachgebiet).slice(0, PREMIUM.gratisKapitelProGebiet).some((x) => x.id === k.id);
}

export const karteFrei = (k: GlossarEintrag, premium: boolean) => sachgebietGanzFrei(k.sachgebiet, premium);

export const pruefungFrei = (premium: boolean, bisher: number) => premium || bisher < PREMIUM.gratisPruefungen;
