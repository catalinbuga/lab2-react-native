import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { useVote } from '../context/VoteContext';
import { getImageSource } from '../utils/images';

export default function StatsScreen() {
  const { userResults, setScreen } = useVote();

  const data = Object.values(userResults).sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));

  const renderItem = ({ item }) => {
    const top = item.ranking?.[0] || null;
    return (
      <View style={styles.row}>
        {top ? (
          <Image source={getImageSource(top)} style={styles.thumb} />
        ) : (
          <View style={[styles.thumb, { backgroundColor: '#eee' }]} />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.user}>{item.user}</Text>
          <Text style={styles.meta}>Actualizat: {new Date(item.updatedAt).toLocaleString()}</Text>
          <Text style={styles.meta}>Câștigător: {top?.name || '—'}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistici utilizatori</Text>
      <FlatList
        data={data}
        keyExtractor={(it) => it.user}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nicio înregistrare încă.</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={styles.list}
      />

      <Pressable style={styles.btn} onPress={() => setScreen('welcome')}>
        <Text style={styles.btnText}>Înapoi</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fb',
  },
  list: {
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  row: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    fontWeight: '700',
    color: '#1a1a1a',
    fontSize: 16,
  },
  meta: {
    color: '#666',
    marginTop: 2,
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    marginTop: 24,
  },
  btn: {
    marginTop: 12,
    backgroundColor: '#1a6be0',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 10,
  },
});
