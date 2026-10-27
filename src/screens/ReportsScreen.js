import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { t } from '../i18n';
import { formatRupees } from '../utils';

export default function ReportsScreen({ lang, people, total }) {
  const sorted = [...people].sort((a, b) => b.total - a.total);
  const max = sorted.length ? sorted[0].total : 1;

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.top}>
        <Text style={styles.title}>{t('reports', lang)}</Text>
        <Text style={styles.total}>{formatRupees(total)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>{t('perPerson', lang)}</Text>
        {sorted.map((p) => (
          <View key={p.key} style={{ marginTop: 12 }}>
            <View style={styles.labelRow}>
              <Text style={styles.name}>{lang === 'en' && p.personEn ? p.personEn : p.person}</Text>
              <Text style={styles.value}>{formatRupees(p.total)}</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${Math.max(4, (p.total / max) * 100)}%` }]} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  top: { backgroundColor: colors.green, paddingTop: 56, paddingBottom: 18, paddingHorizontal: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  total: { color: '#fff', fontSize: 30, fontWeight: '800', marginTop: 6 },
  card: { backgroundColor: '#fff', margin: 14, padding: 16, borderRadius: 18 },
  heading: { fontSize: 16, fontWeight: '800', color: colors.navy },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 14, color: colors.text, fontWeight: '600' },
  value: { fontSize: 14, color: colors.navy, fontWeight: '800' },
  track: { height: 8, backgroundColor: '#E8F3EC', borderRadius: 4, marginTop: 6 },
  fill: { height: 8, backgroundColor: colors.green, borderRadius: 4 },
});
