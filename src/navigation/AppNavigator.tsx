import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import SettingScreen from '../screens/SettingScreen';
import StocksScreen from '../screens/StocksScreen';
import TermsAndConditions from '../screens/TermsAndConditionsScreen';
import About from '../screens/AboutScreen';

export type RootStackParamList = {
  Home: undefined;
  News: undefined;
  Setting: undefined;
  Stocks: undefined;
  TermsAndConditions: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Stocks') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDarkMode ? 'white' : '#788EF5',
        tabBarInactiveTintColor: isDarkMode ? '#aaa' : 'gray',
        headerShown: false,
	tabBarStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white', 
        },
      })}
      
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Setting" component={SettingsStack}  />
      <Tab.Screen name="Stocks" component={StocksScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
