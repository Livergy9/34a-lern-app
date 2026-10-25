import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Kurze Vibration als Rückmeldung beim Lernen (nicht in der Prüfungssimulation).
// iOS schaltet sie selbst ab, wenn die Systemhaptik aus ist. Fehler werden still ignoriert.
export type Rueckmeldung = 'auswahl' | 'richtig' | 'teilweise' | 'falsch' | 'karte' | 'ziel';

export function vibriere(art: Rueckmeldung, an: boolean) {
  if (!an || Platform.OS === 'web') return;
  let p: Promise<void>;
  switch (art) {
    case 'auswahl':
      p = Haptics.selectionAsync();
      break;
    case 'karte':
      p = Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'richtig':
    case 'ziel':
      p = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case 'teilweise':
      p = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case 'falsch':
      p = Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
  }
  p.catch(() => {});
}
