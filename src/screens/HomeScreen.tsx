// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <TouchableOpacity style={styles.highlightItem} onPress={() => openURL(item.url)}>
      <Image source={{ uri: item.image }} style={styles.highlightImage} />
      <View style={styles.highlightTextContainer}>
        <Text style={styles.highlightTitle}>{item.title}</Text>
        <Text style={styles.highlightCategory}>{item.category}</Text>
        <Text style={styles.highlightDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Veritas</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search for News..." />
        </View>
        <Text style={styles.categoryHeader}>Category</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
        <Text style={styles.highlightHeader}>Top Highlights</Text>
        <FlatList
          data={highlights}
          renderItem={renderHighlightItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.highlightList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#f1f1f1',
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
    backgroundColor: '#788EF5',
    color: 'white',
    marginLeft: -8,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 10,
    height: 45,
    color: '#333',
  },
  categoryHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
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
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlightHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
    marginBottom: 14,
  },
  highlightList: {
    paddingBottom: 16,
  },
  highlightItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    color: 'black', // Changed color to blue to indicate it's a link
    fontWeight: 'bold',
    marginBottom: 2,
    // Underline to indicate it's a link
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
});

export default HomeScreen;
