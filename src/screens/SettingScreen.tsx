import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/ThemeContext';

const SettingScreen = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <Text style={[styles.header, isDarkMode ? styles.darkModeText : styles.lightModeText, { textAlign: 'center' }]}>Settings</Text>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://cdn.pixabay.com/photo/2020/06/13/17/51/milky-way-5295160_960_720.jpg' }}
          style={styles.userImage}
          onError={(error) => console.error('Image loading error:', error)}
        />
        <View style={styles.userInfoText}>
          <Text style={[styles.userName, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Yax Buzz</Text>
          <Text style={[styles.userEmail, isDarkMode ? styles.darkModeText : styles.lightModeText]}>yaxvadodariy@gmail.com</Text>
        </View>
      </View>
      <View style={styles.settingItem}>
        <Ionicons name="moon" size={18} color={isDarkMode ? '#fff' : '#788EF5'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#788EF5', true: '#f4f3f4' }}
          thumbColor={isDarkMode ? '#788EF5' : '#f4f3f4'}
          ios_backgroundColor="white"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('TermsAndConditions')}
      >
        <Ionicons name="document-text" size={18} color={isDarkMode ? '#fff' : '#788EF5'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Terms & Conditions</Text>
        <Ionicons name="chevron-forward" size={18} color={isDarkMode ? '#fff' : '#666'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('About')}
      >
        <Ionicons name="information-circle" size={18} color={isDarkMode ? '#fff' : '#788EF5'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkModeText : styles.lightModeText]}>About</Text>
        <Ionicons name="chevron-forward" size={18} color={isDarkMode ? '#fff' : '#666'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => {
          // Implement the logic to handle logout here
        }}
      >
        <Ionicons name="log-out-outline" size={18} color={isDarkMode ? '#fff' : '#788EF5'} />
        <Text style={[styles.settingText, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Log Out</Text>
        <Ionicons name="chevron-forward" size={18} color={isDarkMode ? '#fff' : '#666'} />
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 32,
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
    width: 46,
    height: 46,
    borderRadius: 30,
    marginRight: 12,
  },
  userInfoText: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 8,
    fontWeight: '600',
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
    fontSize: 10,
    fontWeight: '600',
    flex: 1,
    marginLeft: 10,
  },
});

export default SettingScreen;
