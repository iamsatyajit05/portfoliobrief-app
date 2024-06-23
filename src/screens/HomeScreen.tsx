import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Linking } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import NetworkError from '../components/NetworkError';
import { CheckConnection } from '../utils/connection';
import NewsSummaryCard from '../components/NewsSummaryCard';
import Topics from '../components/Topics';
import { fetchNews } from '../constants/api';

const HomeScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const networkInformation = CheckConnection();
  const [highlights, setHighlights] = useState<any[]>([]); // State to hold news highlights

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetchNews(); // Fetch news data from API
        setHighlights(response.news); // Assuming response has a structure like { news: [array of news objects] }
      } catch (error) {
        console.error('Error fetching news:', error);
        // Handle error (show error message, retry mechanism, etc.)
      }
    };

    fetchNewsData(); // Call fetchNewsData on component mount

    const interval = setInterval(fetchNewsData, 5 * 60 * 1000); // Refresh news every 5 minutes

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const onNewsPress = (index: number) => {
    navigation.navigate('NewsFeedScreen', {
      index,
      news: highlights // Pass the news array to NewsFeedScreen
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#000" : "#fff"} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.subHeading, { color: isDarkMode ? '#fff' : '#000' }]}>Top Highlights</Text>
        {highlights.map((item, index) => (
            <NewsSummaryCard key={index} news={item} onPress={() => onNewsPress(index)} />
          ))}
        <Topics navigation={navigation} />
      </ScrollView>
      {!networkInformation && <NetworkError />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    marginBottom: 12,
  },
});

export default HomeScreen;
