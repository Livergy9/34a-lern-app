import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FRAGEN, fragenFuer } from '../data/fragen';
import { SACHGEBIETE } from '../data/sachgebiete';
import { kurz, WOCHENTAGE_KURZ, ausText } from '../datum';
import { quote, useLernstand, waehleTagesFragen } from '../lernstand';
import { frageFrei } from '../premium';
import { useNav } from '../nav';
import { useApp } from '../state';
import { Abschnitt, Button, C, Card, Leer, ProgressBar, s, ScreenHeader } from '../ui';

export default function StatistikScreen() {
  const app = useApp();
  const nav = useNav();
  const ls = useLernstand();
  const gesamtQuote = quote(FRAGEN, app.fragen);
  const bearbeitet = FRAGEN.filter((f) => app.fragen[f.id]).length;
  // Schwächstes Sachgebiet: niedrigste Quote, aber erst ab 5 bearbeiteten Fragen (sonst zu wenig Daten)
  const schwach = SACHGEBIETE.map((sg) => {
    const liste = fragenFuer(sg.id);
    return { sg, q: quote(liste, app.fragen), b: liste.filter((f) => app.fragen[f.id]).length };
  })
    .filter((x) => x.q !== null && x.b >= 5 && x.q < 0.8)
    .sort((a, b) => (a.q ?? 0) - (b.q ?? 0))[0];
  const uebeSchwach = () => {
    if (!schwach) return;
    const pool = fragenFuer(schwach.sg.id).filter((f) => frageFrei(f, app.premium));
    nav.starteQuiz(waehleTagesFragen(pool, app.fragen, 10), `${schwach.sg.kurz} üben`);
  };
  const maxTag = Math.max(ls.ziel, ...ls.letzteTage.map((t) => t.anzahl));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={['top', 'bottom']}>
      <ScreenHeader title="Statistik" onClose={nav.zurueck} />
      <ScrollView contentContainerStyle={[s.seite, { paddingTop: 4 }]}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Kachel icon="calendar-outline" farbe={C.primary} zahl={String(ls.serie)} text={ls.serie === 1 ? 'Tag Serie' : 'Tage Serie'} />
          <Kachel icon="checkmark-done" farbe={C.success} zahl={gesamtQuote === null ? '–' : `${Math.round(gesamtQuote * 100)} %`} text="richtig" />
          <Kachel icon="help-circle" farbe={C.primary} zahl={`${bearbeitet}`} text={`von ${FRAGEN.length} Fragen`} />
        </View>

        <Abschnitt titel="Letzte 7 Tage" />
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 120, gap: 8 }}>
            {ls.letzteTage.map((t) => {
              const h = Math.max(4, (t.anzahl / maxTag) * 100);
              const geschafft = t.geschafft;
              const wt = WOCHENTAGE_KURZ[(ausText(t.datum).getDay() + 6) % 7];
              return (
                <View key={t.datum} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{t.anzahl || ''}</Text>
                  <View style={{ width: '70%', height: h, borderRadius: 6, backgroundColor: geschafft ? C.success : t.anzahl ? C.primary : C.border }} />
                  <Text style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{wt}</Text>
                </View>
              );
            })}
          </View>
          <Text style={[s.muted, { fontSize: 12, marginTop: 12 }]}>Grün = Tagesziel geschafft (zählt für die Serie). Insgesamt {ls.lerntageGesamt} Lerntage.</Text>
        </Card>

        <Abschnitt titel="Nach Sachgebiet" />
        {schwach ? (
          <Card style={{ marginBottom: 12, backgroundColor: C.warnSoft }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="trending-up-outline" size={22} color={C.warn} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={s.h3}>Hier kannst du am meisten verbessern</Text>
                <Text style={s.muted}>{schwach.sg.kurz}: {Math.round((schwach.q ?? 0) * 100)} % richtig</Text>
              </View>
            </View>
            <Button title="Jetzt üben" icon="arrow-forward" onPress={uebeSchwach} style={{ marginTop: 12 }} farbe={C.warn} />
          </Card>
        ) : null}
        <Card>
          <View style={{ gap: 16 }}>
            {SACHGEBIETE.map((sg) => {
              const liste = fragenFuer(sg.id);
              const b = liste.filter((f) => app.fragen[f.id]).length;
              const q = quote(liste, app.fragen);
              return (
                <View key={sg.id}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text style={{ color: C.text, fontWeight: '600', flex: 1 }}>{sg.kurz}</Text>
                    <Text style={[s.muted, { fontSize: 13 }]}>
                      {b}/{liste.length} · {q === null ? '–' : `${Math.round(q * 100)} % richtig`}
                    </Text>
                  </View>
                  <ProgressBar value={liste.length ? b / liste.length : 0} color={sg.farbe} height={8} />
                  {q !== null ? (
                    <View style={{ marginTop: 4 }}>
                      <ProgressBar value={q} color={q >= 0.5 ? C.success : C.danger} height={4} />
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
          <Text style={[s.muted, { fontSize: 12, marginTop: 14 }]}>Oberer Balken: bearbeitet. Unterer Balken: Anteil richtiger Punkte.</Text>
        </Card>

        <Abschnitt titel="Karteikarten" />
        <Card>
          <Text style={s.body}>{ls.kartenSicher} von {ls.karten.length} Karten sicher (ab Fach 3)</Text>
          <View style={{ marginTop: 10 }}><ProgressBar value={ls.karten.length ? ls.kartenSicher / ls.karten.length : 0} color={C.success} height={8} /></View>
        </Card>

        <Abschnitt titel="Prüfungssimulationen" />
        {app.pruefungen.length ? (
          <Card style={{ padding: 0 }}>
            {app.pruefungen.slice(0, 8).map((p, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', padding: 14, borderTopWidth: i ? 1 : 0, borderTopColor: C.border }}>
                <Ionicons name={p.bestanden ? 'checkmark-circle' : 'close-circle'} size={24} color={p.bestanden ? C.success : C.danger} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ fontWeight: '600', color: C.text }}>{p.bestanden ? 'Bestanden' : 'Nicht bestanden'} · {p.max ? Math.round((p.punkte / p.max) * 100) : 0} %</Text>
                  <Text style={[s.muted, { fontSize: 13 }]}>{kurz(p.datum)} · {p.fragen} Fragen · {p.punkte}/{p.max} Punkte</Text>
                </View>
              </View>
            ))}
          </Card>
        ) : (
          <Card><Leer icon="timer-outline" titel="Noch keine Prüfung" text="Mach eine Prüfungssimulation, dann siehst du hier deine Ergebnisse." /></Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Kachel({ icon, farbe, zahl, text }: { icon: any; farbe: string; zahl: string; text: string }) {
  return (
    <Card style={{ flex: 1, padding: 14, alignItems: 'center' }}>
      <Ionicons name={icon} size={24} color={farbe} />
      <Text style={{ fontSize: 22, fontWeight: '800', color: C.text, marginTop: 6 }}>{zahl}</Text>
      <Text style={[s.muted, { fontSize: 12, textAlign: 'center' }]}>{text}</Text>
    </Card>
  );
}
