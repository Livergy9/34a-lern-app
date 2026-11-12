# CLAUDE.md – 34a Easy

Diese Datei liest Claude Code automatisch bei jedem Start. Sie ist die Übergabe aus den bisherigen Chats (Stand 12.11.2026, letzter Inhalts-Commit 7e12d60). **Nach jedem fertigen Stück diese Datei aktualisieren** (Stand, offene Punkte, Entscheidungen) und mitcommitten.

## Arbeitsregeln (von Savio)
- Claude baut NUR, wenn Savio „mach“, „bau“ oder „ja mach“ schreibt. Vorher nur besprechen und planen. Bei Unklarheit kurz fragen. Bei „nur denken“, „sag nur“, „Plan“: nichts ändern.
- Savio entscheidet das Was, Claude das Wie.
- Nach jedem fertigen Stück committen und auf GitHub pushen (Branch main) und diese Datei aktualisieren.
- Antworten auf Deutsch, kurz, Schritt für Schritt bei technischen Anleitungen.
- Savio arbeitet auf Windows (CMD). Befehle einzeln angeben. Kein `git stash` für Savio. Falls `git pull` meckert: `git checkout -- <datei>`.
- Nichts als „funktioniert“ melden, was nicht geprüft wurde. Unterscheiden: gebaut / per Skript geprüft / auf dem iPhone getestet.

## Projekt
Lern-App für die §34a-Sachkundeprüfung (IHK), für den App Store (iPhone, später Android).
Zielgruppe: angehende Sicherheitskräfte, viele mit Deutsch als Zweitsprache.
Projektplan (Doc): https://claude.ai/artifact/TotBRCZ9eNHzT5LuJEQ6BP

## Technik
- Expo (React Native, TypeScript), eigene einfache Navigation (keine Navigationsbibliothek; React Navigation bewusst nicht, zu großer Umbau).
- Repo: github.com/Livergy9/34a-lern-app (Branch main).
- Test auf Savios iPhone über Expo Go.

### App starten (Savios PC, CMD)
```
cd 34a-lern-app
git pull
npm install
npx expo start
```
QR-Code mit iPhone-Kamera scannen (Expo Go). Das blaue Zahnrad gehört zu Expo Go, nicht zur App.

### Prüfungen
- Typprüfung: `npx tsc --noEmit`
- Formfehler + fehlende Übersetzungen: `npx tsx scripts/pruefe-inhalte.ts`
- Prüflisten neu erzeugen: `npx tsx scripts/pruefliste.ts`
- Wischgefühl, Animationen, Vibration, Layout: nur auf dem iPhone prüfbar → Savio um Test bitten und eine kurze Testliste geben.
- (Früher im claude.ai-Chat war `npm install` gesperrt, deshalb Typprüfung nur mit Platzhalter-Typen. In Claude Code auf dem PC gilt das nicht mehr: echte Typprüfung nutzen.)

