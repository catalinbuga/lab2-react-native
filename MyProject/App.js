import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VoteProvider, useVote } from './src/context/VoteContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import VoteScreen from './src/screens/VoteScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import StatsScreen from './src/screens/StatsScreen';

function Router() {
  const { screen } = useVote();

  return (
    <View style={styles.container}>
      {screen === 'welcome' && <WelcomeScreen />}
      {screen === 'vote' && <VoteScreen />}
      {screen === 'results' && <ResultsScreen />}
      {screen === 'stats' && <StatsScreen />}
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <VoteProvider>
      <Router />
    </VoteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
});
