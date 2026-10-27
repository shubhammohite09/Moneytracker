import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, avatarPalette } from '../theme';
import { t } from '../i18n';
import { formatRupees, initialOf } from '../utils';

export default function PersonRow({ person, index, lang, onPress }) {
  const pal = avatarPalette[index % avatarPalette.length];
  const initial = initialOf(person.personEn || person.person);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress && onPress(person)} style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: pal.bg }]}>
        <Text style={[styles.initial, { color: pal.fg }]}>{initial}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name} numberOfLines={1}>
          {person.person}
          {person.personEn ? <Text style={styles.nameEn}>  |  {person.personEn}</Text> : null}
        </Text>
        <View style={styles.meta}>
          <Ionicons name="person" size={14} color={colors.muted} />
          <Text style={styles.metaText}>
            {' '}{t('totalTaken', 'mr')}: {person.count}   |   {t('given', 'mr')}: {person.returnedCount}
          </Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: pal.fg === '#E0245E' ? colors.green : colors.green }]}>
        {formatRupees(person.total)}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={colors.muted} style={{ marginLeft: 6 }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  initial: { fontSize: 22, fontWeight: '800' },
  name: { fontSize: 15, fontWeight: '800', color: colors.navy },
  nameEn: { fontSize: 14, fontWeight: '600', color: colors.navy },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  metaText: { fontSize: 12, color: colors.muted },
  amount: { fontSize: 17, fontWeight: '800' },
});
