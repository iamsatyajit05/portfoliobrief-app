import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckConnection } from '../utils/connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import ButtonComponent from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GOOGLE_WEB_CLIENT_ID, colors } from '../utils/constants';
import NetworkError from '../components/NetworkError';
import { saveUserDB } from '../constants/api';

import { useTheme } from '../components/ThemeContext';

type IntroScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'OnBoardingScreen'>;

type Props = {
  navigation: IntroScreen2NavigationProp;
};

const IntroScreen2: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  const networkInformation = CheckConnection();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    checkLoginStatus();
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userIsLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      console.log(userIsLoggedIn);

      if (userIsLoggedIn) {
        navigation.navigate('AppNavigator');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppNavigator' }],
        });
        setShowLoginBtn(false);
      } else {
        setShowLoginBtn(true);
      }
    } catch (error) { }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      await AsyncStorage.setItem('userLoggedIn', 'true');
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userInfo = await auth().signInWithCredential(googleCredential);

      const saveuser = await saveUserDB(userInfo);
      console.log(saveuser)
      navigation.navigate('AppNavigator');
      navigation.reset({
        index: 0,
        routes: [{ name: 'AppNavigator' }],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={isDarkMode ? "black" : "white"} />
      <View style={styles.mainView}>
        <View style={styles.centeredView}>
          <View style={styles.paddingView}>
            <Text style={styles.titleText}>
              Stay Informed
            </Text>
            <Text style={styles.subtitleText}>
              AI analyzes. You stay ahead. News made efficient.
            </Text>
          </View>
          <View style={styles.lottieView}>
            <Image
              style={styles.lottieAnimation}
              source={require('../assets/onboarding.png')}
            />
          </View>
        </View>
        <View style={[styles.footerView, !showLoginBtn && styles.centeredFooterView]}>
          {showLoginBtn ? (
            <>
              <ButtonComponent
                radius={100}
                title={'Login With Google'}
                isLoading={loading}
                iconComponent={<Icon name="google" size={20} color={'#FFF'} />}
                onBtnPress={googleLogin}
                isDisabled={!networkInformation || loading}
                bgColor={colors.primary}
              />
              <View style={styles.policyView}>
                <TouchableOpacity
                  disabled={!networkInformation}
                  onPress={() => Linking.openURL('https://portfoliobrief-frontend.vercel.app/privacypolicy')}
                >
                  <Text style={styles.policyText}>
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
                <Text style={styles.separatorText}> • </Text>
                <TouchableOpacity
                  disabled={!networkInformation}
                  onPress={() => Linking.openURL('https://portfoliobrief-frontend.vercel.app/termsnconditions')}
                >
                  <Text style={styles.policyText}>
                    Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <LottieView
              style={styles.loadingBar}
              source={require('../assets/loadingbars.json')}
              autoPlay
              loop
            />
          )}
        </View>
      </View>
      {!networkInformation && <NetworkError />}
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  paddingView: {
    padding: 16,
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
    color: '#282828',
    fontFamily: 'Inter-Bold'
  },
  subtitleText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#282828',
    marginTop: 12,
    marginBottom: 20,
    fontFamily: 'Inter-SemiBold'
  },
  lottieView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    // height: 200,
  },
  footerView: {
    height: 96,
    marginBottom: 24,
    padding: 16,
    width: '100%',
  },
  centeredFooterView: {
    alignItems: 'center',
  },
  policyView: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    opacity: 0.7,
    fontFamily: 'Inter-SemiBold'
  },
  separatorText: {
    color: 'black',
    opacity: 0.7,
    fontSize: 12,
  },
  loadingBar: {
    width: 240,
    height: 40,
  },
});

export default IntroScreen2;
