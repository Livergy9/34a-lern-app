import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { fragenFuer } from '../data/fragen';
import { kapitelFuer } from '../data/kapitel';
import { sachgebietById } from '../data/sachgebiete';
import { SachgebietId } from '../data/types';
import { ALLE_KARTEN, mischen, quote } from '../lernstand';
import { useNav } from '../nav';
import { frageFrei, kapitelFrei, karteFrei, PREMIUM, sachgebietGanzFrei } from '../premium';
import { useApp } from '../state';
import { Abschnitt, C, Card, IconBox, ProgressBar, s, ScreenHeader, Zeile } from '../ui';
import { heute } from '../datum';

export default function SachgebietScreen({ id }: { id: SachgebietId }) {
  const app = useApp();
  const nav = useNav();
  const sg = sachgebietById(id);
  const alle = fragenFuer(id);
  const frei = alle.filter((f) => frageFrei(f, app.premium));
  const bearbeitet = alle.filter((f) => app.fragen[f.id]).length;
  const neu = frei.filter((f) => !app.fragen[f.id]);
  const fehler = frei.filter((f) => app.fragen[f.id]?.fehlerOffen);
  const q = quote(alle, app.fragen);
  const kapitel = kapitelFuer(id);
  const karten = ALLE_KARTEN.filter((k) => k.sachgebiet === id);
  const kartenFaellig = karten.filter((k) => !app.karten[k.id] || app.karten[k.id].faellig <= heute()).length;
  const ganzFrei = sachgebietGanzFrei(id, app.premium);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
      <ScreenHeader title={sg.kurz} onClose={nav.zurueck} />
      <ScrollView contentContainerStyle={[s.seite, { paddingTop: 4 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconBox icon={sg.icon as any} farbe={sg.farbe} groesse={56} />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={s.h2}>{sg.name}</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>In der Prüfung: {sg.fragenInPruefung} Fragen, {sg.punkteInPruefung} Punkte</Text>
          </View>
        </View>

        <Card style={{ marginTop: 18 }}>
          <View style={{ flexDirection: 'row' }}>
            <Wert zahl={`${bearbeitet}/${alle.length}`} text="bearbeitet" />
            <Wert zahl={q === null ? '–' : `${Math.round(q * 100)} %`} text="richtig" />
            <Wert zahl={String(fehler.length)} text="Fehler offen" />
          </View>
          <View style={{ marginTop: 14 }}><ProgressBar value={alle.length ? bearbeitet / alle.length : 0} color={sg.farbe} height={8} /></View>
        </Card>

        {!ganzFrei ? (
          <Card style={{ marginTop: 12, backgroundColor: C.goldSoft, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="lock-open-outline" size={20} color={C.gold} />
            <Text style={[s.body, { flex: 1, marginLeft: 10, fontSize: 14 }]}>
              Gratis: die ersten {PREMIUM.gratisFragenProGebiet} Fragen und das erste Kapitel. Alles andere mit Premium.
            </Text>
          </Card>
        ) : null}

        {kapitel.length ? (
          <>
            <Abschnitt titel="1. Lesen" />
            <Card style={{ padding: 0 }}>
              {kapitel.map((k, i) => {
                const offen = kapitelFrei(k, app.premium);
                const gelesen = app.gelesen.includes(k.id);
                return (
                  <Zeile
                    key={k.id}
                    erste={i === 0}
                    icon={gelesen ? 'checkmark-circle' : 'document-text-outline'}
                    farbe={gelesen ? C.success : sg.farbe}
                    titel={k.titel}
                    untertitel={gelesen ? 'Gelesen' : `Kapitel ${i + 1}`}
                    gesperrt={!offen}
                    onPress={() => nav.push(offen ? { name: 'kapitel', id: k.id } : { name: 'premium' })}
                  />
                );
              })}
            </Card>
          </>
        ) : null}

        <Abschnitt titel={kapitel.length ? '2. Üben' : 'Üben'} />
        <Card style={{ padding: 0 }}>
          <Zeile
            erste
            icon="play-circle-outline"
            farbe={sg.farbe}
            titel="Neue Fragen"
            untertitel={neu.length ? `${neu.length} noch nicht bearbeitet` : 'Alle freien Fragen bearbeitet'}
            onPress={neu.length ? () => nav.starteQuiz(neu.slice(0, 15), `${sg.kurz}: neue Fragen`) : undefined}
          />
          <Zeile
            icon="shuffle-outline"
            farbe={sg.farbe}
            titel="Alle Fragen gemischt"
            untertitel={`${frei.length} Fragen`}
            onPress={() => nav.starteQuiz(mischen(frei).slice(0, 20), sg.kurz)}
          />
          <Zeile
            icon="refresh-circle-outline"
            farbe={C.warn}
            titel="Fehler wiederholen"
            untertitel={fehler.length ? `${fehler.length} offen` : 'Keine offenen Fehler'}
            onPress={fehler.length ? () => nav.starteQuiz(mischen(fehler), `${sg.kurz}: Fehler`) : undefined}
          />
          <Zeile
            icon="albums-outline"
            farbe={C.success}
            titel="Karteikarten"
            untertitel={`${karten.length} Karten · ${kartenFaellig} zu lernen`}
            gesperrt={!karten.some((k) => karteFrei(k, app.premium))}
            onPress={() => nav.push(karten.some((k) => karteFrei(k, app.premium)) ? { name: 'kartenRunde', sachgebiet: id } : { name: 'premium' })}
          />
          {frei.length < alle.length ? (
            <Zeile
              icon="star-outline"
              farbe={C.gold}
              titel={`${alle.length - frei.length} weitere Fragen`}
              untertitel="Mit Premium freischalten"
              gesperrt
              onPress={() => nav.push({ name: 'premium' })}
            />
          ) : null}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function Wert({ zahl, text }: { zahl: string; text: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: C.text }}>{zahl}</Text>
      <Text style={[s.muted, { fontSize: 12, marginTop: 2 }]}>{text}</Text>
    </View>
  );
}
