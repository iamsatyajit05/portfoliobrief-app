// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = async () => {
    try {
      await AsyncStorage.setItem('theme', !isDarkMode ? 'true' : 'false')
      setIsDarkMode((prevMode) => !prevMode);
    } catch (e) {
      console.log("UI Theme Set Error", e);
    }
  };

  const initTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme')
      if (value !== null) {
        setIsDarkMode(value === 'true')
      } else {
        await AsyncStorage.setItem('theme', 'false');
        setIsDarkMode(false);
      }
    } catch (e) {
      console.log("UI Theme Get Error", e);
    }
  };

  useEffect(() => {
    initTheme();
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
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
