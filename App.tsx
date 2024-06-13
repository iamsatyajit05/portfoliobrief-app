import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardingScreen from './src/screens/OnBoarding';
import NewsFeedScreen from './src/screens/NewsFeed';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/components/ThemeContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
          <Stack.Screen name="NewsFeedScreen" component={NewsFeedScreen} />
          <Stack.Screen name="AppNavigator" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
