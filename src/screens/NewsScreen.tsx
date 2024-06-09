import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../components/ThemeContext';

const NewsScreen: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#F5FCFF' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>News Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default NewsScreen;
