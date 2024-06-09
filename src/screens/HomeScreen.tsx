import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, Linking, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import NetworkError from '../components/NetworkError';
import { CheckConnection } from '../utils/connection';
import NewsSummaryCard from '../components/NewsSummaryCard';
import Topics from '../components/Topics';

const highlights = [
  { id: '1', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
  { id: '2', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
  { id: '3', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
  { id: '4', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
  { id: '5', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
];

const HomeScreen = () => {
  const { isDarkMode } = useTheme();

  const networkInformation = CheckConnection();

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "black" : "white"} />
      <ScrollView>
        <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
          <Text style={[styles.subHeading, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Top Highlights</Text>
          <View>
            {highlights.map((news, index) => (
              <NewsSummaryCard key={index} news={news} />
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