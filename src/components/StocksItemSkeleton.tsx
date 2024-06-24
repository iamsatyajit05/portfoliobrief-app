import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Import your theme context

const StocksItemSkeleton = () => {
  const { isDarkMode } = useTheme(); // Get dark mode state from your theme context

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#E0E0E0' }]}>
      <View style={[styles.textSkeleton, { backgroundColor: isDarkMode ? '#555' : '#CCCCCC' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%', // Adjust width as per your design
  },
  textSkeleton: {
    flex: 1,
    height: 16,
    borderRadius: 4,
    marginBottom: 8, // Adjust spacing as per your design
  },
});

export default StocksItemSkeleton;
