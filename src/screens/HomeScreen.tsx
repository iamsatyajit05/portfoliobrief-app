import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, Linking, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import NetworkError from '../components/NetworkError';
import { CheckConnection } from '../utils/connection';
import NewsSummaryCard from '../components/NewsSummaryCard';
import Topics from '../components/Topics';

const highlights = [
  {
    article_lead_image_url: 'https://example.com/image1.jpg',
    article_url: 'https://example.com/article1',
    article_title: 'Article Title 1',
    article_source: 'Source 1',
    article_date_published: '2024-06-01',
    article_summary: 'This is the summary of article 1.',
  },
  {
    article_lead_image_url: 'https://example.com/image2.jpg',
    article_url: 'https://example.com/article2',
    article_title: 'Article Title 2',
    article_source: 'Source 2',
    article_date_published: '2024-06-02',
    article_summary: 'This is the summary of article 2.',
  },
  {
    article_lead_image_url: 'https://example.com/image3.jpg',
    article_url: 'https://example.com/article3',
    article_title: 'Article Title 3',
    article_source: 'Source 3',
    article_date_published: '2024-06-03',
    article_summary: 'This is the summary of article 3.',
  },
];

const HomeScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();

  const networkInformation = CheckConnection();

  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  const onNewsPress = (index: number) => {
    navigation.navigate('NewsFeedScreen', {
      index,
      news: highlights
    });
  }

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: 'white'}}>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "black" : "white"} />
      <ScrollView style={{height: '100%'}}>
        <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
          <Text style={[styles.subHeading, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Top Highlights</Text>
          <View>
            {highlights.map((news, index) => (
              <NewsSummaryCard key={index} news={news} onPress={() => onNewsPress(index)} />
            ))}
          </View>
        </View>
        <Topics />
      </ScrollView>
      {!networkInformation && <NetworkError />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0
  },
  darkModeContainer: {
    backgroundColor: '#000',
  },
  lightModeContainer: {
    backgroundColor: '#fff',
  },
  subHeading: {
    fontSize: 16,
    fontFamily: "Inter-Bold"
  },
  categoryList: {
    borderRadius: 8,
    height: 95,
  },
  categoryImage: {
    width: 140,
    height: 80,
    justifyContent: 'flex-end',
  },
  categoryImageStyle: {
    borderRadius: 8,
  },
  categoryTextContainer: {
    borderRadius: 8,
    padding: 8
  },
  categoryText: {
    fontSize: 14,
    color: 'white',
    fontFamily: "Inter-Bold"
  },
  highlightList: {
    paddingBottom: 16,
  },
  highlightDarkItem: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#333',
    padding: 4
  },
  highlightLightItem: {
    flexDirection: 'row',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#f9f9f9',
    padding: 4
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
    fontFamily: "Inter-Medium"
  },
  highlightCategory: {
    fontSize: 6,
    color: '#666',
    marginBottom: 2,
  },
  highlightDate: {
    fontSize: 6,
    color: '#aaa',
  },
  darkModeText: {
    color: '#fff',
  },
  lightModeText: {
    color: '#000',
  }
});

export default HomeScreen;