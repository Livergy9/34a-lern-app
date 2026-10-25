import React, { useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Frage } from '../data/types';
import { sachgebietById } from '../data/sachgebiete';
import { useNav } from '../nav';
import { bewerte, Ergebnis, useApp } from '../state';
import { vibriere } from '../feedback';
import { uebersetzung } from '../data/uebersetzungen';
import { begriffeIn, Button, C, Card, Chip, GlossarInhalt, ProgressBar, s, ScreenHeader, TermText, UebersetzenKnopf, UebersetzungBox } from '../ui';

const BUCHSTABEN = ['A', 'B', 'C', 'D', 'E', 'F'];
const SCHWIERIGKEIT = { 1: 'Leicht', 2: 'Mittel', 3: 'Schwer' } as const;

export const anzahlHinweis = (f: Frage) =>
  f.typ === 'single' ? '1 richtige Antwort' : `${f.richtig.length} richtige Antworten`;

export function waehle(f: Frage, auswahl: number[], i: number): number[] {
  if (f.typ === 'single') return [i];
  if (auswahl.includes(i)) return auswahl.filter((a) => a !== i);
  // Nicht mehr Antworten wählbar, als richtig sind – erst eine abwählen
  if (auswahl.length >= f.richtig.length) return auswahl;
  return [...auswahl, i];
}

export function AntwortListe({
  frage, auswahl, onWaehle, aufgedeckt, interaktiv,
}: {
  frage: Frage; auswahl: number[]; onWaehle: (i: number) => void; aufgedeckt: boolean; interaktiv: boolean;
}) {
  const voll = frage.typ === 'multi' && !aufgedeckt && auswahl.length >= frage.richtig.length;
  return (
    <View style={{ gap: 10 }}>
      {frage.antworten.map((a, i) => {
        const gewaehlt = auswahl.includes(i);
        const gedimmt = voll && !gewaehlt;
        const richtig = frage.richtig.includes(i);
        // Nach dem Prüfen vier Zustände: gewählt+richtig, richtig+übersehen, gewählt+falsch, nicht gewählt+falsch
        const uebersehen = aufgedeckt && richtig && !gewaehlt;
        let border = C.border, bg = C.card, kreisBg = C.bg, kreisFarbe = C.text, kreisRand = 'transparent', gestrichelt = false, opacity = gedimmt ? 0.5 : 1;
        let icon: 'checkmark-circle' | 'checkmark-circle-outline' | 'close-circle' | null = null;
        if (!aufgedeckt && gewaehlt) { border = C.primary; bg = C.primarySoft; kreisBg = C.primary; kreisFarbe = '#fff'; }
        if (aufgedeckt && richtig && gewaehlt) { border = C.success; bg = C.successSoft; kreisBg = C.success; kreisFarbe = '#fff'; icon = 'checkmark-circle'; }
        if (uebersehen) { border = C.success; gestrichelt = true; kreisBg = C.card; kreisRand = C.success; kreisFarbe = C.success; icon = 'checkmark-circle-outline'; }
        if (aufgedeckt && gewaehlt && !richtig) { border = C.danger; bg = C.dangerSoft; kreisBg = C.danger; kreisFarbe = '#fff'; icon = 'close-circle'; }
        if (aufgedeckt && !gewaehlt && !richtig) opacity = 0.55;
        return (
          <Pressable
            key={i}
            disabled={aufgedeckt}
            onPress={() => onWaehle(i)}
            accessibilityRole={frage.typ === 'multi' ? 'checkbox' : 'radio'}
            accessibilityState={{ checked: gewaehlt }}
            accessibilityHint={uebersehen ? 'Richtige Antwort, nicht gewählt' : undefined}
            style={{
              flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: border, borderStyle: gestrichelt ? 'dashed' : 'solid',
              backgroundColor: bg, borderRadius: 16, padding: 14, opacity,
            }}
          >
            <View style={{
              width: 34, height: 34, borderRadius: frage.typ === 'multi' ? 9 : 17, backgroundColor: kreisBg,
              borderWidth: 1.5, borderColor: kreisRand,
              alignItems: 'center', justifyContent: 'center', marginRight: 12,
            }}>
              <Text style={{ fontWeight: '700', color: kreisFarbe }}>{BUCHSTABEN[i]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TermText text={a} interaktiv={interaktiv && aufgedeckt} style={s.body} />
              {uebersehen ? (
                <Text style={{ marginTop: 4, fontSize: 13, fontWeight: '600', color: C.success }}>Richtige Antwort – nicht gewählt</Text>
              ) : null}
            </View>
            {icon ? <Ionicons name={icon} size={22} color={icon === 'close-circle' ? C.danger : C.success} style={{ marginLeft: 8 }} /> : null}
          </Pressable>
        );
      })}
      {frage.typ === 'multi' && !aufgedeckt ? (
        <Text style={[s.muted, { textAlign: 'center' }]}>
          {auswahl.length} von {frage.richtig.length} gewählt{voll ? ' · Zum Ändern erst eine Antwort abwählen' : ''}
        </Text>
      ) : null}
    </View>
  );
}

export function FrageKopf({ frage, interaktiv, zeigeSchwierigkeit = true }: { frage: Frage; interaktiv: boolean; zeigeSchwierigkeit?: boolean }) {
  const sg = sachgebietById(frage.sachgebiet);
  const { hilfeSprache, uebersetzungAn } = useApp();
  // Übersetzung nur beim Lernen (interaktiv), nie in der Prüfungssimulation
  const ue = interaktiv && hilfeSprache ? uebersetzung(frage.id, hilfeSprache) : null;
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
        <Chip label={sg.kurz} icon={sg.icon as any} color={sg.farbe} bg={sg.farbe + '1A'} />
        {zeigeSchwierigkeit ? <Chip label={SCHWIERIGKEIT[frage.schwierigkeit]} color={C.muted} bg={C.border} /> : null}
      </View>
      <TermText text={frage.text} interaktiv={interaktiv} style={{ fontSize: 21, lineHeight: 29, fontWeight: '700', color: C.text }} />
      {ue ? (
        <View style={{ marginTop: 10, gap: 8 }}>
          <UebersetzenKnopf />
          {uebersetzungAn ? <UebersetzungBox text={ue.text} /> : null}
        </View>
      ) : null}
      <Text style={[s.muted, { marginTop: 8, marginBottom: 16 }]}>
        {frage.typ === 'multi' ? 'Mehrfachauswahl · ' : ''}{anzahlHinweis(frage)}
      </Text>
    </View>
  );
}

