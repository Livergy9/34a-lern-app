# 34a Easy

Lern-App für die Sachkundeprüfung nach § 34a GewO – auf Deutsch lernen, Fachbegriffe in der eigenen Sprache (Englisch, Rumänisch) nachschlagen.

Status: **Prototyp**. Fragen, Erklärungen und Übersetzungen sind Entwürfe und noch nicht fachlich geprüft.

## Auf dem iPhone starten (Windows-PC)

Einmalig vorbereiten:
1. Node.js (LTS) und Git am PC installieren.
2. Auf dem iPhone die App **Expo Go** aus dem App Store installieren.

Projekt holen und starten (Eingabeaufforderung / PowerShell):

```
git clone https://github.com/Livergy9/34a-lern-app
cd 34a-lern-app
npm install
npx expo start
```

Dann den QR-Code mit der iPhone-Kamera scannen – die App öffnet sich in Expo Go.
PC und iPhone müssen im selben WLAN sein. Klappt es nicht, `npx expo start --tunnel` verwenden.

Später, nach Änderungen: `git pull`, `npm install` und `npx expo start`.

Alle Pakete stehen in `package.json`. Neue Pakete immer dort eintragen (auf GitHub), nicht nur lokal installieren.

## Aufbau

| Ordner / Datei | Inhalt |
| --- | --- |
| `src/data/fragen/` | Prüfungsfragen, eine Datei pro Sachgebiet |
| `src/data/kapitel.ts` | Lernkapitel (kurze Texte pro Sachgebiet) |
| `src/data/glossar.ts` | Schwierige Fachbegriffe (antippbar), mit Übersetzung EN/RO |
| `src/data/lernbegriffe.ts` | Weitere Lernwörter, nur für Karteikarten |
| `src/data/sachgebiete.ts` | Sachgebiete und Verteilung in der Prüfung |
| `src/premium.ts` | Was gratis ist und was Premium ist, Preise |
| `src/lernstand.ts` | Tagesziel, Lernserie, Statistik |
| `src/state.tsx` | Gespeicherter Fortschritt (AsyncStorage), Punktebewertung |
| `src/screens/` | Bildschirme |
| `src/ui.tsx` | Farben und gemeinsame Bausteine |
| `pruefung/` | Prüflisten für die Fragen + Text für ChatGPT |

### Inhalte prüfen (Formfehler)

```
npx tsx scripts/pruefe-inhalte.ts
```

### Fragenformat

- Single Choice: 5 Antworten, genau 1 richtig. Multiple Choice: 6 Antworten, 2–4 richtig (wie IHK seit 01.07.2025).
- Fachbegriffe im Text markieren: `[[Notwehr]]` oder `[[Anzeigetext|glossar-id]]`. Sie werden in der App antippbar.
- `geprueft: false` bleibt, bis die Frage fachlich kontrolliert ist. `unsicher: true` = besonders genau prüfen.
