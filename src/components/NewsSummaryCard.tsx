import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from './ThemeContext';

const NewsSummaryCard = ({ news, onPress }: any) => {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity style={isDarkMode ? styles.highlightDarkItem : styles.highlightLightItem} onPress={onPress}>
      <View style={styles.highlightTextContainer}>
        <Text style={[styles.highlightTitle, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{news.title}</Text>
        {news.category && Array.isArray(news.category) && (
          <Text style={[styles.highlightCategory, isDarkMode ? styles.darkModeText : styles.lightModeText]}>
            {news.category.join(', ')}
          </Text>
        )}
      </View>
      <Image source={{ uri: news.imageUrl }} style={styles.highlightImage} />
    </TouchableOpacity>
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
  highlightImage: {
    borderRadius: 6,
    width: 60,
    height: 60,
  },
  highlightTextContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  highlightTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  highlightCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  darkModeText: {
    color: '#fff',
  },
  lightModeText: {
    color: '#000',
  },
});

export default NewsSummaryCard;
