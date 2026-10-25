import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GLOSSAR } from '../data/glossar';
import { useApp } from '../state';
import { C, Card, s } from '../ui';

export default function GlossarScreen() {
  const { zeigeGlossar, hilfeSprache } = useApp();
  const [suche, setSuche] = useState('');
  const liste = useMemo(() => {
    const q = suche.trim().toLowerCase();
    return [...GLOSSAR]
      .sort((a, b) => a.begriff.localeCompare(b.begriff, 'de'))
      .filter((g) => !q || g.begriff.toLowerCase().includes(q) || g.uebersetzung.en.toLowerCase().includes(q) || g.uebersetzung.ro.toLowerCase().includes(q));
  }, [suche]);

  return (
    <ScrollView contentContainerStyle={s.seite} keyboardShouldPersistTaps="handled">
      <Text style={s.h1}>Glossar</Text>
      <Card style={{ marginTop: 14, marginBottom: 14, backgroundColor: C.primarySoft }}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="information-circle-outline" size={22} color={C.primary} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={s.body}>
              Hier findest du {GLOSSAR.length} schwierige Fachbegriffe aus der Prüfung, vor allem aus dem Recht – jeweils mit einfacher Erklärung.
            </Text>
            <Text style={[s.body, { marginTop: 6 }]}>
              Tippe auf einen Begriff, um die Erklärung zu sehen. Die Suche findet Begriffe auch auf Englisch oder Rumänisch. Die Sprache stellst du unter „Mehr“ ein.
            </Text>
            <Text style={[s.muted, { marginTop: 6 }]}>
              Tipp: Unterstrichene Wörter in Fragen und Kapiteln kannst du direkt antippen.
            </Text>
          </View>
        </View>
      </Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 14, paddingHorizontal: 14, height: 48, borderWidth: 1, borderColor: C.border, marginBottom: 14 }}>
        <Ionicons name="search" size={18} color={C.faint} />
        <TextInput value={suche} onChangeText={setSuche} placeholder="Begriff suchen (DE, EN, RO)" placeholderTextColor={C.faint} style={{ flex: 1, marginLeft: 8, fontSize: 16, color: C.text }} />
        {suche ? (
          <Pressable onPress={() => setSuche('')} hitSlop={10}><Ionicons name="close-circle" size={18} color={C.faint} /></Pressable>
        ) : null}
      </View>
      <Card style={{ padding: 0 }}>
        {liste.map((g, i) => (
          <Pressable key={g.id} onPress={() => zeigeGlossar(g.id)} style={({ pressed }) => [{ flexDirection: 'row', alignItems: 'center', padding: 16, borderTopWidth: i ? 1 : 0, borderTopColor: C.border }, pressed && { backgroundColor: C.bg }]}>
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
