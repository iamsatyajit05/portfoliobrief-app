import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, Linking, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import NetworkError from '../components/NetworkError';
import { CheckConnection } from '../utils/connection';

const categories = [
  { id: '1', title: 'Innovations & Ideas', image: 'https://cdn.pixabay.com/photo/2017/04/26/09/59/europe-2262154_1280.jpg', url: 'https://example.com/innovations' },
  { id: '2', title: 'World in Focus', image: 'https://cdn.pixabay.com/photo/2016/11/29/12/18/camera-1869430_1280.jpg', url: 'https://example.com/world' },
  { id: '3', title: 'Technology', image: 'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_1280.jpg', url: 'https://example.com/technology' },
];

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

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => openURL(item.url)}>
      <ImageBackground source={{ uri: item.image }} style={styles.categoryImage} imageStyle={styles.categoryImageStyle}>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryText}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "black" : "white"} />
      <ScrollView>
        <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
          <Text style={[styles.categoryHeader, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Category</Text>
          <View>
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            />
          </View>
          <Text style={[styles.highlightHeader, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Top Highlights</Text>
          <View>
            {[...highlights, ...highlights].map((item, index) => (<TouchableOpacity style={isDarkMode ? styles.highlightDarkItem : styles.highlightLightItem} key={index} onPress={() => openURL(item.url)}>
              <Image source={{ uri: item.image }} style={styles.highlightImage} />
              <View style={styles.highlightTextContainer}>
                <Text style={[styles.highlightTitle, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.title}</Text>
                <Text style={[styles.highlightCategory, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.category}</Text>
                <Text style={[styles.highlightDate, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.date}</Text>
              </View>
            </TouchableOpacity>))}
          </View>
        </View>
      </ScrollView>
      {!networkInformation && <NetworkError />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkModeContainer: {
    backgroundColor: '#000',
  },
  lightModeContainer: {
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  categoryHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryList: {
    borderRadius: 8,
    height: 95,
  },
  categoryItem: {
    marginRight: 6,
    marginLeft: 2,
    alignItems: 'center',
  },
  categoryImage: {
    width: 140,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  categoryImageStyle: {
    borderRadius: 8,
  },
  categoryTextContainer: {
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  highlightHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 14,
  },
  highlightList: {
    paddingBottom: 16,
  },

  highlightDarkItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#333',
  },

  highlightLightItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#f9f9f9',
  },
  highlightImage: {
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 6,
    width: 60,
    height: 63,
  },
  highlightTextContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  highlightTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
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