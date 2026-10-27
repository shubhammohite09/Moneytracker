import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { t } from '../i18n';
import { isValidMobile, isValidPassword, login, register } from '../auth';

export default function LoginScreen({ lang, onChangeLang, accountExists, onAuthenticated }) {
  const [mode, setMode] = useState(accountExists ? 'login' : 'register');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isRegister = mode === 'register';

  const submit = async () => {
    setError('');
    if (!isValidMobile(mobile)) return setError(t('errMobile', lang));
    if (!isValidPassword(password)) return setError(t('errPassword', lang));
    if (isRegister && password !== confirm) return setError(t('errMismatch', lang));

    setBusy(true);
    try {
      if (isRegister) {
        await register(mobile, password);
      } else if (!(await login(mobile, password))) {
        setError(t('errWrong', lang));
        return;
      }
      onAuthenticated();
    } catch (e) {
      setError(t('errGeneric', lang));
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setError('');
    setPassword('');
    setConfirm('');
    setMode(isRegister ? 'login' : 'register');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.langRow}>
          {[
            { code: 'mr', name: 'मराठी' },
            { code: 'en', name: 'English' },
          ].map((l) => (
            <TouchableOpacity
              key={l.code}
              onPress={() => onChangeLang(l.code)}
              style={[styles.langPill, lang === l.code && styles.langPillActive]}
            >
              <Text style={[styles.langText, lang === l.code && { color: colors.green }]}>
                {l.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.hero}>
          <View style={styles.logo}>
            <Ionicons name="wallet" size={38} color={colors.green} />
          </View>
          <Text style={styles.appTitle}>{t('appTitle', lang)}</Text>
          <Text style={styles.subtitle}>{t('subtitle', lang)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>{t(isRegister ? 'createAccount' : 'login', lang)}</Text>

          <Text style={styles.label}>{t('mobileNumber', lang)}</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={(v) => setMobile(v.replace(/\D/g, '').slice(0, 10))}
              placeholder="9876543210"
              placeholderTextColor={colors.muted}
              keyboardType="number-pad"
              maxLength={10}
              autoComplete="tel"
              textContentType="telephoneNumber"
            />
          </View>

          <Text style={styles.label}>{t('password', lang)}</Text>
          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••"
              placeholderTextColor={colors.muted}
              secureTextEntry={!showPw}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={isRegister ? undefined : submit}
              returnKeyType={isRegister ? 'next' : 'go'}
            />
            <TouchableOpacity onPress={() => setShowPw((s) => !s)} hitSlop={10}>
              <Ionicons name={showPw ? 'eye-off' : 'eye'} size={20} color={colors.muted} />
            </TouchableOpacity>
          </View>

          {isRegister && (
            <>
              <Text style={styles.label}>{t('confirmPassword', lang)}</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  value={confirm}
                  onChangeText={setConfirm}
                  placeholder="••••••"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!showPw}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={submit}
                  returnKeyType="go"
                />
              </View>
              <Text style={styles.hint}>{t('passwordHint', lang)}</Text>
            </>
          )}

          {!!error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.button, busy && { opacity: 0.7 }]}
            onPress={submit}
            disabled={busy}
            activeOpacity={0.85}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{t(isRegister ? 'createAccount' : 'login', lang)}</Text>
            )}
          </TouchableOpacity>

          {/* Only offer sign-up when no account exists on this device */}
          {!accountExists && (
            <TouchableOpacity onPress={switchMode} style={styles.switch}>
              <Text style={styles.switchText}>
                {t(isRegister ? 'haveAccount' : 'noAccount', lang)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.green },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 56, paddingBottom: 30 },
  langRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  langPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    marginLeft: 8,
  },
  langPillActive: { backgroundColor: '#fff', borderColor: '#fff' },
  langText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  hero: { alignItems: 'center', marginTop: 24, marginBottom: 24 },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: { color: '#fff', fontSize: 26, fontWeight: '800', marginTop: 14 },
  subtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 4, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  heading: { fontSize: 20, fontWeight: '800', color: colors.navy, marginBottom: 6 },
  label: { fontSize: 13, fontWeight: '700', color: colors.text, marginTop: 14, marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  prefix: { color: colors.text, fontWeight: '700', marginRight: 8 },
  input: { flex: 1, paddingVertical: 13, fontSize: 16, color: colors.text },
  hint: { fontSize: 12, color: colors.muted, marginTop: 6 },
  error: { color: '#D93636', fontWeight: '600', marginTop: 14 },
  button: {
    backgroundColor: colors.green,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  switch: { alignItems: 'center', marginTop: 16 },
  switchText: { color: colors.green, fontWeight: '700' },
});