## Entscheidungen
- Name: **34a Easy**. Store-Titel: **34a Easy – Sachkundeprüfung**.
- Logo: `assets/icon.png` (1024), `assets/logo.png` (512).
- Lernsprache Deutsch. Hilfe in EN/RO: Fachbegriffe antippen, dazu Knopf „Übersetzen“ für Frage + Erklärung. Antworten bleiben Deutsch. Prüfungsmodus nur Deutsch.
- Prüfungsformat seit 01.07.2025: 82 Fragen, 120 Punkte, 120 Min., bestanden ab 60 Punkten. Single Choice 5 Antworten, Multiple Choice 6, Teilpunkte: 1 Punkt je richtig angekreuzter Antwort, **kein Abzug** für falsche (IHK-Merkblatt: 2 richtige, 1 richtig + 1 falsch angekreuzt = 1 Punkt). Code: `bewerte` in `src/state.tsx`.
- **Multiple Choice:** immer genau 2 richtige von 6 (IHK Pfalz: höchstens 2 richtige pro Frage). **Umgang mit Menschen nur Single Choice** (19 Fragen = 19 Punkte). MC-Anteil im Pool je Sachgebiet = Anteil in der Prüfung (Punkte − Fragen). Die Verteilung pro Sachgebiet in `src/data/sachgebiete.ts` ist NICHT offiziell bestätigt → Savio fragt bei der IHK nach.
- Fremde Fragensammlungen nicht abschreiben/umformulieren (Datenbankschutz, Wettbewerbsrecht, Risiko Apple-Beschwerde). Quellen nur als Themen-Checkliste (Rahmenstoffplan).
- Fragen schreibt Claude selbst (nicht aus IHK-Katalog, nicht kopiert). Prüfung: ChatGPT als erster Filter (Inhalt + Übersetzung), markierte Fragen prüft Savio im Gesetz, ideal einmal ein Dozent. Rumänisch am besten von Muttersprachler.
- Nicht offiziell wirken: kein „IHK“ in Name, Logo, Store-Titel. Hinweis „nicht von der IHK“ (in „Mehr“).
- **Fragenziel:** aktuell 325. Neues Ziel (12.11.): ca. 600 vor dem Release (Orientierung: offizielle DIHK-App über 640 Fragen, andere Anbieter ca. 500–800). Savio findet 325 zu wenig.
- Geld: Premium per Einmalkauf 9,99 €, zum Start 4,99 € (Anzeige siehe „Premium – Prüfung vor Release“).
- **Gratis (Variante A):** 30 % pro Sachgebiet (Fragen, Kapitel, Karteikarten), Glossar immer, 1 Prüfungssimulation. Wert in `src/premium.ts` (`gratisAnteil`).
- **Premium-Werbung:** kein Pop-up beim Öffnen. Nur dort, wo der Nutzer selbst merkt, dass ihm etwas fehlt.
- **Tagesziel:** wählbar Locker 10 / Normal 20 (Standard) / Intensiv 30 Aufgaben, **ohne Minutenangabe**. Lernserie zählt, wenn das eigene Tagesziel erreicht ist. Prüfungstermin freiwillig. Gezählt werden beantwortete Fragen (Quiz + Prüfung; übersprungene nicht) und bewertete Karteikarten. Nach Erreichen: Haken, „Tagesziel geschafft“, rechts „X heute“ statt „X / 20“, Knopf „Weiterlernen“.
- Kein extra „Schwerpunkte üben“. Stattdessen in der Statistik „Jetzt üben“ beim schwächsten Sachgebiet und auf dem Start „Größte Lücke … Üben“.
- **Start-Bildschirm** beantwortet nur 2 Fragen: „Bin ich bereit?“ (Prüfungsreife) und „Heute“ (Tagesziel + Jetzt lernen). Dazu „Prüfung simulieren“ (umrandeter Knopf „Starten“, Hauptknopf bleibt „Weiterlernen“) und unten „Deine Sachgebiete“ (7 Ringe, 2 Spalten). Start darf scrollen. Keine separate Premium-Zeile. Meine Fehler + Gemerkte Fragen oben im Tab „Lernen“. Lernplan: Tagesziel-Zeile antippen oder „Mehr“. Statistik: Prüfungsreife-Karte oder Flamme antippen.
- **Prüfungsreife – Anzeige** (seit 73fc088): keine Punkte, kein Rot. Stufe groß: „Noch keine Einschätzung“ (< 20 Antworten, `MIN_FUER_REIFE`) / „Am Anfang“ (blau) / „Auf gutem Weg“ (orange) / „Gut vorbereitet“ (grün, bewusst nicht „Bereit“). Balken (geschätzter Anteil) mit grauem Strich = Bestehensgrenze, ohne Beschriftung. Darunter „X von Y (Gratis-)Fragen geübt · Z % richtig“. (i) neben „Bin ich bereit?“: „Schätzung aus deinen Übungsfragen. Keine Garantie…“. Statistik nutzt diese Anzeige nicht.
- **Prüfungsreife – Stufen** (`reifeStufe`, `REIFE_GRENZEN` in `src/lernstand.ts`): Quote = richtige Punkte der beantworteten Fragen; Abdeckung = geübter Anteil je Sachgebiet, gewichtet mit Prüfungspunkten. Auf gutem Weg: Quote ≥ 60 % und Abdeckung ≥ 20 %. Gut vorbereitet: Quote ≥ 75 % und Abdeckung ≥ 90 %, nur Premium. Gratis kommt höchstens bis „Auf gutem Weg“. Schwellen von Savio noch nicht bestätigt.
- **Premium-Werbung (gebaut):** (1) Prüfungsreife-Karte ab 80 % der Gratis-Fragen geübt (`PREMIUM_HINWEIS_AB`): „Für die Prüfung fehlen dir noch … Fragen.“ + goldener Knopf. (2) Quiz-Auswertung: goldene Karte, wenn in DIESER Runde die letzte offene Gratis-Frage eines Sachgebiets geschafft wurde.
- **Sachgebiets-Ringe auf dem Start:** Ring = geübter Anteil aller Fragen des Sachgebiets, Sachgebietsfarbe, Icon im Ring, Name + „n / gesamt“, antippen öffnet das Sachgebiet. Komponente `Ring` in `src/ui.tsx` ohne SVG-Paket. Auf dem iPhone bestätigt (26.10.).
- **Sachgebietsfarben/Symbole:** Strafrecht braun `#7A4A2A` (Rot nur für Fehler), Technik cyan `#0891B2` (Grau wirkte gesperrt). Datenschutz-Symbol Schild (`shield-checkmark-outline`) statt Schloss (sah aus wie Premium-Sperre).
- **Navigation (seit d6831df):** Bildschirme bleiben als Ebenen erhalten (Zustand + Scroll-Position bleiben). Neuer Bildschirm gleitet von rechts herein, Zurück gleitet hinaus (wie iOS). **Wischen vom linken Rand zurück** (30-px-Streifen, zurück ab 35 % Breite oder schnellem Wischen) nur auf Bildschirmen mit Zurück-Pfeil: Sachgebiet, Kapitel, Statistik, Lernplan, Durchsicht. NICHT bei Quiz, Prüfung, Karteikarten-Runde, Premium. `ersetze` ohne Animation. Bei „Bewegung reduzieren“ ohne Animation. Code: `App.tsx` (`WISCHBAR`, `VERSATZ`), `src/components/WischZurueck.ts`.
- **Prüfungs-Übersicht (Raster):** blau = beantwortet, grau = übersprungen, weiß mit Rand = offen. Aktuelle Frage dunkler Rahmen. Legende mit Anzahl je Zustand.
- **Einfachauswahl abwählbar:** dieselbe Antwort nochmal antippen = abwählen (`waehle` in `QuizScreen.tsx`).
- **Antwort-Anzeige nach dem Prüfen:** Gewählt+richtig: grün gefüllt + Haken. Richtig, nicht gewählt: grün gestrichelt, „Richtige Antwort – nicht gewählt“. Gewählt+falsch: rot + Kreuz. Nicht gewählt+falsch: leicht ausgegraut.
- **Fachbegriffe:** durchgehende, helle blaue Unterstreichung.
- **Prozent richtig** erst ab 5 beantworteten Fragen (`MIN_FUER_QUOTE`).
- **Lernserie** = Flamme + „X Tage“ (orange), überall gleich.
- **Vibration:** dezent, abschaltbar in „Mehr“ (Standard an). NICHT im Prüfungsmodus. Code: `src/feedback.ts`.
- **Erklärtexte** dauerhaft nur, wo nötig. Sonst hinter (i) am Seitentitel (`SeitenTitel` in `src/ui.tsx`).
- Gewerbe erst kurz vor Veröffentlichung. Apple-Konto (98,99 €/Jahr) erst, wenn die App inhaltlich bereit ist und erste Tester sie wirklich nutzen.
- Werbung: zuerst kostenlose Kanäle (Kollegen, Facebook-/WhatsApp-Gruppen, TikTok/Shorts), 200 € Test erst nach ersten Bewertungen.

