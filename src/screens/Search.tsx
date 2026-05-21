import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Image as ExpoImage } from "expo-image";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";

interface RestaurantItem {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  time: string;
  price: string;
  tags: string[];
  image: string;
  offers?: string;
  popularDish?: string;
}

type HomeStackParamList = {
  Home: undefined;
  RestaurantDetails: { restaurantId: string; name: string; price: string };
  Search: undefined;
};

type SearchScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Search"
>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

const RESTAURANT_DATA: RestaurantItem[] = [
  {
    id: "123",
    name: "Domino's Pizza",
    cuisine: "Pizza, Fast Food, Italian",
    rating: 4.5,
    time: "15-20 mins",
    price: "$$",
    tags: ["pizza", "cheese", "garlic bread", "pasta"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    offers: "55% OFF up to ₹100",
    popularDish: "Margherita Pizza",
  },
  {
    id: "124",
    name: "Burger King",
    cuisine: "Burgers, Fast Food, American",
    rating: 4.2,
    time: "20-25 mins",
    price: "$",
    tags: ["burger", "fries", "whopper", "chicken"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    offers: "Buy 1 Get 1 Free",
    popularDish: "Crispy Chicken Whopper",
  },
  {
    id: "125",
    name: "The Coffee House",
    cuisine: "Coffee, Bakery, Desserts",
    rating: 4.7,
    time: "10-15 mins",
    price: "$$",
    tags: ["coffee", "latte", "cake", "dessert"],
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    offers: "Free Cinnamon Roll on ₹199+",
    popularDish: "Iced Caramel Latte",
  },
  {
    id: "126",
    name: "Sushi World",
    cuisine: "Sushi, Japanese, Asian",
    rating: 4.6,
    time: "30-40 mins",
    price: "$$$",
    tags: ["sushi", "salmon", "ramen", "rolls"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    offers: "20% OFF up to ₹100",
    popularDish: "Signature Dragon Roll",
  },
  {
    id: "127",
    name: "Monginis Cake Shop",
    cuisine: "Desserts, Cakes, Bakery",
    rating: 4.1,
    time: "25-35 mins",
    price: "$",
    tags: ["cake", "pastry", "cupcake", "chocolate"],
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
    offers: "10% OFF on Birthday Cakes",
    popularDish: "Red Velvet Pastry",
  },
  {
    id: "128",
    name: "Punjabi Dhaba",
    cuisine: "North Indian, Punjabi, Thali",
    rating: 4.8,
    time: "20-30 mins",
    price: "$$",
    tags: ["north indian", "paneer", "naan", "dal"],
    image: "https://images.unsplash.com/photo-1585934580916-52a1ca887ad5?w=800",
    offers: "₹50 OFF on ₹299+",
    popularDish: "Butter Paneer Masala",
  },
  {
    id: "129",
    name: "Beijing Bites",
    cuisine: "Chinese, Noodles, Dimsums",
    rating: 4.3,
    time: "25-30 mins",
    price: "$$",
    tags: ["chinese", "rice", "dimsum", "chilli paneer"],
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800",
    offers: "Flat ₹75 OFF on ₹400+",
    popularDish: "Schezwan Fried Rice",
  },
  {
    id: "130",
    name: "Taco Fiesta",
    cuisine: "Mexican, Tacos, Wraps",
    rating: 4.4,
    time: "15-25 mins",
    price: "$$",
    tags: ["mexican", "taco", "quesadilla", "rice bowl"],
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    offers: "Free Taco on select combos",
    popularDish: "Spicy Paneer Taco",
  }
];

const POPULAR_FOODS = [
  { name: "Pizza", icon: "pizza" as const },
  { name: "Burger", icon: "hamburger" as const },
  { name: "Sushi", icon: "rice" as const },
  { name: "Coffee", icon: "coffee" as const },
  { name: "Dessert", icon: "cake-variant" as const },
  { name: "Ramen", icon: "bowl-mix" as const },
];

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Pasta",
    "Fries",
  ]);
  const { colors, theme } = useTheme();

  const filteredResults = RESTAURANT_DATA.filter(
    (restaurant: RestaurantItem) => {
      const query = searchQuery.toLowerCase().trim();
      return (
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query) ||
        restaurant.tags.some((tag: string) => tag.includes(query))
      );
    },
  );

  const addToHistory = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== trimmedText.toLowerCase(),
      );
      return [trimmedText, ...filtered].slice(0, 5);
    });
  };

  const handleSelectRestaurant = (restaurant: RestaurantItem): void => {
    if (searchQuery.trim().length > 0) addToHistory(searchQuery);
    navigation.navigate("RestaurantDetails", {
      restaurantId: restaurant.id,
      name: restaurant.name,
      price: restaurant.price,
    });
  };

  const handleSelectTerm = (term: string) => {
    setSearchQuery(term);
    addToHistory(term);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
        <View 
          style={[
            styles.searchBarWrapper, 
            { 
              backgroundColor: colors.cardBackground, 
              borderColor: colors.border 
            }
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color="#FF6B35"
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Search food, vendors or trending meals..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => addToHistory(searchQuery)}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchQuery.trim().length === 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {searchHistory.length > 0 && (
            <View style={styles.historyWrapper}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Searches</Text>
                <TouchableOpacity onPress={() => setSearchHistory([])}>
                  <Text style={[styles.clearText, { color: colors.textSecondary }]}>Clear</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollPad}
              >
                {searchHistory.map((item, index) => (
                  <TouchableOpacity
                    key={`${item}-${index}`}
                    style={[styles.historyPill, { backgroundColor: colors.cardBackground }]}
                    onPress={() => handleSelectTerm(item)}
                  >
                    <Ionicons
                      name="time-outline"
                      size={14}
                      color={colors.textSecondary}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={[styles.historyPillText, { color: colors.text }]}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.sectionWrapper}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>What are you craving?</Text>
            <View style={styles.categoryGrid}>
              {POPULAR_FOODS.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={styles.categoryCard}
                  onPress={() => handleSelectTerm(item.name)}
                >
                  <View 
                    style={[
                      styles.iconCircle, 
                      { 
                        backgroundColor: theme === 'dark' ? '#2d1c18' : '#fff7ed',
                        borderColor: theme === 'dark' ? '#3d2820' : '#ffedd5'
                      }
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={28}
                      color="#FF6B35"
                    />
                  </View>
                  <Text style={[styles.categoryLabel, { color: colors.text }]}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.sectionWrapper}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Trending Near You</Text>
            {RESTAURANT_DATA.slice(0, 4).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.featuredCard, 
                  { 
                    backgroundColor: colors.background, 
                    borderColor: colors.border 
                  }
                ]}
                activeOpacity={0.95}
                onPress={() => handleSelectRestaurant(item)}
              >
                <View style={styles.imageContainer}>
                  <ExpoImage
                    source={item.image}
                    style={styles.featuredImage}
                    contentFit="cover"
                  />
                  {item.offers && (
                    <View style={styles.offerBadge}>
                      <MaterialCommunityIcons
                        name="tag"
                        size={12}
                        color="#ffffff"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={styles.offerText}>{item.offers}</Text>
                    </View>
                  )}
                  <View style={styles.timeBadge}>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>

                <View style={styles.featuredDetails}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={[styles.featuredName, { color: colors.text }]} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons
                        name="star"
                        size={12}
                        color="#ffffff"
                        style={{ marginRight: 3 }}
                      />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>

                  <Text style={[styles.featuredCuisines, { color: colors.textSecondary }]}>
                    {item.cuisine}
                  </Text>

                  {item.popularDish && (
                    <View 
                      style={[
                        styles.popularDishContainer, 
                        { 
                          backgroundColor: colors.cardBackground, 
                          borderColor: colors.border 
                        }
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="fire"
                        size={14}
                        color="#f97316"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={[styles.popularDishText, { color: colors.textSecondary }]} numberOfLines={1}>
                        Must Try:{" "}
                        <Text style={{ fontWeight: "600", color: colors.text }}>
                          {item.popularDish}
                        </Text>
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsHeaderTitle, { color: colors.textSecondary }]}>Search Results</Text>
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={54} color={colors.border} />
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No matched culinary treats or hubs found
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.resultRowCard, { borderBottomColor: colors.border }]}
                activeOpacity={0.8}
                onPress={() => handleSelectRestaurant(item)}
              >
                <ExpoImage
                  source={item.image}
                  style={styles.resultImage}
                  contentFit="cover"
                />
                <View style={styles.resultMeta}>
                  <Text style={[styles.resultName, { color: colors.text }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={[styles.resultCuisine, { color: colors.textSecondary }]} numberOfLines={1}>
                    {item.cuisine}
                  </Text>
                  <View style={styles.resultMetrics}>
                    <View style={styles.inlineMetric}>
                      <Ionicons name="star" size={13} color="#f59e0b" />
                      <Text style={[styles.metricText, { color: colors.text }]}>{item.rating}</Text>
                    </View>
                    <Text style={[styles.dotText, { color: colors.border }]}>•</Text>
                    <Text style={[styles.metricTextSub, { color: colors.textSecondary }]}>{item.time}</Text>
                    <Text style={[styles.dotText, { color: colors.border }]}>•</Text>
                    <Text
                      style={[
                        styles.metricTextSub,
                        { fontWeight: "700", color: colors.text },
                      ]}
                    >
                      {item.price}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { paddingBottom: 4 },
  searchBarWrapper: {
    flexDirection: "row",
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    height: 54,
    borderWidth: 1,
    marginTop: 8,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, fontWeight: "500" },
  sectionWrapper: { marginTop: 24 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginHorizontal: 20,
    letterSpacing: -0.3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  clearText: { fontSize: 13, fontWeight: "600" },
  historyWrapper: { marginTop: 16 },
  horizontalScrollPad: { paddingHorizontal: 20, gap: 8 },
  historyPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  historyPillText: { fontSize: 13, fontWeight: "600" },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginTop: 14,
    justifyContent: "space-between",
  },
  categoryCard: { width: "30%", alignItems: "center", marginBottom: 16 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
  },
  featuredCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 14,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  imageContainer: { width: "100%", height: 160, position: "relative" },
  featuredImage: { width: "100%", height: "100%" },
  offerBadge: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#EF4444",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  offerText: { color: "#ffffff", fontSize: 11, fontWeight: "800" },
  timeBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  timeText: { color: "#ffffff", fontSize: 11, fontWeight: "700" },
  featuredDetails: { padding: 16 },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredName: {
    fontSize: 16,
    fontWeight: "800",
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 6,
  },
  ratingText: { color: "#ffffff", fontSize: 11, fontWeight: "800" },
  featuredCuisines: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: "400",
  },
  popularDishContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    borderWidth: 1,
  },
  popularDishText: { fontSize: 12, flex: 1 },
  resultsContainer: { flex: 1, marginTop: 12 },
  resultsHeaderTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  resultRowCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  resultImage: { width: 68, height: 68, borderRadius: 14 },
  resultMeta: { flex: 1, marginLeft: 14, justifyContent: "center" },
  resultName: { fontSize: 15, fontWeight: "700" },
  resultCuisine: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  resultMetrics: { flexDirection: "row", alignItems: "center" },
  inlineMetric: { flexDirection: "row", alignItems: "center", gap: 3 },
  metricText: { fontSize: 12, fontWeight: "700" },
  metricTextSub: { fontSize: 12, fontWeight: "500" },
  dotText: { fontSize: 12, marginHorizontal: 6 },
  emptyContainer: { alignItems: "center", marginTop: 80, gap: 12 },
  emptyText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
