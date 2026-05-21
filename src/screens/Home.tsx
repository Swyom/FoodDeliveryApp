import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image as ExpoImage } from "expo-image";
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import RestaurantCard from "./RestaurantCard";
import { useTheme } from '../context/ThemeContext';

const categories = [
  { id: "1", name: "Burgers", icon: "https://img.icons8.com/fluency/96/hamburger.png" },
  { id: "2", name: "Pizza", icon: "https://img.icons8.com/fluency/96/pizza.png" },
  { id: "3", name: "Coffee", icon: "https://img.icons8.com/fluency/96/coffee.png" },
  { id: "4", name: "Dessert", icon: "https://img.icons8.com/fluency/96/cupcake.png" },
  { id: "5", name: "Healthy", icon: "https://img.icons8.com/fluency/96/salad.png" },
  { id: "6", name: "Sushi", icon: "https://img.icons8.com/fluency/96/sushi.png" },
  { id: "7", name: "Biryani", icon: "https://img.icons8.com/fluency/96/rice-bowl.png" },
];

const featuredData = [
  { id: "1", Image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" },
  { id: "2", Image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800" },
  { id: "3", Image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800" },
  { id: "4", Image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800" },
];

const restaurantList = [
  {
    id: "123",
    name: "Domino's Pizza",
    rating: 4.5,
    ratingCount: "1.6K+",
    time: "15-20 mins",
    distance: "1.6 km",
    discount: "55% OFF on select items",
    isAvailable: true,
    price: "$$",
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", 
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800"
    ]
  },
  {
    id: "124",
    name: "Burger King",
    rating: 4.2,
    ratingCount: "2.1K+",
    time: "20-25 mins",
    distance: "2.4 km",
    discount: "Buy 1 Get 1 Free",
    isAvailable: true,
    price: "$",
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800"
    ]
  },
  {
    id: "125",
    name: "The Coffee House",
    rating: 4.7,
    ratingCount: "850+",
    time: "10-15 mins",
    distance: "0.8 km",
    discount: "Free Cinnamon Roll on ₹199+",
    isAvailable: true,
    price: "240",
    images: [
      "https://media.istockphoto.com/id/1161202571/photo/barista-making-latte-art.jpg?s=612x612&w=0&k=20&c=aWdZED2CA0bLmqCUJ4SJiiSYaK5VV2CD06SFd-py-0U=",
      "https://media.istockphoto.com/id/1161202571/photo/barista-making-latte-art.jpg?s=612x612&w=0&k=20&c=aWdZED2CA0bLmqCUJ4SJiiSYaK5VV2CD06SFd-py-0U="
    ]
  },
  {
    id: "126",
    name: "Sushi World",
    rating: 4.6,
    ratingCount: "430+",
    time: "30-40 mins",
    distance: "3.1 km",
    discount: "20% OFF up to ₹100",
    isAvailable: true,
    price: "399",
    images: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800"
    ]
  },
  {
    id: "127",
    name: "Monginis Cake Shop",
    rating: 4.1,
    ratingCount: "1K+",
    time: "25-35 mins",
    distance: "1.2 km",
    discount: "10% OFF on Birthday Cakes",
    isAvailable: true,
    price: "$",
    images: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
      "https://images.unsplash.com/photo-1616031037011-0871f9939e06?w=800"
    ]
  },
  {
    id: "128",
    name: "Punjabi Dhaba",
    rating: 4.8,
    ratingCount: "3.2K+",
    time: "20-30 mins",
    distance: "2.8 km",
    discount: "₹50 OFF on ₹299+",
    isAvailable: true,
    price: "$$",
    images: [
      "https://images.unsplash.com/photo-1683533746199-9e3920bf3eab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVuamFiaSUyMGRoYWJhfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1666663150789-be4318924491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHVuamFiaSUyMGRoYWJhfGVufDB8fDB8fHww"
    ]
  },
  {
    id: "129",
    name: "Beijing Bites",
    rating: 4.3,
    ratingCount: "1.2K+",
    time: "25-30 mins",
    distance: "3.5 km",
    discount: "Flat ₹75 OFF on ₹400+",
    isAvailable: true,
    price: "$$",
    images: [
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800",
      "https://images.unsplash.com/photo-1603133872878-14283b7ff499?w=800"
    ]
  },
  {
    id: "130",
    name: "Taco Fiesta",
    rating: 4.4,
    ratingCount: "950+",
    time: "15-25 mins",
    distance: "2.1 km",
    discount: "Free Taco on select combos",
    isAvailable: true,
    price: "$$",
    images: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
      "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800"
    ]
  }
];

