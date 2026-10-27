import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import PeopleListCard from '../components/PeopleListCard';
import { colors } from '../theme';
import { t } from '../i18n';

export default function PeopleScreen({ lang, people, onPersonPress }) {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.top}>
        <Text style={styles.title}>{t('peopleList', lang)}</Text>
      </View>
      <PeopleListCard people={people} lang={lang} showTip={false} onPersonPress={onPersonPress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  top: { backgroundColor: colors.green, paddingTop: 56, paddingBottom: 18, paddingHorizontal: 16 },
  title: { color: '#fff', fontSize: 22, fontWeight: '800' },
});
