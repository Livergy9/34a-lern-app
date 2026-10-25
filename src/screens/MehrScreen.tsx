import React from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HilfeSprache } from '../data/types';
import { schoen } from '../datum';
import { useNav } from '../nav';
import { useApp } from '../state';
import { Abschnitt, C, Card, s, SPRACHEN, Zeile } from '../ui';

export default function MehrScreen() {
  const app = useApp();
  const nav = useNav();
  const optionen: { wert: HilfeSprache | null; label: string }[] = [
    { wert: 'en', label: SPRACHEN.en },
    { wert: 'ro', label: SPRACHEN.ro },
    { wert: null, label: 'Nur Deutsch (keine Übersetzung)' },
  ];

  const zuruecksetzen = () =>
    Alert.alert('Fortschritt löschen?', 'Alle Antworten, Karteikarten, Lesezeichen und die Lernserie werden gelöscht. Das kann man nicht rückgängig machen.', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Löschen', style: 'destructive', onPress: app.zuruecksetzen },
    ]);

  return (
    <ScrollView contentContainerStyle={s.seite}>
      <Text style={s.h1}>Mehr</Text>

      <Abschnitt titel="Hilfesprache" />
      <Text style={[s.muted, { marginBottom: 12, marginTop: -4 }]}>Gelernt wird auf Deutsch. Fachbegriffe werden zusätzlich in dieser Sprache erklärt.</Text>
      <Card style={{ padding: 0 }}>
        {optionen.map((o, i) => (
          <Pressable key={o.label} onPress={() => app.setHilfeSprache(o.wert)} style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderTopWidth: i ? 1 : 0, borderTopColor: C.border }}>
            <Text style={[s.body, { flex: 1 }]}>{o.label}</Text>
            <Ionicons name={app.hilfeSprache === o.wert ? 'radio-button-on' : 'radio-button-off'} size={22} color={app.hilfeSprache === o.wert ? C.primary : C.faint} />
          </Pressable>
        ))}
      </Card>

      <Abschnitt titel="Lernen" />
      <Card style={{ padding: 0 }}>
        <Zeile
          erste
          icon="calendar-outline"
          titel="Lernplan"
          untertitel={`Tagesziel ${app.tagesziel} Aufgaben · ${app.pruefungsDatum ? `Prüfung ${schoen(app.pruefungsDatum)}` : 'kein Termin'}`}
          onPress={() => nav.push({ name: 'lernplan' })}
        />
        <Zeile icon="stats-chart-outline" farbe="#6D5BD0" titel="Statistik" untertitel="Fortschritt und Prüfungsergebnisse" onPress={() => nav.push({ name: 'statistik' })} />
        <Zeile icon="star-outline" farbe={C.gold} titel="Premium" untertitel={app.premium ? 'Freigeschaltet' : 'Alle Inhalte freischalten'} onPress={() => nav.push({ name: 'premium' })} />
      </Card>

      <Abschnitt titel="Testversion" />
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text style={s.h3}>Premium im Testmodus</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>Nur zum Testen: ausschalten, um die Gratis-Version mit Schlössern zu sehen.</Text>
          </View>
          <Switch value={app.premium} onValueChange={app.setPremium} trackColor={{ true: C.primary, false: C.border }} />
        </View>
      </Card>
      <Card style={{ padding: 0, marginTop: 12 }}>
        <Zeile erste icon="sparkles-outline" farbe={C.primary} titel="Einführung nochmal ansehen" onPress={app.zeigeEinfuehrung} />
        <Zeile icon="trash-outline" farbe={C.danger} titel="Fortschritt löschen" onPress={zuruecksetzen} />
      </Card>

      <Card style={{ marginTop: 22, backgroundColor: C.warnSoft }}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="information-circle-outline" size={22} color={C.warn} />
          <Text style={[s.body, { marginLeft: 10, flex: 1, fontSize: 14 }]}>
            34a Easy ist eine unabhängige Lern-App und nicht von der IHK. Fragen, Erklärungen und Übersetzungen sind Entwürfe und werden noch fachlich geprüft. Keine Garantie für den Prüfungserfolg.
          </Text>
        </View>
      </Card>
      <Text style={[s.muted, { textAlign: 'center', marginTop: 16, fontSize: 12 }]}>34a Easy · Version 0.2 (Testversion)</Text>
    </ScrollView>
  );
}
