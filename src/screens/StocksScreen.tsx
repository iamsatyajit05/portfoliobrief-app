import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import auth from '@react-native-firebase/auth';
import { fetchStocklist, saveStocks, fetchUserStocks } from '../constants/api'; // Update with your API functions
import Ionicons from 'react-native-vector-icons/Ionicons';
import StocksItemSkeleton from '../components/StocksItemSkeleton';
import { DarkTheme } from '@react-navigation/native';

interface Stock {
  id: number; // Unique identifier for each stock
  name: string; // Stock name
}

const StocksScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [stockData, setStockData] = useState<Stock[]>([]); // State to hold fetched stock data
  const [selectedStocks, setSelectedStocks] = useState<number[]>([]); // State to hold selected stock IDs
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

  // Fetch stock list from API on component mount
  useEffect(() => {
    const fetchAndSetStockData = async () => {
      try {
        const fetchedStockList = await fetchStocklist(); // Replace with your fetchStocklist function
        const stocksWithIds = fetchedStockList.map((stock: { name: string }, index: number) => ({
          id: index + 1, // Assigning a basic unique ID here, adjust as per your API response
          name: stock.name // Assuming your API returns an array of objects with a 'name' field
        }));
        setStockData(stocksWithIds);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log('Failed to fetch stock list:', error);
        Alert.alert('Error', 'Failed to fetch stock list. Please try again later.');
      }
    };

    fetchAndSetStockData();
  }, []);

  // Fetch user's selected stocks on component mount or when stockData changes
  useEffect(() => {
    const fetchAndSetUserStocks = async () => {
      try {
        const user = auth().currentUser;
        const googleId = user ? user.uid : ''; // Ensure you have the user's UID

        if (googleId) {
          const userStocks = await fetchUserStocks(googleId); // Replace with your fetchUserStocks function
          if (userStocks && userStocks.stocks) {
            const stockIds = userStocks.stocks.map((stockName: string) => {
              const stock = stockData.find(s => s.name === stockName);
              return stock ? stock.id : null;
            }).filter((id: number | null): id is number => id !== null);

            setSelectedStocks(stockIds);
          }
        }
      } catch (error) {
        console.log('Failed to fetch user stocks:', error);
        Alert.alert('Error', 'Failed to fetch user stocks. Please try again later.');
      }
    };

    fetchAndSetUserStocks();
  }, [stockData]); // Ensure useEffect runs whenever stockData changes

  // Handle stock selection/deselection
  const handleStockPress = (stockId: number) => {
    setSelectedStocks(prevSelectedStocks => {
      if (prevSelectedStocks.includes(stockId)) {
        return prevSelectedStocks.filter(id => id !== stockId);
      } else {
        return [...prevSelectedStocks, stockId];
      }
    });
  };

  // Handle saving selected stocks
  const handleSavePress = async () => {
    try {
      const selectedStockNames = selectedStocks.map(id => {
        const selectedStock = stockData.find(stock => stock.id === id);
        return selectedStock ? selectedStock.name : '';
      });

      const user = auth().currentUser;
      const googleId = user ? user.uid : ''; // Ensure you have the user's UID

      const response = await saveStocks(googleId, selectedStockNames); // Replace with your saveStocks function
      console.log('Stocks saved:', response);

      Alert.alert('Success', 'Stocks saved successfully!');
    } catch (error) {
      console.log('Failed to save stocks:', error);
      Alert.alert('Error', 'Failed to save stocks. Please try again later.');
    }
  };

  // Function to handle search query change
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filter stocks based on search query
  const filteredStocks = stockData.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.Stockheader, { color: isDarkMode ? '#fff' : '#000' }]}>Stocks</Text>

        <View style={[styles.searchContainer, isDarkMode ? styles.darkModeSearchContainer : styles.lightModeSearchContainer]}>
          <Ionicons name="search" size={24} color={isDarkMode ? 'white' : '#666'} style={isDarkMode ? styles.searchDarkIcon : styles.searchLightIcon} />
          <TextInput
            style={[styles.searchInput, isDarkMode ? styles.darkModeTextInput : styles.lightModeTextInput]}
            placeholder="Search for Stocks..."
            placeholderTextColor={isDarkMode ? '#ccc' : '#A7A7A7'}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Title and Save Button */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>Select Stocks</Text>
          </View>
          <TouchableOpacity onPress={handleSavePress} style={[styles.saveButton, { backgroundColor: isDarkMode ? '#fff' : '#E5E8E8' }]}>
            <Text style={[styles.saveButtonText, { color: isDarkMode ? '#000' : '#000' }]}>Save</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.selectedStocksText, { color: isDarkMode ? '#fff' : '#000' }]}>
          {selectedStocks.length} stocks selected out of {stockData.length}
        </Text>

        {/* Stock Buttons or Skeletons */}
        {loading ? (
        // Render skeleton items using array map
        Array.from({ length: 5 }).map((_, index) => (
          <StocksItemSkeleton key={index}  />
        ))
      ): filteredStocks.length > 0 ? (
          // Render actual stock buttons
          filteredStocks.map(stock => (
            <TouchableOpacity
              key={stock.id}
              style={[
                styles.stockButton,
                isDarkMode ? styles.stockDarkButton : styles.stockButton,
                selectedStocks.includes(stock.id) && (isDarkMode ? styles.stockDarkButtonSelected : styles.stockButtonSelected)
              ]}
              onPress={() => handleStockPress(stock.id)}
            >
              <Text style={[styles.stockButtonText, { color: isDarkMode ? '#fff' : '#000' }]}>{stock.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          // No results text
          <Text style={[styles.noResultsText, { color: isDarkMode ? '#fff' : '#000' }]}>
            No stocks found.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },     innerContainer: {
    padding: 20,
  },
  Stockheader: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    marginBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
    color: '#333',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
    marginRight: 10,
  },
  selectedStocksText: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    color: '#000000B2',
  },
  saveButton: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  stockButton: {
    alignItems: 'flex-start',
    padding: 8,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#f9f9f9',
  },
  stockDarkButton: {
    alignItems: 'flex-start',
    padding: 8,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#333',
  },
  stockButtonSelected: {
    backgroundColor: '#E5E8E8',
  },
  stockDarkButtonSelected: {
    backgroundColor: 'gray',
  },
  stockButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  noResultsText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StocksScreen;