// Erklärung, Rechtsgrundlage und Fachbegriffe nach dem Antworten (auch in der Prüfungs-Durchsicht genutzt)
export function ErklaerungKarte({ frage, interaktiv = true }: { frage: Frage; interaktiv?: boolean }) {
  const { hilfeSprache, uebersetzungAn } = useApp();
  const ue = interaktiv && hilfeSprache ? uebersetzung(frage.id, hilfeSprache) : null;
  const begriffe = begriffeIn([frage.text, ...frage.antworten, frage.erklaerung].join(' '));
  return (
    <View style={{ gap: 12 }}>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="document-text-outline" size={20} color={C.primary} />
          <Text style={[s.h3, { marginLeft: 8, flex: 1 }]}>Erklärung</Text>
          {ue ? <UebersetzenKnopf /> : null}
        </View>
        <TermText text={frage.erklaerung} style={s.body} interaktiv={interaktiv} />
        {ue && uebersetzungAn ? <UebersetzungBox text={ue.erklaerung} style={{ marginTop: 10 }} /> : null}
        {frage.rechtsgrundlage ? (
          <View style={{ marginTop: 14, backgroundColor: C.bg, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="library-outline" size={18} color={C.muted} />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={{ fontWeight: '600', color: C.text }}>Rechtliche Grundlage</Text>
              <Text style={s.muted}>{frage.rechtsgrundlage}</Text>
            </View>
          </View>
        ) : null}
      </Card>
      {begriffe.length && interaktiv ? (
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="book-outline" size={20} color={C.primary} />
            <Text style={[s.h3, { marginLeft: 8 }]}>{begriffe.length > 1 ? 'Fachbegriffe' : 'Fachbegriff'}</Text>
          </View>
          <View style={{ gap: 16 }}>
            {begriffe.map((id) => <GlossarInhalt key={id} id={id} kompakt />)}
          </View>
        </Card>
      ) : null}
    </View>
  );
}

export function LesezeichenKnopf({ frageId }: { frageId: string }) {
  const { lesezeichen, toggleLesezeichen } = useApp();
  const an = lesezeichen.includes(frageId);
  return (
    <Pressable onPress={() => toggleLesezeichen(frageId)} hitSlop={12} accessibilityLabel={an ? 'Merken aufheben' : 'Frage merken'}>
      <Ionicons name={an ? 'bookmark' : 'bookmark-outline'} size={24} color={an ? C.gold : C.text} />
    </Pressable>
  );
}

type Antwort = { frage: Frage; ergebnis: Ergebnis };

export default function QuizScreen({ fragen, titel }: { fragen: Frage[]; titel?: string }) {
  const { beantworte, vibration } = useApp();
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const sollScrollen = useRef(false);
  const [index, setIndex] = useState(0);
  const [auswahl, setAuswahl] = useState<number[]>([]);
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(null);
  const [antworten, setAntworten] = useState<Antwort[]>([]);
  const [fertig, setFertig] = useState(false);
  // Rückmeldung nach dem Prüfen: Leiste gleitet hoch, Symbol springt (richtig) oder wackelt (falsch)
  const leiste = useRef(new Animated.Value(0)).current;
  const symbol = useRef(new Animated.Value(1)).current;
  const wackeln = useRef(new Animated.Value(0)).current;

  if (fertig) return <QuizAuswertung antworten={antworten} titel={titel} />;

  const frage = fragen[index];
  const aufgedeckt = ergebnis !== null;
  const letzte = index + 1 >= fragen.length;

  const pruefen = () => {
    const e = bewerte(frage, auswahl);
    const art = e.punkte === e.max ? 'richtig' : e.punkte > 0 ? 'teilweise' : 'falsch';
    vibriere(art, vibration);
    leiste.setValue(0);
    symbol.setValue(art === 'falsch' ? 1 : 0.3);
    wackeln.setValue(0);
    Animated.parallel([
      Animated.spring(leiste, { toValue: 1, useNativeDriver: true, friction: 8, tension: 80 }),
      art === 'falsch'
        ? Animated.sequence([
            Animated.delay(120),
            ...[8, -8, 6, -6, 0].map((x) => Animated.timing(wackeln, { toValue: x, duration: 55, useNativeDriver: true })),
          ])
        : Animated.sequence([
            Animated.delay(120),
            Animated.spring(symbol, { toValue: 1, useNativeDriver: true, friction: 4, tension: 140 }),
          ]),
    ]).start();
    sollScrollen.current = true;
    setErgebnis(e);
    beantworte(frage, e);
    setAntworten((a) => [...a, { frage, ergebnis: e }]);
  };
  const weiter = () => {
    if (letzte) return setFertig(true);
    setIndex(index + 1);
    setAuswahl([]);
    setErgebnis(null);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const voll = ergebnis && ergebnis.punkte === ergebnis.max;
  const teil = ergebnis && !voll && ergebnis.punkte > 0;
  const leisteFarbe = voll ? C.success : teil ? C.warn : C.danger;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
      <ScreenHeader
        title={`Frage ${index + 1} von ${fragen.length}`}
        onClose={nav.zurueck}
        art="schliessen"
        right={<LesezeichenKnopf frageId={frage.id} />}
      />
      <View style={{ paddingHorizontal: 20, marginBottom: 6 }}>
        <ProgressBar value={(index + (aufgedeckt ? 1 : 0)) / fragen.length} />
      </View>
      <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
        <FrageKopf frage={frage} interaktiv />
        <AntwortListe
          frage={frage}
          auswahl={auswahl}
          aufgedeckt={aufgedeckt}
          interaktiv
          onWaehle={(i) => {
            const neu = waehle(frage, auswahl, i);
            if (neu !== auswahl) vibriere('auswahl', vibration);
            setAuswahl(neu);
          }}
        />

        {aufgedeckt ? (
          <View
            style={{ marginTop: 20 }}
            onLayout={(e) => {
              // Nach dem Antworten automatisch zur Erklärung scrollen
              if (!sollScrollen.current) return;
              sollScrollen.current = false;
              const y = e.nativeEvent.layout.y;
              setTimeout(() => scrollRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true }), 50);
            }}
          >
            <ErklaerungKarte frage={frage} />
          </View>
        ) : index === 0 ? (
          // Hinweis nur bei der ersten Frage einer Runde, nicht bei jeder
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <Ionicons name="information-circle-outline" size={18} color={C.muted} />
            <Text style={[s.muted, { marginLeft: 6, flex: 1 }]}>Blaue Wörter antippen für Erklärung und Übersetzung.</Text>
          </View>
        ) : null}
      </ScrollView>

      {aufgedeckt && ergebnis ? (
        // Farbige Leiste unten: grün = richtig, orange = teilweise, rot = falsch
        <Animated.View style={{
          backgroundColor: leisteFarbe, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 14 + insets.bottom, borderTopLeftRadius: 20, borderTopRightRadius: 20,
          opacity: leiste.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }),
          transform: [{ translateY: leiste.interpolate({ inputRange: [0, 1], outputRange: [60, 0] }) }],
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Animated.View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', transform: [{ scale: symbol }, { translateX: wackeln }] }}>
              <Ionicons name={voll ? 'checkmark' : teil ? 'remove' : 'close'} size={24} color={leisteFarbe} />
            </Animated.View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>{voll ? 'Richtig!' : teil ? 'Teilweise richtig' : 'Falsch'}</Text>
              <Text style={{ color: '#fff', opacity: 0.9 }}>
                {ergebnis.punkte} von {ergebnis.max} {ergebnis.max === 1 ? 'Punkt' : 'Punkten'} · Erklärung siehe oben
              </Text>
            </View>
          </View>
          <Button title={letzte ? 'Zur Auswertung' : 'Weiter'} icon="arrow-forward" variant="weiss" farbe={leisteFarbe} onPress={weiter} />
        </Animated.View>
      ) : (
        <View style={{ padding: 16, paddingBottom: 16 + insets.bottom, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.card }}>
          <Button title="Antwort prüfen" icon="arrow-forward" onPress={pruefen} disabled={auswahl.length === 0} />
        </View>
      )}
    </SafeAreaView>
  );
}

