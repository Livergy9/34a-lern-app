import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Frage } from '../data/types';
import { useNav } from '../nav';
import { bewerte } from '../state';
import { C, Chip, s, ScreenHeader } from '../ui';
import { AntwortListe, ErklaerungKarte, FrageKopf, LesezeichenKnopf } from './QuizScreen';

// Nach der Prüfung: Fragen mit eigener Antwort, richtiger Lösung und Erklärung ansehen
export default function DurchsichtScreen({ titel, eintraege }: { titel: string; eintraege: { frage: Frage; auswahl: number[] }[] }) {
  const nav = useNav();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
      <ScreenHeader title={titel} onClose={nav.zurueck} />
      <ScrollView contentContainerStyle={[s.seite, { paddingTop: 4, gap: 36 }]}>
        {eintraege.map(({ frage, auswahl }, i) => {
          const e = bewerte(frage, auswahl);
          return (
            <View key={frage.id}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Text style={[s.h3, { flex: 1 }]}>Frage {i + 1} von {eintraege.length}</Text>
                <Chip
                  label={auswahl.length ? `${e.punkte}/${e.max} Punkte` : 'Nicht beantwortet'}
                  color={e.punkte === e.max ? C.success : e.punkte ? C.warn : C.danger}
                  bg={e.punkte === e.max ? C.successSoft : e.punkte ? C.warnSoft : C.dangerSoft}
                />
                <View style={{ marginLeft: 10 }}><LesezeichenKnopf frageId={frage.id} /></View>
              </View>
              <FrageKopf frage={frage} interaktiv />
              <AntwortListe frage={frage} auswahl={auswahl} aufgedeckt interaktiv onWaehle={() => {}} />
              <View style={{ marginTop: 14 }}><ErklaerungKarte frage={frage} /></View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
