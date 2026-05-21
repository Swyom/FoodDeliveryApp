import React, { createContext, useState, useContext } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  totalPrice: number;
  date: string;
}

interface OrderContextType {
  cartItems: CartItem[];
  placedOrders: PlacedOrder[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, change: number) => void;
  placeOrder: () => PlacedOrder | null;
  cancelOrder: (orderId: string) => void;
  clearCart: () => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = (): PlacedOrder | null => {
    if (cartItems.length === 0) return null;
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.05; // 5% GST
    const deliveryFee = 30; // ₹30 flat delivery
    const total = subtotal + tax + deliveryFee;

    const newOrder: PlacedOrder = {
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cartItems],
      subtotal: subtotal,
      tax: tax,
      deliveryFee: deliveryFee,
      totalPrice: total,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setPlacedOrders((prev) => prev.filter((order) => order.orderId !== orderId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <OrderContext.Provider
      value={{
        cartItems,
        placedOrders,
        addToCart,
        removeFromCart,
        updateQuantity,
        placeOrder,
        cancelOrder,
        clearCart,
        setCartItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
