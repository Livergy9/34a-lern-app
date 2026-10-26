import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { fragenFuer } from '../data/fragen';
import { PRUEFUNG, SACHGEBIETE } from '../data/sachgebiete';
import { Frage } from '../data/types';
import { heute } from '../datum';
import { mischen } from '../lernstand';
import { useNav } from '../nav';
import { PREMIUM, pruefungFrei } from '../premium';
import { bewerte, useApp } from '../state';
import { Button, C, Card, IconBox, ProgressBar, s, ScreenHeader } from '../ui';
import { AntwortListe, FrageKopf, waehle } from './QuizScreen';

type Art = 'echt' | 'kurz';
const ARTEN: Record<Art, { fragen: number; minuten: number; titel: string; text: string }> = {
  echt: { fragen: PRUEFUNG.fragen, minuten: PRUEFUNG.minuten, titel: 'Echte Prüfung', text: `${PRUEFUNG.fragen} Fragen · ${PRUEFUNG.minuten} Minuten – wie bei der IHK` },
  kurz: { fragen: 20, minuten: 30, titel: 'Kurztest', text: '20 Fragen · 30 Minuten – für zwischendurch' },
};

// Fragen nach der Verteilung der echten Prüfung ziehen: pro Sachgebiet so viele Fragen wie in der Prüfung,
// davon (Punkte − Fragen) Multiple Choice mit je 2 Punkten. Echte Prüfung = genau 82 Fragen und 120 Punkte.
// Kurztest: dieselbe Verteilung verkleinert.
export function stelleZusammen(anzahl: number): Frage[] {
  const echt = anzahl === PRUEFUNG.fragen;
  const liste: Frage[] = [];
  for (const sg of SACHGEBIETE) {
    const n = echt ? sg.fragenInPruefung : Math.max(1, Math.round((sg.fragenInPruefung * anzahl) / PRUEFUNG.fragen));
    const mcSoll = Math.round(((sg.punkteInPruefung - sg.fragenInPruefung) * n) / sg.fragenInPruefung);
    const pool = fragenFuer(sg.id);
    const multi = mischen(pool.filter((f) => f.typ === 'multi'));
    const single = mischen(pool.filter((f) => f.typ === 'single'));
    const mc = multi.slice(0, Math.min(mcSoll, n));
    const sc = single.slice(0, n - mc.length);
    // Falls ein Typ nicht reicht, mit dem anderen auffüllen, damit die Fragenzahl stimmt
    const rest = [...multi.slice(mc.length), ...single.slice(sc.length)].slice(0, n - mc.length - sc.length);
    liste.push(...mischen([...mc, ...sc, ...rest]));
  }
  return liste.slice(0, anzahl); // Reihenfolge nach Sachgebieten wie in der echten Prüfung
}

const mmss = (sek: number) => {
  const h = Math.floor(sek / 3600), m = Math.floor((sek % 3600) / 60), x = sek % 60;
  const z = (n: number) => String(n).padStart(2, '0');
  return h ? `${h}:${z(m)}:${z(x)}` : `${z(m)}:${z(x)}`;
};

