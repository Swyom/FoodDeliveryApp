import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Profile from '../screens/Profile';   
import Orders from '../screens/Orders';   
import Search from '../screens/Search'; 
import { useOrders } from '../context/OrderContext';
import { useTheme } from '../context/ThemeContext';
import React from 'react';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { cartItems } = useOrders();
  const { colors } = useTheme();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: "Home", 
          tabBarIcon: ({focused, color}) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Search" 
        component={Search} 
        options={{
          title: "Search", 
          tabBarIcon: ({focused, color}) => (
            <Ionicons name={focused ? "search" : "search-outline"} size={24} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Orders" 
        component={Orders} 
        options={{
          title: "Orders", 
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarIcon: ({focused, color}) => (
            <Ionicons name={focused ? "cart" : "cart-outline"} size={24} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          title: "Profile", 
          tabBarIcon: ({focused, color}) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
          )
        }} 
      />
    </Tab.Navigator>    
  );
}