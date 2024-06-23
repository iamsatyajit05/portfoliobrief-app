// AppNavigator.tsx

import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import SettingScreen from '../screens/SettingScreen';
import StocksScreen from '../screens/StocksScreen';
import SearchScreen from '../screens/SearchScreen'; // Import SearchScreen
import Header from '../components/Header';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export type RootStackParamList = {
  HomeTab: undefined;
  News: undefined;
  Setting: undefined;
  Stocks: undefined;
  HomeStack: undefined;
  SearchScreen: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const HomeStack = createStackNavigator<RootStackParamList>();

const HomeStackScreen = () => {
  const { isDarkMode } = useTheme();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? 'black' : 'white',
        },
        headerTintColor: isDarkMode ? 'white' : 'black', // Set arrow icon color based on dark mode
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Header name="Portfolio Brief" search onPressSearch={() => navigation.navigate('SearchScreen')} />
        })}
      />
      <HomeStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitle: () => <Header name='Search'/>,
          headerTintColor: isDarkMode ? 'white' : 'black', // Set arrow icon color based on dark mode
        }}
      />
    </HomeStack.Navigator>
  );
};

const AppNavigator = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    changeNavigationBarColor(isDarkMode ? "black" : "white", true);
  }, [isDarkMode]);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'HomeTab') {
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
          fontSize: 14,
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
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerTitle: () => <Header name="News" />
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerTitle: () => <Header name="Setting" />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Stocks"
        component={StocksScreen}
        options={{
          headerTitle: () => <Header name="Stocks" />,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
