import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { colors } from '../theme';
import { t } from '../i18n';

export default function SettingsScreen({ lang, onChangeLang, onReset, onLogout }) {
  const confirmReset = () =>
    Alert.alert(t('resetData', lang), t('resetConfirm', lang), [
      { text: t('cancel', lang), style: 'cancel' },
      { text: t('delete', lang), style: 'destructive', onPress: onReset },
    ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.title}>{t('settings', lang)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>{t('language', lang)}</Text>
        <View style={styles.row}>
          {[
            { code: 'mr', name: 'मराठी' },
            { code: 'en', name: 'English' },
          ].map((l) => (
            <TouchableOpacity
              key={l.code}
              onPress={() => onChangeLang(l.code)}
              style={[styles.pill, lang === l.code && styles.pillActive]}
            >
              <Text style={[styles.pillText, lang === l.code && { color: '#fff' }]}>{l.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={[styles.card, styles.logout]} onPress={onLogout}>
        <Text style={styles.logoutText}>{t('logout', lang)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, styles.danger]} onPress={confirmReset}>
        <Text style={styles.dangerText}>{t('resetData', lang)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { backgroundColor: colors.green, paddingTop: 56, paddingBottom: 18, paddingHorizontal: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  card: { backgroundColor: '#fff', marginHorizontal: 14, marginTop: 14, padding: 16, borderRadius: 16 },
  label: { fontSize: 15, fontWeight: '800', color: colors.navy },
  row: { flexDirection: 'row', marginTop: 12 },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.green,
    marginRight: 10,
  },
  pillActive: { backgroundColor: colors.green },
  pillText: { color: colors.green, fontWeight: '700' },
  logout: { alignItems: 'center', borderWidth: 1, borderColor: colors.green },
  logoutText: { color: colors.green, fontWeight: '800' },
  danger: { alignItems: 'center', borderWidth: 1, borderColor: '#F5C2C2' },
  dangerText: { color: '#D93636', fontWeight: '800' },
});
