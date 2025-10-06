import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useVote } from '../context/VoteContext';
import RankingList from '../components/RankingList';
import { getImageSource } from '../utils/images';

export default function ResultsScreen() {
  const { finalWinner, finalRanking, finalizeNow, resetTournament, setScreen, saveCurrentResult } = useVote();

  useEffect(() => {
    finalizeNow();
  }, [finalizeNow]);

  const winner = finalRanking?.[0] || finalWinner || null;
  const winnerFull = winner || null;

  const headerComponent = (
    <View style={{ padding: 16 }}>
      <Text style={styles.title}>Rezultate Finale</Text>
      {winnerFull ? (
        <View style={styles.winnerBox}>
          <Image source={getImageSource(winnerFull)} style={styles.winnerImage} resizeMode="contain" />
          <Text style={styles.winnerName}>{winnerFull.name}</Text>
          <Text style={styles.winnerDesc}>{winnerFull.description || 'Fără descriere.'}</Text>
        </View>
      ) : (
        <Text style={styles.noWinner}>Nu există câștigător încă.</Text>
      )}
      <Text style={styles.sectionTitle}>Clasament complet</Text>
    </View>
  );

  const footerComponent = (
    <View style={{ padding: 16 }}>
      <View style={styles.actions}>
        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={saveCurrentResult}>
          <Text style={styles.btnTextPrimary}>Salvează rezultatul</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnSecondary]} onPress={() => setScreen('stats')}>
          <Text style={styles.btnTextSecondary}>Vezi statistici</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnDanger]} onPress={resetTournament}>
          <Text style={styles.btnTextDanger}>Reîncepe</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <RankingList
        data={finalRanking}
        headerComponent={headerComponent}
        footerComponent={footerComponent}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  winnerBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    marginBottom: 16,
  },
  winnerImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#eee',
  },
  winnerName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginHorizontal: 12,
    color: '#1a6be0',
  },
  winnerDesc: {
    marginHorizontal: 12,
    marginBottom: 12,
    marginTop: 6,
    color: '#333',
  },
  noWinner: {
    color: '#666',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 8,
  },
  actions: {
    marginTop: 16,
    gap: 10,
  },
  btn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: '#1a6be0',
  },
  btnSecondary: {
    backgroundColor: '#eef5ff',
  },
  btnDanger: {
    backgroundColor: '#ffe9e9',
  },
  btnTextPrimary: {
    color: '#fff',
    fontWeight: '700',
  },
  btnTextSecondary: {
    color: '#1a6be0',
    fontWeight: '700',
  },
  btnTextDanger: {
    color: '#c62828',
    fontWeight: '700',
  },
});
