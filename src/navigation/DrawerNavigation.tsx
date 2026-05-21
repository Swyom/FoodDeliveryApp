import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, Dimensions, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import Orders from '../screens/Orders';
import Settings from '../screens/Settings';
import Logout from '../screens/Logout'; 
import Help from '../screens/Help';
import TabNavigation from './TabNavigation';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');

function CustomDrawerContent(props: any) {
  const { theme, toggleTheme, colors } = useTheme();
  const { user } = useAuth();

  return (
    <View style={[styles.drawerContainer, { backgroundColor: colors.background }]}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.profileHeaderSection, { backgroundColor: colors.background }]}>
          <Image
            source={require("../../assets/profile.png")} 
            style={styles.avatarImage}
          />
          <View style={styles.profileMetaWrapper}>
            <Text style={[styles.userNameText, { color: colors.text }]} numberOfLines={1}>{user?.name || 'Guest User'}</Text>
            <Text style={[styles.userSubtitleText, { color: colors.textSecondary }]} numberOfLines={1}>Premium Member</Text>
          </View>
        </View>

        <View style={[styles.dividerLine, { backgroundColor: colors.divider }]} />

        <View style={styles.navItemsListWrapper}>
          <DrawerItemList {...props} />
        </View>

        <View style={[styles.dividerLine, { backgroundColor: colors.divider, marginTop: 12 }]} />
        
        {/* Day/Night Toggle System */}
        <View style={styles.themeToggleContainer}>
          <View style={styles.themeToggleLeft}>
            <Ionicons 
              name={theme === 'light' ? 'sunny' : 'moon'} 
              size={20} 
              color={theme === 'light' ? '#FF6B35' : '#818CF8'} 
              style={{ marginRight: 12 }}
            />
            <Text style={[styles.themeToggleText, { color: colors.text }]}>
              {theme === 'light' ? 'Day Mode' : 'Night Mode'}
            </Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#cbd5e1', true: '#4f46e5' }}
            thumbColor={theme === 'dark' ? '#818cf8' : '#f8fafc'}
          />
        </View>
      </DrawerContentScrollView>

      <View style={[styles.drawerFooterContainer, { backgroundColor: colors.cardBackground, borderTopColor: colors.border }]}>
        <Text style={[styles.footerVersionText, { color: colors.textSecondary }]}>App Version 2.1.0</Text>
      </View>
    </View>
  );
}

function MyDrawer() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: colors.background,
          width: width * 0.75,
        },
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          marginLeft: -10,
        },
        drawerActiveBackgroundColor: colors.primaryLight,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerInactiveBackgroundColor: 'transparent',
        drawerItemStyle: {
          borderRadius: 12,
          marginVertical: 4,
          paddingHorizontal: 8,
        }
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={TabNavigation} 
        options={{ 
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size - 2} color={color} />
          )
        }} 
      />
      <Drawer.Screen 
        name="Orders" 
        component={Orders} 
        options={{
          title: 'My Orders',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size - 2} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size - 2} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Help" 
        component={Help} 
        options={{
          title: 'Help & Support',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size - 2} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Logout" 
        component={Logout} 
        options={{
          title: 'Logout',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size - 2} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 0,
  },
  profileHeaderSection: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#f1f5f9',
  },
  profileMetaWrapper: {
    marginLeft: 14,
    flex: 1,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  userSubtitleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  dividerLine: {
    height: 1,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  navItemsListWrapper: {
    paddingHorizontal: 8,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
  },
  themeToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  drawerFooterContainer: {
    padding: 20,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerVersionText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});