import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';

const actions = [
  { key: 'add', label: 'addNew', icon: 'add', color: colors.green, bg: '#E2F7EA', border: '#BFE9CD' },
  { key: 'people', label: 'peopleList', icon: 'people', color: colors.blue, bg: '#E3F0FD', border: '#BDDAF7' },
  { key: 'records', label: 'allRecords', icon: 'document-text', color: colors.orange, bg: '#FFF1DE', border: '#FBD9A8' },
  { key: 'reports', label: 'reports', icon: 'stats-chart', color: colors.purple, bg: '#EFE6FB', border: '#D7C3F3' },
];

export default function QuickActions({ onPress }) {
  return (
    <View style={styles.row}>
      {actions.map((a) => (
        <TouchableOpacity
          key={a.key}
          activeOpacity={0.8}
          onPress={() => onPress(a.key)}
          style={[styles.tile, { backgroundColor: a.bg, borderColor: a.border }]}
        >
          <View style={[styles.circle, { backgroundColor: a.color }]}>
            <Ionicons name={a.icon} size={22} color="#fff" />
          </View>
          <Text style={styles.mr}>{t(a.label, 'mr')}</Text>
          <Text style={styles.en} numberOfLines={1}>
            {a.key === 'add' ? 'Add New Transaction' : t(a.label, 'en')}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingHorizontal: 10, marginTop: 14 },
  tile: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  mr: { fontSize: 13, fontWeight: '800', color: colors.navy, textAlign: 'center' },
  en: { fontSize: 9.5, color: colors.text, textAlign: 'center', marginTop: 2 },
});
