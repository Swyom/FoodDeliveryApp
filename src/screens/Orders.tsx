import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PlacedOrder, useOrders } from "../context/OrderContext";
import { useTheme } from "../context/ThemeContext";

const { width, height } = Dimensions.get("window");
// Dynamic responsive layout scales based on standard mobile device widths
const isLargeDevice = width > 450;
const contentMaxWidth = isLargeDevice ? 420 : "100%";

const Orders = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [promoCode, setPromoCode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(
    null,
  );
  const [address, setAddress] = useState(
    "4521 Westview Garden Apt 4B, New York, NY 10012",
  );
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const { colors, theme } = useTheme();

  const getUserLocation = async () => {
    setIsLocationLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("Permission denied. Please enable location permissions.");
        setIsLocationLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        let geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (geocode.length > 0) {
          const place = geocode[0];
          const parts = [
            place.name,
            place.street,
            place.city,
            place.region,
            place.postalCode,
            place.country,
          ].filter(Boolean);
          setAddress(parts.join(", ") || "Unknown Address");
        } else {
          setAddress(
            `Lat: ${location.coords.latitude.toFixed(4)}, Lon: ${location.coords.longitude.toFixed(4)}`,
          );
        }
      }
    } catch (error) {
      console.log("Error getting location:", error);
      setAddress("Unable to fetch address. Please try again.");
    } finally {
      setIsLocationLoading(false);
    }
  };

  const {
    cartItems,
    placedOrders,
    updateQuantity,
    placeOrder,
    cancelOrder,
    setCartItems,
  } = useOrders();

  // Sync state if parameters change dynamically
  useEffect(() => {
    if (route.params?.cartItems) {
      setCartItems(route.params.cartItems);
    }
  }, [route.params?.cartItems, setCartItems]);

  // Run location fetch once when checkout loads
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      getUserLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems?.length]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.05; // 5% GST
  const deliveryFee = subtotal > 0 ? 30 : 0; // ₹30 flat delivery
  const total = subtotal + tax + deliveryFee;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    const newOrder = placeOrder();
    if (newOrder) {
      setLastPlacedOrder(newOrder);
      setShowSuccessModal(true);
    }
  };

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.headerInnerContainer}>
          {navigation.canGoBack() ? (
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
          <Text style={[styles.headerTitle, { color: colors.text }]}>Checkout & Orders</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView
        style={[styles.scrollContent, { backgroundColor: colors.cardBackground }]}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.responsiveContentBlock, { maxWidth: contentMaxWidth }]}
        >
          {/* Placed Active Orders Card Deck */}
          {placedOrders.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Active Orders ({placedOrders.length})
              </Text>
              {placedOrders.map((order) => (
                <View key={order.orderId} style={[styles.orderCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <View style={[styles.orderCardHeader, { borderBottomColor: colors.border }]}>
                    <View>
                      <Text style={[styles.orderIdText, { color: colors.text }]}>{order.orderId}</Text>
                      <Text style={[styles.orderTimeText, { color: colors.textSecondary }]}>
                        Placed at {order.date}
                      </Text>
                    </View>
                    <Text style={[styles.orderPriceText, { color: colors.primary }]}>
                      ₹{order.totalPrice.toFixed(0)}
                    </Text>
                  </View>

                  <View style={styles.orderItemsPreview}>
                    {order.items.map((item, idx) => (
                      <View key={idx} style={styles.orderCardItemRow}>
                        <Text style={[styles.orderSummaryItemsList, { color: colors.textSecondary }]}>
                          • {item.quantity}x {item.name}
                        </Text>
                        <Text style={[styles.orderCardItemPrice, { color: colors.text }]}>
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[styles.cancelOrderBtn, { backgroundColor: theme === 'dark' ? '#2f1a1a' : '#fff5f5' }]}
                    onPress={() => handleCancelOrder(order.orderId)}
                  >
                    <Ionicons name="trash-outline" size={15} color="#dc2626" />
                    <Text style={styles.cancelOrderText}>Cancel Order</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Dynamic Items Cart Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Items to Checkout</Text>
            {cartItems.length === 0 ? (
              <View style={[styles.emptyCartCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <View style={[styles.emptyCartIconCircle, { backgroundColor: colors.cardBackground }]}>
                  <Ionicons name="cart-outline" size={32} color={colors.textSecondary} />
                </View>
                <Text style={[styles.emptyCartText, { color: colors.textSecondary }]}>
                  No pending items to place order
                </Text>
              </View>
            ) : (
              cartItems.map((item) => (
                <View key={item.id} style={[styles.cartItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={[styles.itemPrice, { color: colors.textSecondary }]}>
                      ₹{item.price.toFixed(0)}
                    </Text>
                  </View>
                  <View style={[styles.quantityContainer, { backgroundColor: colors.cardBackground }]}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Ionicons name="remove" size={14} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.qtyText, { color: colors.text }]}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Ionicons name="add" size={14} color={colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {cartItems.length > 0 && (
            <>
              {/* Delivery Details */}
              <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>Delivery Address</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={getUserLocation}
                    disabled={isLocationLoading}
                  >
                    <Text style={styles.editLink}>
                      {isLocationLoading ? "Locating..." : "Refresh GPS"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.infoCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  <View style={[styles.iconCircle, { backgroundColor: theme === 'dark' ? '#2f1a12' : '#fff3ed' }]}>
                    {isLocationLoading ? (
                      <ActivityIndicator size="small" color="#FF6B35" />
                    ) : (
                      <Ionicons name="location" size={18} color="#FF6B35" />
                    )}
                  </View>
                  <Text style={[styles.infoText, { color: colors.text }]} numberOfLines={2}>
                    {address}
                  </Text>
                </View>
              </View>

              {/* Promo Code Input */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Promo Code</Text>
                <View style={styles.promoContainer}>
                  <TextInput
                    style={[styles.promoInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChangeText={setPromoCode}
                    placeholderTextColor={colors.textSecondary}
                  />
                  <TouchableOpacity 
                    style={[styles.applyBtn, { backgroundColor: colors.text }]} 
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.applyBtnText, { color: colors.background }]}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Dynamic Bill Invoice Breakdown */}
              <View style={[styles.billSummary, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Bill Summary</Text>
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, { color: colors.textSecondary }]}>Subtotal</Text>
                  <Text style={[styles.billValue, { color: colors.text }]}>₹{subtotal.toFixed(0)}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, { color: colors.textSecondary }]}>
                    GST & Restaurant Charges (5%)
                  </Text>
                  <Text style={[styles.billValue, { color: colors.text }]}>₹{tax.toFixed(0)}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={[styles.billLabel, { color: colors.textSecondary }]}>Delivery Charges</Text>
                  <Text style={[styles.billValue, { color: colors.text }]}>
                    ₹{deliveryFee.toFixed(0)}
                  </Text>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.billRow}>
                  <Text style={[styles.billTotalLabel, { color: colors.text }]}>Grand Total</Text>
                  <Text style={[styles.billTotalValue, { color: colors.primary }]}>₹{total.toFixed(0)}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Sticky Place Order Checkout Bar */}
      {cartItems.length > 0 && (
        <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
          <View
            style={[styles.footerInnerContainer, { maxWidth: contentMaxWidth }]}
          >
            <View style={styles.footerLeft}>
              <Text style={[styles.footerTotalLabel, { color: colors.textSecondary }]}>Total Price</Text>
              <Text style={[styles.footerTotalAmount, { color: colors.text }]}>₹{total.toFixed(0)}</Text>
            </View>
            <TouchableOpacity
              style={[styles.placeOrderBtn, { backgroundColor: colors.primary }]}
              onPress={handlePlaceOrder}
              activeOpacity={0.9}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
              <Ionicons name="chevron-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Animated Order Confirmation and Bill Receipt Modal Popup */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-done" size={36} color="#fff" />
            </View>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Order Placed!</Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              ID: {lastPlacedOrder?.orderId}
            </Text>

            {/* Modal Invoice Breakdown */}
            <View style={[styles.modalBillContainer, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
              <Text style={[styles.modalBillHeaderTitle, { color: colors.textSecondary }]}>Receipt Invoice</Text>
              <ScrollView
                style={styles.modalItemsScroll}
                showsVerticalScrollIndicator={false}
              >
                {lastPlacedOrder?.items.map((item, index) => (
                  <View key={index} style={styles.modalBillRow}>
                    <Text style={[styles.modalItemName, { color: colors.textSecondary }]} numberOfLines={1}>
                      {item.quantity}x {item.name}
                    </Text>
                    <Text style={[styles.modalItemValue, { color: colors.text }]}>
                      ₹{(item.price * item.quantity).toFixed(0)}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <View style={[styles.modalBillDivider, { backgroundColor: colors.border }]} />

              <View style={styles.modalBillRow}>
                <Text style={[styles.modalBillLabel, { color: colors.textSecondary }]}>Delivery Fee</Text>
                <Text style={[styles.modalBillValue, { color: colors.text }]}>
                  ₹{lastPlacedOrder?.deliveryFee.toFixed(0)}
                </Text>
              </View>
              <View style={styles.modalBillRow}>
                <Text style={[styles.modalBillTotalLabel, { color: colors.text }]}>Grand Total</Text>
                <Text style={[styles.modalBillTotalValue, { color: colors.primary }]}>
                  ₹{lastPlacedOrder?.totalPrice.toFixed(0)}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.closeModalBtn, { backgroundColor: colors.text }]}
              onPress={() => setShowSuccessModal(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.closeModalBtnText, { color: colors.background }]}>View Active Orders</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  headerInnerContainer: {
    width: "100%",
    maxWidth: contentMaxWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  responsiveContentBlock: {
    width: "100%",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: -0.1,
  },
  editLink: {
    color: "#FF6B35",
    fontSize: 13,
    fontWeight: "600",
  },
  cartItem: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyCartCard: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  emptyCartIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyBtn: {
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 13,
    fontWeight: "700",
    marginHorizontal: 8,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  promoInput: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    borderWidth: 1,
    fontWeight: "500",
  },
  applyBtn: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  applyBtnText: {
    fontWeight: "600",
    fontSize: 14,
  },
  billSummary: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  billValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 10,
  },
  billTotalLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  billTotalValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: height > 800 ? 30 : 16, // Safe spacing adjustment for varied phone aspect ratios
  },
  footerInnerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerLeft: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  footerTotalAmount: {
    fontSize: 20,
    fontWeight: "700",
  },
  placeOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginRight: 6,
  },
  orderCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  orderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: "700",
  },
  orderTimeText: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  orderPriceText: {
    fontSize: 15,
    fontWeight: "700",
  },
  orderCardItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  orderItemsPreview: {
    marginVertical: 10,
  },
  orderSummaryItemsList: {
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
  },
  orderCardItemPrice: {
    fontSize: 12,
    fontWeight: "600",
  },
  cancelOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
    marginTop: 2,
  },
  cancelOrderText: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  modalSubtitle: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 14,
  },
  modalBillContainer: {
    width: "100%",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  modalBillHeaderTitle: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  modalItemsScroll: {
    maxHeight: 100,
  },
  modalBillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    alignItems: "center",
  },
  modalItemName: {
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
    marginRight: 10,
  },
  modalItemValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  modalBillDivider: {
    height: 1,
    marginVertical: 6,
    borderStyle: "dashed",
  },
  modalBillLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  modalBillValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  modalBillTotalLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  modalBillTotalValue: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  closeModalBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  closeModalBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
