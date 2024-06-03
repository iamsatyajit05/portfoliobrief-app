import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import SettingScreen from '../screens/SettingScreen';
import StocksScreen from '../screens/StocksScreen';

export type RootStackParamList = {
  Home: undefined;
  News: undefined;
  Setting: undefined;
  Stocks: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppNavigator = () => {
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
          console.log(iconName);

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false,}}/>
      <Tab.Screen name="News" component={NewsScreen} options={{headerShown:false,}}/>
      <Tab.Screen name="Setting" component={SettingScreen} options={{headerShown:false,}}/>
      <Tab.Screen name="Stocks" component={StocksScreen} options={{headerShown:false,}}/>
    </Tab.Navigator>
  );
};

export default AppNavigator;
