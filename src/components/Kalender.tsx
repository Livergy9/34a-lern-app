import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { alsText, ausText, heute, MONATE, WOCHENTAGE_KURZ } from '../datum';
import { C } from '../ui';

// Einfacher Monatskalender zum Auswählen des Prüfungsdatums (Tage in der Vergangenheit gesperrt)
export default function Kalender({ wert, onWaehle }: { wert: string | null; onWaehle: (d: string) => void }) {
  const start = ausText(wert ?? heute());
  const [jahr, setJahr] = useState(start.getFullYear());
  const [monat, setMonat] = useState(start.getMonth());
  const h = heute();

  const ersterWochentag = (new Date(jahr, monat, 1).getDay() + 6) % 7; // Montag = 0
  const tageImMonat = new Date(jahr, monat + 1, 0).getDate();
  const zellen: (number | null)[] = [...Array(ersterWochentag).fill(null), ...Array.from({ length: tageImMonat }, (_, i) => i + 1)];
  while (zellen.length % 7) zellen.push(null);

  const blaettern = (n: number) => {
    const d = new Date(jahr, monat + n, 1);
    setJahr(d.getFullYear());
    setMonat(d.getMonth());
  };
  const istAktuellerMonat = jahr === new Date().getFullYear() && monat === new Date().getMonth();

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Pressable onPress={() => blaettern(-1)} disabled={istAktuellerMonat} hitSlop={10} style={{ padding: 6, opacity: istAktuellerMonat ? 0.3 : 1 }} accessibilityLabel="Vorheriger Monat">
          <Ionicons name="chevron-back" size={22} color={C.text} />
        </Pressable>
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: C.text }}>{MONATE[monat]} {jahr}</Text>
        <Pressable onPress={() => blaettern(1)} hitSlop={10} style={{ padding: 6 }} accessibilityLabel="Nächster Monat">
          <Ionicons name="chevron-forward" size={22} color={C.text} />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {WOCHENTAGE_KURZ.map((w) => (
          <Text key={w} style={{ flex: 1, textAlign: 'center', color: C.faint, fontSize: 13, fontWeight: '600', marginBottom: 6 }}>{w}</Text>
        ))}
      </View>
      {Array.from({ length: zellen.length / 7 }, (_, r) => (
        <View key={r} style={{ flexDirection: 'row' }}>
          {zellen.slice(r * 7, r * 7 + 7).map((tag, i) => {
            if (!tag) return <View key={i} style={{ flex: 1, height: 44 }} />;
            const d = alsText(new Date(jahr, monat, tag));
            const vorbei = d <= h;
            const gewaehlt = d === wert;
            return (
              <Pressable key={i} disabled={vorbei} onPress={() => onWaehle(d)} style={{ flex: 1, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                  width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: gewaehlt ? C.primary : 'transparent',
                }}>
                  <Text style={{ fontSize: 16, color: gewaehlt ? '#fff' : vorbei ? C.border : C.text, fontWeight: gewaehlt ? '700' : '400' }}>{tag}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
