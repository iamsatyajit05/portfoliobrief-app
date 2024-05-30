import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type IntroScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'IntroScreen2'>;

type Props = {
  navigation: IntroScreen2NavigationProp;
};

const IntroScreen2: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Intro Screen 2</Text>
      <Button title="Go to Home" onPress={() => navigation.replace('AppNavigator')} />
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

export default IntroScreen2;