## Stand
Grundfunktionen: Quiz, Glossar, Fortschritt, Meine Fehler, Lesezeichen, Statistik, Lernplan, Karteikarten (Leitner), Prüfung (echt 82/120 Min. oder Kurztest), Einführung, 24 Kapitel, Premium-Sperre (Kauf noch nicht echt, Schalter „Premium im Testmodus“ in „Mehr“).
Fragen: 325, davon 143 MC. Pro Sachgebiet MC/Gesamt: Gewerberecht 26/45, Datenschutz 11/18, BGB 31/50, Strafrecht 41/67, UVV 19/30, Technik 15/26, Menschen 0/89. Prüfungssimulation (`stelleZusammen`) 200× getestet: immer 82 Fragen / 120 Punkte. Als ⚠️ unsicher: oe-031.

## Stoffabgleich mit offiziellem Rahmenplan (12.11.2026)
- **Maßgeblich: [docs/stoffabgleich.md](docs/stoffabgleich.md)** – DIHK-Rahmenplan (Stand 09/2019, laut IHK Gera 05/2025 unverändert gültig) Punkt für Punkt gegen die 325 Fragen, mit Lücken pro Sachgebiet und Zielzahlen (Summe 600: Strafrecht 140, BGB 85, Gewerberecht 90, Menschen 105, UVV 65, Technik 70, Datenschutz 45).
- Echter IHK-Fragenkatalog ist nicht öffentlich (bundeseinheitlich erstellt, Prüfer zur Verschwiegenheit verpflichtet). Offizielle Verteilung pro Sachgebiet nicht veröffentlicht.
- Rahmenplan ist urheberrechtlich geschützt (DIHK): nur als Themenliste, kein Text in die App.
- Die Liste unten (aus Savios Skript) ist darin aufgegangen; § 316 StGB ist nicht im Rahmenplan → gestrichen.

