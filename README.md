# 34a Lern-App

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
npx expo install react react-native react-dom react-native-web react-native-safe-area-context expo-status-bar @expo/metro-runtime @expo/vector-icons
npx expo start
```

Dann den QR-Code mit der iPhone-Kamera scannen – die App öffnet sich in Expo Go.
PC und iPhone müssen im selben WLAN sein. Klappt es nicht, `npx expo start --tunnel` verwenden.

Später, nach Änderungen: `git pull` und `npx expo start`.

## Aufbau

| Ordner / Datei | Inhalt |
| --- | --- |
| `src/data/fragen.ts` | Prüfungsfragen |
| `src/data/glossar.ts` | Fachbegriffe mit Übersetzung (EN, RO) und Erklärung |
| `src/data/sachgebiete.ts` | Sachgebiete und Verteilung in der Prüfung |
| `src/screens/` | Bildschirme (Start, Lernen, Quiz, Prüfung, Glossar, Einstellungen) |
| `src/ui.tsx` | Farben und gemeinsame Bausteine |
| `src/state.tsx` | App-Zustand und Punktebewertung |

### Fragenformat

- Single Choice: 5 Antworten, genau 1 richtig. Multiple Choice: 6 Antworten, mehrere richtig (wie IHK seit 01.07.2025).
- Fachbegriffe im Text markieren: `[[Notwehr]]` oder `[[Anzeigetext|glossar-id]]`. Sie werden in der App antippbar.
- `geprueft: false` bleibt, bis die Frage fachlich kontrolliert ist.
