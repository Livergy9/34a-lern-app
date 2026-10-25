import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Frage } from '../data/types';
import { sachgebietById } from '../data/sachgebiete';
import { bewerte, Ergebnis, useApp } from '../state';
import { begriffeIn, Button, C, Card, Chip, GlossarInhalt, ProgressBar, s, ScreenHeader, TermText } from '../ui';

const BUCHSTABEN = ['A', 'B', 'C', 'D', 'E', 'F'];
const SCHWIERIGKEIT = { 1: 'Leicht', 2: 'Mittel', 3: 'Schwer' } as const;

export const anzahlHinweis = (f: Frage) =>
  f.typ === 'single' ? '1 richtige Antwort' : `${f.richtig.length} richtige Antworten`;

export function waehle(f: Frage, auswahl: number[], i: number): number[] {
  if (f.typ === 'single') return [i];
  return auswahl.includes(i) ? auswahl.filter((a) => a !== i) : [...auswahl, i];
}

export function AntwortListe({
  frage, auswahl, onWaehle, aufgedeckt, interaktiv,
}: {
  frage: Frage; auswahl: number[]; onWaehle: (i: number) => void; aufgedeckt: boolean; interaktiv: boolean;
}) {
  return (
    <View style={{ gap: 10 }}>
      {frage.antworten.map((a, i) => {
        const gewaehlt = auswahl.includes(i);
        const richtig = frage.richtig.includes(i);
        let border = C.border, bg = C.card, kreisBg = C.bg, kreisFarbe = C.text, icon: 'checkmark-circle' | 'close-circle' | null = null;
        if (!aufgedeckt && gewaehlt) { border = C.primary; bg = C.primarySoft; kreisBg = C.primary; kreisFarbe = '#fff'; }
        if (aufgedeckt && richtig) { border = C.success; bg = gewaehlt ? C.successSoft : C.card; kreisBg = C.success; kreisFarbe = '#fff'; icon = 'checkmark-circle'; }
        if (aufgedeckt && gewaehlt && !richtig) { border = C.danger; bg = C.dangerSoft; kreisBg = C.danger; kreisFarbe = '#fff'; icon = 'close-circle'; }
        return (
          <Pressable
            key={i}
            disabled={aufgedeckt}
            onPress={() => onWaehle(i)}
            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: border, backgroundColor: bg, borderRadius: 16, padding: 14 }}
          >
            <View style={{
              width: 34, height: 34, borderRadius: frage.typ === 'multi' ? 9 : 17, backgroundColor: kreisBg,
              alignItems: 'center', justifyContent: 'center', marginRight: 12,
            }}>
              <Text style={{ fontWeight: '700', color: kreisFarbe }}>{BUCHSTABEN[i]}</Text>
            </View>
            <TermText text={a} interaktiv={interaktiv} style={[s.body, { flex: 1 }]} />
            {icon ? <Ionicons name={icon} size={22} color={icon === 'checkmark-circle' ? C.success : C.danger} style={{ marginLeft: 8 }} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

export function FrageKopf({ frage, interaktiv }: { frage: Frage; interaktiv: boolean }) {
  const sg = sachgebietById(frage.sachgebiet);
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
        <Chip label={sg.kurz} icon={sg.icon as any} />
        <Chip label={SCHWIERIGKEIT[frage.schwierigkeit]} color={C.warn} bg={C.warnSoft} />
      </View>
      <TermText text={frage.text} interaktiv={interaktiv} style={{ fontSize: 21, lineHeight: 29, fontWeight: '700', color: C.text }} />
      <Text style={[s.muted, { marginTop: 8, marginBottom: 16 }]}>
        {frage.typ === 'multi' ? 'Mehrfachauswahl · ' : ''}{anzahlHinweis(frage)}
      </Text>
    </View>
  );
}

export default function QuizScreen({ fragen, onClose }: { fragen: Frage[]; onClose: () => void }) {
  const { speichereErgebnis } = useApp();
  const [index, setIndex] = useState(0);
  const [auswahl, setAuswahl] = useState<number[]>([]);
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(null);
  const [summe, setSumme] = useState({ punkte: 0, max: 0 });
  const [fertig, setFertig] = useState(false);

  if (fertig) {
    const quote = summe.max ? summe.punkte / summe.max : 0;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <ScreenHeader title="Auswertung" onClose={onClose} />
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          <Card style={{ alignItems: 'center', padding: 28 }}>
            <Ionicons name={quote >= 0.5 ? 'trophy-outline' : 'refresh-outline'} size={48} color={quote >= 0.5 ? C.success : C.warn} />
            <Text style={[s.h1, { marginTop: 12 }]}>{Math.round(quote * 100)} %</Text>
            <Text style={[s.muted, { marginTop: 6 }]}>{summe.punkte} von {summe.max} Punkten</Text>
            <Text style={[s.body, { marginTop: 16, textAlign: 'center' }]}>
              {quote >= 0.5 ? 'Gut gemacht! Bleib dran.' : 'Wiederhole die Fragen, die noch nicht sitzen.'}
            </Text>
          </Card>
        </View>
        <View style={{ padding: 20 }}>
          <Button title="Fertig" onPress={onClose} />
        </View>
      </SafeAreaView>
    );
  }

  const frage = fragen[index];
  const aufgedeckt = ergebnis !== null;

  const pruefen = () => {
    const e = bewerte(frage, auswahl);
    setErgebnis(e);
    speichereErgebnis(frage.id, e);
    setSumme((x) => ({ punkte: x.punkte + e.punkte, max: x.max + e.max }));
  };
  const weiter = () => {
    if (index + 1 >= fragen.length) return setFertig(true);
    setIndex(index + 1);
    setAuswahl([]);
    setErgebnis(null);
  };

  const begriffe = begriffeIn([frage.text, ...frage.antworten, frage.erklaerung].join(' '));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScreenHeader title={`Frage ${index + 1} von ${fragen.length}`} onClose={onClose} />
      <View style={{ paddingHorizontal: 20, marginBottom: 6 }}>
        <ProgressBar value={(index + (aufgedeckt ? 1 : 0)) / fragen.length} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {aufgedeckt && ergebnis ? <ErgebnisBanner e={ergebnis} /> : null}
        <FrageKopf frage={frage} interaktiv />
        <AntwortListe frage={frage} auswahl={auswahl} aufgedeckt={aufgedeckt} interaktiv onWaehle={(i) => setAuswahl(waehle(frage, auswahl, i))} />

        {aufgedeckt ? (
          <View style={{ gap: 12, marginTop: 20 }}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="document-text-outline" size={20} color={C.primary} />
                <Text style={[s.h3, { marginLeft: 8 }]}>Erklärung</Text>
              </View>
              <TermText text={frage.erklaerung} style={s.body} />
              {frage.rechtsgrundlage ? (
                <View style={{ marginTop: 14, backgroundColor: C.bg, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="library-outline" size={18} color={C.muted} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: '600', color: C.text }}>Rechtliche Grundlage</Text>
                    <Text style={s.muted}>{frage.rechtsgrundlage}</Text>
                  </View>
                </View>
              ) : null}
            </Card>
            {begriffe.length ? (
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
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <Ionicons name="information-circle-outline" size={18} color={C.muted} />
            <Text style={[s.muted, { marginLeft: 6, flex: 1 }]}>Tippe auf blau unterstrichene Wörter für Übersetzung und Erklärung.</Text>
          </View>
        )}
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 12, padding: 16, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.card }}>
        {aufgedeckt ? (
          <Button title={index + 1 >= fragen.length ? 'Auswertung' : 'Nächste Frage'} icon="arrow-forward" onPress={weiter} style={{ flex: 1 }} />
        ) : (
          <Button title="Antwort prüfen" icon="arrow-forward" onPress={pruefen} disabled={auswahl.length === 0} style={{ flex: 1 }} />
        )}
      </View>
    </SafeAreaView>
  );
}

function ErgebnisBanner({ e }: { e: Ergebnis }) {
  const voll = e.punkte === e.max;
  const teil = !voll && e.punkte > 0;
  const farbe = voll ? C.success : teil ? C.warn : C.danger;
  const bg = voll ? C.successSoft : teil ? C.warnSoft : C.dangerSoft;
  const titel = voll ? 'Richtig!' : teil ? 'Teilweise richtig' : 'Leider falsch';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: bg, borderRadius: 18, padding: 16, marginBottom: 18 }}>
      <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: farbe, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={voll ? 'checkmark' : teil ? 'remove' : 'close'} size={26} color="#fff" />
      </View>
      <View style={{ marginLeft: 14 }}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: C.text }}>{titel}</Text>
        <Text style={s.muted}>{e.punkte} von {e.max} {e.max === 1 ? 'Punkt' : 'Punkten'}</Text>
      </View>
    </View>
  );
}
