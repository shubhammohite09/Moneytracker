import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import QuickActions from '../components/QuickActions';
import PeopleListCard from '../components/PeopleListCard';

export default function HomeScreen({ lang, onChangeLang, total, people, onAction, onPersonPress }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
      <Header lang={lang} onChangeLang={onChangeLang} />
      <SummaryCard total={total} peopleCount={people.length} lang={lang} />
      <QuickActions onPress={onAction} />
      <PeopleListCard people={people} lang={lang} onPersonPress={onPersonPress} />
      <View style={{ height: 8 }} />
    </ScrollView>
  );
}
