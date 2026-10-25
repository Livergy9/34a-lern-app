import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { fragenFuer } from '../data/fragen';
import { kapitelById, kapitelFuer } from '../data/kapitel';
import { sachgebietById } from '../data/sachgebiete';
import { useNav } from '../nav';
import { frageFrei, kapitelFrei } from '../premium';
import { useApp } from '../state';
import { Button, C, Card, Chip, s, ScreenHeader, TermText } from '../ui';

export default function KapitelScreen({ id }: { id: string }) {
  const app = useApp();
  const nav = useNav();
  const k = kapitelById(id);
  if (!k) return null;
  const sg = sachgebietById(k.sachgebiet);
  const alle = kapitelFuer(k.sachgebiet);
  const nr = alle.findIndex((x) => x.id === k.id);
  const naechstes = alle[nr + 1];

  const ueben = () => {
    app.markiereGelesen(k.id);
    const neu = fragenFuer(k.sachgebiet).filter((f) => frageFrei(f, app.premium) && !app.fragen[f.id]);
    const liste = neu.length ? neu : fragenFuer(k.sachgebiet).filter((f) => frageFrei(f, app.premium));
    nav.zurueck();
    nav.starteQuiz(liste.slice(0, 10), sg.kurz);
  };
  const weiterLesen = () => {
    app.markiereGelesen(k.id);
    nav.ersetze(naechstes && kapitelFrei(naechstes, app.premium) ? { name: 'kapitel', id: naechstes.id } : { name: 'premium' });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
      <ScreenHeader title={`Kapitel ${nr + 1} von ${alle.length}`} onClose={nav.zurueck} />
      <ScrollView contentContainerStyle={[s.seite, { paddingTop: 4 }]}>
        <Chip label={sg.kurz} icon={sg.icon as any} color={sg.farbe} bg={sg.farbe + '1A'} />
        <Text style={[s.h1, { fontSize: 26, marginTop: 12 }]}>{k.titel}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Ionicons name="information-circle-outline" size={16} color={C.muted} />
          <Text style={[s.muted, { marginLeft: 6, flex: 1, fontSize: 13 }]}>Blau unterstrichene Wörter antippen für Übersetzung.</Text>
        </View>

        <View style={{ gap: 14, marginTop: 18 }}>
          {k.abschnitte.map((a, i) => (
            <Card key={i}>
              {a.ueberschrift ? <Text style={[s.h3, { marginBottom: 8 }]}>{a.ueberschrift}</Text> : null}
              <View style={{ gap: 6 }}>
                {a.text.split('\n').map((zeile, j) =>
                  zeile.startsWith('• ') ? (
                    <View key={j} style={{ flexDirection: 'row', paddingLeft: 4 }}>
                      <Text style={[s.body, { color: sg.farbe, marginRight: 8 }]}>•</Text>
                      <TermText text={zeile.slice(2)} style={[s.body, { flex: 1 }]} />
                    </View>
                  ) : (
                    <TermText key={j} text={zeile} style={s.body} />
                  )
                )}
              </View>
            </Card>
          ))}
        </View>
        {!k.geprueft ? (
          <Text style={[s.muted, { fontSize: 12, marginTop: 14 }]}>Entwurf – noch nicht fachlich geprüft.</Text>
        ) : null}
      </ScrollView>
      <View style={{ padding: 16, gap: 10, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.card }}>
        <Button title="Gelesen – jetzt Fragen üben" icon="arrow-forward" onPress={ueben} />
        {naechstes ? <Button title="Nächstes Kapitel" variant="secondary" onPress={weiterLesen} /> : null}
      </View>
    </SafeAreaView>
  );
}
