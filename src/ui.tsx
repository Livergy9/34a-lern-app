import React from 'react';
import { Modal, Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { findeGlossar } from './data/glossar';
import { useApp } from './state';

export type IconName = keyof typeof Ionicons.glyphMap;

export const C = {
  primary: '#1666F0',
  primaryDark: '#0B3D9E',
  primarySoft: '#EAF1FE',
  gold: '#E9A100',
  goldSoft: '#FFF6DD',
  bg: '#F4F6FA',
  card: '#FFFFFF',
  text: '#0F172A',
  muted: '#5E6878',
  faint: '#98A1B1',
  border: '#E4E8EF',
  success: '#16A34A',
  successSoft: '#E7F6EC',
  danger: '#DC2626',
  dangerSoft: '#FDECEC',
  warn: '#D97706',
  warnSoft: '#FEF3E2',
};

// Abstände einheitlich halten
export const A = { seite: 20, abschnitt: 28, karte: 16, klein: 8 };

export const SPRACHEN = { en: 'English', ro: 'Română' } as const;

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Button({
  title, onPress, variant = 'primary', icon, disabled, style, farbe,
}: {
  title: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'weiss'; icon?: IconName;
  disabled?: boolean; style?: StyleProp<ViewStyle>; farbe?: string;
}) {
  const hinter = variant === 'primary' ? farbe ?? C.primary : variant === 'weiss' ? '#fff' : C.primarySoft;
  const vorder = variant === 'primary' ? '#fff' : farbe ?? C.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [s.btn, { backgroundColor: hinter }, disabled && { opacity: 0.4 }, pressed && { opacity: 0.85 }, style]}
    >
      <Text style={[s.btnText, { color: vorder }]}>{title}</Text>
      {icon ? <Ionicons name={icon} size={18} color={vorder} style={{ marginLeft: 8 }} /> : null}
    </Pressable>
  );
}

export function ProgressBar({ value, color = C.primary, height = 6, bg = C.border }: { value: number; color?: string; height?: number; bg?: string }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={{ height, borderRadius: height, backgroundColor: bg, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: height }} />
    </View>
  );
}

export function Chip({ label, icon, color = C.primary, bg = C.primarySoft }: {
  label: string; icon?: IconName; color?: string; bg?: string;
}) {
  return (
    <View style={[s.chip, { backgroundColor: bg }]}>
      {icon ? <Ionicons name={icon} size={14} color={color} style={{ marginRight: 6 }} /> : null}
      <Text style={{ color, fontSize: 13, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

export function IconBox({ icon, farbe = C.primary, groesse = 46 }: { icon: IconName; farbe?: string; groesse?: number }) {
  return (
    <View style={{ width: groesse, height: groesse, borderRadius: groesse * 0.28, backgroundColor: farbe + '1A', alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={icon} size={groesse * 0.5} color={farbe} />
    </View>
  );
}

export function Abschnitt({ titel, rechts }: { titel: string; rechts?: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: A.abschnitt, marginBottom: 12 }}>
      <Text style={[s.h2, { flex: 1 }]}>{titel}</Text>
      {rechts}
    </View>
  );
}

// Listenzeile in einer Karte: Symbol, Titel, Untertitel, Pfeil oder Schloss
export function Zeile({
  icon, farbe, titel, untertitel, onPress, gesperrt, rechts, erste,
}: {
  icon?: IconName; farbe?: string; titel: string; untertitel?: string; onPress?: () => void; gesperrt?: boolean;
  rechts?: React.ReactNode; erste?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        { flexDirection: 'row', alignItems: 'center', padding: 14, borderTopWidth: erste ? 0 : 1, borderTopColor: C.border },
        pressed && { backgroundColor: C.bg },
      ]}
    >
      {icon ? <View style={{ marginRight: 12 }}><IconBox icon={icon} farbe={farbe} groesse={40} /></View> : null}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: gesperrt ? C.muted : C.text }}>{titel}</Text>
        {untertitel ? <Text style={[s.muted, { marginTop: 2, fontSize: 13 }]}>{untertitel}</Text> : null}
      </View>
      {rechts ?? (gesperrt
        ? <Ionicons name="lock-closed" size={18} color={C.gold} />
        : onPress ? <Ionicons name="chevron-forward" size={20} color={C.faint} /> : null)}
    </Pressable>
  );
}

export function Leer({ icon, titel, text }: { icon: IconName; titel: string; text: string }) {
  return (
    <View style={{ alignItems: 'center', padding: 28 }}>
      <Ionicons name={icon} size={44} color={C.faint} />
      <Text style={[s.h3, { marginTop: 12, textAlign: 'center' }]}>{titel}</Text>
      <Text style={[s.muted, { marginTop: 6, textAlign: 'center' }]}>{text}</Text>
    </View>
  );
}

// Text mit antippbaren Fachbegriffen: [[Begriff]] oder [[Anzeigetext|glossarId]]
const TERM = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export function begriffeIn(text: string): string[] {
  const ids: string[] = [];
  for (const m of text.matchAll(TERM)) {
    const g = findeGlossar(m[2] ?? m[1]);
    if (g && !ids.includes(g.id)) ids.push(g.id);
  }
  return ids;
}

export const ohneMarkup = (text: string) => text.replace(TERM, (_m, anzeige) => anzeige);

export function TermText({ text, style, interaktiv = true }: { text: string; style?: StyleProp<TextStyle>; interaktiv?: boolean }) {
  const { zeigeGlossar } = useApp();
  if (!interaktiv) return <Text style={style}>{ohneMarkup(text)}</Text>;
  const teile: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TERM)) {
    const idx = m.index ?? 0;
    if (idx > last) teile.push(text.slice(last, idx));
    const g = findeGlossar(m[2] ?? m[1]);
    if (g) {
      teile.push(
        <Text key={`t${i++}`} style={s.term} onPress={() => zeigeGlossar(g.id)} suppressHighlighting={false}>
          {m[1]}
        </Text>
      );
    } else {
      teile.push(m[1]);
    }
    last = idx + m[0].length;
  }
  if (last < text.length) teile.push(text.slice(last));
  return <Text style={style}>{teile}</Text>;
}

