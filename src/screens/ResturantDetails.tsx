import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../context/OrderContext';
import { useTheme } from '../context/ThemeContext';

const restaurantDb: Record<string, { banner: string; meta: string; distance: string; menu: any[] }> = {
  "123": {
    banner: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    meta: '⭐ 4.5 (1.6k+ ratings) • Italian • Pizzas',
    distance: '1.6 km away | Free delivery',
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese pizza with fresh basil and our signature tomato sauce.', price: 299, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500' },
      { id: 'm2', name: 'Pepperoni Pizza', description: 'Loaded with premium pepperoni and extra mozzarella cheese.', price: 399, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500' },
      { id: 'm3', name: 'Garlic Bread', description: 'Freshly baked baguettes with garlic butter and Italian herbs.', price: 149, image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D' },
      { id: 'm4', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a rich, gooey center.', price: 199, image: 'https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hvY29sYXRlJTIwbGF2YSUyMGNha2V8ZW58MHx8MHx8fDA%3D' }
    ]
  },
  "124": {
    banner: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    meta: '⭐ 4.2 (2.1k+ ratings) • American • Burgers',
    distance: '2.4 km away | ₹30 Delivery fee',
    menu: [
      { id: 'm5', name: 'Crispy Chicken Whopper', description: 'Our signature crispy chicken patty topped with fresh lettuce and creamy mayo.', price: 179, image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500' },
      { id: 'm6', name: 'Cheesy Veg Double Patty', description: 'Double crispy veg patty with extra layer of melted cheddar slice.', price: 149, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500' },
      { id: 'm7', name: 'Peri Peri Fries', description: 'Crispy golden fries tossed in spicy peri peri seasoning spice powder.', price: 99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500' }
    ]
  },
  "125": {
    banner: 'https://media.istockphoto.com/id/1161202571/photo/barista-making-latte-art.jpg?s=612x612&w=0&k=20&c=aWdZED2CA0bLmqCUJ4SJiiSYaK5VV2CD06SFd-py-0U=',
    meta: '⭐ 4.7 (850+ ratings) • Cafe • Beverages',
    distance: '0.8 km away | Free delivery',
    menu: [
      { id: 'm8', name: 'Iced Caramel Latte', description: 'Rich espresso mixed with fresh milk, vanilla syrup and premium caramel drizzle.', price: 210, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500' },
      { id: 'm9', name: 'Classic Cappuccino', description: 'Balanced double shot espresso topped with thick layer of silky milk foam.', price: 160, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500' },
      { id: 'm10', name: 'Chocolate Croissant', description: 'Butter croissant stuffed with rich dark chocolate layers.', price: 130, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500' }
    ]
  },
  "126": {
    banner: 'https://plus.unsplash.com/premium_photo-1668146927669-f2edf6e86f6f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VzaGl8ZW58MHx8MHx8fDA%3D',
    meta: '⭐ 4.6 (430+ ratings) • Sushi • Japanese',
    distance: '3.1 km away | ₹40 delivery',
    menu: [
      { id: 'm11', name: 'Signature Dragon Roll', description: 'Delectable roll topped with sliced avocado, unagi eel sauce, and spicy mayo.', price: 450, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500' },
      { id: 'm12', name: 'Salmon Sashimi Platter', description: 'Thinly sliced premium raw fresh salmon served with authentic wasabi and soy sauce.', price: 650, image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500' },
      { id: 'm13', name: 'Vegetable Tempura', description: 'Assorted seasonal vegetables deep fried in light crispy tempura batter.', price: 280, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VzaGl8ZW58MHx8MHx8fDA%3D' }
    ]
  },
  "127": {
    banner: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800',
    meta: '⭐ 4.1 (1k+ ratings) • Desserts • Cakes',
    distance: '1.2 km away | Free delivery',
    menu: [
      { id: 'm14', name: 'Red Velvet Pastry', description: 'Layered crimson sponge cake unified with authentic sweet cream cheese frosting.', price: 120, image: 'https://images.unsplash.com/photo-1616031037011-0871f9939e06?w=500' },
      { id: 'm15', name: 'Premium Black Forest', description: 'Rich chocolate sponge cake layered with fresh whipped cream and sour dark cherries.', price: 95, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500' },
      { id: 'm16', name: 'Vanilla Cupcake', description: 'Fluffy sponge cake topped with fresh, light vanilla buttercream icing.', price: 60, image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34c?w=500' }
    ]
  },
  "128": {
    banner: 'https://plus.unsplash.com/premium_photo-1666663150789-be4318924491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHVuamFiaSUyMGRoYWJhfGVufDB8fDB8fHww',
    meta: '⭐ 4.8 (3.2K+ ratings) • North Indian • Punjabi',
    distance: '2.8 km away | ₹40 delivery',
    menu: [
      { id: 'm17', name: 'Butter Paneer Masala', description: 'Tender cottage cheese cubes simmered in rich creamy tomato cashew gravy.', price: 280, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500' },
      { id: 'm18', name: 'Garlic Naan Combo', description: 'Freshly baked tandoori garlic naan served with rich spicy gravy and pickles.', price: 120, image: 'https://images.unsplash.com/photo-1697155406014-04dc649b0953?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybGljJTIwbmFufGVufDB8fDB8fHww' },
      { id: 'm19', name: 'Dal Makhani Signature', description: 'Slow-cooked black lentils simmered with heavy butter and fresh milk cream overnight.', price: 240, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500' }
    ]
  },
  "129": {
    banner: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
    meta: '⭐ 4.3 (1.2K+ ratings) • Chinese • Asian',
    distance: '3.5 km away | ₹30 delivery',
    menu: [
      { id: 'm20', name: 'Schezwan Fried Rice', description: 'Spicy stir-fried basmati rice tossed with fresh exotic vegetables and schezwan sauce.', price: 210, image: 'https://images.unsplash.com/photo-1603133872878-14283b7ff499?w=500' },
      { id: 'm21', name: 'Steamed Chicken Dimsums', description: 'Hand-folded dimsums stuffed with seasoned minced chicken, served with hot dip.', price: 180, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500' },
      { id: 'm22', name: 'Chilli Paneer Dry', description: 'Battered wok-tossed cottage cheese cubes with peppers and hot chilli garlic sauce.', price: 220, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500' }
    ]
  },
  "130": {
    banner: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    meta: '⭐ 4.4 (950+ ratings) • Mexican • Tacos',
    distance: '2.1 km away | Free delivery',
    menu: [
      { id: 'm23', name: 'Spicy Paneer Taco', description: 'Warm soft corn tortilla stuffed with spiced paneer, fresh salsa, and chipotle mayo.', price: 140, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500' },
      { id: 'm24', name: 'Double Cheese Quesadilla', description: 'Folded tortilla grilled crisp with loaded cheddar, mozzarella, and jalapeno peppers.', price: 190, image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500' },
      { id: 'm25', name: 'Mexican Rice Bowl', description: 'Seasoned brown rice topped with black beans, sweet corn, guacamole, and salsa.', price: 230, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500' }
    ]
  }
};

const RestaurantDetails = ({ route, navigation }: any) => {
  const { restaurantId, name } = route.params;
  const { cartItems, addToCart: globalAddToCart, updateQuantity } = useOrders();
  const { colors } = useTheme();

  const currentRestaurant = restaurantDb[restaurantId] || restaurantDb['123'];
  const menuItems = currentRestaurant.menu;

  const getItemQty = (itemId: string) => {
    const item = cartItems.find((i: any) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleAdd = (menuItem: any) => {
    globalAddToCart({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.image,
      quantity: 1
    });
  };

  const handleDecrease = (itemId: string) => {
    updateQuantity(itemId, -1);
  };

  const handleIncrease = (itemId: string) => {
    updateQuantity(itemId, 1);
  };

  const cartTotalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

  const renderHeader = () => (
    <View style={{ backgroundColor: colors.background }}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: currentRestaurant.banner }} 
          style={styles.headerImage} 
        />
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.cardBackground }]} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View 
        style={[
          styles.restaurantInfo, 
          { 
            backgroundColor: colors.background,
            borderBottomColor: colors.border
          }
        ]}
      >
        <Text style={[styles.restaurantName, { color: colors.text }]}>{name || "Restaurant Details"}</Text>
        <Text style={[styles.restaurantMeta, { color: colors.textSecondary }]}>{currentRestaurant.meta}</Text>
        <Text style={[styles.restaurantDistance, { color: colors.textSecondary }]}>{currentRestaurant.distance}</Text>
      </View>
      
      <View style={styles.menuHeader}>
        <Text style={[styles.menuTitle, { color: colors.text }]}>Recommended Menu ({menuItems.length})</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: cartTotalItems > 0 ? 110 : 30 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.menuItem, { borderBottomColor: colors.border }]}>
            <View style={styles.menuItemDetails}>
              <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.itemPrice, { color: colors.text }]}>₹{item.price}</Text>
              <Text style={[styles.itemDescription, { color: colors.textSecondary }]} numberOfLines={3}>{item.description}</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.buttonWrapper}>
                {!getItemQty(item.id) ? (
                  <TouchableOpacity 
                    style={[
                      styles.addButton, 
                      { 
                        backgroundColor: colors.cardBackground, 
                        borderColor: colors.border 
                      }
                    ]} 
                    onPress={() => handleAdd(item)}
                  >
                    <Text style={[styles.addButtonText, { color: colors.primary }]}>ADD</Text>
                  </TouchableOpacity>
                ) : (
                  <View 
                    style={[
                      styles.quantityControl, 
                      { 
                        backgroundColor: colors.cardBackground, 
                        borderColor: colors.border 
                      }
                    ]}
                  >
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => handleDecrease(item.id)}>
                      <Ionicons name="remove" size={14} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.qtyText, { color: colors.text }]}>{getItemQty(item.id)}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => handleIncrease(item.id)}>
                      <Ionicons name="add" size={14} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      />

      {cartTotalItems > 0 && (
        <View style={[styles.cartFooter, { backgroundColor: colors.primary, shadowColor: colors.primary }]}>
          <View>
            <Text style={styles.cartItemsText}>{cartTotalItems} ITEM{cartTotalItems > 1 ? 'S' : ''} ADDED</Text>
            <Text style={styles.cartPriceText}>₹{cartTotalPrice}</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewCartButton} 
            onPress={() => {
              navigation.navigate('Orders');
            }}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
            <Ionicons name="cart-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  imageContainer: {
    width: '100%',
    height: 240,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50, 
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  restaurantInfo: {
    padding: 20,
    borderBottomWidth: 8,
  },
  restaurantName: { 
    fontSize: 24, 
    fontWeight: '800', 
    marginBottom: 6,
  },
  restaurantMeta: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  restaurantDistance: {
    fontSize: 13,
    fontWeight: '500',
  },
  menuHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
  },
  menuItemDetails: {
    flex: 1,
    paddingRight: 20,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  menuItemRight: {
    width: 120,
    height: 125,
    alignItems: 'center',
    position: 'relative',
  },
  itemImage: {
    width: 120,
    height: 115,
    borderRadius: 16,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: 100,
    height: 36,
    zIndex: 5,
    elevation: 4,
  },
  addButton: {
    borderWidth: 1,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addButtonText: {
    fontWeight: '800',
    fontSize: 14,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  qtyBtn: {
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontWeight: '800',
    fontSize: 14,
  },
  cartFooter: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  cartItemsText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  cartPriceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  }
});

export default RestaurantDetails;