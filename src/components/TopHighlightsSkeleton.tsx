import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from './ThemeContext';

const TopHighlightsSkeleton = () => {
  const { isDarkMode } = useTheme();

  return (
    <View style={isDarkMode ? styles.highlightDarkItem : styles.highlightLightItem}>
      <View style={styles.highlightTextContainer}>
        <View style={[styles.loadingTitle, isDarkMode ? styles.darkModeLoadingText : styles.lightModeLoadingText]} />
        <View style={[styles.loadingCategory, isDarkMode ? styles.darkModeLoadingText : styles.lightModeLoadingText]} />
      </View>
      <View style={styles.loadingImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  highlightDarkItem: {
    flexDirection: 'row',
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#333',
    padding: 4,
  },
  highlightLightItem: {
    flexDirection: 'row',
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#f9f9f9',
    padding: 4,
  },
  loadingImage: {
    borderRadius: 6,
    width: 60,
    height: 60,
    backgroundColor: '#E0E0E0', // Placeholder color for image
  },
  highlightTextContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  loadingTitle: {
    height: 16,
    backgroundColor: '#E0E0E0', // Placeholder color for text
    marginBottom: 8,
  },
  loadingCategory: {
    height: 12,
    width: '50%',
    backgroundColor: '#E0E0E0', // Placeholder color for text
  },
  darkModeLoadingText: {
    backgroundColor: '#666', // Dark mode placeholder color
  },
  lightModeLoadingText: {
    backgroundColor: '#DDD', // Light mode placeholder color
  },
});

export default TopHighlightsSkeleton;
