# So prüfst du die Fragen

Es gibt zwei Arten von Prüflisten:

- **Inhalt** (Ordner `pruefung`): `1-…` bis `7-…` pro Sachgebiet + `8-kapitel.md`. Prüft, ob Fragen und Antworten fachlich stimmen.
- **Übersetzung** (Ordner `pruefung/uebersetzung`): `U1-…` bis `U7-…` pro Sachgebiet + `U8-fachbegriffe.md`. Prüft, ob Englisch und Rumänisch richtig und einfach sind.

Reihenfolge: erst den **Inhalt** eines Sachgebiets prüfen, dann die **Übersetzung** desselben Sachgebiets. So musst du die Übersetzung nicht zweimal prüfen, falls sich am Inhalt etwas ändert.

## Schritt 1: ChatGPT als erster Filter

1. Öffne ChatGPT.
2. Lade **eine** Prüfliste als Datei hoch (z. B. `4-strafrecht.md`). Die Dateien findest du auf GitHub im Ordner `pruefung` oder nach `git pull` auf deinem PC.
3. Kopiere den Text unten in das Eingabefeld und schicke ihn ab.
4. ChatGPT gibt dir eine Tabelle mit allen Fragen zurück, die vielleicht falsch sind.

## Schritt 2: Markierte Fragen selbst nachschauen

- Nur die Fragen, die ChatGPT markiert, und die mit ⚠️.
- Den Paragrafen nachlesen auf **gesetze-im-internet.de** (z. B. „§ 127 StPO“ suchen).

## Schritt 3: Mir die Ergebnisse schicken

Schick mir einfach die Tabelle von ChatGPT und deine Notizen, z. B.:
„st-014 falsch: Frist ist 3 Monate, nicht 3 Wochen.“
Ich korrigiere alles auf einmal und setze geprüfte Fragen auf `geprueft: true`.

---

## Text für ChatGPT (kopieren)

```
Du bist Fachdozent für die Sachkundeprüfung nach § 34a GewO (IHK, Prüfungsformat seit 01.07.2025).
Im Anhang ist eine Liste mit Übungsfragen für eine Lern-App. ✅ markiert die Antworten, die als richtig gelten, ❌ die als falsch geltenden.

Prüfe JEDE Frage nach aktuellem deutschem Recht:
1. Ist jede ✅-Antwort wirklich richtig?
2. Ist jede ❌-Antwort wirklich falsch (nicht auch vertretbar richtig)?
3. Stimmen Erklärung und Rechtsgrundlage (Paragraf)?
4. Ist die Frage eindeutig und für Menschen mit Deutsch als Zweitsprache verständlich?

Antworte NUR mit einer Tabelle der Fragen, bei denen du ein Problem siehst:
| ID | Problem (Fehler / unklar / veraltet) | Begründung mit Paragraf | Vorschlag zur Korrektur |

Fragen ohne Problem lässt du weg. Wenn du dir selbst nicht sicher bist, schreibe „unsicher“ in die Spalte Problem.
Am Ende: Anzahl geprüfter Fragen und Anzahl Probleme.
```

---

## Text für ChatGPT – Übersetzungen prüfen (kopieren)

Gleiches Vorgehen: **eine** Datei aus `pruefung/uebersetzung` hochladen (z. B. `U4-strafrecht.md`), dann diesen Text schicken.

```
Du bist Übersetzer für Englisch und Rumänisch mit Erfahrung im deutschen Recht.
Im Anhang sind Fragen und Erklärungen einer Lern-App für die Sachkundeprüfung nach § 34a GewO.
Zu jedem deutschen Text gibt es eine englische (EN) und eine rumänische (RO) Übersetzung.
Die Nutzer sind angehende Sicherheitskräfte mit wenig Deutsch. Die Übersetzung soll ihnen helfen, den deutschen Text zu verstehen.

Prüfe JEDE Übersetzung:
1. Stimmt der Sinn genau mit dem Deutschen überein (nichts weggelassen, nichts dazuerfunden)?
2. Sind Fachbegriffe richtig übersetzt (z. B. Notwehr, Besitz/Eigentum, Ordnungswidrigkeit)? Bleibt ein deutscher Fachbegriff in Klammern stehen, ist das gewollt.
3. Ist sie einfach und verständlich (kurze Sätze, keine unnötig schweren Wörter)?
4. Rumänisch: richtige Grammatik und Sonderzeichen (ă, â, î, ș, ț)?

Antworte NUR mit einer Tabelle der Stellen, bei denen du ein Problem siehst:
| ID | Sprache (EN/RO) | Frage oder Erklärung | Problem | Verbesserte Übersetzung |

Stellen ohne Problem lässt du weg. Am Ende: Anzahl geprüfter Fragen und Anzahl Probleme.
```

Für Rumänisch ist ein Muttersprachler noch besser als ChatGPT. Wenn du jemanden kennst: lieber ihm die Datei geben.

---

Hinweis: Auch ChatGPT kann sich irren. Eine Frage gilt erst als geprüft, wenn du (oder ein Dozent) sie bestätigt hast.
