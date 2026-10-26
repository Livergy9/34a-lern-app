import { useMemo, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

// Wischen vom linken Rand zurück (wie bei iOS).
// Der oberste Bildschirm folgt dem Finger. Ab gut einem Drittel der Breite oder bei schnellem Wischen
// geht es zurück, sonst federt er zurück.
const RAND = 30; // Breite des Streifens am linken Rand, in dem das Wischen beginnen muss
const SCHWELLE = 0.35; // Anteil der Breite, ab dem beim Loslassen zurückgegangen wird
const TEMPO = 0.5; // Geschwindigkeit (px/ms), ab der auch ein kurzes Wischen zurückgeht

export function useWischZurueck(x: Animated.Value | undefined, breite: number, aktiv: boolean, zurueck: () => void) {
  // Immer die aktuelle Funktion nutzen, ohne den PanResponder neu zu bauen
  const zurueckRef = useRef(zurueck);
  zurueckRef.current = zurueck;

  return useMemo(() => {
    if (!x || !aktiv) return {};
    const zuruecksetzen = () => Animated.spring(x, { toValue: 0, useNativeDriver: true, bounciness: 0, speed: 20 }).start();
    return PanResponder.create({
      // Nur übernehmen, wenn die Bewegung am linken Rand beginnt und klar waagerecht nach rechts geht
      onMoveShouldSetPanResponderCapture: (_e, g) => g.x0 <= RAND && g.dx > 10 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (_e, g) => x.setValue(Math.max(0, g.dx)),
      onPanResponderRelease: (_e, g) => {
        if (g.dx > breite * SCHWELLE || (g.vx > TEMPO && g.dx > 0)) zurueckRef.current();
        else zuruecksetzen();
      },
      onPanResponderTerminate: zuruecksetzen,
    }).panHandlers;
  }, [x, breite, aktiv]);
}
