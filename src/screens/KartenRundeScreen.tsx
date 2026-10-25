import React, { useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { sachgebietById } from '../data/sachgebiete';
import { GlossarEintrag, SachgebietId } from '../data/types';
import { heute } from '../datum';
import { ALLE_KARTEN, mischen, NEUE_KARTEN_PRO_RUNDE } from '../lernstand';
import { useNav } from '../nav';
import { karteFrei } from '../premium';
import { useApp } from '../state';
import { vibriere } from '../feedback';
import { Button, C, Card, Chip, ProgressBar, s, ScreenHeader, SPRACHEN } from '../ui';

export default function KartenRundeScreen({ sachgebiet }: { sachgebiet?: SachgebietId }) {
  const app = useApp();
  const nav = useNav();

  // Stapel einmal beim Öffnen festlegen: fällige Karten + einige neue
  const [stapel, setStapel] = useState<GlossarEintrag[]>(() => {
    const d = heute();
    const pool = ALLE_KARTEN.filter((k) => karteFrei(k, app.premium) && (!sachgebiet || k.sachgebiet === sachgebiet));
    const faellig = mischen(pool.filter((k) => app.karten[k.id] && app.karten[k.id].faellig <= d));
    const neu = pool.filter((k) => !app.karten[k.id]).slice(0, NEUE_KARTEN_PRO_RUNDE);
    const runde = [...faellig, ...neu];
    // Im Sachgebiet: wenn nichts fällig ist, trotzdem alle Karten zum Üben zeigen
    return runde.length ? runde : sachgebiet ? mischen(pool) : [];
  });
  const [gesamt] = useState(stapel.length);
  const [index, setIndex] = useState(0);
  const [umgedreht, setUmgedreht] = useState(false);
  const [uebersetzung, setUebersetzung] = useState(false);
  const [zaehler, setZaehler] = useState({ gewusst: 0, nochmal: 0 });
  const drehung = useRef(new Animated.Value(0)).current;

  const karte = stapel[index];
  const fertig = !karte;

  const umdrehen = () => {
    Animated.spring(drehung, { toValue: umgedreht ? 0 : 1, useNativeDriver: true, friction: 8, tension: 60 }).start();
    setUmgedreht(!umgedreht);
  };

  const bewerten = (gewusst: boolean) => {
    vibriere('karte', app.vibration);
    app.bewerteKarte(karte.id, gewusst);
    setZaehler((z) => (gewusst ? { ...z, gewusst: z.gewusst + 1 } : { ...z, nochmal: z.nochmal + 1 }));
    if (!gewusst) setStapel((st) => [...st, karte]); // kommt in dieser Runde nochmal
    drehung.setValue(0);
    setUmgedreht(false);
    setUebersetzung(false);
    setIndex((i) => i + 1);
  };

  const titel = sachgebiet ? sachgebietById(sachgebiet).kurz : 'Karteikarten';

  if (fertig) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
        <ScreenHeader title={titel} onClose={nav.zurueck} art="schliessen" />
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          <Card style={{ alignItems: 'center', padding: 28 }}>
            <Ionicons name={gesamt ? 'checkmark-done-circle' : 'cafe-outline'} size={56} color={gesamt ? C.success : C.faint} />
            <Text style={[s.h2, { marginTop: 12, textAlign: 'center' }]}>{gesamt ? 'Runde geschafft!' : 'Gerade nichts zu lernen'}</Text>
            <Text style={[s.body, { marginTop: 8, textAlign: 'center', color: C.muted }]}>
              {gesamt
                ? `${zaehler.gewusst}× gewusst, ${zaehler.nochmal}× nochmal. Die Karten kommen wieder, wenn sie fällig sind.`
                : 'Alle Karten sind erst später wieder dran. Schau morgen wieder rein.'}
            </Text>
          </Card>
        </View>
        <View style={{ padding: 20 }}>
          <Button title="Fertig" onPress={nav.zurueck} />
        </View>
      </SafeAreaView>
    );
  }

  const sg = sachgebietById(karte.sachgebiet);
  const vorne = drehung.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const hinten = drehung.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  const fach = app.karten[karte.id]?.box;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
      <ScreenHeader title={`${titel} · ${Math.min(index + 1, stapel.length)}/${stapel.length}`} onClose={nav.zurueck} art="schliessen" />
      <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
        <ProgressBar value={index / stapel.length} color={C.success} />
      </View>

      <Pressable onPress={umdrehen} style={{ flex: 1, marginHorizontal: 20 }} accessibilityHint="Antippen zum Umdrehen">
        {/* Vorderseite */}
        <Animated.View style={[kartenStil, { transform: [{ perspective: 1000 }, { rotateY: vorne }] }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Chip label={sg.kurz} icon={sg.icon as any} color={sg.farbe} bg={sg.farbe + '1A'} />
            <Chip label={fach ? `Fach ${fach}` : 'Neu'} color={C.muted} bg={C.border} />
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: '800', color: C.text, textAlign: 'center' }}>{karte.begriff}</Text>
            <Text style={[s.muted, { marginTop: 16 }]}>Was bedeutet das?</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="sync-outline" size={16} color={C.faint} />
            <Text style={{ color: C.faint, marginLeft: 6 }}>Antippen zum Umdrehen</Text>
          </View>
        </Animated.View>

        {/* Rückseite */}
        <Animated.View pointerEvents={umgedreht ? 'auto' : 'none'} style={[kartenStil, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, transform: [{ perspective: 1000 }, { rotateY: hinten }] }]}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: sg.farbe }}>{karte.begriff}</Text>
            <Text style={[s.body, { fontSize: 19, lineHeight: 28, marginTop: 14 }]}>{karte.erklaerung.de}</Text>
            {app.hilfeSprache ? (
              uebersetzung ? (
                <View style={{ marginTop: 18, backgroundColor: C.primarySoft, borderRadius: 14, padding: 14 }}>
                  <Text style={{ color: C.primary, fontWeight: '700' }}>{SPRACHEN[app.hilfeSprache]}: {karte.uebersetzung[app.hilfeSprache]}</Text>
                  <Text style={[s.body, { marginTop: 6, color: C.text }]}>{karte.erklaerung[app.hilfeSprache]}</Text>
                </View>
              ) : (
                <Pressable onPress={() => setUebersetzung(true)} style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingVertical: 8 }}>
                  <Ionicons name="language-outline" size={20} color={C.primary} />
                  <Text style={{ color: C.primary, fontWeight: '600', marginLeft: 6, fontSize: 16 }}>Übersetzung zeigen ({app.hilfeSprache.toUpperCase()})</Text>
                </Pressable>
              )
            ) : null}
          </ScrollView>
        </Animated.View>
      </Pressable>

      <View style={{ padding: 20, paddingTop: 16 }}>
        {umgedreht ? (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button title="Nochmal" icon="refresh" variant="secondary" farbe={C.danger} onPress={() => bewerten(false)} style={{ flex: 1, backgroundColor: C.dangerSoft }} />
            <Button title="Wusste ich" icon="checkmark" farbe={C.success} onPress={() => bewerten(true)} style={{ flex: 1 }} />
          </View>
        ) : (
          <Button title="Umdrehen" icon="sync-outline" onPress={umdrehen} />
        )}
      </View>
    </SafeAreaView>
  );
}

const kartenStil = {
  flex: 1,
  backgroundColor: C.card,
  borderRadius: 24,
  padding: 22,
  backfaceVisibility: 'hidden' as const,
  shadowColor: '#0F172A',
  shadowOpacity: 0.08,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
};
