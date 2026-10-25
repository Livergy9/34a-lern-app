// Datumsfunktionen. Datum immer als Text "JJJJ-MM-TT" in Ortszeit (einfach zu speichern und zu vergleichen).

const zwei = (n: number) => String(n).padStart(2, '0');

export const alsText = (d: Date) => `${d.getFullYear()}-${zwei(d.getMonth() + 1)}-${zwei(d.getDate())}`;

export const ausText = (s: string) => {
  const [j, m, t] = s.split('-').map(Number);
  return new Date(j, m - 1, t);
};

export const heute = () => alsText(new Date());

export const plusTage = (s: string, n: number) => {
  const d = ausText(s);
  d.setDate(d.getDate() + n);
  return alsText(d);
};

// Ganze Tage von a bis b (b später → positiv)
export const tageZwischen = (a: string, b: string) =>
  Math.round((ausText(b).getTime() - ausText(a).getTime()) / 86400000);

export const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
export const WOCHENTAGE_KURZ = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export const schoen = (s: string) => {
  const d = ausText(s);
  return `${d.getDate()}. ${MONATE[d.getMonth()]} ${d.getFullYear()}`;
};

export const kurz = (s: string) => {
  const d = ausText(s);
  return `${zwei(d.getDate())}.${zwei(d.getMonth() + 1)}.`;
};
