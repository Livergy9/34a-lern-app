import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FRAGEN } from '../data/fragen';
import { PRUEFUNG, SACHGEBIETE } from '../data/sachgebiete';
import { Frage } from '../data/types';
import { bewerte, useApp } from '../state';
import { Button, C, Card, ProgressBar, s, ScreenHeader } from '../ui';
import { AntwortListe, FrageKopf, waehle } from './QuizScreen';

function mischen<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const mmss = (sek: number) => `${String(Math.floor(sek / 60)).padStart(2, '0')}:${String(sek % 60).padStart(2, '0')}`;

export default function PruefungScreen({ onClose }: { onClose: () => void }) {
  const { speichereErgebnis } = useApp();
  const [phase, setPhase] = useState<'intro' | 'laeuft' | 'fertig'>('intro');
  const [fragen, setFragen] = useState<Frage[]>([]);
  const [antworten, setAntworten] = useState<Record<string, number[]>>({});
  const [index, setIndex] = useState(0);
  // Zeit anteilig zur echten Prüfung (120 Min. für 82 Fragen)
  const minuten = Math.max(5, Math.round((PRUEFUNG.minuten * FRAGEN.length) / PRUEFUNG.fragen));
  const [rest, setRest] = useState(minuten * 60);

  useEffect(() => {
    if (phase !== 'laeuft') return;
    const t = setInterval(() => setRest((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === 'laeuft' && rest <= 0) abgeben();
  }, [rest, phase]);

  const start = () => {
    setFragen(mischen(FRAGEN));
    setAntworten({});
    setIndex(0);
    setRest(minuten * 60);
    setPhase('laeuft');
  };

  const abgeben = () => {
    fragen.forEach((f) => speichereErgebnis(f.id, bewerte(f, antworten[f.id] ?? [])));
    setPhase('fertig');
  };

  const auswertung = useMemo(() => {
    if (phase !== 'fertig') return null;
    let punkte = 0, max = 0;
    const proGebiet: Record<string, { punkte: number; max: number }> = {};
    for (const f of fragen) {
      const e = bewerte(f, antworten[f.id] ?? []);
      punkte += e.punkte; max += e.max;
      const g = (proGebiet[f.sachgebiet] ??= { punkte: 0, max: 0 });
      g.punkte += e.punkte; g.max += e.max;
    }
    return { punkte, max, proGebiet, bestanden: max > 0 && (punkte / max) * 100 >= PRUEFUNG.bestehenProzent };
  }, [phase]);

  if (phase === 'intro') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <ScreenHeader title="Prüfungssimulation" onClose={onClose} />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
          <Card>
            <Ionicons name="timer-outline" size={32} color={C.primary} />
            <Text style={[s.h2, { marginTop: 10 }]}>So läuft die Simulation</Text>
            <View style={{ marginTop: 12, gap: 10 }}>
              <Regel icon="help-circle-outline" text={`${FRAGEN.length} Fragen aus allen Sachgebieten`} />
              <Regel icon="time-outline" text={`${minuten} Minuten Zeit`} />
              <Regel icon="ribbon-outline" text={`Bestanden ab ${PRUEFUNG.bestehenProzent} % der Punkte`} />
              <Regel icon="language-outline" text="Nur Deutsch – keine Übersetzungen und keine Erklärungen, wie in der echten Prüfung" />
            </View>
          </Card>
          <Text style={[s.muted, { paddingHorizontal: 4 }]}>
            Die echte IHK-Prüfung hat {PRUEFUNG.fragen} Fragen, {PRUEFUNG.punkte} Punkte und {PRUEFUNG.minuten} Minuten. Im Prototyp ist die Simulation verkürzt.
          </Text>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button title="Prüfung starten" icon="play" onPress={start} />
        </View>
      </SafeAreaView>
    );
  }

  if (phase === 'fertig' && auswertung) {
    const pct = auswertung.max ? Math.round((auswertung.punkte / auswertung.max) * 100) : 0;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <ScreenHeader title="Ergebnis" onClose={onClose} />
        <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
          <Card style={{ alignItems: 'center', backgroundColor: auswertung.bestanden ? C.successSoft : C.dangerSoft }}>
            <Ionicons name={auswertung.bestanden ? 'checkmark-circle' : 'close-circle'} size={52} color={auswertung.bestanden ? C.success : C.danger} />
            <Text style={[s.h1, { marginTop: 8 }]}>{auswertung.bestanden ? 'Bestanden' : 'Nicht bestanden'}</Text>
            <Text style={[s.body, { marginTop: 4 }]}>{auswertung.punkte} von {auswertung.max} Punkten ({pct} %)</Text>
          </Card>
          <Card>
            <Text style={[s.h3, { marginBottom: 12 }]}>Nach Sachgebieten</Text>
            <View style={{ gap: 14 }}>
              {SACHGEBIETE.filter((sg) => auswertung.proGebiet[sg.id]).map((sg) => {
                const g = auswertung.proGebiet[sg.id];
                const q = g.punkte / g.max;
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
          </Card>
        </ScrollView>
        <View style={{ padding: 20, gap: 10 }}>
          <Button title="Noch einmal" variant="secondary" onPress={start} />
          <Button title="Fertig" onPress={onClose} />
        </View>
      </SafeAreaView>
    );
  }

  const frage = fragen[index];
  const auswahl = antworten[frage.id] ?? [];
  const letzte = index + 1 >= fragen.length;
  const knapp = rest < 60;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScreenHeader
        title={`Frage ${index + 1} von ${fragen.length}`}
        onClose={onClose}
        right={<Text style={{ fontWeight: '700', color: knapp ? C.danger : C.text, fontVariant: ['tabular-nums'] }}>{mmss(Math.max(0, rest))}</Text>}
      />
      <View style={{ paddingHorizontal: 20, marginBottom: 6 }}>
        <ProgressBar value={(index + 1) / fragen.length} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <FrageKopf frage={frage} interaktiv={false} />
        <AntwortListe
          frage={frage} auswahl={auswahl} aufgedeckt={false} interaktiv={false}
          onWaehle={(i) => setAntworten({ ...antworten, [frage.id]: waehle(frage, auswahl, i) })}
        />
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 12, padding: 16, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.card }}>
        <Button title="Zurück" variant="secondary" onPress={() => setIndex(index - 1)} disabled={index === 0} style={{ flex: 1 }} />
        {letzte ? (
          <Button title="Abgeben" icon="checkmark" onPress={abgeben} style={{ flex: 2 }} />
        ) : (
          <Button title="Weiter" icon="arrow-forward" onPress={() => setIndex(index + 1)} style={{ flex: 2 }} />
        )}
      </View>
    </SafeAreaView>
  );
}

function Regel({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <Ionicons name={icon} size={20} color={C.muted} />
      <Text style={[s.body, { marginLeft: 10, flex: 1 }]}>{text}</Text>
    </View>
  );
}
