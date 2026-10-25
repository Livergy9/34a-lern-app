import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Kalender from '../components/Kalender';
import { HilfeSprache } from '../data/types';
import { heute, schoen, tageZwischen } from '../datum';
import { berechneTagesziel, SERIE_MIN, useLernstand } from '../lernstand';
import { useApp } from '../state';
import { Button, C, Card, IconName, s } from '../ui';

// Erster Start: 3 kurze Seiten – Sprache, Prüfungsdatum, los geht's
export default function OnboardingScreen() {
  const app = useApp();
  const ls = useLernstand();
  const [seite, setSeite] = useState(0);
  const [datum, setDatum] = useState<string | null>(app.pruefungsDatum);

  const sprachen: { wert: HilfeSprache | null; titel: string; text: string }[] = [
    { wert: 'en', titel: 'English', text: 'Help in English' },
    { wert: 'ro', titel: 'Română', text: 'Ajutor în limba română' },
    { wert: null, titel: 'Nur Deutsch', text: 'Keine Übersetzung' },
  ];

  const tage = datum ? tageZwischen(heute(), datum) : null;
  const ziel = berechneTagesziel(ls.offen, tage);

  const fertig = () => {
    app.setPruefungsDatum(datum);
    app.beendeOnboarding();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, paddingTop: 12 }}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ width: i === seite ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i === seite ? C.primary : C.border }} />
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
        {seite === 0 ? (
          <>
            <View style={{ alignItems: 'center', marginTop: 12 }}>
              <Image source={require('../../assets/logo.png')} style={{ width: 96, height: 96, borderRadius: 24 }} />
              <Text style={[s.h1, { marginTop: 16 }]}>Willkommen!</Text>
              <Text style={[s.body, { marginTop: 8, textAlign: 'center', color: C.muted }]}>
                Lerne für die Sachkundeprüfung nach § 34a GewO – auf Deutsch, mit Hilfe in deiner Sprache.
              </Text>
            </View>
            <Text style={[s.h3, { marginTop: 28, marginBottom: 10 }]}>Welche Hilfesprache möchtest du?</Text>
            <View style={{ gap: 10 }}>
              {sprachen.map((sp) => {
                const aktiv = app.hilfeSprache === sp.wert;
                return (
                  <Pressable key={sp.titel} onPress={() => app.setHilfeSprache(sp.wert)}>
                    <Card style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: aktiv ? C.primary : 'transparent' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={s.h3}>{sp.titel}</Text>
                        <Text style={s.muted}>{sp.text}</Text>
                      </View>
                      <Ionicons name={aktiv ? 'radio-button-on' : 'radio-button-off'} size={24} color={aktiv ? C.primary : C.faint} />
                    </Card>
                  </Pressable>
                );
              })}
            </View>
            <Text style={[s.muted, { marginTop: 12 }]}>Kannst du später unter „Mehr“ ändern.</Text>
          </>
        ) : seite === 1 ? (
          <>
            <Text style={s.h1}>Wann ist deine Prüfung?</Text>
            <Text style={[s.body, { marginTop: 8, color: C.muted }]}>
              Dann zeigt dir die App jeden Tag, wie viel du lernen solltest.
            </Text>
            <Card style={{ marginTop: 18 }}><Kalender wert={datum} onWaehle={setDatum} /></Card>
            {datum ? (
              <Text style={[s.body, { marginTop: 12, textAlign: 'center' }]}>Prüfung am <Text style={{ fontWeight: '700' }}>{schoen(datum)}</Text></Text>
            ) : null}
          </>
        ) : (
          <>
            <Text style={s.h1}>Dein Plan</Text>
            <View style={{ gap: 12, marginTop: 18 }}>
              <Punkt icon="today-outline" titel={`Jeden Tag ${ziel} Aufgaben`} text={tage ? `Noch ${tage} Tage bis zur Prüfung. Das Ziel passt sich an, wenn du mehr oder weniger lernst.` : 'Du kannst dein Prüfungsdatum jederzeit auf der Startseite eintragen.'} />
              <Punkt icon="flame-outline" titel="Lernserie" text={`Lerne jeden Tag mindestens ${SERIE_MIN} Aufgaben, dann wächst deine Serie.`} />
              <Punkt icon="refresh-circle-outline" titel="Fehler kommen wieder" text="Falsche Fragen übst du so lange, bis du sie zweimal hintereinander richtig hast." />
              <Punkt icon="book-outline" titel="Fachbegriffe antippen" text="Blau unterstrichene Wörter zeigen dir die Übersetzung und eine einfache Erklärung." />
            </View>
          </>
        )}
      </ScrollView>

      <View style={{ padding: 20, gap: 10 }}>
        {seite < 2 ? (
          <Button title="Weiter" icon="arrow-forward" onPress={() => setSeite(seite + 1)} />
        ) : (
          <Button title="Los geht's" icon="arrow-forward" onPress={fertig} />
        )}
        {seite === 1 ? (
          <Button title={datum ? 'Datum entfernen' : 'Weiß ich noch nicht'} variant="secondary" onPress={() => { setDatum(null); if (!datum) setSeite(2); }} />
        ) : seite === 2 ? (
          <Button title="Zurück" variant="secondary" onPress={() => setSeite(1)} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function Punkt({ icon, titel, text }: { icon: IconName; titel: string; text: string }) {
  return (
    <Card style={{ flexDirection: 'row' }}>
      <Ionicons name={icon} size={26} color={C.primary} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={s.h3}>{titel}</Text>
        <Text style={[s.body, { marginTop: 2, color: C.muted, fontSize: 15 }]}>{text}</Text>
      </View>
    </Card>
  );
}
