import React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FRAGEN } from '../data/fragen';
import { KAPITEL } from '../data/kapitel';
import { ALLE_KARTEN } from '../lernstand';
import { useNav } from '../nav';
import { PREMIUM } from '../premium';
import { useApp } from '../state';
import { Button, C, Card, IconBox, s, ScreenHeader } from '../ui';

export default function PremiumScreen() {
  const app = useApp();
  const nav = useNav();

  const vorteile: [any, string][] = [
    ['help-circle-outline', `Alle ${FRAGEN.length} Prüfungsfragen in allen 7 Sachgebieten`],
    ['document-text-outline', `Alle ${KAPITEL.length} Lernkapitel`],
    ['albums-outline', `Alle ${ALLE_KARTEN.length} Karteikarten`],
    ['timer-outline', 'Unbegrenzt Prüfungssimulationen'],
    ['language-outline', 'Hilfe auf Englisch und Rumänisch'],
    ['infinite-outline', 'Einmal zahlen – kein Abo'],
  ];

  const kaufen = () =>
    Alert.alert(
      'Noch nicht verfügbar',
      'Der Kauf funktioniert erst in der Version aus dem App Store. In der Testversion kannst du Premium unter „Mehr“ ein- und ausschalten.'
    );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
      <ScreenHeader title="Premium" onClose={nav.zurueck} art="schliessen" />
      <ScrollView contentContainerStyle={[s.seite, { paddingTop: 8 }]}>
        <View style={{ alignItems: 'center' }}>
          <IconBox icon="star" farbe={C.gold} groesse={72} />
          <Text style={[s.h1, { marginTop: 14, textAlign: 'center' }]}>34a Easy Premium</Text>
          <Text style={[s.body, { marginTop: 6, textAlign: 'center', color: C.muted }]}>Alles freischalten und sicher in die Prüfung gehen.</Text>
        </View>

        <Card style={{ marginTop: 22, gap: 14 }}>
          {vorteile.map(([icon, text]) => (
            <View key={text} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={icon} size={22} color={C.primary} />
              <Text style={[s.body, { marginLeft: 12, flex: 1 }]}>{text}</Text>
            </View>
          ))}
        </Card>

        <Card style={{ marginTop: 14, alignItems: 'center', borderWidth: 2, borderColor: C.gold }}>
          <Text style={[s.muted, { textDecorationLine: 'line-through' }]}>{PREMIUM.preisNormal}</Text>
          <Text style={{ fontSize: 36, fontWeight: '800', color: C.text, marginTop: 2 }}>{PREMIUM.preisStart}</Text>
          <Text style={s.muted}>einmalig · Startpreis</Text>
        </Card>
      </ScrollView>
      <View style={{ padding: 20 }}>
        {app.premium ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14 }}>
            <Ionicons name="checkmark-circle" size={22} color={C.success} />
            <Text style={[s.h3, { marginLeft: 8, color: C.success }]}>Premium ist freigeschaltet</Text>
          </View>
        ) : (
          <Button title={`Für ${PREMIUM.preisStart} freischalten`} farbe={C.gold} onPress={kaufen} />
        )}
      </View>
    </SafeAreaView>
  );
}
