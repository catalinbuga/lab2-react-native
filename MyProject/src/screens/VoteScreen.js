import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useVote } from '../context/VoteContext';
import ItemCard from '../components/ItemCard';

export default function VoteScreen() {
  const { getCurrentPair, chooseWinner, progress, roundIndex } = useVote();
  const [a, b] = getCurrentPair();

  const infoText = useMemo(() => {
    return `Runda ${progress.round} • Pereche ${progress.playedPairs + 1}/${progress.totalPairs}`;
  }, [progress]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alege preferata</Text>
      <Text style={styles.info}>{infoText}</Text>

      <View style={styles.pair}>
        {a && (
          <View style={styles.col}>
            <ItemCard item={a} onPress={() => chooseWinner(a)} />
          </View>
        )}
        {b ? (
          <View style={styles.col}>
            <ItemCard item={b} onPress={() => chooseWinner(b)} />
          </View>
        ) : (
          <View style={[styles.col, { justifyContent: 'center' }]}>
            <View style={styles.byeBox}>
              <Text style={styles.byeText}>Număr impar în runda {roundIndex}. Ultimul avansează automat.</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tip}>Sfat: apasă pe card pentru a alege. Se trece la următoarea pereche automat.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fb',
  },
  header: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  info: {
    marginTop: 4,
    color: '#666',
  },
  pair: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 12,
  },
  col: {
    flex: 0,
    width: '100%',
  },
  cell: {
    width: '48%',
  },
  byeBox: {
    backgroundColor: '#fff8e6',
    padding: 12,
    borderRadius: 10,
  },
  byeText: {
    color: '#8a6d3b',
  },
  tipBox: {
    marginTop: 'auto',
    backgroundColor: '#eef5ff',
    padding: 12,
    borderRadius: 10,
  },
  tip: {
    color: '#1a6be0',
  },
});
