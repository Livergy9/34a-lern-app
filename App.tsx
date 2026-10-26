import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, ActivityIndicator, Alert, Animated, BackHandler, Easing, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AppStateProvider, useApp } from './src/state';
import { Nav, NavCtx, Route, Tab } from './src/nav';
import { frageFrei } from './src/premium';
import { C, GlossarSheet, IconName } from './src/ui';
import QuizScreen from './src/screens/QuizScreen';
import PruefungScreen from './src/screens/PruefungScreen';
import StartScreen from './src/screens/StartScreen';
import LernenScreen from './src/screens/LernenScreen';
import SachgebietScreen from './src/screens/SachgebietScreen';
import KapitelScreen from './src/screens/KapitelScreen';
import KartenScreen from './src/screens/KartenScreen';
import KartenRundeScreen from './src/screens/KartenRundeScreen';
import GlossarScreen from './src/screens/GlossarScreen';
import MehrScreen from './src/screens/MehrScreen';
import StatistikScreen from './src/screens/StatistikScreen';
import PremiumScreen from './src/screens/PremiumScreen';
import LernplanScreen from './src/screens/LernplanScreen';
import DurchsichtScreen from './src/screens/DurchsichtScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import ZielMoment from './src/components/ZielMoment';
import { useWischZurueck } from './src/components/WischZurueck';

const TABS: { id: Tab; label: string; icon: IconName; iconAktiv: IconName }[] = [
  { id: 'start', label: 'Start', icon: 'home-outline', iconAktiv: 'home' },
  { id: 'lernen', label: 'Lernen', icon: 'school-outline', iconAktiv: 'school' },
  { id: 'karten', label: 'Karten', icon: 'albums-outline', iconAktiv: 'albums' },
  { id: 'glossar', label: 'Glossar', icon: 'book-outline', iconAktiv: 'book' },
  { id: 'mehr', label: 'Mehr', icon: 'ellipsis-horizontal-circle-outline', iconAktiv: 'ellipsis-horizontal-circle' },
];

// x = Verschiebung nach rechts (0 = ganz sichtbar, Breite = draußen). Jeder Bildschirm hat seinen eigenen Wert,
// der Bildschirm darunter wird daraus abgeleitet (leicht nach links versetzt, wie bei iOS).
type StapelEintrag = { key: number; route: Route; x: Animated.Value; einblenden: boolean };

// Wischen zurück nur auf Bildschirmen mit Zurück-Pfeil. Quiz, Prüfung, Karteikarten-Runde und Premium
// haben ein X: dort würde versehentliches Wischen die Runde ohne Nachfrage abbrechen.
const WISCHBAR: Record<Route['name'], boolean> = {
  sachgebiet: true, kapitel: true, statistik: true, lernplan: true, durchsicht: true,
  quiz: false, pruefung: false, kartenRunde: false, premium: false,
};
const VERSATZ = 0.3; // so weit liegt der Bildschirm darunter nach links versetzt

function Bildschirm({ route }: { route: Route }) {
  switch (route.name) {
    case 'quiz': return <QuizScreen fragen={route.fragen} titel={route.titel} />;
    case 'pruefung': return <PruefungScreen />;
    case 'sachgebiet': return <SachgebietScreen id={route.id} />;
    case 'kapitel': return <KapitelScreen id={route.id} />;
    case 'kartenRunde': return <KartenRundeScreen sachgebiet={route.sachgebiet} />;
    case 'statistik': return <StatistikScreen />;
    case 'premium': return <PremiumScreen />;
    case 'lernplan': return <LernplanScreen />;
    case 'durchsicht': return <DurchsichtScreen titel={route.titel} eintraege={route.eintraege} />;
  }
}

