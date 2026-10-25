import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, BackHandler, Pressable, Text, View } from 'react-native';
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

const TABS: { id: Tab; label: string; icon: IconName; iconAktiv: IconName }[] = [
  { id: 'start', label: 'Start', icon: 'home-outline', iconAktiv: 'home' },
  { id: 'lernen', label: 'Lernen', icon: 'school-outline', iconAktiv: 'school' },
  { id: 'karten', label: 'Karten', icon: 'albums-outline', iconAktiv: 'albums' },
  { id: 'glossar', label: 'Glossar', icon: 'book-outline', iconAktiv: 'book' },
  { id: 'mehr', label: 'Mehr', icon: 'ellipsis-horizontal-circle-outline', iconAktiv: 'ellipsis-horizontal-circle' },
];

type StapelEintrag = { key: number; route: Route };

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

  const nav = useMemo<Nav>(() => {
    const push = (route: Route) => setStapel((st) => [...st, { key: Date.now() + Math.random(), route }]);
    return {
      push,
      ersetze: (route) => setStapel((st) => [...st.slice(0, -1), { key: Date.now() + Math.random(), route }]),
      zurueck: () => setStapel((st) => st.slice(0, -1)),
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

  if (!app.geladen) {
    return (
      <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={C.primary} />
      </View>
    );
  }

  if (!app.onboardingFertig) return <OnboardingScreen />;

  const oben = stapel[stapel.length - 1];

  return (
    <NavCtx.Provider value={nav}>
      {oben ? (
        <View key={oben.key} style={{ flex: 1, backgroundColor: C.bg }}>
          <Bildschirm route={oben.route} />
        </View>
      ) : (
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
      )}
    </NavCtx.Provider>
  );
}

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
