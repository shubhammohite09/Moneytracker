import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import PersonRow from './PersonRow';

export default function PeopleListCard({ people, lang, showTip = true, onPersonPress }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter(
      (p) => p.person.toLowerCase().includes(q) || (p.personEn || '').toLowerCase().includes(q)
    );
  }, [people, query]);

  return (
    <View style={styles.card}>
      <View style={styles.headRow}>
        <Ionicons name="people" size={24} color={colors.navy} />
        <Text style={styles.heading}>
          {'  '}{t('peopleList', 'mr')}  <Text style={styles.headingEn}>|  {t('peopleList', 'en')}</Text>
        </Text>
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={20} color={colors.navy} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={`${t('searchPlaceholder', 'mr')}  ${t('searchPlaceholder', 'en')}`}
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close" size={20} color={colors.navy} />
          </TouchableOpacity>
        )}
      </View>

      {filtered.length === 0 ? (
        <Text style={styles.empty}>{t('noResults', lang)}</Text>
      ) : (
        filtered.map((p, i) => (
          <PersonRow key={p.key} person={p} index={i} lang={lang} onPress={onPersonPress} />
        ))
      )}

      {showTip && (
        <View style={styles.tip}>
          <Ionicons name="bulb-outline" size={22} color={colors.green} />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.tipMr}>{t('tip', 'mr')}</Text>
            <Text style={styles.tipEn}>{t('tip', 'en')}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 14,
    marginTop: 14,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  headRow: { flexDirection: 'row', alignItems: 'center' },
  heading: { fontSize: 17, fontWeight: '800', color: colors.navy },
  headingEn: { fontSize: 15, fontWeight: '600' },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 22,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 4,
    height: 44,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 13, color: colors.text },
  empty: { textAlign: 'center', color: colors.muted, paddingVertical: 24 },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF8EF',
    borderWidth: 1,
    borderColor: '#BFE9CD',
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
  },
  tipMr: { fontSize: 11, color: colors.greenDark },
  tipEn: { fontSize: 11, color: colors.text },
});