const { width } = Dimensions.get("window");

const Home = ({ navigation }: any) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locationName, setLocationName] = useState("Fetching location...");
  const { colors, theme } = useTheme();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationName('Permission denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        let geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
        if (geocode.length > 0) {
          const place = geocode[0];
          setLocationName(`${place.city || place.name || 'Unknown'}, ${place.isoCountryCode || ''}`);
        } else {
          setLocationName("Location found");
        }
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= featuredData.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
        viewPosition: 0.5,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== currentIndex) {
      setCurrentIndex(roundIndex);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={24} color="#FF6B35" />
          <View style={styles.locationTextWrapper}>
            <Text style={[styles.deliveryLabel, { color: colors.textSecondary }]}>Delivery to</Text>
            <Text style={[styles.locationText, { color: colors.text }]} numberOfLines={1}>
              {locationName}
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.openDrawer()}>
          <Image
            source={require("../../assets/profile.png")}
            style={[styles.profileImage, { borderColor: colors.border }]}
          />
        </TouchableOpacity>
      </View>
     
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollBodyContainer}
      >
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={featuredData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onScroll}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.carouselSlideWrapper}>
                <ExpoImage
                  source={{ uri: item.Image }}
                  style={[styles.carouselImage, { backgroundColor: colors.cardBackground }]}
                  contentFit="cover"
                  cachePolicy="disk"
                />
              </View>
            )}
          />
          <View style={styles.paginationContainer}>
            {featuredData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex 
                    ? styles.activeDot 
                    : [styles.inactiveDot, { backgroundColor: colors.border }]
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Explore Categories</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllLink}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesHorizontalList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  styles.categoryCard, 
                  { 
                    backgroundColor: colors.cardBackground, 
                    borderColor: colors.border 
                  }
                ]} 
                activeOpacity={0.9}
              >
                <ExpoImage
                  source={{ uri: item.icon }}
                  style={styles.categoryIcon}
                  contentFit="contain"
                  cachePolicy="disk"
                />
                <Text style={[styles.categoryText, { color: colors.text }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={[styles.sectionHeaderRow, styles.featuredHeaderAdjustment]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Restaurants</Text>
        </View>
        
        <View style={styles.restaurantContainerGrid}>
          {restaurantList.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              imageSources={restaurant.images}
              name={restaurant.name}
              rating={restaurant.rating}
              ratingCount={restaurant.ratingCount}
              time={restaurant.time}
              distance={restaurant.distance}
              discount={restaurant.discount}
              isAvailable={restaurant.isAvailable}
              onPress={() => {
                navigation.navigate('HomeTab', {
                  screen: 'RestaurantDetails',
                  params: {
                    restaurantId: restaurant.id,
                    name: restaurant.name,
                    price: restaurant.price
                  }
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    marginRight: 16,
  },
  locationTextWrapper: {
    flexDirection: "column",
    flex: 1,
  },
  deliveryLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  locationText: {
    fontSize: 15,
    fontWeight: "900",
    marginTop: 2,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
  },
  scrollBodyContainer: {
    paddingBottom: 40,
  },
  carouselContainer: {
    marginTop: 4,
  },
  carouselSlideWrapper: {
    width: width,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 190,
    borderRadius: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 6,
  },
  dot: {
    height: 5,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 14,
    backgroundColor: "#FF6B35",
  },
  inactiveDot: {
    width: 5,
  },
  sectionContainer: {
    marginTop: 22,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  seeAllLink: {
    color: "#FF6B35",
    fontWeight: "600",
    fontSize: 13,
  },
  categoriesHorizontalList: {
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  categoryIcon: {
    width: 24,
    height: 24,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
  },
  featuredHeaderAdjustment: {
    marginTop: 26,
    marginBottom: 14,
  },
  restaurantContainerGrid: {
    paddingHorizontal: 20,
    gap: 20,
  },
});