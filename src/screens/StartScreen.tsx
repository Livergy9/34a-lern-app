import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FRAGEN, fragenFuer } from '../data/fragen';
import { PRUEFUNG } from '../data/sachgebiete';
import { pruefungsreife, ReifeStufe, useLernstand, waehleTagesFragen } from '../lernstand';
import { useNav } from '../nav';
import { frageFrei } from '../premium';
import { useApp } from '../state';
import { Button, C, Card, Chip, ProgressBar, s, Zeile } from '../ui';

// Start beantwortet nur zwei Fragen: „Bin ich bereit?“ und „Was mache ich heute?“.
// Fehler und Gemerkte Fragen liegen im Tab „Lernen“, Details in der Statistik.

const STUFE: Record<ReifeStufe, { text: string; farbe: string; bg: string }> = {
  leer: { text: 'Noch nicht gestartet', farbe: C.muted, bg: C.border },
  nichtBereit: { text: 'Noch nicht bereit', farbe: C.danger, bg: C.dangerSoft },
  gutAufDemWeg: { text: 'Auf gutem Weg', farbe: C.warn, bg: C.warnSoft },
  bereit: { text: 'Bereit', farbe: C.success, bg: C.successSoft },
};

export default function StartScreen() {
  const app = useApp();
  const nav = useNav();
  const ls = useLernstand();
  const reife = React.useMemo(() => pruefungsreife(FRAGEN, app.fragen), [app.fragen]);
  const stufe = STUFE[reife.stufe];
  const zielErreicht = ls.heuteErledigt >= ls.ziel;
  const anteilHeute = Math.min(1, ls.heuteErledigt / ls.ziel);
  const grenze = PRUEFUNG.bestehenProzent / 100;

  const heuteLernen = () => {
    const anzahl = zielErreicht ? 10 : Math.min(ls.ziel, Math.max(5, ls.ziel - ls.heuteErledigt));
    nav.starteQuiz(waehleTagesFragen(ls.frei, app.fragen, anzahl), 'Heute lernen');
  };

  const uebeLuecke = () => {
    if (!reife.luecke) return;
    const pool = fragenFuer(reife.luecke.sg.id).filter((f) => frageFrei(f, app.premium));
    nav.starteQuiz(waehleTagesFragen(pool, app.fragen, 10), `${reife.luecke.sg.kurz} üben`);
  };

  // Zusatzzeile in der Tageskarte: Prüfungstermin und offene Fehler
  const infos: string[] = [];
  if (ls.tageBis === 0) infos.push('Heute ist deine Prüfung – viel Erfolg!');
  else if (ls.tageBis !== null && ls.tageBis > 0) infos.push(`Prüfung in ${ls.tageBis} ${ls.tageBis === 1 ? 'Tag' : 'Tagen'}`);
  if (ls.fehler.length) {
    const n = Math.min(ls.fehler.length, 10);
    infos.push(`mit ${n} ${n === 1 ? 'Fehler' : 'Fehlern'} zum Wiederholen`);
  }

  return (
    <ScrollView contentContainerStyle={s.seite}>
      {/* Kopf */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../assets/logo.png')} style={{ width: 40, height: 40, borderRadius: 11 }} />
        <Text style={[s.h1, { fontSize: 24, marginLeft: 10, flex: 1 }]}>34a Easy</Text>
        <Pressable
          onPress={() => nav.push({ name: 'statistik' })}
          accessibilityLabel={`Lernserie ${ls.serie} ${ls.serie === 1 ? 'Tag' : 'Tage'}`}
          hitSlop={8}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons name={ls.serie > 0 ? 'flame' : 'flame-outline'} size={20} color={ls.serie > 0 ? C.warn : C.faint} />
          <Text style={{ fontWeight: '700', color: ls.serie > 0 ? C.warn : C.faint, fontSize: 16, marginLeft: 4 }}>
            {ls.serie} {ls.serie === 1 ? 'Tag' : 'Tage'}
          </Text>
        </Pressable>
      </View>

      {/* Bin ich bereit? */}
      <Text style={stil.label}>Bin ich bereit?</Text>
      <Card style={{ padding: 0 }}>
        <Pressable
          onPress={() => nav.push({ name: 'statistik' })}
          accessibilityLabel={`Prüfungsreife: etwa ${Math.round(reife.punkte)} von ${PRUEFUNG.punkte} Punkten. ${stufe.text}`}
          style={({ pressed }) => [{ padding: 16 }, pressed && { opacity: 0.85 }]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={{ fontSize: 36, fontWeight: '800', color: C.text, letterSpacing: -1 }}>{Math.round(reife.punkte)}</Text>
              <Text style={{ fontSize: 15, color: C.muted, marginLeft: 4 }}>/ {PRUEFUNG.punkte} Punkte</Text>
            </View>
            <Chip label={stufe.text} color={stufe.farbe} bg={stufe.bg} />
          </View>
          <View style={{ marginTop: 12 }}>
            <ProgressBar value={reife.anteil} height={12} />
            {/* Markierung Bestehensgrenze */}
            <View style={{ position: 'absolute', left: `${grenze * 100}%`, top: -4, width: 2, height: 20, marginLeft: -1, borderRadius: 1, backgroundColor: C.text }} />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            <View style={{ width: `${grenze * 100}%` }} />
            <Text style={{ fontSize: 12, color: C.muted, marginLeft: -12 }}>{Math.round(PRUEFUNG.punkte * grenze)} = bestanden</Text>
          </View>
          {reife.stufe === 'leer' ? (
            <Text style={[s.muted, { fontSize: 13, marginTop: 10 }]}>Beantworte Fragen, dann siehst du hier, wie viele Punkte du schaffen würdest.</Text>
          ) : null}
        </Pressable>
        {reife.luecke && reife.stufe !== 'leer' ? (
          <Pressable
            onPress={uebeLuecke}
            accessibilityLabel={`Größte Lücke: ${reife.luecke.sg.kurz}. Üben`}
            style={({ pressed }) => [stil.lueckeZeile, pressed && { backgroundColor: C.bg }]}
          >
            <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: reife.luecke.sg.farbe }} />
            <Text style={{ flex: 1, marginLeft: 8, fontSize: 14, color: C.text }}>
              Größte Lücke: <Text style={{ fontWeight: '700' }}>{reife.luecke.sg.kurz}</Text>
            </Text>
            <Text style={{ color: C.primary, fontWeight: '700', fontSize: 14 }}>Üben ›</Text>
          </Pressable>
        ) : null}
      </Card>

      {/* Heute */}
      <Text style={stil.label}>Heute</Text>
      <Card style={{ backgroundColor: C.primary }}>
        <Pressable onPress={() => nav.push({ name: 'lernplan' })} hitSlop={6} accessibilityLabel={`Tagesziel ${ls.heuteErledigt} von ${ls.ziel} Aufgaben. Lernplan öffnen`} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600', flex: 1 }}>
            {zielErreicht ? 'Tagesziel geschafft!' : 'Tagesziel'}
          </Text>
          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>{ls.heuteErledigt} / {ls.ziel}</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" style={{ marginLeft: 4, opacity: 0.8 }} />
        </Pressable>
        <View style={{ marginTop: 10 }}>
          <ProgressBar value={anteilHeute} color="#fff" bg="rgba(255,255,255,0.3)" height={10} />
        </View>
        {infos.length ? (
          <Text style={{ color: '#fff', opacity: 0.85, fontSize: 13, marginTop: 8 }}>
            {infos.join(' · ').replace(/^m/, 'M')}
          </Text>
        ) : null}
        <Button
          title={zielErreicht ? 'Weiter üben' : ls.heuteErledigt ? 'Weiterlernen' : 'Jetzt lernen'}
          icon="arrow-forward"
          variant="weiss"
          onPress={heuteLernen}
          style={{ marginTop: 14 }}
        />
      </Card>

      {/* Prüfung simulieren */}
      <Card style={{ marginTop: 12, padding: 0 }}>
        <Zeile
          erste
          icon="timer-outline"
          farbe={C.danger}
          titel="Prüfung simulieren"
          untertitel={`${PRUEFUNG.fragen} Fragen · ${PRUEFUNG.minuten} Minuten`}
          onPress={() => nav.push({ name: 'pruefung' })}
        />
      </Card>

      {!app.premium ? (
        <Pressable onPress={() => nav.push({ name: 'premium' })} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 18, paddingVertical: 6 }}>
          <Ionicons name="star" size={15} color={C.gold} />
          <Text style={{ color: C.gold, fontWeight: '700', fontSize: 14, marginLeft: 6 }}>Alle Fragen freischalten</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const stil = {
  label: { fontSize: 14, fontWeight: '600' as const, color: C.muted, marginTop: 24, marginBottom: 8 },
  lueckeZeile: {
    flexDirection: 'row' as const, alignItems: 'center' as const,
    paddingHorizontal: 16, paddingVertical: 13, borderTopWidth: 1, borderTopColor: C.border,
  },
};
