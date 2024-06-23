import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import NetworkError from '../components/NetworkError';
import { CheckConnection } from '../utils/connection';
import NewsSummaryCard from '../components/NewsSummaryCard';
import { searchNewsByTitle } from '../constants/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const networkInformation = CheckConnection();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    if (!query) return;

    try {
      const response = await searchNewsByTitle(query);
      console.log(response)
      setSearchResults(response);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const onNewsPress = (index: number) => {
    navigation.navigate('NewsFeedScreen', {
      index,
      news: searchResults,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#000" : "#fff"} 
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.searchContainer, isDarkMode ? styles.darkModeSearchContainer : styles.lightModeSearchContainer]}>
          <Ionicons name="search" size={24} color={isDarkMode ? 'white' : '#666'} style={isDarkMode ? styles.searchDarkIcon : styles.searchLightIcon} />
          <TextInput
            style={[styles.searchInput, isDarkMode ? styles.darkModeTextInput : styles.lightModeTextInput]}
            placeholder="Search for News..."
            placeholderTextColor={isDarkMode ? '#ccc' : '#A7A7A7'}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            onSubmitEditing={() => handleSearch(searchQuery)}
          />
        </View>
        <Text style={[styles.subHeading, { color: isDarkMode ? '#fff' : '#000' }]}>Search Results</Text>
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <NewsSummaryCard key={index} news={item} onPress={() => onNewsPress(index)} />
          ))
        ) : (
          <Text style={[styles.noResults, { color: isDarkMode ? '#fff' : '#000' }]}>No results found</Text>
        )}
      </ScrollView>
      {!networkInformation && <NetworkError />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  darkModeSearchContainer: {
    backgroundColor: '#333',
  },
  lightModeSearchContainer: {
    backgroundColor: '#fff',
  },
  searchLightIcon: {
    marginRight: 10,
    backgroundColor: '#5474FD',
    color: 'white',
    marginLeft: -10.5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 11,
    borderRadius: 12,
  },
  searchDarkIcon: {
    marginRight: 10,
    backgroundColor: 'white',
    color: 'black',
    marginLeft: -10.5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 11,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'Inter-Bold',
    fontSize: 12.48,
    height: 45,
    marginLeft: 10,
  },
  darkModeTextInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  lightModeTextInput: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
