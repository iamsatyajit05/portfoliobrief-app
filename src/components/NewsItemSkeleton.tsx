import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from './ThemeContext';

const NewsItemSkeleton = () => {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity style={isDarkMode ? styles.highlightDarkItem : styles.highlightLightItem} disabled={true}>
      <View style={styles.highlightTextContainer}>
        <View style={[styles.loadingTitle, isDarkMode ? styles.darkModeLoadingText : styles.lightModeLoadingText]} />
        <View style={[styles.loadingCategory, isDarkMode ? styles.darkModeLoadingText : styles.lightModeLoadingText]} />
        <View style={[styles.loadingCategory, isDarkMode ? styles.darkModeLoadingText : styles.lightModeLoadingText]} />
      </View>
      <View style={styles.highlightImage}>
        <View style={styles.loadingImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlightDarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#333',
    padding: 8,
    height: 80,
  },
  highlightLightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#f9f9f9',
    padding: 8,
    height: 80,
  },
  highlightTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  loadingTitle: {
    height: 16,
    width: '80%',
    marginBottom: 8,
    backgroundColor: '#E0E0E0', // Placeholder color for text
  },
  loadingCategory: {
    height: 12,
    width: '50%',
    marginBottom: 4,
    backgroundColor: '#E0E0E0', // Placeholder color for text
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#E0E0E0', // Placeholder color for image
  },
  loadingImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0', // Placeholder color for image
  },
  darkModeLoadingText: {
    backgroundColor: '#666', // Dark mode placeholder color
  },
  lightModeLoadingText: {
    backgroundColor: '#DDD', // Light mode placeholder color
  },
});

export default NewsItemSkeleton;
