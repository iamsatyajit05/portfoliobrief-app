import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import SettingScreen from '../screens/SettingScreen';
import StocksScreen from '../screens/StocksScreen';
import Header from '../components/Header';

export type RootStackParamList = {
  Home: undefined;
  News: undefined;
  Setting: undefined;
  Stocks: undefined;
  AppNavigator: undefined
  OnBoardingScreen: undefined
};

const Tab = createBottomTabNavigator<RootStackParamList>();

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
        tabBarStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white',
          height: 55,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 14
        },
        tabBarIconStyle: {
          marginTop: 3
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Header name="Portfolio Brief" />
        }} />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerTitle: () => <Header name="News" />
        }} />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerTitle: () => <Header name="Setting" />
        }} />
      <Tab.Screen
        name="Stocks"
        component={StocksScreen}
        options={{
          headerTitle: () => <Header name="Stocks" />
        }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
