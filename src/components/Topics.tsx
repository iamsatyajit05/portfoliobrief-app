import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from './ThemeContext';
import CategoryCard from './CategoryCard';
import NewsSummaryCard from './NewsSummaryCard';
import { fetchNews } from '../constants/api'; // Import your fetchNews function
import { topics } from '../utils/constants';

const Topics = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const [topic, setTopic] = useState('Finance');
  const [highlights, setHighlights] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true); // Loading state for news fetching
  const [error, setError] = useState(null); // Error state for handling fetch errors

  // Fetch news based on selected category (topic)
  useEffect(() => {
    const fetchNewsByCategory = async () => {
      setLoadingNews(true); // Set loading to true when fetching news
      setError(null); // Clear previous errors

      try {
        const response = await fetchNews([topic]); // Fetch news for the selected topic
        setHighlights(response.news); // Assuming response contains a 'news' array
      } catch (error:any) {
        console.error('Error fetching news:', error);
        setError(error); // Set error state if fetch fails
      } finally {
        setLoadingNews(false); // Set loading to false once news is fetched (success or error)
      }
    };

    fetchNewsByCategory();
  }, [topic]); // Fetch news whenever topic changes

  // Navigate to NewsFeedScreen on news card press
  const onNewsPress = (index: number) => {
    navigation.navigate('NewsFeedScreen', {
      index,
      news: highlights,
    });
  };

  if (loadingNews) {
    return (
      <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
        <Text style={[styles.subHeading, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Topics</Text>
        <FlatList
          data={topics}
          renderItem={({ item }) => <CategoryCard item={item} topic={topic} setTopic={setTopic} />}
          keyExtractor={(item) => item.id.toString()} // Ensure key is a string or number
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
        <ActivityIndicator style={styles.loadingIndicator} size="large" color={isDarkMode ? '#FFF' : '#6200EE'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
        <Text style={[styles.subHeading, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Topics</Text>
        <FlatList
          data={topics}
          renderItem={({ item }) => <CategoryCard item={item} topic={topic} setTopic={setTopic} />}
          keyExtractor={(item) => item.id.toString()} // Ensure key is a string or number
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
        <Text style={styles.errorText}>Failed to fetch news. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
      <Text style={[styles.subHeading, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Topics</Text>
      <FlatList
        data={topics}
        renderItem={({ item }) => <CategoryCard item={item} topic={topic} setTopic={setTopic} />}
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string or number
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
  loadingIndicator: {
    marginTop: 32,
  },
  errorText: {
    marginTop: 32,
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});

export default Topics;