function Hauptbereich() {
  const app = useApp();
  const [tab, setTab] = useState<Tab>('start');
  const [stapel, setStapel] = useState<StapelEintrag[]>([]);
  const { width: breite } = useWindowDimensions();

  // Aktuelle Werte für die Navigation, ohne sie bei jeder Änderung neu zu bauen
  const stapelRef = useRef(stapel);
  stapelRef.current = stapel;
  const breiteRef = useRef(breite);
  breiteRef.current = breite;
  const schliesstGerade = useRef(false);

  // „Bewegung reduzieren“ in den iOS-Einstellungen: dann ohne Animation
  const wenigBewegung = useRef(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((an) => { wenigBewegung.current = an; }).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (an) => { wenigBewegung.current = an; });
    return () => sub.remove();
  }, []);

  const nav = useMemo<Nav>(() => {
    const neu = (route: Route, einblenden: boolean): StapelEintrag => ({
      key: Date.now() + Math.random(),
      route,
      x: new Animated.Value(einblenden && !wenigBewegung.current ? breiteRef.current : 0),
      einblenden: einblenden && !wenigBewegung.current,
    });
    const push = (route: Route) => setStapel((st) => [...st, neu(route, true)]);
    // Obersten Bildschirm nach rechts hinausschieben, danach entfernen (auch nach dem Wischen)
    const zurueck = () => {
      const oben = stapelRef.current[stapelRef.current.length - 1];
      if (!oben || schliesstGerade.current) return;
      const weg = () => { schliesstGerade.current = false; setStapel((st) => st.filter((e) => e.key !== oben.key)); };
      if (wenigBewegung.current) return weg();
      schliesstGerade.current = true;
      Animated.timing(oben.x, { toValue: breiteRef.current, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start(weg);
    };
    return {
      push,
      // Austauschen ohne Animation: der alte Bildschirm würde sonst mitten in der Bewegung verschwinden
      ersetze: (route) => setStapel((st) => [...st.slice(0, -1), neu(route, false)]),
      zurueck,
      zumStart: () => setStapel([]),
      geheZuTab: (t) => { setStapel([]); setTab(t); },
      starteQuiz: (fragen, titel) => {
        if (!fragen.length) {
          Alert.alert('Keine Fragen', 'Hier gibt es gerade keine Fragen.');
          return;
        }
        const frei = fragen.filter((f) => frageFrei(f, app.premium));
        if (!frei.length) return push({ name: 'premium' });
        push({ name: 'quiz', fragen: frei, titel });
      },
    };
  }, [app.premium]);

  // Android: Zurück-Taste schließt den obersten Bildschirm
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!stapel.length) return false;
      nav.zurueck();
      return true;
    });
    return () => sub.remove();
  }, [stapel.length, nav]);

  const oben = stapel[stapel.length - 1];

  // Neuer Bildschirm gleitet von rechts herein (der darunter gleitet leicht nach links mit)
  useEffect(() => {
    if (!oben?.einblenden) return;
    oben.einblenden = false;
    Animated.timing(oben.x, { toValue: 0, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [oben?.key]);

  const wischen = useWischZurueck(oben?.x, breite, !!oben && WISCHBAR[oben.route.name], nav.zurueck);

  if (!app.geladen) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={C.primary} />
      </View>
    );
  }

  if (!app.onboardingFertig) return <OnboardingScreen />;

  // Alle Bildschirme bleiben als Ebenen übereinander erhalten (Scroll-Position und Zustand bleiben beim Zurückgehen).
  // Nur die oberste Ebene ist bedienbar. Die Ebene direkt darunter bewegt sich beim Wischen leicht mit.
  const n = stapel.length;
  const versatz = (i: number) => {
    if (i === n - 1) return stapel[i].x;
    if (i === n - 2) return stapel[n - 1].x.interpolate({ inputRange: [0, breite], outputRange: [-breite * VERSATZ, 0], extrapolate: 'clamp' });
    return -breite * VERSATZ;
  };
  const ebene = (aktiv: boolean) => ({
    accessibilityElementsHidden: !aktiv,
    importantForAccessibility: aktiv ? ('auto' as const) : ('no-hide-descendants' as const),
  });

  return (
    <NavCtx.Provider value={nav}>
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        <Animated.View {...ebene(n === 0)} style={[StyleSheet.absoluteFill, { pointerEvents: n === 0 ? 'auto' : 'none', transform: [{ translateX: n === 0 ? 0 : versatz(-1) }] }]}>
          <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
            <View style={{ flex: 1 }}>
              {tab === 'start' && <StartScreen />}
              {tab === 'lernen' && <LernenScreen />}
              {tab === 'karten' && <KartenScreen />}
              {tab === 'glossar' && <GlossarScreen />}
              {tab === 'mehr' && <MehrScreen />}
            </View>
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.border }}>
              <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 4 }}>
                {TABS.map((t) => {
                  const aktiv = t.id === tab;
                  return (
                    <Pressable key={t.id} onPress={() => setTab(t.id)} style={{ flex: 1, alignItems: 'center' }} accessibilityRole="tab" accessibilityState={{ selected: aktiv }}>
                      <Ionicons name={aktiv ? t.iconAktiv : t.icon} size={24} color={aktiv ? C.primary : C.faint} />
                      <Text style={{ fontSize: 11, marginTop: 2, color: aktiv ? C.primary : C.faint, fontWeight: aktiv ? '600' : '400' }}>{t.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </SafeAreaView>
          </SafeAreaView>
        </Animated.View>
        {stapel.map((e, i) => (
          <Animated.View
            key={e.key}
            {...ebene(i === n - 1)}
            {...(i === n - 1 ? wischen : {})}
            style={[StyleSheet.absoluteFill, stil.ebene, { pointerEvents: i === n - 1 ? 'auto' : 'none', transform: [{ translateX: versatz(i) }] }]}
          >
            <Bildschirm route={e.route} />
          </Animated.View>
        ))}
      </View>
    </NavCtx.Provider>
  );
}

const stil = StyleSheet.create({
  // Schatten an der linken Kante, damit man beim Wischen sieht, dass der Bildschirm über dem anderen liegt
  ebene: { backgroundColor: C.bg, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: -3, height: 0 }, elevation: 8 },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <StatusBar style="dark" />
        <Hauptbereich />
        <ZielMoment />
        <GlossarSheet />
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
