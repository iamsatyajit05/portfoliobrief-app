import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import { useTheme } from '../components/ThemeContext';
import auth from '@react-native-firebase/auth';
import { saveStocks } from '../constants/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface Stock {
  id: number;
  name: string;
}
const stockData :Stock[] = [
   { id: 1, name: "Reliance Industries Limited" },
  { id: 2, name: "TCS (Tata Consultancy Services)" },
  { id: 3, name: "HDFC Bank" },
  { id: 4, name: "ICICI Bank" },
  { id: 5, name: "HUL (Hindustan Unilever Limited)" },
  { id: 6, name: "Infosys" },
  { id: 7, name: "ITC (ITC Limited)" },
  { id: 8, name: "SBI (State Bank of India)" },
  { id: 9, name: "Bharti Airtel" },
  { id: 10, name: "Bajaj Finance" },
  { id: 11, name: "LIC India (Life Insurance Corporation of India)" },
  { id: 12, name: "Larsen & Toubro (L&T)" },
  { id: 13, name: "Kotak Mahindra Bank" },
  { id: 14, name: "Asian Paints" },
  { id: 15, name: "HCL Tech (HCL Technologies)" },
  { id: 16, name: "Axis Bank" },
  { id: 17, name: "Adani Enterprises" },
  { id: 18, name: "Maruti Suzuki India Limited" },
  { id: 19, name: "Sun Pharmaceutical Industries Limited" },
  { id: 20, name: "Titan Company" },
  { id: 21, name: "Avenue Supermart (DMart)" },
  { id: 22, name: "Bajaj Finserv" },
  { id: 23, name: "UltraTech Cement" },
  { id: 24, name: "ONGC (Oil and Natural Gas Corporation)" },
  { id: 25, name: "Nestle India" },
  { id: 26, name: "Wipro" },
  { id: 27, name: "NTPC (National Thermal Power Corporation)" },
  { id: 28, name: "Tata Motors" },
  { id: 29, name: "JSW Steel" },
  { id: 30, name: "M&M (Mahindra & Mahindra)" },
  { id: 31, name: "Power Grid Corporation of India" },
  { id: 32, name: "Adani Ports and Special Economic Zone (APSEZ)" },
  { id: 33, name: "Adani Green Energy Limited" },
  { id: 34, name: "LTI (Larsen & Toubro Infotech)" },
  { id: 35, name: "Tata Steel" },
  { id: 36, name: "Coal India Limited" },
  { id: 37, name: "HDFC Life (HDFC Standard Life Insurance Company)" },
  { id: 38, name: "Siemens India" },
  { id: 39, name: "Hindustan Zinc Limited" },
  { id: 40, name: "Bajaj Auto Limited" },
  { id: 41, name: "Pidilite Industries Limited" },
  { id: 42, name: "IOC (Indian Oil Corporation)" },
  { id: 43, name: "Britannia Industries Limited" },
  { id: 44, name: "Tech Mahindra" },
  { id: 45, name: "IndusInd Bank" },
  { id: 46, name: "Adani Power" },
  { id: 47, name: "Varun Beverages Limited" },
  { id: 48, name: "Godrej Consumer Products Limited" },
  { id: 49, name: "Hindalco Industries Limited" },
  { id: 50, name: "Dabur India Limited" },
  { id: 51, name: "Divi's Laboratories Limited" },
  { id: 52, name: "Bank of Baroda" },
  { id: 53, name: "Cipla Limited" },
  { id: 54, name: "InterGlobe Aviation (IndiGo)" },
  { id: 55, name: "Dr. Reddy's Laboratories Limited" },
  { id: 56, name: "ABB India Limited" },
  { id: 57, name: "Ambuja Cements Limited" },
  { id: 58, name: "Bharat Electronics Limited" },
  { id: 59, name: "Eicher Motors Limited" },
  { id: 60, name: "Vedanta Limited" },
  { id: 61, name: "Cholamandalam Investment and Finance Company Limited" },
  { id: 62, name: "Adani Transmission Limited" },
  { id: 63, name: "Shree Cements Limited" },
  { id: 64, name: "SBI Cards and Payment Services Limited" },
  { id: 65, name: "ICICI Prudential Life Insurance Company Limited" },
  { id: 66, name: "Havells India Limited" },
  { id: 67, name: "Zomato Limited" },
  { id: 68, name: "Bajaj Holdings & Investment Limited" },
  { id: 69, name: "BPCL (Bharat Petroleum Corporation Limited)" },
  { id: 70, name: "Tata Consumer Products Limited" },
  { id: 71, name: "GAIL (Gas Authority of India Limited)" },
  { id: 72, name: "Mankind Pharma" },
  { id: 73, name: "Tata Power Company Limited" },
  { id: 74, name: "Marico Limited" },
  { id: 75, name: "United Spirits Limited" },
  { id: 76, name: "Apollo Hospitals Enterprise Limited" },
  { id: 77, name: "Adani Total Gas Limited" },
  { id: 78, name: "Torrent Pharmaceuticals Limited" },
  { id: 79, name: "Polycab India Limited" },
  { id: 80, name: "Shriram Finance Limited" },
  { id: 81, name: "IDBI Bank Limited" },
  { id: 82, name: "Berger Paints India Limited" },
  { id: 83, name: "Power Finance Corporation Limited" },
  { id: 84, name: "Macrotech Developers Limited" },
  { id: 85, name: "SRF Limited" },
  { id: 86, name: "ICICI Lombard General Insurance Company Limited" },
  { id: 87, name: "Jindal Steel & Power Limited" },
  { id: 88, name: "PNB (Punjab National Bank)" },
  { id: 89, name: "Zydus Wellness Limited" },
  { id: 90, name: "Motherson Sumi Systems Limited" },
  { id: 91, name: "TVS Motor Company Limited" },
  { id: 92, name: "Info Edge (India) Limited" },
  { id: 93, name: "CG Power and Industrial Solutions Limited" },
  { id: 94, name: "Trent Limited" },
  { id: 95, name: "Union Bank of India" },
  { id: 96, name: "Tube Investments of India Limited" },
  { id: 97, name: "MRF Limited" },
  { id: 98, name: "Hero MotoCorp Limited" },
  { id: 99, name: "ONE 97 COMMUNICATIONS (Paytm)" },
  { id: 100, name: "JK Tyre & Industries Ltd." },

];

