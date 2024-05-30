import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './src/navigation/AppNavigator';
import LogoScreen from './src/screens/LogoScreen';
import IntroScreen1 from './src/screens/IntroScreen1';
import IntroScreen2 from './src/screens/IntroScreen2';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show LogoScreen for 3 seconds
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Logo" component={LogoScreen} />
        ) : (
          <>
            <Stack.Screen name="Intro1" component={IntroScreen1} />
            <Stack.Screen name="Intro2" component={IntroScreen2} />
            <Stack.Screen name="AppNavigator" component={AppNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
