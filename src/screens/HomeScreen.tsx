import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';

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

  const renderHighlightItem = ({ item }) => (
    <TouchableOpacity style={isDarkMode ? styles.highlightDarkItem : styles.highlightLightItem} onPress={() => openURL(item.url)}>
      <Image source={{ uri: item.image }} style={styles.highlightImage} />
      <View style={styles.highlightTextContainer}>
        <Text style={[styles.highlightTitle, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.title}</Text>
        <Text style={[styles.highlightCategory, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.category}</Text>
        <Text style={[styles.highlightDate, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
        <Text style={[styles.header, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Veritas</Text>
        <View style={[styles.searchContainer, isDarkMode ? styles.darkModeSearchContainer : styles.lightModeSearchContainer]}>
          <Ionicons name="search" size={20} color={isDarkMode ? 'white' : '#666'} style={isDarkMode ? styles.searchDarkIcon : styles.searchLightIcon} />
          <TextInput
            style={[styles.searchInput, isDarkMode ? styles.darkModeText : styles.lightModeText]}
            placeholder="Search for News..."
            placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
          />
        </View>
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
          <FlatList
            data={highlights}
            renderItem={renderHighlightItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.highlightList}
          />
        </View>
      </View>
    </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  darkModeSearchContainer: {
    backgroundColor: '#333',
  },
  lightModeSearchContainer: {
    backgroundColor: '#f1f1f1',
  },
  searchLightIcon: {
    marginRight: 10,
    backgroundColor: '#788EF5',
    color: 'white',
    marginLeft: -10,
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 14,
  },
  searchDarkIcon: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    marginLeft: -10,
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 10,
    height: 45,
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
  },
});

export default HomeScreen;