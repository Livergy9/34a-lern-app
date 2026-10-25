import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fragenFuer } from '../data/fragen';
import { kapitelFuer } from '../data/kapitel';
import { SACHGEBIETE } from '../data/sachgebiete';
import { mischen, quote, useLernstand } from '../lernstand';
import { useNav } from '../nav';
import { frageFrei } from '../premium';
import { useApp } from '../state';
import { Abschnitt, C, Card, Chip, IconBox, ProgressBar, s, SeitenTitel, Zeile } from '../ui';

export default function LernenScreen() {
  const app = useApp();
  const nav = useNav();
  const ls = useLernstand();
  return (
    <ScrollView contentContainerStyle={s.seite}>
      <SeitenTitel titel="Lernen" info="Wähle ein Sachgebiet. Lies zuerst die Kapitel, dann übe die Fragen." />
      {/* Wiederholen: früher auf dem Start-Bildschirm */}
      <Card style={{ marginTop: 18, padding: 0 }}>
        <Zeile
          erste
          icon="refresh-circle-outline"
          farbe={C.warn}
          titel="Meine Fehler"
          untertitel={ls.fehler.length ? `${ls.fehler.length} ${ls.fehler.length === 1 ? 'Frage' : 'Fragen'} noch nicht sicher` : 'Keine offenen Fehler'}
          onPress={ls.fehler.length ? () => nav.starteQuiz(mischen(ls.fehler), 'Meine Fehler') : undefined}
        />
        <Zeile
          icon="bookmark-outline"
          farbe={C.gold}
          titel="Gemerkte Fragen"
          untertitel={ls.gemerkt.length ? `${ls.gemerkt.length} gemerkt` : 'Tippe im Quiz oben rechts auf das Lesezeichen'}
          onPress={ls.gemerkt.length ? () => nav.starteQuiz(ls.gemerkt, 'Gemerkte Fragen') : undefined}
        />
      </Card>
      <Abschnitt titel="Sachgebiete" />
      <View style={{ gap: 12 }}>
        {SACHGEBIETE.map((sg) => {
          const liste = fragenFuer(sg.id);
          const b = liste.filter((f) => app.fragen[f.id]).length;
          const q = quote(liste, app.fragen);
          const kap = kapitelFuer(sg.id);
          const freiAnzahl = liste.filter((f) => frageFrei(f, app.premium)).length;
          return (
            <Pressable key={sg.id} onPress={() => nav.push({ name: 'sachgebiet', id: sg.id })} style={({ pressed }) => pressed && { opacity: 0.85 }}>
              <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconBox icon={sg.icon as any} farbe={sg.farbe} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={s.h3}>{sg.name}</Text>
                    <Text style={[s.muted, { fontSize: 13, marginTop: 2 }]}>
                      {kap.length ? `${kap.length} Kapitel · ` : ''}{liste.length} Fragen{!app.premium ? ` (${freiAnzahl} gratis)` : ''}
                    </Text>
                  </View>
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
                ) : b > 0 ? (
                  <View style={{ marginTop: 8 }}>
                    <Chip label="Noch zu wenig beantwortet" color={C.muted} bg={C.border} />
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
