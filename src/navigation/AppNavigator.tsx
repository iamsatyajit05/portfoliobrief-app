import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import SettingScreen from '../screens/SettingScreen';
import StocksScreen from '../screens/StocksScreen';
import Header from '../components/Header';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

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

  useEffect(() => {
    changeNavigationBarColor(isDarkMode ? "black" : "white", true);
  }, [isDarkMode])

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
        tabBarActiveTintColor: isDarkMode ? 'white' : '#5474FD',
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
        },
        headerStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white',
        },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <Header name="Portfolio Brief" search />
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
          headerTitle: () => <Header name="Setting" />,
          headerShown: false 
        }} />
      <Tab.Screen
        name="Stocks"
        component={StocksScreen}
        options={{
          headerTitle: () => <Header name="Stocks" />,
          headerShown: false
        }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
