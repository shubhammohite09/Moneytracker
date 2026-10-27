import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { t } from '../i18n';

const tabs = [
  { key: 'home', icon: 'home', label: 'home' },
  { key: 'people', icon: 'people', label: 'people' },
  { key: 'records', icon: 'document-text', label: 'records' },
  { key: 'settings', icon: 'settings', label: 'settings' },
];

export default function BottomTabs({ active, onChange, lang }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {tabs.map((tab) => {
        const on = active === tab.key;
        return (
          <TouchableOpacity key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <Ionicons name={tab.icon} size={26} color={on ? colors.green : colors.muted} />
            <Text style={[styles.mr, on && { color: colors.green }]}>{t(tab.label, 'mr')}</Text>
            <Text style={[styles.en, on && { color: colors.green }]}>{t(tab.label, 'en')}</Text>
            {on ? <View style={styles.underline} /> : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: 'center' },
  mr: { fontSize: 12, fontWeight: '700', color: colors.muted, marginTop: 2 },
  en: { fontSize: 11, color: colors.muted },
  underline: {
    height: 3,
    width: '70%',
    backgroundColor: colors.green,
    borderRadius: 2,
    marginTop: 4,
  },
});
