import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Kalender from '../components/Kalender';
import { heute, schoen, tageZwischen } from '../datum';
import { berechneTagesziel, useLernstand, ZIEL_OHNE_DATUM } from '../lernstand';
import { useNav } from '../nav';
import { useApp } from '../state';
import { Button, C, Card, s, ScreenHeader } from '../ui';

// Prüfungsdatum eintragen oder ändern
export default function LernplanScreen() {
  const app = useApp();
  const nav = useNav();
  const ls = useLernstand();
  const [datum, setDatum] = useState<string | null>(app.pruefungsDatum && app.pruefungsDatum > heute() ? app.pruefungsDatum : null);
  const tage = datum ? tageZwischen(heute(), datum) : null;
  const ziel = berechneTagesziel(ls.offen, tage);

  const speichern = () => {
    app.setPruefungsDatum(datum);
    nav.zurueck();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
      <ScreenHeader title="Lernplan" onClose={nav.zurueck} />
      <ScrollView contentContainerStyle={[s.seite, { paddingTop: 4 }]}>
        <Text style={s.h2}>Wann ist deine Prüfung?</Text>
        <Text style={[s.muted, { marginTop: 6, marginBottom: 16 }]}>
          Die App verteilt die Fragen auf die Tage bis zur Prüfung und zeigt dir jeden Tag, wie viel du lernen solltest.
        </Text>
        <Card><Kalender wert={datum} onWaehle={setDatum} /></Card>
        <Card style={{ marginTop: 14, backgroundColor: C.primarySoft }}>
          {datum && tage ? (
            <>
              <Text style={s.h3}>Prüfung am {schoen(datum)}</Text>
              <Text style={[s.body, { marginTop: 4 }]}>Noch {tage} {tage === 1 ? 'Tag' : 'Tage'} · Tagesziel: {ziel} Aufgaben</Text>
            </>
          ) : (
            <Text style={s.body}>Ohne Datum gilt ein Tagesziel von {ZIEL_OHNE_DATUM} Aufgaben.</Text>
          )}
        </Card>
      </ScrollView>
      <View style={{ padding: 20, gap: 10 }}>
        <Button title="Speichern" onPress={speichern} />
        {app.pruefungsDatum ? (
          <Button title="Datum entfernen" variant="secondary" onPress={() => { app.setPruefungsDatum(null); nav.zurueck(); }} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
