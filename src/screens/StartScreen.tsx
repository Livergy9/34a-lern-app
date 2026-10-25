import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { schoen } from '../datum';
import { mischen, useLernstand, waehleTagesFragen } from '../lernstand';
import { useNav } from '../nav';
import { useApp } from '../state';
import { Abschnitt, Button, C, Card, IconBox, IconName, ProgressBar, s, Zeile } from '../ui';

export default function StartScreen() {
  const app = useApp();
  const nav = useNav();
  const ls = useLernstand();
  const zielErreicht = ls.heuteErledigt >= ls.ziel;
  const anteil = Math.min(1, ls.heuteErledigt / ls.ziel);
  const gesamt = ls.bearbeitet(ls.frei);

  const heuteLernen = () => {
    const anzahl = zielErreicht ? 10 : Math.min(ls.ziel, Math.max(5, ls.ziel - ls.heuteErledigt));
    nav.starteQuiz(waehleTagesFragen(ls.frei, app.fragen, anzahl), 'Heute lernen');
  };

  return (
    <ScrollView contentContainerStyle={s.seite}>
      {/* Kopf mit Logo und Lernserie */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../assets/logo.png')} style={{ width: 52, height: 52, borderRadius: 14 }} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={[s.h1, { fontSize: 28 }]}>34a Easy</Text>
          <Text style={[s.muted, { marginTop: 1 }]}>Sachkundeprüfung nach § 34a GewO</Text>
        </View>
        {/* Lernserie: schlichtes Kalender-Symbol mit Zahl (kein Flammen-Emoji) */}
        <Pressable
          onPress={() => nav.push({ name: 'statistik' })}
          accessibilityLabel={`Lernserie ${ls.serie} Tage`}
          style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: ls.serie > 0 ? C.primarySoft : C.border, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, marginLeft: 8 }}
        >
          <Ionicons name="calendar-outline" size={18} color={ls.serie > 0 ? C.primary : C.faint} />
          <Text style={{ fontWeight: '700', color: ls.serie > 0 ? C.primary : C.faint, fontSize: 15, marginLeft: 6 }}>{ls.serie}</Text>
        </Pressable>
      </View>

      {/* Lernplan + Tagesziel */}
      <Card style={{ marginTop: 22, backgroundColor: C.primary }}>
        <Pressable onPress={() => nav.push({ name: 'lernplan' })} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="calendar-outline" size={18} color="#fff" />
          <Text style={{ color: '#fff', marginLeft: 8, flex: 1, fontSize: 15 }}>
            {ls.tageBis !== null && ls.tageBis > 0
              ? `Prüfung am ${schoen(app.pruefungsDatum!)}`
              : ls.tageBis === 0 ? 'Heute ist deine Prüfung – viel Erfolg!' : `Tagesziel: ${ls.ziel} Aufgaben`}
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#fff" />
        </Pressable>
        {ls.tageBis !== null && ls.tageBis > 0 ? (
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: '800', marginTop: 10 }}>
            Noch {ls.tageBis} {ls.tageBis === 1 ? 'Tag' : 'Tage'}
          </Text>
        ) : null}
        <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600', marginTop: ls.tageBis ? 4 : 10 }}>
          {zielErreicht ? 'Tagesziel geschafft!' : `Heute: ${ls.heuteErledigt} von ${ls.ziel} Aufgaben`}
        </Text>
        <View style={{ marginTop: 10 }}>
          <ProgressBar value={anteil} color="#fff" bg="rgba(255,255,255,0.3)" height={10} />
        </View>
        <Button
          title={zielErreicht ? 'Weiter üben' : ls.heuteErledigt ? 'Weiterlernen' : 'Jetzt lernen'}
          icon="arrow-forward"
          variant="weiss"
          onPress={heuteLernen}
          style={{ marginTop: 16 }}
        />
        <Text style={{ color: '#fff', opacity: 0.85, fontSize: 13, marginTop: 10 }}>
          {ls.fehler.length ? `Mit ${Math.min(ls.fehler.length, 10)} Fehlern zum Wiederholen. ` : ''}Schaffst du dein Tagesziel, wächst deine Lernserie.
        </Text>
      </Card>

      {/* Schnellzugriff */}
      <Abschnitt titel="Üben" />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Kachel icon="flash-outline" farbe="#6D5BD0" titel="Quiz" untertitel="10 gemischte Fragen" onPress={() => nav.starteQuiz(mischen(ls.frei).slice(0, 10), 'Schnelles Quiz')} />
        <Kachel icon="timer-outline" farbe={C.danger} titel="Prüfung" untertitel="Simulation" onPress={() => nav.push({ name: 'pruefung' })} />
        <Kachel
          icon="albums-outline" farbe={C.success} titel="Karten"
          untertitel={ls.kartenFaellig.length ? `${ls.kartenFaellig.length} fällig` : 'Karteikarten'}
          onPress={() => nav.geheZuTab('karten')}
        />
      </View>

      <Card style={{ marginTop: 12, padding: 0 }}>
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

      {/* Fortschritt */}
      <Abschnitt titel="Dein Fortschritt" rechts={<Text onPress={() => nav.push({ name: 'statistik' })} style={{ color: C.primary, fontWeight: '600' }}>Statistik</Text>} />
      <Pressable onPress={() => nav.push({ name: 'statistik' })}>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: C.primary }}>{ls.frei.length ? Math.round((gesamt / ls.frei.length) * 100) : 0} %</Text>
            <Text style={s.muted}>{gesamt} von {ls.frei.length} Fragen bearbeitet</Text>
          </View>
          <View style={{ marginTop: 12 }}><ProgressBar value={ls.frei.length ? gesamt / ls.frei.length : 0} height={10} /></View>
        </Card>
      </Pressable>

      {!app.premium ? (
        <Pressable onPress={() => nav.push({ name: 'premium' })}>
          <Card style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: C.goldSoft }}>
            <IconBox icon="star" farbe={C.gold} groesse={40} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={s.h3}>Premium freischalten</Text>
              <Text style={s.muted}>Alle Fragen, Kapitel und Karteikarten</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={C.faint} />
          </Card>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

function Kachel({ icon, farbe, titel, untertitel, onPress }: {
  icon: IconName; farbe: string; titel: string; untertitel: string; onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.8 : 1 }]}>
      <Card style={{ padding: 14, minHeight: 120 }}>
        <IconBox icon={icon} farbe={farbe} groesse={42} />
        <Text style={[s.h3, { marginTop: 10 }]}>{titel}</Text>
        <Text style={[s.muted, { fontSize: 12, marginTop: 2 }]}>{untertitel}</Text>
      </Card>
    </Pressable>
  );
}