const StocksScreen: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedStocks, setSelectedStocks] = useState<number[]>([]); // Changed to number[] for storing stock IDs

  const handleStockPress = (stockId: number) => {
    setSelectedStocks(prevSelectedStocks => {
      if (prevSelectedStocks.includes(stockId)) {
        return prevSelectedStocks.filter(id => id !== stockId);
      } else {
        return [...prevSelectedStocks, stockId];
      }
    });
  };
  
  const handleSavePress = async () => {
    try {
      const selectedStockNames = selectedStocks.map(id => {
        const selectedStock = stockData.find(stock => stock.id === id);
        return selectedStock ? selectedStock.name : '';
      });
  
      const user = auth().currentUser;
      const googleId = user ? user.uid : ''; // Ensure you have the user's UID
  
      const response = await saveStocks(googleId, selectedStockNames);
      console.log('Stocks saved:', response);
  
      // Optionally, show a success message or perform further actions
      Alert.alert('Success', 'Stocks saved successfully!');
    } catch (error) {
      console.error('Failed to save stocks:', error);
      Alert.alert('Error', 'Failed to save stocks. Please try again later.');
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        <Text style={[styles.Stockheader, { color: isDarkMode ? '#fff' : '#000' }, { textAlign: 'center' }]}>Stocks</Text>

        <View style={[styles.searchContainer, isDarkMode ? styles.darkModeSearchContainer : styles.lightModeSearchContainer]}>
          <Ionicons name="search" size={24} color={isDarkMode ? 'white' : '#666'} style={isDarkMode ? styles.searchDarkIcon : styles.searchLightIcon} />
          <TextInput
            style={[styles.searchInput, isDarkMode ? styles.darkModeTextInput : styles.lightModeTextInput]}
            placeholder="Search for News..."
            placeholderTextColor={isDarkMode ? '#ccc' : '#A7A7A7'}
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
          {selectedStocks.length} stocks selected out of 100
        </Text>

        {/* Stock Buttons */}
        {stockData.map(stock => (
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
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#f0f0f0',
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
});

export default StocksScreen;