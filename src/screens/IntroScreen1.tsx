import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type IntroScreen1NavigationProp = StackNavigationProp<RootStackParamList, 'IntroScreen1'>;

type Props = {
  navigation: IntroScreen1NavigationProp;
};

const IntroScreen1: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Intro Screen 1</Text>
      <Button title="Go to Intro Screen 2" onPress={() => navigation.navigate('Intro2')} />
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

export default IntroScreen1;
