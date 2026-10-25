import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { berechneSerie } from '../lernstand';
import { useApp } from '../state';
import { C, s } from '../ui';

const DAUER_MS = 3200;

// Kurzer Moment oben, wenn das Tagesziel erreicht ist. Verschwindet von selbst oder beim Antippen.
export default function ZielMoment() {
  const { zielMoment, schliesseZielMoment, zielTage, tagesziel } = useApp();
  const insets = useSafeAreaInsets();
  const rein = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0.4)).current;
  const serie = berechneSerie(zielTage);

  useEffect(() => {
    if (!zielMoment) return;
    rein.setValue(0);
    pop.setValue(0.4);
    Animated.parallel([
      Animated.spring(rein, { toValue: 1, useNativeDriver: true, friction: 7, tension: 70 }),
      Animated.sequence([
        Animated.delay(150),
        Animated.spring(pop, { toValue: 1, useNativeDriver: true, friction: 4, tension: 120 }),
      ]),
    ]).start();
    const t = setTimeout(schliessen, DAUER_MS);
    return () => clearTimeout(t);
  }, [zielMoment]);

  function schliessen() {
    Animated.timing(rein, { toValue: 0, duration: 220, useNativeDriver: true }).start(() => schliesseZielMoment());
  }

  if (!zielMoment) return null;

  const translateY = rein.interpolate({ inputRange: [0, 1], outputRange: [-120, 0] });

  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: insets.top + 8, paddingHorizontal: 16 }}>
      <Animated.View style={{ opacity: rein, transform: [{ translateY }] }}>
        <Pressable
          onPress={schliessen}
          accessibilityRole="alert"
          accessibilityLabel={`Tagesziel geschafft. Lernserie ${serie} ${serie === 1 ? 'Tag' : 'Tage'}.`}
          style={[s.card, { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, shadowOpacity: 0.15, shadowRadius: 20, elevation: 8 }]}
        >
          <Animated.View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: C.warnSoft, alignItems: 'center', justifyContent: 'center', transform: [{ scale: pop }] }}>
            <Ionicons name="flame" size={26} color={C.warn} />
          </Animated.View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.h3}>Tagesziel geschafft!</Text>
            <Text style={[s.muted, { marginTop: 2 }]}>
              {tagesziel} Aufgaben · Lernserie: {serie} {serie === 1 ? 'Tag' : 'Tage'}
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}
