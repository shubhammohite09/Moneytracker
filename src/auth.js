import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const ACCOUNT_KEY = 'mmt_account_v1'; // { mobile, salt, hash }
const SESSION_KEY = 'mmt_session_v1'; // mobile number of logged-in user

// Indian mobile number: 10 digits, starts with 6-9
export const isValidMobile = (m) => /^[6-9]\d{9}$/.test(m);
export const isValidPassword = (p) => typeof p === 'string' && p.length >= 6;

async function hash(password, salt) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);
}

export async function hasAccount() {
  try {
    return (await AsyncStorage.getItem(ACCOUNT_KEY)) !== null;
  } catch (e) {
    return false;
  }
}

export async function getSession() {
  try {
    const session = await AsyncStorage.getItem(SESSION_KEY);
    const raw = await AsyncStorage.getItem(ACCOUNT_KEY);
    if (!session || !raw) return null;
    return JSON.parse(raw).mobile === session ? session : null;
  } catch (e) {
    return null;
  }
}

export async function register(mobile, password) {
  const salt = Crypto.randomUUID();
  const account = { mobile, salt, hash: await hash(password, salt) };
  await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  await AsyncStorage.setItem(SESSION_KEY, mobile);
}

// Returns true on success, false on wrong mobile/password
export async function login(mobile, password) {
  const raw = await AsyncStorage.getItem(ACCOUNT_KEY);
  if (!raw) return false;
  const account = JSON.parse(raw);
  if (account.mobile !== mobile) return false;
  if ((await hash(password, account.salt)) !== account.hash) return false;
  await AsyncStorage.setItem(SESSION_KEY, mobile);
  return true;
}

export async function logout() {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (e) {}
}
