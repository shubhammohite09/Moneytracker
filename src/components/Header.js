import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { t } from '../i18n';

export default function Header({ lang, onChangeLang }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.greenDark, colors.green, colors.greenLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.wrap, { paddingTop: insets.top + 12 }]}
    >
      <View style={styles.row}>
        <View style={styles.logo}>
          <Ionicons name="wallet" size={38} color="#fff" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.title}>{t('appTitle', 'mr')}</Text>
          <Text style={styles.titleEn}>{t('appTitle', 'en')}</Text>
        </View>
        <View style={styles.toggle}>
          {['mr', 'en'].map((code) => (
            <TouchableOpacity
              key={code}
              onPress={() => onChangeLang(code)}
              style={[styles.toggleBtn, lang === code && styles.toggleActive]}
            >
              <Text style={[styles.toggleText, lang === code && { color: '#fff' }]}>
                {code === 'mr' ? 'मराठी' : 'English'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={[styles.row, { marginTop: 8 }]}>
        <Text style={styles.sub} numberOfLines={2}>
          {t('subtitle', 'mr')}  |  {t('subtitle', 'en')}
        </Text>
        <View style={styles.avatar}>
          <Ionicons name="person" size={26} color={colors.green} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingBottom: 30, borderBottomLeftRadius: 0 },
  row: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
  titleEn: { color: '#fff', fontSize: 20, fontWeight: '700' },
  toggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 3,
  },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  toggleActive: { backgroundColor: colors.greenDark },
  toggleText: { color: colors.green, fontWeight: '700', fontSize: 13 },
  sub: { flex: 1, color: '#EAFBEF', fontSize: 12, marginRight: 10 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
