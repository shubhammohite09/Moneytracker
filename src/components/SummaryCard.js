import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { formatRupees } from '../utils';

export default function SummaryCard({ total, peopleCount, lang }) {
  return (
    <View style={styles.card}>
      <View style={styles.half}>
        <View style={[styles.icon, { backgroundColor: '#DDF5E6' }]}>
          <Ionicons name="cash" size={28} color={colors.green} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{t('totalGiven', 'mr')}</Text>
          <Text style={styles.labelEn}>{t('totalGiven', 'en')}</Text>
          <Text style={styles.value}>{formatRupees(total).replace('₹ ', '₹')}</Text>
          <Text style={styles.small}>{t('totalGivenSub', lang)}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.half}>
        <View style={[styles.icon, { backgroundColor: '#DCEBFF' }]}>
          <Ionicons name="people" size={28} color={colors.blue} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{t('totalPeople', 'mr')}</Text>
          <Text style={styles.labelEn}>{t('totalPeople', 'en')}</Text>
          <Text style={styles.value}>{peopleCount}</Text>
          <Text style={styles.small}>{t('totalPeopleSub', lang)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 14,
    marginTop: -18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  half: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  divider: { width: 1, backgroundColor: colors.border, marginHorizontal: 8 },
  label: { fontSize: 14, fontWeight: '800', color: colors.navy },
  labelEn: { fontSize: 12, color: colors.text },
  value: { fontSize: 28, fontWeight: '800', color: colors.navy, marginVertical: 2 },
  small: { fontSize: 10, color: colors.muted },
});
