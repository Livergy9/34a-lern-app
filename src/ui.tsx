import React from 'react';
import { Modal, Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { findeGlossar } from './data/glossar';
import { useApp } from './state';

export const C = {
  primary: '#1666F0',
  primaryDark: '#0B3D9E',
  primarySoft: '#EAF1FE',
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

export const SPRACHEN = { en: 'English', ro: 'Română' } as const;

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Button({
  title, onPress, variant = 'primary', icon, disabled, style,
}: {
  title: string; onPress: () => void; variant?: 'primary' | 'secondary'; icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean; style?: StyleProp<ViewStyle>;
}) {
  const primary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        s.btn,
        primary ? { backgroundColor: C.primary } : { backgroundColor: C.primarySoft },
        disabled && { opacity: 0.4 },
        pressed && { opacity: 0.8 },
        style,
      ]}
    >
      <Text style={[s.btnText, { color: primary ? '#fff' : C.primary }]}>{title}</Text>
      {icon ? <Ionicons name={icon} size={18} color={primary ? '#fff' : C.primary} style={{ marginLeft: 8 }} /> : null}
    </Pressable>
  );
}

export function ProgressBar({ value, color = C.primary, height = 6 }: { value: number; color?: string; height?: number }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={{ height, borderRadius: height, backgroundColor: C.border, overflow: 'hidden' }}>
      <View style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: height }} />
    </View>
  );
}

export function Chip({ label, icon, color = C.primary, bg = C.primarySoft }: {
  label: string; icon?: keyof typeof Ionicons.glyphMap; color?: string; bg?: string;
}) {
  return (
    <View style={[s.chip, { backgroundColor: bg }]}>
      {icon ? <Ionicons name={icon} size={14} color={color} style={{ marginRight: 6 }} /> : null}
      <Text style={{ color, fontSize: 13, fontWeight: '600' }}>{label}</Text>
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

export function GlossarInhalt({ id, kompakt }: { id: string; kompakt?: boolean }) {
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
      {hilfeSprache && !kompakt ? (
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

export function ScreenHeader({ title, onClose, right }: { title: string; onClose?: () => void; right?: React.ReactNode }) {
  return (
    <View style={s.header}>
      <View style={{ width: 40 }}>
        {onClose ? (
          <Pressable onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={26} color={C.text} />
          </Pressable>
        ) : null}
      </View>
      <Text style={s.headerTitle}>{title}</Text>
      <View style={{ width: 40, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}

export const s = StyleSheet.create({
  card: {
    backgroundColor: C.card, borderRadius: 18, padding: 16,
    shadowColor: '#0F172A', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2,
  },
  btn: { height: 54, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  btnText: { fontSize: 17, fontWeight: '600' },
  chip: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  term: { color: C.primary, textDecorationLine: 'underline', textDecorationStyle: 'dotted' },
  backdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.35)' },
  sheet: { backgroundColor: C.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  grabber: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, backgroundColor: C.border, marginBottom: 14 },
  h1: { fontSize: 30, fontWeight: '800', color: C.text },
  h2: { fontSize: 20, fontWeight: '700', color: C.text },
  h3: { fontSize: 17, fontWeight: '700', color: C.text },
  body: { fontSize: 15, lineHeight: 22, color: C.text },
  muted: { fontSize: 14, color: C.muted },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600', color: C.text },
});