export function GlossarInhalt({ id }: { id: string; kompakt?: boolean }) {
  const { hilfeSprache } = useApp();
  const g = findeGlossar(id);
  if (!g) return null;
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        <Chip label={g.begriff} />
        {hilfeSprache ? (
          <Text style={{ marginLeft: 10, color: C.muted, fontSize: 15 }}>
            {hilfeSprache.toUpperCase()}: <Text style={{ color: C.text, fontWeight: '600' }}>{g.uebersetzung[hilfeSprache]}</Text>
          </Text>
        ) : null}
      </View>
      <Text style={[s.body, { marginTop: 10 }]}>{g.erklaerung.de}</Text>
      {hilfeSprache ? (
        <Text style={[s.body, { marginTop: 8, color: C.muted, fontStyle: 'italic' }]}>{g.erklaerung[hilfeSprache]}</Text>
      ) : null}
    </View>
  );
}

export function GlossarSheet() {
  const { glossarOffen, zeigeGlossar } = useApp();
  return (
    <Modal visible={!!glossarOffen} transparent animationType="slide" onRequestClose={() => zeigeGlossar(null)}>
      <Pressable style={s.backdrop} onPress={() => zeigeGlossar(null)} />
      <View style={s.sheet}>
        <View style={s.grabber} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
          <Ionicons name="book-outline" size={20} color={C.primary} />
          <Text style={[s.h3, { marginLeft: 8, flex: 1 }]}>Fachbegriff</Text>
          <Pressable onPress={() => zeigeGlossar(null)} hitSlop={12}>
            <Ionicons name="close" size={24} color={C.muted} />
          </Pressable>
        </View>
        {glossarOffen ? <GlossarInhalt id={glossarOffen} /> : null}
      </View>
    </Modal>
  );
}

// Knopf „Übersetzen“: schaltet die Übersetzung von Frage und Erklärung an/aus (bleibt für die nächsten Fragen an)
export function UebersetzenKnopf() {
  const { hilfeSprache, uebersetzungAn, setUebersetzungAn } = useApp();
  if (!hilfeSprache) return null;
  return (
    <Pressable
      onPress={() => setUebersetzungAn(!uebersetzungAn)}
      hitSlop={8}
      accessibilityRole="switch"
      accessibilityState={{ checked: uebersetzungAn }}
      style={{
        flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10,
        backgroundColor: uebersetzungAn ? C.primary : C.primarySoft,
      }}
    >
      <Ionicons name="language-outline" size={16} color={uebersetzungAn ? '#fff' : C.primary} />
      <Text style={{ marginLeft: 6, fontWeight: '600', fontSize: 14, color: uebersetzungAn ? '#fff' : C.primary }}>
        {uebersetzungAn ? `${SPRACHEN[hilfeSprache]} an` : `Übersetzen (${hilfeSprache.toUpperCase()})`}
      </Text>
    </Pressable>
  );
}

// Übersetzter Text in einem hellblauen Kasten unter dem deutschen Text
export function UebersetzungBox({ text, style }: { text: string; style?: StyleProp<ViewStyle> }) {
  const { hilfeSprache } = useApp();
  if (!hilfeSprache) return null;
  return (
    <View style={[{ backgroundColor: C.primarySoft, borderRadius: 12, padding: 12, flexDirection: 'row' }, style]}>
      <Text style={{ color: C.primary, fontWeight: '700', fontSize: 13, marginRight: 8, marginTop: 2 }}>{hilfeSprache.toUpperCase()}</Text>
      <Text style={[s.body, { flex: 1 }]}>{text}</Text>
    </View>
  );
}

// Kopfzeile: "schliessen" = X (Quiz, Prüfung), sonst Pfeil zurück
export function ScreenHeader({ title, onClose, right, art = 'zurueck' }: {
  title: string; onClose?: () => void; right?: React.ReactNode; art?: 'zurueck' | 'schliessen';
}) {
  return (
    <View style={s.header}>
      <View style={{ width: 44 }}>
        {onClose ? (
          <Pressable onPress={onClose} hitSlop={12} accessibilityLabel={art === 'zurueck' ? 'Zurück' : 'Schließen'}>
            <Ionicons name={art === 'zurueck' ? 'chevron-back' : 'close'} size={26} color={C.text} />
          </Pressable>
        ) : null}
      </View>
      <Text style={s.headerTitle} numberOfLines={1}>{title}</Text>
      <View style={{ width: 44, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}

export const s = StyleSheet.create({
  card: {
    backgroundColor: C.card, borderRadius: 18, padding: A.karte,
    shadowColor: '#0F172A', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  btn: { minHeight: 54, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  btnText: { fontSize: 17, fontWeight: '600' },
  chip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  term: { color: C.primary, textDecorationLine: 'underline', textDecorationStyle: 'dotted' },
  backdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.35)' },
  sheet: { backgroundColor: C.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  grabber: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: C.border, marginBottom: 14 },
  h1: { fontSize: 30, fontWeight: '800', color: C.text },
  h2: { fontSize: 20, fontWeight: '700', color: C.text },
  h3: { fontSize: 17, fontWeight: '700', color: C.text },
  body: { fontSize: 16, lineHeight: 23, color: C.text },
  muted: { fontSize: 14, color: C.muted },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600', color: C.text },
  seite: { padding: A.seite, paddingBottom: 48 },
});
