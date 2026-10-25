import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Frage } from './src/data/types';
import { AppStateProvider } from './src/state';
import { C, GlossarSheet } from './src/ui';
import QuizScreen from './src/screens/QuizScreen';
import PruefungScreen from './src/screens/PruefungScreen';
import { GlossarScreen, LernenScreen, MehrScreen, Nav, StartScreen } from './src/screens/TabScreens';

type Tab = 'start' | 'lernen' | 'glossar' | 'mehr';
type Route = { name: 'tabs' } | { name: 'quiz'; fragen: Frage[]; key: number } | { name: 'pruefung' };

const TABS: { id: Tab; label: string; icon: keyof typeof Ionicons.glyphMap; iconAktiv: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'start', label: 'Start', icon: 'home-outline', iconAktiv: 'home' },
  { id: 'lernen', label: 'Lernen', icon: 'school-outline', iconAktiv: 'school' },
  { id: 'glossar', label: 'Glossar', icon: 'book-outline', iconAktiv: 'book' },
  { id: 'mehr', label: 'Mehr', icon: 'ellipsis-horizontal-circle-outline', iconAktiv: 'ellipsis-horizontal-circle' },
];

function Hauptbereich() {
  const [tab, setTab] = useState<Tab>('start');
  const [route, setRoute] = useState<Route>({ name: 'tabs' });
  const schliessen = () => setRoute({ name: 'tabs' });

  const nav: Nav = {
    starteQuiz: (fragen) => fragen.length && setRoute({ name: 'quiz', fragen, key: Date.now() }),
    startePruefung: () => setRoute({ name: 'pruefung' }),
    geheZuTab: setTab,
  };

  let inhalt: React.ReactNode;
  if (route.name === 'quiz') inhalt = <QuizScreen key={route.key} fragen={route.fragen} onClose={schliessen} />;
  else if (route.name === 'pruefung') inhalt = <PruefungScreen onClose={schliessen} />;
  else {
    inhalt = (
      <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top']}>
        <View style={{ flex: 1 }}>
          {tab === 'start' && <StartScreen nav={nav} />}
          {tab === 'lernen' && <LernenScreen nav={nav} />}
          {tab === 'glossar' && <GlossarScreen />}
          {tab === 'mehr' && <MehrScreen />}
        </View>
        <SafeAreaView edges={['bottom']} style={{ backgroundColor: C.card, borderTopWidth: 1, borderTopColor: C.border }}>
          <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 4 }}>
            {TABS.map((t) => {
              const aktiv = t.id === tab;
              return (
                <Pressable key={t.id} onPress={() => setTab(t.id)} style={{ flex: 1, alignItems: 'center' }}>
                  <Ionicons name={aktiv ? t.iconAktiv : t.icon} size={24} color={aktiv ? C.primary : C.faint} />
                  <Text style={{ fontSize: 11, marginTop: 2, color: aktiv ? C.primary : C.faint, fontWeight: aktiv ? '600' : '400' }}>{t.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </SafeAreaView>
      </SafeAreaView>
    );
  }

  return (
    <>
      {inhalt}
      <GlossarSheet />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <StatusBar style="dark" />
        <Hauptbereich />
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
