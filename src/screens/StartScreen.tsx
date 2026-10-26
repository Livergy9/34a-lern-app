import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FRAGEN, fragenFuer } from '../data/fragen';
import { PRUEFUNG, SACHGEBIETE } from '../data/sachgebiete';
import { MIN_FUER_QUOTE, MIN_FUER_REIFE, PREMIUM_HINWEIS_AB, pruefungsreife, ReifeStufe, useLernstand, waehleTagesFragen } from '../lernstand';
import { useNav } from '../nav';
import { frageFrei } from '../premium';
import { useApp } from '../state';
import { Button, C, Card, ProgressBar, Ring, s, Zeile } from '../ui';

// Start beantwortet nur zwei Fragen: „Bin ich bereit?“ und „Was mache ich heute?“.
// Fehler und Gemerkte Fragen liegen im Tab „Lernen“, Details in der Statistik.

// Stufen bewusst ohne Rot: Anfangen ist kein Fehler. „Gut vorbereitet“ statt „Bereit“, weil wir nichts garantieren können.
const STUFE: Record<ReifeStufe, { text: string; farbe: string; bg: string }> = {
  leer: { text: 'Noch keine Einschätzung', farbe: C.text, bg: C.border },
  amAnfang: { text: 'Am Anfang', farbe: C.primary, bg: C.primarySoft },
  aufGutemWeg: { text: 'Auf gutem Weg', farbe: C.warn, bg: C.warnSoft },
  gutVorbereitet: { text: 'Gut vorbereitet', farbe: C.success, bg: C.successSoft },
};

const REIFE_INFO = 'Schätzung aus deinen Übungsfragen. Keine Garantie für die echte Prüfung. Der Strich im Balken zeigt die Bestehensgrenze.';

