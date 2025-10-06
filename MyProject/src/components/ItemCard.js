import React, { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { getImageSource } from '../utils/images';

function ItemCard({ item, onPress, disabled }) {
  return (
    <Pressable
      onPress={() => onPress?.(item)}
      disabled={disabled}
      android_ripple={{ color: '#e1e1e1' }}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed, disabled && styles.cardDisabled]}
      accessibilityRole="button"
      accessibilityLabel={`Selectează ${item?.name || 'element'}`}
    >
      <Image source={getImageSource(item)} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(ItemCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  image: {
    width: '100%',
    height: 260,
    backgroundColor: '#f2f2f2',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
});
