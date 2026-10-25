import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Kalender from '../components/Kalender';
import { HilfeSprache } from '../data/types';
import { heute, schoen, tageZwischen } from '../datum';
import ZielWahl from '../components/ZielWahl';
import { empfohlenesZiel, useLernstand } from '../lernstand';
import { useApp } from '../state';
import { Button, C, Card, IconName, s } from '../ui';

// Erster Start: 4 kurze Seiten – Sprache, Prüfungstermin (überspringbar), Tagesziel, los geht's
const SEITEN = 4;
export default function OnboardingScreen() {
  const app = useApp();
  const ls = useLernstand();
  const [seite, setSeite] = useState(0);
  const [datum, setDatum] = useState<string | null>(app.pruefungsDatum);
  const [hatTermin, setHatTermin] = useState<boolean | null>(app.pruefungsDatum ? true : null);

  const sprachen: { wert: HilfeSprache | null; titel: string; text: string }[] = [
    { wert: 'en', titel: 'English', text: 'Help in English' },
    { wert: 'ro', titel: 'Română', text: 'Ajutor în limba română' },
    { wert: null, titel: 'Nur Deutsch', text: 'Keine Übersetzung' },
  ];

  const tage = datum ? tageZwischen(heute(), datum) : null;
  const empfohlen = empfohlenesZiel(ls.offen, tage);

  const fertig = () => {
    app.setPruefungsDatum(datum);
    app.beendeOnboarding();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, paddingTop: 12 }}>
        {Array.from({ length: SEITEN }, (_, i) => (
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
            <Text style={s.h1}>Hast du schon einen Prüfungstermin?</Text>
            <Text style={[s.body, { marginTop: 8, color: C.muted }]}>
              Das ist freiwillig. Du kannst den Termin jederzeit später unter „Mehr“ eintragen.
            </Text>
            <View style={{ gap: 10, marginTop: 18 }}>
              <Auswahl aktiv={hatTermin === true} titel="Ja, Datum eintragen" icon="calendar-outline" onPress={() => setHatTermin(true)} />
              <Auswahl aktiv={hatTermin === false} titel="Noch kein Termin" icon="time-outline" onPress={() => { setHatTermin(false); setDatum(null); }} />
            </View>
            {hatTermin ? (
              <>
                <Card style={{ marginTop: 14 }}><Kalender wert={datum} onWaehle={setDatum} /></Card>
                {datum ? (
                  <Text style={[s.body, { marginTop: 12, textAlign: 'center' }]}>Prüfung am <Text style={{ fontWeight: '700' }}>{schoen(datum)}</Text></Text>
                ) : null}
              </>
            ) : null}
          </>
        ) : seite === 2 ? (
          <>
            <Text style={s.h1}>Wie viel möchtest du am Tag lernen?</Text>
            <Text style={[s.body, { marginTop: 8, color: C.muted }]}>
              Lieber jeden Tag ein bisschen als selten viel. Du kannst das jederzeit ändern.
            </Text>
            <View style={{ marginTop: 18 }}><ZielWahl /></View>
            {empfohlen && empfohlen > app.tagesziel ? (
              <Text style={[s.muted, { marginTop: 12 }]}>Bis zu deiner Prüfung wären etwa {empfohlen} Aufgaben am Tag gut.</Text>
            ) : null}
          </>
        ) : (
          <>
            <Text style={s.h1}>Dein Plan</Text>
            <View style={{ gap: 12, marginTop: 18 }}>
              <Punkt icon="today-outline" titel={`Jeden Tag ${app.tagesziel} Aufgaben`} text={tage ? `Noch ${tage} Tage bis zur Prüfung.` : 'Ohne Termin lernst du in deinem eigenen Tempo.'} />
              <Punkt icon="calendar-outline" titel="Lernserie" text="Schaffst du dein Tagesziel, wächst deine Lernserie um einen Tag." />
              <Punkt icon="refresh-circle-outline" titel="Fehler kommen wieder" text="Falsche Fragen übst du so lange, bis du sie zweimal hintereinander richtig hast." />
              <Punkt icon="language-outline" titel="Hilfe in deiner Sprache" text="Blau unterstrichene Wörter erklären Fachbegriffe. Mit „Übersetzen“ siehst du Frage und Erklärung in deiner Sprache." />
            </View>
          </>
        )}
      </ScrollView>

      <View style={{ padding: 20, gap: 10 }}>
        {seite < SEITEN - 1 ? (
          <Button
            title="Weiter"
            icon="arrow-forward"
            disabled={seite === 1 && (hatTermin === null || (hatTermin && !datum))}
            onPress={() => setSeite(seite + 1)}
          />
        ) : (
          <Button title="Los geht's" icon="arrow-forward" onPress={fertig} />
        )}
        {seite > 0 ? <Button title="Zurück" variant="secondary" onPress={() => setSeite(seite - 1)} /> : null}
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

function Auswahl({ aktiv, titel, icon, onPress }: { aktiv: boolean; titel: string; icon: IconName; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="radio" accessibilityState={{ checked: aktiv }}>
      <Card style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: aktiv ? C.primary : 'transparent' }}>
        <Ionicons name={icon} size={24} color={C.primary} />
        <Text style={[s.h3, { flex: 1, marginLeft: 12 }]}>{titel}</Text>
        <Ionicons name={aktiv ? 'radio-button-on' : 'radio-button-off'} size={24} color={aktiv ? C.primary : C.faint} />
      </Card>
    </Pressable>
  );
}