## Lücken füllen (Abgleich mit Savios Lernskript von 2023)
- Savios Skript („Vorbereitung auf die Sachkundeprüfung § 34a GewO“, 164 S., Teile A–H) dient nur als Themenliste. Auf dem Ausdruck „… Rhein-Neckar“-Logo → Savio prüft, ob frei verwendbar. Punkteverteilung daraus NICHT übernehmen (Stand 2023).
- **Erledigt (7e12d60):** Umgang mit Menschen um-073–um-089 + Kapitel um-k5, um-k6, EN/RO. Inhalt noch nicht von ChatGPT/Savio geprüft (`geprueft: false`). In der App noch nicht angesehen.
- **Offen, wichtig:** Strafrecht: § 253 Erpressung, §§ 257/258 Begünstigung/Strafvereitelung, §§ 153/154 Falschaussage/Meineid, § 164 falsche Verdächtigung, § 226 schwere KV, § 244 Wohnungseinbruch/Bande, § 265a, § 316, BtMG. Gewerberecht: § 14 GewO Anzeigepflicht, § 29 GewO Nachschau, Anzeige nach Waffengebrauch (BewachV). Strafrecht/Gewerberecht brauchen MC-Anteil ~60 % (genau 2 von 6).
- **Mittel:** StPO-Zeugenrechte (§§ 52, 55, 57), BGB § 226 Schikane, §§ 833/834 Tierhalter, UVV Sicherheitsbeauftragter/Geldtransporte/Munition-Übergabe (DGUV 23), Technik Interventions-/Widerstandszeit, SAA/EVAC, Sicherheitsverglasung, Verbrennungsdreieck.
- **Gering:** DSGVO-Rechte im Detail, Public-Private-Partnership, Verjährung.
- Neue Fragen bisher am Dateiende anhängen (wegen Gratis-Anteil, siehe Premium Punkt 4).

## iPhone-Test offen (d6831df + 73fc088)
- Sachgebiet öffnen → vom Rand wischen (halb, ganz, schnell); Kapitel → zurück → Scroll-Position bleibt; im Quiz darf Wischen nichts tun; am linken Rand senkrecht scrollen (Kollision?).
- Prüfung: Fragen überspringen → Übersicht grau/weiß/blau; Einfachauswahl abwählen.
- Start: Knopf „Starten“, mit Testmodus aus „1× gratis …“ bzw. „Gratis-Simulation genutzt“ + Schloss; Premium-Hinweis in der Prüfungsreife-Karte.
- Ungeklärt: App startet in Expo Go evtl. auf „Mehr“ (Code startet auf „Start“; vermutlich merkt sich Expo Go den Tab → Expo Go ganz schließen und neu öffnen).

## Premium – Prüfung vor Release (noch NICHT gebaut, Savio entscheidet)
Grundgerüst gut (alles in `src/premium.ts`, Bildschirme fragen nur `frageFrei` usw.). Vor Release ändern:
1. **Durchgestrichener Preis** „~~9,99 €~~ 4,99 €“: Abmahnrisiko (Preisangabenverordnung). Stattdessen 4,99 € + „Startpreis“.
2. **Preis fest im Code:** muss vom Store kommen.
3. **Premium ist Standard an** (`START.premium: true` in `state.tsx`) + Testschalter darf nicht in den Store → nur in `__DEV__`, Status vom Store, lokal nur zwischengespeichert.
4. **Gratis = erste 30 % in Dateireihenfolge:** beim Einfügen/Umsortieren ändern sich die Gratis-Fragen → festes Merkmal `gratis: true` pro Frage.
5. Zu entscheiden: Gratis-Prüfung zieht aus allen Fragen; Fortschritt zurücksetzen gibt neue Gratis-Prüfung.
- Kauf-Einbau: neue Datei `src/kauf.ts` (laden, kaufen, wiederherstellen). Empfehlung RevenueCat (Kosten + Datenschutz prüfen), Alternative StoreKit direkt. „Käufe wiederherstellen“ ist Pflicht. Test nur mit Apple-Konto + eigenem Build, nicht Expo Go.

