import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';
import { Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import auth from '@react-native-firebase/auth';
import { CheckConnection } from '../utils/connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type IntroScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'Setting'>;

type Props = {
  navigation: IntroScreen2NavigationProp;
};

const SettingScreen: React.FC<Props> = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const user = auth().currentUser;
  const [loading, setLoading] = useState(false);

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch(err => console.log("Couldn't load page", err));
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('userLoggedIn');
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.navigate('OnBoardingScreen');
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnBoardingScreen' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <Text style={[styles.header, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Settings</Text>
      <View style={styles.userInfo}>
        {user?.photoURL ? (
          <Image
            source={{ uri: user.photoURL }}
            style={styles.userImage}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2020/06/13/17/51/milky-way-5295160_960_720.jpg' }}
            style={styles.userImage}
            resizeMode="cover"
            onError={(error) => console.log('Image loading error:', error)}
          />
        )}
        <View style={styles.userInfoText}>
          <Text style={[styles.userName, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{user?.displayName}</Text>
          <Text style={[styles.userEmail, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.settingItem}>
        <Ionicons name="moon" size={18} color={isDarkMode ? '#fff' : '#5474FD'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#5474FD', true: '#f4f3f4' }}
          thumbColor={isDarkMode ? '#5474FD' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => handleOpenURL('https://portfoliobrief-frontend.vercel.app/termsnconditions')}
      >
        <Ionicons name="document-text" size={18} color={isDarkMode ? '#fff' : '#5474FD'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Terms & Conditions</Text>
        <Ionicons name="chevron-forward" size={18} color={isDarkMode ? '#fff' : '#5474FD'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => handleOpenURL('https://portfoliobrief-frontend.vercel.app/about')}
      >
        <Ionicons name="information-circle" size={18} color={isDarkMode ? '#fff' : '#5474FD'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkModeText : styles.lightModeText]}>About</Text>
        <Ionicons name="chevron-forward" size={18} color={isDarkMode ? '#fff' : '#5474FD'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={18} color={isDarkMode ? '#fff' : '#5474FD'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Log Out</Text>
        <Ionicons name="chevron-forward" size={18} color={isDarkMode ? '#fff' : '#5474FD'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkMode: {
    backgroundColor: '#000',
  },
  lightMode: {
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  darkModeText: {
    color: '#fff',
  },
  lightModeText: {
    color: '#000',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 12,
  },
  userInfoText: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
  userEmail: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#000000B2',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Inter-Medium',
  },
});

export default SettingScreen;
