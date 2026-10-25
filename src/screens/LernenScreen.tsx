import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fragenFuer } from '../data/fragen';
import { kapitelFuer } from '../data/kapitel';
import { SACHGEBIETE } from '../data/sachgebiete';
import { quote } from '../lernstand';
import { useNav } from '../nav';
import { sachgebietGanzFrei } from '../premium';
import { useApp } from '../state';
import { C, Card, Chip, IconBox, ProgressBar, s } from '../ui';

export default function LernenScreen() {
  const app = useApp();
  const nav = useNav();
  return (
    <ScrollView contentContainerStyle={s.seite}>
      <Text style={s.h1}>Lernen</Text>
      <Text style={[s.muted, { marginTop: 6, marginBottom: 18 }]}>
        Wähle ein Sachgebiet. Lies zuerst die Kapitel, dann übe die Fragen.
      </Text>
      <View style={{ gap: 12 }}>
        {SACHGEBIETE.map((sg) => {
          const liste = fragenFuer(sg.id);
          const b = liste.filter((f) => app.fragen[f.id]).length;
          const q = quote(liste, app.fragen);
          const kap = kapitelFuer(sg.id);
          const ganzFrei = sachgebietGanzFrei(sg.id, app.premium);
          return (
            <Pressable key={sg.id} onPress={() => nav.push({ name: 'sachgebiet', id: sg.id })} style={({ pressed }) => pressed && { opacity: 0.85 }}>
              <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconBox icon={sg.icon as any} farbe={sg.farbe} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={s.h3}>{sg.name}</Text>
                    <Text style={[s.muted, { fontSize: 13, marginTop: 2 }]}>
                      {kap.length ? `${kap.length} Kapitel · ` : ''}{liste.length} Fragen · in der Prüfung {sg.fragenInPruefung} Fragen
                    </Text>
                  </View>
                  {!ganzFrei ? <Ionicons name="lock-closed" size={16} color={C.gold} style={{ marginRight: 6 }} /> : null}
                  <Ionicons name="chevron-forward" size={20} color={C.faint} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <View style={{ flex: 1 }}><ProgressBar value={liste.length ? b / liste.length : 0} color={sg.farbe} /></View>
                  <Text style={[s.muted, { fontSize: 12, marginLeft: 10, minWidth: 64, textAlign: 'right' }]}>{b}/{liste.length}</Text>
                </View>
                {q !== null ? (
                  <View style={{ marginTop: 8 }}>
                    <Chip
                      label={`${Math.round(q * 100)} % richtig`}
                      color={q >= 0.5 ? C.success : C.danger}
                      bg={q >= 0.5 ? C.successSoft : C.dangerSoft}
                    />
                  </View>
                ) : null}
              </Card>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
