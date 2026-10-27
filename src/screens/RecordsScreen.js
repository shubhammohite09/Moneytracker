import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { formatRupees } from '../utils';

export default function RecordsScreen({ lang, transactions, onToggleReturned, onDelete }) {
  const sorted = [...transactions].sort((a, b) => (a.date < b.date ? 1 : -1));

  const confirmDelete = (tx) => {
    Alert.alert(t('delete', lang), tx.person, [
      { text: t('cancel', lang), style: 'cancel' },
      { text: t('delete', lang), style: 'destructive', onPress: () => onDelete(tx.id) },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.title}>{t('allRecords', lang)}</Text>
        <Text style={styles.hint}>{t('tapToMark', lang)}</Text>
      </View>
      <FlatList
        data={sorted}
        keyExtractor={(x) => x.id}
        contentContainerStyle={{ padding: 14, paddingBottom: 30 }}
        ListEmptyComponent={<Text style={styles.empty}>{t('noRecords', lang)}</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => onToggleReturned(item.id)}
            onLongPress={() => confirmDelete(item)}
          >
            <Ionicons
              name={item.returned ? 'checkmark-circle' : 'ellipse-outline'}
              size={26}
              color={item.returned ? colors.green : colors.muted}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.name}>{item.person}</Text>
              <Text style={styles.meta}>
                {item.date}
                {item.note ? '  •  ' + item.note : ''}
              </Text>
            </View>
            <Text style={styles.amount}>{formatRupees(item.amount)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: { backgroundColor: colors.green, paddingTop: 56, paddingBottom: 14, paddingHorizontal: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  hint: { color: '#EAFBEF', fontSize: 12, marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  name: { fontSize: 15, fontWeight: '800', color: colors.navy },
  meta: { fontSize: 12, color: colors.muted, marginTop: 2 },
  amount: { fontSize: 16, fontWeight: '800', color: colors.green },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 40 },
});