export default function StartScreen() {
  const app = useApp();
  const nav = useNav();
  const ls = useLernstand();
  const reife = React.useMemo(() => pruefungsreife(FRAGEN, app.fragen, app.premium), [app.fragen, app.premium]);
  const stufe = STUFE[reife.stufe];
  const [infoOffen, setInfoOffen] = React.useState(false);
  // „X von Y (Gratis-)Fragen geübt“: bei Gratis nur die freien Fragen, sonst klingt „30 von 308“ unerreichbar
  const geuebt = ls.bearbeitet(ls.frei);
  const quoteText = reife.beantwortet >= MIN_FUER_QUOTE ? ` · ${Math.round(reife.quote * 100)} % richtig` : '';
  const geuebtText = `${geuebt} von ${ls.frei.length} ${app.premium ? 'Fragen' : 'Gratis-Fragen'} geübt${quoteText}`;
  const gesperrt = FRAGEN.length - ls.frei.length;
  const zeigePremium = !app.premium && gesperrt > 0 && ls.frei.length > 0 && geuebt / ls.frei.length >= PREMIUM_HINWEIS_AB;
  const zielErreicht = ls.heuteErledigt >= ls.ziel;
  const anteilHeute = Math.min(1, ls.heuteErledigt / ls.ziel);
  const grenze = PRUEFUNG.bestehenProzent / 100;
  const fehlenBisReife = Math.max(0, MIN_FUER_REIFE - reife.beantwortet);
  const reifeLabel = reife.stufe === 'leer'
    ? `Prüfungsreife: noch keine Einschätzung. Noch ${fehlenBisReife} Fragen beantworten. Statistik öffnen`
    : `Prüfungsreife: ${stufe.text}. ${geuebtText}. Statistik öffnen`;

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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 8 }}>
        <Text style={[stil.label, { marginTop: 0, marginBottom: 0, flex: 1 }]}>Bin ich bereit?</Text>
        <Pressable
          onPress={() => setInfoOffen(!infoOffen)}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={infoOffen ? 'Erklärung ausblenden' : 'Erklärung anzeigen'}
        >
          <Ionicons name={infoOffen ? 'information-circle' : 'information-circle-outline'} size={20} color={infoOffen ? C.primary : C.faint} />
        </Pressable>
      </View>
      {infoOffen ? <Text style={[s.muted, { fontSize: 13, marginBottom: 8, lineHeight: 18 }]}>{REIFE_INFO}</Text> : null}
      <Card style={{ padding: 0 }}>
        <Pressable
          onPress={() => nav.push({ name: 'statistik' })}
          accessibilityLabel={reifeLabel}
          style={({ pressed }) => [{ padding: 16 }, pressed && { opacity: 0.85 }]}
        >
          {reife.stufe === 'leer' ? (
            <>
              <Text style={{ fontSize: 22, fontWeight: '800', color: C.text, letterSpacing: -0.5 }}>Noch keine Einschätzung</Text>
              <View style={{ marginTop: 12 }}>
                <ProgressBar value={reife.beantwortet / MIN_FUER_REIFE} height={10} />
              </View>
              <Text style={[s.muted, { fontSize: 13, marginTop: 8 }]}>
                Noch {fehlenBisReife} {fehlenBisReife === 1 ? 'Frage' : 'Fragen'} beantworten, dann siehst du hier, wie gut du vorbereitet bist.
              </Text>
            </>
          ) : (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ flex: 1, fontSize: 24, fontWeight: '800', color: stufe.farbe, letterSpacing: -0.5 }}>{stufe.text}</Text>
                <Ionicons name="chevron-forward" size={18} color={C.faint} />
              </View>
              <View style={{ marginTop: 12 }}>
                <ProgressBar value={reife.anteil} color={stufe.farbe} bg={stufe.bg} height={12} />
                {/* Markierung Bestehensgrenze (Erklärung hinter dem (i)) */}
                <View style={{ position: 'absolute', left: `${grenze * 100}%`, top: -3, width: 2, height: 18, marginLeft: -1, borderRadius: 1, backgroundColor: C.faint }} />
              </View>
              <Text style={[s.muted, { fontSize: 13, marginTop: 10 }]}>{geuebtText}</Text>
            </>
          )}
        </Pressable>
        {zeigePremium ? (
          <View style={[stil.trenner, { padding: 16 }]}>
            <Text style={{ fontSize: 14, color: C.text, lineHeight: 20 }}>
              Für die Prüfung fehlen dir noch <Text style={{ fontWeight: '700' }}>{gesperrt} Fragen</Text>.
            </Text>
            <Button title="Alle Fragen freischalten" icon="star" farbe={C.gold} onPress={() => nav.push({ name: 'premium' })} style={{ marginTop: 12 }} />
          </View>
        ) : null}
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
        <Pressable onPress={() => nav.push({ name: 'lernplan' })} hitSlop={6} accessibilityLabel={zielErreicht
            ? `Tagesziel geschafft. ${ls.heuteErledigt} Aufgaben heute. Lernplan öffnen`
            : `Tagesziel ${ls.heuteErledigt} von ${ls.ziel} Aufgaben. Lernplan öffnen`} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {zielErreicht ? <Ionicons name="checkmark-circle" size={20} color="#fff" style={{ marginRight: 6 }} /> : null}
          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600', flex: 1 }}>
            {zielErreicht ? 'Tagesziel geschafft' : 'Tagesziel'}
          </Text>
          {/* Nach dem Ziel nicht „72 / 20“ zeigen, sondern einfach die Anzahl von heute */}
          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>
            {zielErreicht ? `${ls.heuteErledigt} heute` : `${ls.heuteErledigt} / ${ls.ziel}`}
          </Text>
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
          title={ls.heuteErledigt ? 'Weiterlernen' : 'Jetzt lernen'}
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

      {/* Deine Sachgebiete: zeigt, woraus sich die Einschätzung oben zusammensetzt. Ring = geübter Anteil */}
      <Text style={stil.label}>Deine Sachgebiete</Text>
      <Card style={{ paddingVertical: 6, paddingHorizontal: 6 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {reife.gebiete.map((g) => {
            const gesamt = fragenFuer(g.sg.id).length;
            const n = Math.round(g.geuebt * gesamt);
            return (
              <Pressable
                key={g.sg.id}
                onPress={() => nav.push({ name: 'sachgebiet', id: g.sg.id })}
                accessibilityLabel={`${g.sg.name}: ${n} von ${gesamt} Fragen geübt. Öffnen`}
                style={({ pressed }) => [stil.gebiet, pressed && { backgroundColor: C.bg }]}
              >
                <Ring value={g.geuebt} color={g.sg.farbe} bg={g.sg.farbe + '22'} size={34} dicke={4}>
                  <Ionicons name={g.sg.icon as any} size={14} color={g.sg.farbe} />
                </Ring>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '600', color: C.text }}>{g.sg.kurz}</Text>
                  <Text style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{n} / {gesamt}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </Card>
    </ScrollView>
  );
}

const stil = {
  label: { fontSize: 14, fontWeight: '600' as const, color: C.muted, marginTop: 24, marginBottom: 8 },
  trenner: { borderTopWidth: 1, borderTopColor: C.border },
  gebiet: {
    width: '50%' as const, flexDirection: 'row' as const, alignItems: 'center' as const,
    paddingHorizontal: 10, paddingVertical: 9, borderRadius: 12,
  },
  lueckeZeile: {
    flexDirection: 'row' as const, alignItems: 'center' as const,
    paddingHorizontal: 16, paddingVertical: 13, borderTopWidth: 1, borderTopColor: C.border,
  },
};
