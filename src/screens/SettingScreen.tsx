import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default SettingScreen;
