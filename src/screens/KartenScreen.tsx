import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SACHGEBIETE } from '../data/sachgebiete';
import { heute } from '../datum';
import { ALLE_KARTEN, NEUE_KARTEN_PRO_RUNDE, useLernstand } from '../lernstand';
import { useNav } from '../nav';
import { karteFrei } from '../premium';
import { useApp } from '../state';
import { Abschnitt, Button, C, Card, ProgressBar, s, SeitenTitel, Zeile } from '../ui';

export default function KartenScreen() {
  const app = useApp();
  const nav = useNav();
  const ls = useLernstand();
  const d = heute();
  const jetzt = ls.kartenFaellig.length + Math.min(NEUE_KARTEN_PRO_RUNDE, ls.kartenNeu.length);

  return (
    <ScrollView contentContainerStyle={s.seite}>
      <SeitenTitel
        titel="Karteikarten"
        info="Vorne steht der Begriff, hinten die Erklärung. Was du weißt, kommt erst in ein paar Tagen wieder. Was du nicht weißt, übst du öfter."
      />

      <Card style={{ marginTop: 18 }}>
        <View style={{ flexDirection: 'row' }}>
          <Wert zahl={ls.kartenFaellig.length} text="zum Wiederholen" />
          <Wert zahl={ls.kartenNeu.length} text="neu" />
          <Wert zahl={ls.kartenSicher} text="sicher" />
        </View>
        <View style={{ marginTop: 14 }}>
          <ProgressBar value={ls.karten.length ? ls.kartenSicher / ls.karten.length : 0} color={C.success} height={8} />
        </View>
        <Button
          title={jetzt ? `Jetzt lernen (${jetzt} Karten)` : 'Für heute alles gelernt'}
          icon={jetzt ? 'arrow-forward' : 'checkmark'}
          disabled={!jetzt}
          onPress={() => nav.push({ name: 'kartenRunde' })}
          style={{ marginTop: 16 }}
        />
      </Card>

      <Abschnitt titel="Nach Sachgebiet" />
      <Card style={{ padding: 0 }}>
        {SACHGEBIETE.map((sg, i) => {
          const karten = ALLE_KARTEN.filter((k) => k.sachgebiet === sg.id);
          const frei = karten.some((k) => karteFrei(k, app.premium));
          const offen = karten.filter((k) => !app.karten[k.id] || app.karten[k.id].faellig <= d).length;
          return (
            <Zeile
              key={sg.id}
              erste={i === 0}
              icon={sg.icon as any}
              farbe={sg.farbe}
              titel={sg.kurz}
              untertitel={`${karten.length} Karten · ${offen} zu lernen`}
              gesperrt={!frei}
              onPress={() => nav.push(frei ? { name: 'kartenRunde', sachgebiet: sg.id } : { name: 'premium' })}
            />
          );
        })}
      </Card>
    </ScrollView>
  );
}

function Wert({ zahl, text }: { zahl: number; text: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 26, fontWeight: '800', color: C.text }}>{zahl}</Text>
      <Text style={[s.muted, { fontSize: 12, marginTop: 2 }]}>{text}</Text>
    </View>
  );
}
