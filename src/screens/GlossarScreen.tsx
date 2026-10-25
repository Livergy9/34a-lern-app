import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GLOSSAR } from '../data/glossar';
import { useApp } from '../state';
import { C, Card, s, SeitenTitel } from '../ui';

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
      <SeitenTitel
        titel="Glossar"
        info={`${GLOSSAR.length} schwierige Fachbegriffe mit einfacher Erklärung. Die Suche findet auch englische und rumänische Wörter. Unterstrichene Wörter in Fragen und Kapiteln kannst du direkt antippen.`}
      />
      <View style={{ height: 14 }} />
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
