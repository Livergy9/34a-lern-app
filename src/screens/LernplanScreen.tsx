import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Kalender from '../components/Kalender';
import ZielWahl from '../components/ZielWahl';
import { heute, schoen, tageZwischen } from '../datum';
import { empfohlenesZiel, useLernstand } from '../lernstand';
import { useNav } from '../nav';
import { useApp } from '../state';
import { Abschnitt, Button, C, Card, s, ScreenHeader } from '../ui';

// Lernplan: Tagesziel wählen, Prüfungsdatum (freiwillig) eintragen oder ändern
export default function LernplanScreen() {
  const app = useApp();
  const nav = useNav();
  const ls = useLernstand();
  const [datum, setDatum] = useState<string | null>(app.pruefungsDatum && app.pruefungsDatum > heute() ? app.pruefungsDatum : null);
  const tage = datum ? tageZwischen(heute(), datum) : null;
  const empfohlen = empfohlenesZiel(ls.offen, tage);

  const speichern = () => {
    app.setPruefungsDatum(datum);
    nav.zurueck();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
      <ScreenHeader title="Lernplan" onClose={nav.zurueck} />
      <ScrollView contentContainerStyle={[s.seite, { paddingTop: 4 }]}>
        <Text style={s.h2}>Tagesziel</Text>
        <Text style={[s.muted, { marginTop: 6, marginBottom: 16 }]}>
          Schaffst du dein Tagesziel, wächst deine Lernserie um einen Tag.
        </Text>
        <ZielWahl />

        <Abschnitt titel="Prüfungstermin (freiwillig)" />
        <Text style={[s.muted, { marginTop: -4, marginBottom: 16 }]}>
          Mit Termin zeigt dir die App, wie viel du bis zur Prüfung am Tag lernen solltest.
        </Text>
        <Card><Kalender wert={datum} onWaehle={setDatum} /></Card>
        <Card style={{ marginTop: 14, backgroundColor: C.primarySoft }}>
          {datum && tage ? (
            <>
              <Text style={s.h3}>Prüfung am {schoen(datum)}</Text>
              <Text style={[s.body, { marginTop: 4 }]}>
                Noch {tage} {tage === 1 ? 'Tag' : 'Tage'}
                {empfohlen ? ` · Empfohlen: etwa ${empfohlen} Aufgaben am Tag` : ''}
              </Text>
              {empfohlen && empfohlen > app.tagesziel ? (
                <Text style={[s.muted, { marginTop: 6 }]}>Dein Tagesziel ist niedriger. Wähle oben ein höheres Ziel oder lerne an manchen Tagen mehr.</Text>
              ) : null}
            </>
          ) : (
            <Text style={s.body}>Kein Termin eingetragen. Du lernst in deinem eigenen Tempo.</Text>
          )}
        </Card>
      </ScrollView>
      <View style={{ padding: 20, gap: 10 }}>
        <Button title="Speichern" onPress={speichern} />
        {app.pruefungsDatum || datum ? (
          <Button title="Termin entfernen" variant="secondary" onPress={() => { app.setPruefungsDatum(null); nav.zurueck(); }} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
