import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { colors } from '../theme';
import { t } from '../i18n';

export default function AddTransactionModal({ visible, onClose, onSave, lang }) {
  const [person, setPerson] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [returned, setReturned] = useState(false);

  const reset = () => {
    setPerson('');
    setAmount('');
    setNote('');
    setReturned(false);
  };

  const submit = () => {
    const value = parseFloat(amount);
    if (!person.trim() || isNaN(value) || value <= 0) {
      Alert.alert(t('invalid', lang));
      return;
    }
    onSave({ person: person.trim(), amount: value, note: note.trim(), returned });
    reset();
  };

  const cancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={cancel}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>{t('addNew', lang)}</Text>

          <Text style={styles.label}>{t('name', lang)}</Text>
          <TextInput value={person} onChangeText={setPerson} style={styles.input} placeholder={t('name', lang)} />

          <Text style={styles.label}>{t('amount', lang)} (₹)</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
            placeholder="0"
          />

          <Text style={styles.label}>{t('note', lang)}</Text>
          <TextInput value={note} onChangeText={setNote} style={styles.input} placeholder={t('note', lang)} />

          <View style={styles.switchRow}>
            <Text style={styles.label}>{t('returned', lang)}</Text>
            <Switch
              value={returned}
              onValueChange={setReturned}
              trackColor={{ true: colors.greenLight, false: '#ccc' }}
              thumbColor={returned ? colors.green : '#f4f4f4'}
            />
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.btn, styles.cancel]} onPress={cancel}>
              <Text style={[styles.btnText, { color: colors.text }]}>{t('cancel', lang)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.save]} onPress={submit}>
              <Text style={styles.btnText}>{t('save', lang)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    paddingBottom: 30,
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.navy, marginBottom: 10 },
  label: { fontSize: 13, fontWeight: '700', color: colors.text, marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FAFCFB',
  },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  btnRow: { flexDirection: 'row', marginTop: 20 },
  btn: { flex: 1, paddingVertical: 13, borderRadius: 12, alignItems: 'center' },
  cancel: { backgroundColor: '#EEF1F5', marginRight: 8 },
  save: { backgroundColor: colors.green, marginLeft: 8 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