export default function PruefungScreen() {
  const app = useApp();
  const nav = useNav();
  const [phase, setPhase] = useState<'intro' | 'laeuft' | 'fertig'>('intro');
  const [art, setArt] = useState<Art>('echt');
  const [fragen, setFragen] = useState<Frage[]>([]);
  const [antworten, setAntworten] = useState<Record<string, number[]>>({});
  const [index, setIndex] = useState(0);
  const [rest, setRest] = useState(0);
  const [uebersicht, setUebersicht] = useState(false);
  // Welche Fragen schon angezeigt wurden – damit die Übersicht übersprungene von noch nicht gesehenen unterscheidet
  const [gesehen, setGesehen] = useState<Record<string, true>>({});
  const endeZeit = useRef(0);

  useEffect(() => {
    const id = fragen[index]?.id;
    if (phase === 'laeuft' && id && !gesehen[id]) setGesehen((g) => ({ ...g, [id]: true }));
  }, [phase, index, fragen]);

  // Timer läuft über die Uhrzeit, damit er auch stimmt, wenn die App kurz im Hintergrund war
  useEffect(() => {
    if (phase !== 'laeuft') return;
    const t = setInterval(() => setRest(Math.max(0, Math.round((endeZeit.current - Date.now()) / 1000))), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === 'laeuft' && rest <= 0) abgeben();
  }, [rest, phase]);

  const frei = pruefungFrei(app.premium, app.pruefungen.length);

  const start = (a: Art) => {
    if (!frei) return nav.push({ name: 'premium' });
    setArt(a);
    setFragen(stelleZusammen(ARTEN[a].fragen));
    setAntworten({});
    setGesehen({});
    setIndex(0);
    endeZeit.current = Date.now() + ARTEN[a].minuten * 60 * 1000;
    setRest(ARTEN[a].minuten * 60);
    setPhase('laeuft');
  };

  const auswertung = useMemo(() => {
    let punkte = 0, max = 0;
    const proGebiet: Record<string, { punkte: number; max: number }> = {};
    const falsche: { frage: Frage; auswahl: number[] }[] = [];
    for (const f of fragen) {
      const auswahl = antworten[f.id] ?? [];
      const e = bewerte(f, auswahl);
      punkte += e.punkte; max += e.max;
      const g = (proGebiet[f.sachgebiet] ??= { punkte: 0, max: 0 });
      g.punkte += e.punkte; g.max += e.max;
      if (e.punkte < e.max) falsche.push({ frage: f, auswahl });
    }
    // Wie IHK: bestanden ab 50 % der Punkte (60 von 120)
    return { punkte, max, proGebiet, falsche, bestanden: max > 0 && (punkte / max) * 100 >= PRUEFUNG.bestehenProzent };
  }, [fragen, antworten]);

  function abgeben() {
    if (phase !== 'laeuft') return;
    for (const f of fragen) {
      const auswahl = antworten[f.id];
      if (auswahl?.length) app.beantworte(f, bewerte(f, auswahl));
    }
    app.speicherePruefung({ datum: heute(), punkte: auswertung.punkte, max: auswertung.max, bestanden: auswertung.bestanden, fragen: fragen.length });
    setUebersicht(false);
    setPhase('fertig');
  }

  const unbeantwortet = fragen.filter((f) => !antworten[f.id]?.length).length;
  // Für die Übersicht: beantwortet / übersprungen (gesehen, nichts gewählt, nicht die aktuelle) / offen
  const zustand = (f: Frage, i: number): 'beantwortet' | 'uebersprungen' | 'offen' =>
    antworten[f.id]?.length ? 'beantwortet' : gesehen[f.id] && i !== index ? 'uebersprungen' : 'offen';
  const zaehlung = { beantwortet: 0, uebersprungen: 0, offen: 0 };
  fragen.forEach((f, i) => { zaehlung[zustand(f, i)]++; });
  const abgebenFragen = () => {
    if (!unbeantwortet) return abgeben();
    Alert.alert(
      'Prüfung abgeben?',
      `Du hast ${unbeantwortet} ${unbeantwortet === 1 ? 'Frage' : 'Fragen'} noch nicht beantwortet. Diese zählen 0 Punkte.`,
      [{ text: 'Weiter bearbeiten', style: 'cancel' }, { text: 'Abgeben', style: 'destructive', onPress: abgeben }]
    );
  };
  const abbrechen = () =>
    Alert.alert('Prüfung abbrechen?', 'Dein Ergebnis wird nicht gespeichert.', [
      { text: 'Weitermachen', style: 'cancel' },
      { text: 'Abbrechen', style: 'destructive', onPress: nav.zurueck },
    ]);

  if (phase === 'intro') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <ScreenHeader title="Prüfungssimulation" onClose={nav.zurueck} art="schliessen" />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
          <Card>
            <Text style={s.h2}>So läuft es ab</Text>
            <View style={{ marginTop: 12, gap: 10 }}>
              <Regel icon="layers-outline" text="Fragen aus allen 7 Sachgebieten, verteilt wie in der echten Prüfung" />
              <Regel icon="time-outline" text="Die Zeit läuft – am Ende wird automatisch abgegeben" />
              <Regel icon="ribbon-outline" text={`Bestanden ab ${PRUEFUNG.bestehenProzent} % der Punkte (bei der IHK 60 von ${PRUEFUNG.punkte})`} />
              <Regel icon="language-outline" text="Nur Deutsch – keine Übersetzungen und keine Erklärungen, wie in der echten Prüfung" />
              <Regel icon="grid-outline" text="Du kannst Fragen überspringen und später über die Übersicht zurückkommen" />
            </View>
          </Card>
          {(Object.keys(ARTEN) as Art[]).map((a) => (
            <Pressable key={a} onPress={() => start(a)} style={({ pressed }) => pressed && { opacity: 0.85 }}>
              <Card style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconBox icon={a === 'echt' ? 'timer-outline' : 'flash-outline'} farbe={a === 'echt' ? C.danger : '#6D5BD0'} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={s.h3}>{ARTEN[a].titel}</Text>
                  <Text style={s.muted}>{ARTEN[a].text}</Text>
                </View>
                <Ionicons name={frei ? 'play-circle' : 'lock-closed'} size={frei ? 30 : 20} color={frei ? C.primary : C.gold} />
              </Card>
            </Pressable>
          ))}
          {!app.premium ? (
            <Text style={[s.muted, { paddingHorizontal: 4 }]}>
              {frei ? `Gratis: ${PREMIUM.gratisPruefungen} Simulation. Danach mit Premium unbegrenzt.` : 'Deine Gratis-Simulation ist verbraucht. Mit Premium unbegrenzt.'}
            </Text>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (phase === 'fertig') {
    const a = auswertung;
    const pct = a.max ? Math.round((a.punkte / a.max) * 100) : 0;
    // Hochgerechnet auf die echte Prüfung mit 120 Punkten
    const hochgerechnet = Math.round((pct / 100) * PRUEFUNG.punkte);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <ScreenHeader title="Ergebnis" onClose={nav.zurueck} art="schliessen" />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
          <Card style={{ alignItems: 'center', backgroundColor: a.bestanden ? C.successSoft : C.dangerSoft }}>
            <Ionicons name={a.bestanden ? 'checkmark-circle' : 'close-circle'} size={56} color={a.bestanden ? C.success : C.danger} />
            <Text style={[s.h1, { marginTop: 8 }]}>{a.bestanden ? 'Bestanden' : 'Nicht bestanden'}</Text>
            <Text style={[s.body, { marginTop: 4 }]}>{a.punkte} von {a.max} Punkten ({pct} %)</Text>
            {art === 'kurz' ? (
              <Text style={[s.muted, { marginTop: 4 }]}>Das wären ca. {hochgerechnet} von {PRUEFUNG.punkte} Punkten in der echten Prüfung.</Text>
            ) : null}
          </Card>
          <Card>
            <Text style={[s.h3, { marginBottom: 12 }]}>Nach Sachgebieten</Text>
            <View style={{ gap: 14 }}>
              {SACHGEBIETE.filter((sg) => a.proGebiet[sg.id]).map((sg) => {
                const g = a.proGebiet[sg.id];
                const q = g.max ? g.punkte / g.max : 0;
                return (
                  <View key={sg.id}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <Text style={{ color: C.text, fontWeight: '600' }}>{sg.kurz}</Text>
                      <Text style={s.muted}>{g.punkte}/{g.max}</Text>
                    </View>
                    <ProgressBar value={q} color={q >= 0.5 ? C.success : C.danger} height={8} />
                  </View>
                );
              })}
            </View>
            <Text style={[s.muted, { marginTop: 14, fontSize: 13 }]}>Rot = unter 50 %. Diese Sachgebiete solltest du noch üben.</Text>
          </Card>
        </ScrollView>
        <View style={{ padding: 20, gap: 10 }}>
          {a.falsche.length ? (
            <>
              <Button
                title={`Fehler ansehen (${a.falsche.length})`}
                variant="secondary"
                onPress={() => nav.push({ name: 'durchsicht', titel: 'Fehler aus der Prüfung', eintraege: a.falsche })}
              />
              <Button title="Fehler jetzt üben" icon="refresh" onPress={() => nav.ersetze({ name: 'quiz', fragen: a.falsche.map((x) => x.frage), titel: 'Fehler aus der Prüfung' })} />
            </>
          ) : (
            <Button title="Fertig" onPress={nav.zurueck} />
          )}
        </View>
      </SafeAreaView>
    );
  }

  const frage = fragen[index];
  if (!frage) return null;
  const auswahl = antworten[frage.id] ?? [];
  const letzte = index + 1 >= fragen.length;
  const knapp = rest < 5 * 60;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScreenHeader
        title={`Frage ${index + 1} von ${fragen.length}`}
        onClose={abbrechen}
        art="schliessen"
        right={
          <Pressable onPress={() => setUebersicht(true)} hitSlop={12} accessibilityLabel="Übersicht">
            <Ionicons name="grid-outline" size={22} color={C.text} />
          </Pressable>
        }
      />
      <View style={{ paddingHorizontal: 20, marginBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}><ProgressBar value={(fragen.length - unbeantwortet) / fragen.length} /></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
          <Ionicons name="time-outline" size={16} color={knapp ? C.danger : C.muted} />
          <Text style={{ marginLeft: 4, fontWeight: '700', color: knapp ? C.danger : C.text, fontVariant: ['tabular-nums'] }}>{mmss(rest)}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <FrageKopf frage={frage} interaktiv={false} zeigeSchwierigkeit={false} />
        <AntwortListe
          frage={frage} auswahl={auswahl} aufgedeckt={false} interaktiv={false}
          onWaehle={(i) => setAntworten({ ...antworten, [frage.id]: waehle(frage, auswahl, i) })}
        />
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 12, padding: 16, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.card }}>
        <Button title="Zurück" variant="secondary" onPress={() => setIndex(index - 1)} disabled={index === 0} style={{ flex: 1 }} />
        {letzte ? (
          <Button title="Abgeben" icon="checkmark" onPress={abgebenFragen} style={{ flex: 2 }} />
        ) : (
          <Button title={auswahl.length ? 'Weiter' : 'Überspringen'} icon="arrow-forward" onPress={() => setIndex(index + 1)} style={{ flex: 2 }} />
        )}
      </View>

      {/* Übersicht: alle Fragen als Kästchen, zum Springen */}
      <Modal visible={uebersicht} transparent animationType="slide" onRequestClose={() => setUebersicht(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(15,23,42,0.35)' }} onPress={() => setUebersicht(false)} />
        <View style={{ backgroundColor: C.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 36, maxHeight: '75%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text style={[s.h3, { flex: 1 }]}>Übersicht</Text>
            <Pressable onPress={() => setUebersicht(false)} hitSlop={12} accessibilityLabel="Übersicht schließen"><Ionicons name="close" size={24} color={C.muted} /></Pressable>
          </View>
          {/* Legende mit Anzahl je Zustand */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 14 }}>
            {(['beantwortet', 'uebersprungen', 'offen'] as const).map((z) => (
              <View key={z} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[stil.punkt, KACHEL[z].kachel]} />
                <Text style={[s.muted, { marginLeft: 6, fontSize: 13 }]}>{zaehlung[z]} {KACHEL[z].label}</Text>
              </View>
            ))}
          </View>
          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {fragen.map((f, i) => {
              const z = zustand(f, i);
              const aktuell = i === index;
              return (
                <Pressable
                  key={f.id}
                  onPress={() => { setIndex(i); setUebersicht(false); }}
                  accessibilityLabel={`Frage ${i + 1}, ${KACHEL[z].label}${aktuell ? ', aktuell' : ''}`}
                  style={[
                    { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
                    KACHEL[z].kachel,
                    aktuell && { borderColor: C.text },
                  ]}
                >
                  <Text style={{ color: KACHEL[z].text, fontWeight: '600' }}>{i + 1}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <Button title="Prüfung abgeben" icon="checkmark" onPress={abgebenFragen} style={{ marginTop: 16 }} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Aussehen der Kacheln in der Übersicht. Rahmen immer 2 px, damit die aktuelle Frage nicht springt.
const KACHEL = {
  beantwortet: { label: 'beantwortet', kachel: { backgroundColor: C.primary, borderWidth: 2, borderColor: C.primary }, text: '#fff' },
  uebersprungen: { label: 'übersprungen', kachel: { backgroundColor: C.border, borderWidth: 2, borderColor: C.border }, text: C.muted },
  offen: { label: 'offen', kachel: { backgroundColor: C.card, borderWidth: 2, borderColor: C.border }, text: C.text },
};
const stil = { punkt: { width: 14, height: 14, borderRadius: 4 } };

function Regel({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <Ionicons name={icon} size={20} color={C.muted} />
      <Text style={[s.body, { marginLeft: 10, flex: 1, fontSize: 15 }]}>{text}</Text>
    </View>
  );
}
