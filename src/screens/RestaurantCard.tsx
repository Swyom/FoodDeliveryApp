import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

interface RestaurantCardProps {
  id: string;
  imageSources: any[];
  name: string;
  rating: number;
  ratingCount: string;
  time: string;
  distance: string;
  discount?: string;
  isAvailable: boolean;
  onPress: () => void;
}

const RestaurantCard = ({
  id,
  imageSources,
  name,
  rating,
  ratingCount,
  time,
  distance,
  discount,
  isAvailable,
  onPress,
}: RestaurantCardProps) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const { colors } = useTheme();

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setCurrentImgIndex(Math.round(index));
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.95} 
      onPress={onPress} 
      style={[
        styles.cardContainer, 
        { 
          backgroundColor: colors.background, 
          borderColor: colors.border,
        },
        !isAvailable && styles.unavailableOpacity
      ]}
    >
      <View style={styles.imageWrapper}>
        <FlatList
          data={imageSources}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => `${id}-img-${index}`}
          // @ts-ignore
          disabled={!isAvailable}
          renderItem={({ item }) => (
            <Image 
              source={typeof item === 'string' ? { uri: item } : item} 
              style={[styles.restaurantImage, !isAvailable && styles.grayscale]} 
              resizeMode="cover"
            />
          )}
        />
        
        <TouchableOpacity style={styles.bookmarkButton} onPress={(e) => e.stopPropagation()}>
          <Ionicons name="bookmark-outline" size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.deliveryTag}>
          <Text style={styles.deliveryTagText}>Free delivery with Gold</Text>
        </View>

        {isAvailable && imageSources.length > 1 && (
          <View style={styles.dotContainer}>
            {imageSources.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.dot, 
                  index === currentImgIndex ? styles.activeDot : null
                ]} 
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.rowBetween}>
          <Text style={[styles.restaurantName, { color: colors.text }]} numberOfLines={1}>{name}</Text>
          <View style={[styles.ratingBadge, !isAvailable && styles.grayRatingBadge]}>
            <Text style={styles.ratingText}>{rating} </Text>
            <Ionicons name="star" size={12} color="white" />
          </View>
        </View>

        <View style={styles.rowBetween}>
          {isAvailable ? (
            <View style={styles.infoRow}>
              <Ionicons name="flash" size={14} color="#10b981" />
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>{time} | {distance}</Text>
            </View>
          ) : (
            <Text style={styles.statusText}>Not delivering currently</Text>
          )}
          <Text style={[styles.ratingCountText, { color: colors.textSecondary }]}>by {ratingCount}</Text>
        </View>

        {isAvailable && discount && (
          <View style={styles.offerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.divider }]} />
            <View style={styles.offerRow}>
              <Ionicons name="pricetag" size={14} color={colors.primary} />
              <Text style={[styles.offerText, { color: colors.primary }]}>{discount}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    marginHorizontal: 0,
    marginVertical: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    width: CARD_WIDTH,
  },
  unavailableOpacity: {
    shadowOpacity: 0.02,
    elevation: 1,
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  restaurantImage: {
    width: CARD_WIDTH,
    height: 200,
  },
  grayscale: {
    opacity: 0.5,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 20,
  },
  deliveryTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deliveryTagText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 15,
    right: 12,
    flexDirection: 'row',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  activeDot: {
    backgroundColor: 'white',
    width: 12,
  },
  detailsContainer: {
    padding: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15803d',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  grayRatingBadge: {
    backgroundColor: '#9ca3af',
  },
  ratingText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 13,
    color: '#dc2626',
    fontWeight: '600',
  },
  ratingCountText: {
    fontWeight: '400',
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginVertical: 10,
  },
  offerContainer: {
    marginTop: 2,
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  offerText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default RestaurantCard;