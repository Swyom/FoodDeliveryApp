import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

interface UserData {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedAuth = await SecureStore.getItemAsync('isAuthenticated');
        if (storedAuth === 'true') {
          setIsAuthenticated(true);
          const name = await SecureStore.getItemAsync('registeredName');
          const email = await SecureStore.getItemAsync('registeredEmail');
          if (name && email) {
            setUser({ name, email });
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      await SecureStore.setItemAsync('registeredEmail', email);
      await SecureStore.setItemAsync('registeredPassword', password);
      await SecureStore.setItemAsync('registeredName', name);
      return true;
    } catch (error) {
      console.error('Error registering:', error);
      return false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const storedEmail = await SecureStore.getItemAsync('registeredEmail');
      const storedPassword = await SecureStore.getItemAsync('registeredPassword');

      if (email === storedEmail && password === storedPassword && email !== null) {
        await SecureStore.setItemAsync('isAuthenticated', 'true');
        setIsAuthenticated(true);
        const name = await SecureStore.getItemAsync('registeredName');
        if (name) {
          setUser({ name, email });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error saving auth state:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await SecureStore.deleteItemAsync('isAuthenticated');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error removing auth state:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};