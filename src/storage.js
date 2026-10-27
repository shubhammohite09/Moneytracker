import AsyncStorage from '@react-native-async-storage/async-storage';

const TX_KEY = 'mmt_transactions_v1';
const LANG_KEY = 'mmt_lang_v1';

// Sample data that matches the dashboard design (7 people, total Rs 12,500)
export const seedTransactions = [
  { id: 's1', person: 'राहुल पाटील', personEn: 'Rahul Patil', amount: 1000, returned: true, note: '', date: '2026-10-01' },
  { id: 's2', person: 'स्नेहा शिंदे', personEn: 'Sneha Shinde', amount: 2000, returned: true, note: '', date: '2026-10-03' },
  { id: 's3', person: 'प्रकाश कदम', personEn: 'Prakash Kadam', amount: 500, returned: false, note: '', date: '2026-10-05' },
  { id: 's4', person: 'विकास जाधव', personEn: 'Vikas Jadhav', amount: 1250, returned: true, note: '', date: '2026-10-08' },
  { id: 's5', person: 'सोनाली देशमुख', personEn: 'Sonali Deshmukh', amount: 3000, returned: true, note: '', date: '2026-10-12' },
  { id: 's6', person: 'अनिता मोरे', personEn: 'Anita More', amount: 2750, returned: false, note: '', date: '2026-10-15' },
  { id: 's7', person: 'अमोल पवार', personEn: 'Amol Pawar', amount: 2000, returned: true, note: '', date: '2026-10-18' },
];

export async function loadTransactions() {
  try {
    const raw = await AsyncStorage.getItem(TX_KEY);
    if (raw === null) return seedTransactions;
    return JSON.parse(raw);
  } catch (e) {
    return seedTransactions;
  }
}

export async function saveTransactions(list) {
  try {
    await AsyncStorage.setItem(TX_KEY, JSON.stringify(list));
  } catch (e) {}
}

export async function loadLang() {
  try {
    return (await AsyncStorage.getItem(LANG_KEY)) || 'mr';
  } catch (e) {
    return 'mr';
  }
}

export async function saveLang(lang) {
  try {
    await AsyncStorage.setItem(LANG_KEY, lang);
  } catch (e) {}
}
