import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryLight: string;
  accent: string;
  statusBarStyle: 'dark' | 'light' | 'auto';
  statusBarBg: string;
  divider: string;
}

const lightColors: ThemeColors = {
  background: '#ffffff',
  cardBackground: '#f8fafc',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  primary: '#FF6B35',
  primaryLight: '#fff7ed',
  accent: '#10B981',
  statusBarStyle: 'dark',
  statusBarBg: '#ffffff',
  divider: '#f1f5f9',
};

const darkColors: ThemeColors = {
  background: '#0f172a',
  cardBackground: '#1e293b',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  border: '#334155',
  primary: '#FF8A5B',
  primaryLight: '#2a1a14',
  accent: '#34D399',
  statusBarStyle: 'light',
  statusBarBg: '#0f172a',
  divider: '#1e293b',
};

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const THEME_STORAGE_KEY = '@food_delivery_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');


  useEffect(() => {
    const loadPersistedTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === 'light' || storedTheme === 'dark') {
          setTheme(storedTheme);
        }
      } catch (error) {
        console.log('Failed to load theme from storage:', error);
      }
    };
    loadPersistedTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      console.log('Failed to save theme to storage:', error);
    }
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
