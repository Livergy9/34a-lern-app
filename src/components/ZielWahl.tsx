import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp, ZIEL_STUFEN } from '../state';
import { C, Card, s } from '../ui';

// Auswahl des Tagesziels: Locker / Normal / Intensiv
export default function ZielWahl() {
  const app = useApp();
  return (
    <View style={{ gap: 10 }}>
      {ZIEL_STUFEN.map((z) => {
        const aktiv = app.tagesziel === z.wert;
        return (
          <Pressable key={z.wert} onPress={() => app.setTagesziel(z.wert)} accessibilityRole="radio" accessibilityState={{ checked: aktiv }}>
            <Card style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: aktiv ? C.primary : 'transparent' }}>
              <View style={{ flex: 1 }}>
                <Text style={s.h3}>{z.titel}{z.wert === 20 ? ' (empfohlen)' : ''}</Text>
                <Text style={s.muted}>{z.wert} Aufgaben am Tag</Text>
              </View>
              <Ionicons name={aktiv ? 'radio-button-on' : 'radio-button-off'} size={24} color={aktiv ? C.primary : C.faint} />
            </Card>
          </Pressable>
        );
      })}
    </View>
  );
}