## Inhaltsprüfung mit ChatGPT – läuft
**Ablauf:** Claude gibt Savio die Prüfliste (z. B. `pruefung/2-datenschutz.md`) + Prüftext. Savio lädt sie in ChatGPT hoch, gibt die Tabelle zurück. Claude bewertet (nicht alles übernehmen: ChatGPT prüft wie ein Jurist, wir brauchen IHK-Prüfungsniveau), Savio sagt „mach“, Claude korrigiert inkl. EN/RO, Prüflisten neu.
Reihenfolge: Datenschutz → Technik → UVV → Gewerberecht → BGB → Strafrecht → Menschen, danach Übersetzungen `U…`.
**Zusatzzeile im Prüftext** (noch nicht in `pruefung/0-ANLEITUNG.md`, wartet auf „mach“): „Bei Mehrfachauswahl sind immer genau 2 von 6 Antworten richtig. Prüfe besonders, ob eine der ❌-Antworten eigentlich auch richtig wäre.“

**Datenschutz – ChatGPT-Ergebnis ausgewertet, wartet auf „mach“:**
- Ändern: ds-010 + ds-011 Rechtsgrundlage § 4 BDSG → Art. 6 Abs. 1 f DSGVO (§ 4 BDSG gilt für private Videoüberwachung nicht mehr, BVerwG), kurzer Hinweis in Erklärung. ds-016 → Art. 51, 55, 57 DSGVO, Antwort „zuständige unabhängige Datenschutz-Aufsichtsbehörde des Landes“. ds-006 falsche Antwort „an Werbefirma verkauft“ → „ohne Wissen und Einwilligung der Personen verkauft“, A „wirksam eingewilligt“. ds-014 Erklärung: intern melden, Unternehmen entscheidet über Meldung an Behörde (Art. 33). ds-013 Erklärung „ohne geprüfte Berechtigung keine Auskunft“, Rechtsgrundlage Art. 5, 6 DSGVO. ds-017 Frage „im Dienst, ohne dienstlichen Grund“. ds-003 Rechtsgrundlage Art. 288 AEUV ergänzen.
- Leicht: ds-009 Erklärung erwähnt Ausnahmen (Art. 17 Abs. 3). ds-012 Frage „typischerweise nötig“.
- Nicht ändern: ds-004.
- Danach: Übersetzungen anpassen, `pruefe-inhalte.ts`, `pruefliste.ts`, Commit, nächste Datei `7-technik.md`.

## Design – noch offen
- Sachgebietsfarben einheitlich in Lernen und Statistik, ggf. Ringe statt dünner Balken in der Lernen-Liste (Komponente `Ring` wiederverwenden). Erst Mockup.

## Später
- Eigener Lesebereich zum reinen Lesen (Grundlage evtl. Savios Skript).
- Lernkapitel übersetzen. Mündliche Prüfung V1 oder später.

## Nächste Schritte
1. Savio testet auf dem iPhone (Liste oben) und bestätigt die Stufen-Schwellen.
2. Fragen auffüllen Richtung ~600 nach [docs/stoffabgleich.md](docs/stoffabgleich.md): Strafrecht → Datenschutz → Gewerberecht → Technik → UVV → BGB → Menschen, je Runde 25–40 Fragen – bei „mach“.
3. Datenschutz-Korrekturen bei „mach“, dann Technik prüfen lassen.
4. Premium aufräumen (Punkte 1, 3, 4 + `kauf.ts` Platzhalter) – bei „mach“.
5. Savio fragt bei der IHK: Verteilung Fragen/Punkte pro Sachgebiet, Single Choice bei „Umgang mit Menschen“.
6. App 2–3 echten Prüflingen zeigen (kostenlos über Expo Go), bevor Geld ausgegeben wird.
7. Vor Release: EAS-Build, Apple-Konto, echter In-App-Kauf, Webseite (Datenschutz, Impressum, Support), TestFlight, Store-Texte/Screenshots, Gewerbe.
