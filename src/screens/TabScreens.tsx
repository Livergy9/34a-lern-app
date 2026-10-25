import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FRAGEN, fragenFuer } from '../data/fragen';
import { GLOSSAR } from '../data/glossar';
import { SACHGEBIETE } from '../data/sachgebiete';
import { Frage, HilfeSprache } from '../data/types';
import { useApp } from '../state';
import { Button, C, Card, ProgressBar, s, SPRACHEN } from '../ui';

export type Nav = {
  starteQuiz: (fragen: Frage[]) => void;
  startePruefung: () => void;
  geheZuTab: (tab: 'start' | 'lernen' | 'glossar' | 'mehr') => void;
};

function useStatistik() {
  const { fortschritt } = useApp();
  return useMemo(() => {
    const bearbeitet = (liste: Frage[]) => liste.filter((f) => fortschritt[f.id]).length;
    const falsch = FRAGEN.filter((f) => fortschritt[f.id] && fortschritt[f.id].punkte < fortschritt[f.id].max);
    return { bearbeitet, falsch };
  }, [fortschritt]);
}

const zufaellig = (n: number) => [...FRAGEN].sort(() => Math.random() - 0.5).slice(0, n);

export function StartScreen({ nav }: { nav: Nav }) {
  const { bearbeitet, falsch } = useStatistik();
  const naechstes = SACHGEBIETE.find((sg) => bearbeitet(fragenFuer(sg.id)) < fragenFuer(sg.id).length) ?? SACHGEBIETE[0];
  const sgFragen = fragenFuer(naechstes.id);
  const gesamt = bearbeitet(FRAGEN);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../assets/logo.png')} style={{ width: 56, height: 56, borderRadius: 14 }} />
        <View style={{ marginLeft: 12 }}>
          <Text style={s.h1}>34a Easy</Text>
          <Text style={[s.muted, { marginTop: 2 }]}>Sachkundeprüfung nach § 34a GewO</Text>
        </View>
      </View>

      <Card style={{ marginTop: 22 }}>
        <Pressable onPress={() => nav.starteQuiz(sgFragen)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={naechstes.icon as any} size={30} color="#fff" />
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={s.muted}>Weiterlernen</Text>
            <Text style={[s.h3, { marginTop: 2 }]} numberOfLines={2}>{naechstes.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <View style={{ flex: 1 }}><ProgressBar value={bearbeitet(sgFragen) / sgFragen.length} /></View>
              <Text style={[s.muted, { marginLeft: 8, fontSize: 13 }]}>{bearbeitet(sgFragen)}/{sgFragen.length}</Text>
            </View>
          </View>
        </Pressable>
        <Button title="Jetzt weiterlernen" icon="arrow-forward" onPress={() => nav.starteQuiz(sgFragen)} style={{ marginTop: 16 }} />
      </Card>

      <Text style={[s.h2, { marginTop: 28, marginBottom: 12 }]}>Dein Fortschritt</Text>
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: C.primary }}>{Math.round((gesamt / FRAGEN.length) * 100)} %</Text>
          <Text style={s.muted}>{gesamt} von {FRAGEN.length} Fragen bearbeitet</Text>
        </View>
        <View style={{ marginTop: 12 }}><ProgressBar value={gesamt / FRAGEN.length} height={10} /></View>
      </Card>

      <Text style={[s.h2, { marginTop: 28, marginBottom: 12 }]}>Schnellzugriff</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Kachel icon="flash-outline" farbe="#6D5BD0" titel="Quiz" untertitel="10 gemischte Fragen" onPress={() => nav.starteQuiz(zufaellig(10))} />
        <Kachel icon="timer-outline" farbe={C.danger} titel="Prüfung" untertitel="Simulation" onPress={nav.startePruefung} />
        <Kachel icon="book-outline" farbe={C.success} titel="Glossar" untertitel="Fachbegriffe" onPress={() => nav.geheZuTab('glossar')} />
      </View>
      {falsch.length ? (
        <Card style={{ marginTop: 12 }}>
          <Pressable onPress={() => nav.starteQuiz(falsch)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="refresh-circle-outline" size={28} color={C.warn} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={s.h3}>Fehler wiederholen</Text>
              <Text style={s.muted}>{falsch.length} {falsch.length === 1 ? 'Frage' : 'Fragen'} noch nicht richtig</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={C.faint} />
          </Pressable>
        </Card>
      ) : null}
    </ScrollView>
  );
}

function Kachel({ icon, farbe, titel, untertitel, onPress }: {
  icon: keyof typeof Ionicons.glyphMap; farbe: string; titel: string; untertitel: string; onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.8 : 1 }]}>
      <Card style={{ padding: 14 }}>
        <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: farbe + '1A', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={icon} size={22} color={farbe} />
        </View>
        <Text style={[s.h3, { marginTop: 10 }]}>{titel}</Text>
        <Text style={[s.muted, { fontSize: 12, marginTop: 2 }]}>{untertitel}</Text>
      </Card>
    </Pressable>
  );
}

