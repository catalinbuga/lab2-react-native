import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { getImageSource } from '../utils/images';

export default function RankingList({ data, headerComponent, footerComponent, contentContainerStyle }) {
  const renderItem = ({ item, index }) => {
    const place = index + 1;
    return (
      <View style={[styles.row, place <= 3 && styles.topRow]}>
        <Text style={[styles.place, place <= 3 && styles.topPlace]}>{place}</Text>
        <Image source={getImageSource(item)} style={styles.thumb} />
        <View style={styles.info}>
          <Text style={[styles.name, place === 1 && styles.nameChampion]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.meta}>{item.wins || 0} victorii</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(it) => it.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      ListHeaderComponent={headerComponent}
      ListFooterComponent={footerComponent}
      contentContainerStyle={[styles.list, contentContainerStyle]}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 12,
    elevation: 1,
  },
  topRow: {
    backgroundColor: '#f7fbff',
  },
  place: {
    width: 28,
    fontWeight: '700',
    color: '#666',
    textAlign: 'center',
  },
  topPlace: {
    color: '#1a6be0',
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  nameChampion: {
    color: '#1a6be0',
  },
  meta: {
    fontSize: 12,
    color: '#666',
  },
  sep: {
    height: 8,
  },
});
