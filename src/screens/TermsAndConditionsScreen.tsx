import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/ThemeContext';

const TermsAndConditionsScreen = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#F5FCFF' }]}>
      {/* Top icon bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Terms and Conditions</Text>
        {/* Placeholder for additional icons if needed */}
        <View style={{ width: 24 }} />
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>Terms and Conditions content goes here...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 12,
  },
});

export default TermsAndConditionsScreen;