export function LernenScreen({ nav }: { nav: Nav }) {
  const { bearbeitet } = useStatistik();
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={s.h1}>Lernen</Text>
      <Text style={[s.muted, { marginTop: 6, marginBottom: 18 }]}>Wähle ein Sachgebiet. Lernkapitel kommen in der nächsten Version dazu.</Text>
      <View style={{ gap: 12 }}>
        {SACHGEBIETE.map((sg) => {
          const liste = fragenFuer(sg.id);
          const b = bearbeitet(liste);
          return (
            <Pressable key={sg.id} onPress={() => liste.length && nav.starteQuiz(liste)}>
              <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: C.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={sg.icon as any} size={24} color={C.primary} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={s.h3}>{sg.name}</Text>
                    <Text style={[s.muted, { fontSize: 13, marginTop: 2 }]}>
                      {liste.length} Fragen · {b} bearbeitet · in der Prüfung {sg.fragenInPruefung} Fragen
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={C.faint} />
                </View>
                <View style={{ marginTop: 12 }}><ProgressBar value={liste.length ? b / liste.length : 0} /></View>
              </Card>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

export function GlossarScreen() {
  const { zeigeGlossar, hilfeSprache } = useApp();
  const [suche, setSuche] = useState('');
  const liste = useMemo(() => {
    const q = suche.trim().toLowerCase();
    return [...GLOSSAR]
      .sort((a, b) => a.begriff.localeCompare(b.begriff, 'de'))
      .filter((g) => !q || g.begriff.toLowerCase().includes(q) || g.uebersetzung.en.toLowerCase().includes(q) || g.uebersetzung.ro.toLowerCase().includes(q));
  }, [suche]);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <Text style={s.h1}>Glossar</Text>
      <Card style={{ marginTop: 14, marginBottom: 14, backgroundColor: C.primarySoft }}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="information-circle-outline" size={22} color={C.primary} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={s.body}>
              Hier findest du {GLOSSAR.length} wichtige Fachbegriffe aus der Prüfung, jeweils mit einfacher Erklärung.
            </Text>
            <Text style={[s.body, { marginTop: 6 }]}>
              Tippe auf einen Begriff, um die Erklärung zu sehen. Mit der Suche findest du Begriffe auch auf Englisch oder Rumänisch. Die Übersetzungssprache stellst du unter „Mehr“ ein.
            </Text>
            <Text style={[s.muted, { marginTop: 6 }]}>
              Tipp: Unterstrichene Wörter in den Fragen kannst du direkt antippen.
            </Text>
          </View>
        </View>
      </Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 14, paddingHorizontal: 14, height: 48, borderWidth: 1, borderColor: C.border, marginBottom: 14 }}>
        <Ionicons name="search" size={18} color={C.faint} />
        <TextInput value={suche} onChangeText={setSuche} placeholder="Begriff suchen (DE, EN, RO)" placeholderTextColor={C.faint} style={{ flex: 1, marginLeft: 8, fontSize: 16, color: C.text }} />
      </View>
      <Card style={{ padding: 0 }}>
        {liste.map((g, i) => (
          <Pressable key={g.id} onPress={() => zeigeGlossar(g.id)} style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderTopWidth: i ? 1 : 0, borderTopColor: C.border }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: C.text }}>{g.begriff}</Text>
              {hilfeSprache ? <Text style={[s.muted, { marginTop: 2 }]}>{g.uebersetzung[hilfeSprache]}</Text> : null}
            </View>
            <Ionicons name="chevron-forward" size={18} color={C.faint} />
          </Pressable>
        ))}
        {!liste.length ? <Text style={[s.muted, { padding: 16 }]}>Kein Begriff gefunden.</Text> : null}
      </Card>
    </ScrollView>
  );
}

export function MehrScreen() {
  const { hilfeSprache, setHilfeSprache } = useApp();
  const optionen: { wert: HilfeSprache | null; label: string }[] = [
    { wert: 'en', label: SPRACHEN.en },
    { wert: 'ro', label: SPRACHEN.ro },
    { wert: null, label: 'Keine Übersetzung' },
  ];
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={s.h1}>Einstellungen</Text>
      <Text style={[s.h3, { marginTop: 22, marginBottom: 6 }]}>Hilfesprache</Text>
      <Text style={[s.muted, { marginBottom: 12 }]}>Gelernt wird auf Deutsch. Fachbegriffe werden zusätzlich in dieser Sprache erklärt.</Text>
      <Card style={{ padding: 0 }}>
        {optionen.map((o, i) => (
          <Pressable key={o.label} onPress={() => setHilfeSprache(o.wert)} style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderTopWidth: i ? 1 : 0, borderTopColor: C.border }}>
            <Text style={[s.body, { flex: 1 }]}>{o.label}</Text>
            <Ionicons name={hilfeSprache === o.wert ? 'radio-button-on' : 'radio-button-off'} size={22} color={hilfeSprache === o.wert ? C.primary : C.faint} />
          </Pressable>
        ))}
      </Card>
      <Card style={{ marginTop: 22, backgroundColor: C.warnSoft }}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="construct-outline" size={22} color={C.warn} />
          <Text style={[s.body, { marginLeft: 10, flex: 1 }]}>
            Prototyp: Fragen, Erklärungen und Übersetzungen sind Entwürfe und noch nicht fachlich geprüft. Der Fortschritt wird noch nicht gespeichert.
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}
