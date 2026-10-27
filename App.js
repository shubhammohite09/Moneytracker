import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from './src/theme';
import { t } from './src/i18n';
import { loadTransactions, saveTransactions, loadLang, saveLang } from './src/storage';
import { groupByPerson } from './src/utils';
import { getSession, hasAccount, logout } from './src/auth';

import BottomTabs from './src/components/BottomTabs';
import AddTransactionModal from './src/components/AddTransactionModal';
import HomeScreen from './src/screens/HomeScreen';
import PeopleScreen from './src/screens/PeopleScreen';
import RecordsScreen from './src/screens/RecordsScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [tab, setTab] = useState('home'); // home | people | records | reports | settings
  const [lang, setLang] = useState('mr');
  const [transactions, setTransactions] = useState([]);
  const [ready, setReady] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountExists, setAccountExists] = useState(false);

  useEffect(() => {
    (async () => {
      setTransactions(await loadTransactions());
      setLang(await loadLang());
      setAccountExists(await hasAccount());
      setLoggedIn(!!(await getSession()));
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) saveTransactions(transactions);
  }, [transactions, ready]);

  const changeLang = (code) => {
    setLang(code);
    saveLang(code);
  };

  const handleLogout = async () => {
    await logout();
    setTab('home');
    setLoggedIn(false);
  };

  const people = useMemo(() => groupByPerson(transactions), [transactions]);
  const total = useMemo(() => transactions.reduce((s, x) => s + x.amount, 0), [transactions]);

  const addTransaction = ({ person, amount, note, returned }) => {
    const existing = people.find((p) => p.key === person.toLowerCase());
    const tx = {
      id: String(Date.now()),
      person,
      personEn: existing ? existing.personEn : '',
      amount,
      note,
      returned,
      date: new Date().toISOString().slice(0, 10),
    };
    setTransactions((prev) => [tx, ...prev]);
    setShowAdd(false);
  };

  const toggleReturned = (id) =>
    setTransactions((prev) => prev.map((x) => (x.id === id ? { ...x, returned: !x.returned } : x)));

  const deleteTx = (id) => setTransactions((prev) => prev.filter((x) => x.id !== id));

  const handleAction = (key) => {
    if (key === 'add') setShowAdd(true);
    else setTab(key);
  };

  const showPerson = (p) =>
    Alert.alert(
      p.personEn ? `${p.person} | ${p.personEn}` : p.person,
      `₹ ${p.total.toLocaleString('en-IN')}\n${t('totalTaken', lang)}: ${p.count}  |  ${t('given', lang)}: ${p.returnedCount}`
    );

  if (!ready) return <View style={{ flex: 1, backgroundColor: colors.green }} />;

  if (!loggedIn) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <LoginScreen
          lang={lang}
          onChangeLang={changeLang}
          accountExists={accountExists}
          onAuthenticated={() => {
            setAccountExists(true);
            setLoggedIn(true);
          }}
        />
      </SafeAreaProvider>
    );
  }

  let screen;
  if (tab === 'home') {
    screen = (
      <HomeScreen
        lang={lang}
        onChangeLang={changeLang}
        total={total}
        people={people}
        onAction={handleAction}
        onPersonPress={showPerson}
      />
    );
  } else if (tab === 'people') {
    screen = <PeopleScreen lang={lang} people={people} onPersonPress={showPerson} />;
  } else if (tab === 'records') {
    screen = (
      <RecordsScreen
        lang={lang}
        transactions={transactions}
        onToggleReturned={toggleReturned}
        onDelete={deleteTx}
      />
    );
  } else if (tab === 'reports') {
    screen = <ReportsScreen lang={lang} people={people} total={total} />;
  } else {
    screen = (
      <SettingsScreen
        lang={lang}
        onChangeLang={changeLang}
        onReset={() => setTransactions([])}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.root}>
        <View style={{ flex: 1 }}>{screen}</View>
        <BottomTabs
          active={tab === 'reports' ? 'home' : tab}
          onChange={setTab}
          lang={lang}
        />
      </View>
      <AddTransactionModal
        visible={showAdd}
        lang={lang}
        onClose={() => setShowAdd(false)}
        onSave={addTransaction}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
