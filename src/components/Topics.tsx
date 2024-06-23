import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from './ThemeContext';
import CategoryCard from './CategoryCard';
import NewsSummaryCard from './NewsSummaryCard';
import { fetchNews } from '../constants/api'; // Import your fetchNews function
import { topics } from '../utils/constants';

const Topics = ({ navigation }:any) => {
  const { isDarkMode } = useTheme();
  const [topic, setTopic] = useState('Finance');
  const [highlights, setHighlights] = useState([]);

  // Fetch news based on selected category (topic)
  useEffect(() => {
    const fetchNewsByCategory = async () => {
      try {
        const response = await fetchNews([topic]); // Fetch news for the selected topic
        setHighlights(response.news); // Assuming response contains a 'news' array
      } catch (error) {
        console.error('Error fetching news:', error);
        // Handle error as needed
      }
    };

    fetchNewsByCategory();
  }, [topic]); // Fetch news whenever topic changes

  // Navigate to NewsFeedScreen on news card press
  const onNewsPress = (index :number) => {
    navigation.navigate('NewsFeedScreen', {
      index,
      news: highlights,
    });
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
      <Text style={[styles.subHeading, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Topics</Text>
      <FlatList
        data={topics}
        renderItem={({ item }) => <CategoryCard item={item} topic={topic} setTopic={setTopic} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
      <View>
        {highlights.map((news, index) => (
          <NewsSummaryCard key={index} news={news} onPress={() => onNewsPress(index)} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkModeContainer: {
    backgroundColor: '#000',
  },
  lightModeContainer: {
    backgroundColor: '#fff',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  darkModeText: {
    color: '#fff',
  },
  lightModeText: {
    color: '#000',
  },
  categoryList: {
    alignItems: 'center',
  },
});

export default Topics;