function QuizAuswertung({ antworten, titel }: { antworten: Antwort[]; titel?: string }) {
  const nav = useNav();
  const punkte = antworten.reduce((n, a) => n + a.ergebnis.punkte, 0);
  const max = antworten.reduce((n, a) => n + a.ergebnis.max, 0);
  const richtig = antworten.filter((a) => a.ergebnis.punkte === a.ergebnis.max).length;
  const falsche = antworten.filter((a) => a.ergebnis.punkte < a.ergebnis.max).map((a) => a.frage);
  const quote = max ? punkte / max : 0;
  const gut = quote >= 0.5;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScreenHeader title={titel ?? 'Auswertung'} onClose={nav.zurueck} art="schliessen" />
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
        <Card style={{ alignItems: 'center', padding: 28 }}>
          <Ionicons name={gut ? 'trophy-outline' : 'refresh-outline'} size={52} color={gut ? C.gold : C.warn} />
          <Text style={[s.h1, { marginTop: 12 }]}>{Math.round(quote * 100)} %</Text>
          <Text style={[s.muted, { marginTop: 6 }]}>{richtig} von {antworten.length} Fragen ganz richtig · {punkte} von {max} Punkten</Text>
          <Text style={[s.body, { marginTop: 16, textAlign: 'center' }]}>
            {quote >= 0.8 ? 'Sehr gut! Das sitzt schon richtig.' : gut ? 'Gut gemacht! Bleib dran.' : 'Nicht schlimm – wiederhole die Fragen, die noch nicht sitzen.'}
          </Text>
          {falsche.length ? (
            <Text style={[s.muted, { marginTop: 10, textAlign: 'center' }]}>
              Falsche Fragen landen automatisch unter „Meine Fehler“, bis du sie zweimal hintereinander richtig hast.
            </Text>
          ) : null}
        </Card>
      </ScrollView>
      <View style={{ padding: 20, gap: 10 }}>
        {falsche.length ? (
          <Button
            title={`Falsche nochmal üben (${falsche.length})`}
            icon="refresh"
            variant="secondary"
            onPress={() => nav.ersetze({ name: 'quiz', fragen: falsche, titel: 'Fehler wiederholen' })}
          />
        ) : null}
        <Button title="Fertig" onPress={nav.zurueck} />
      </View>
    </SafeAreaView>
  );
}
