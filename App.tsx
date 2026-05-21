import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding  from './src/screens/Onboarding';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import DrawerNavigation from './src/navigation/DrawerNavigation';
import ResturantDetails from './src/screens/ResturantDetails';
import Orders from './src/screens/Orders';
import { OrderProvider } from './src/context/OrderContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createStackNavigator();

import { View, ActivityIndicator } from 'react-native';

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        // Unauthenticated users see Login stack
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="DrawerRoot" component={DrawerNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};



const linking = {
  prefixes: ['foodapp://', 'fooddeliveryapp://'],
  config: {
    screens: {
      DrawerRoot: {
        screens: {
          MainTabs: {
            screens: {
              HomeTab: {
                screens: {
                  Home: 'home',
                  RestaurantDetails: 'restaurant/:restaurantId',
                }
              },
              Orders: 'orders'
            }
          }
        }
      }
    },
  },
} as any;

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OrderProvider>
          <NavigationContainer linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
  
export default App;