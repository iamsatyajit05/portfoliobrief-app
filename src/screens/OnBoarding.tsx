import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { CheckConnection } from '../utils/connection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/app';
import LottieView from 'lottie-react-native';
import ButtonComponent from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GOOGLE_WEB_CLIENT_ID } from '../utils/constants';

type IntroScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'OnBoardingScreen'>;

type Props = {
  navigation: IntroScreen2NavigationProp;
};

const IntroScreen2: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  const networkInformation = CheckConnection();

  useEffect(() => {
    checkLoginStatus();
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userIsLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      if (userIsLoggedIn) {
        navigation.navigate('Home');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
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
      const ifUser = await firestore()
        .collection('users')
        .doc(userInfo.user.uid)
        .get();

      if (!ifUser._data) {
        await firestore()
          .collection('users')
          .doc(userInfo.user.uid)
          .set({
            user_id: userInfo.user.uid,
            user_email: userInfo.user.email,
            full_name: userInfo.user.displayName,
            phone_number: userInfo.user.phoneNumber,
            avatar_url: userInfo.user.photoURL,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            plan: 'free',
          })
          .then(() => {
            console.log('New User created!');
          })
          .catch(err => console.log(err));
        await firestore()
          .collection('history')
          .doc(userInfo.user.uid)
          .set({
            user_id: userInfo.user.uid,
            user_email: userInfo.user.email,
            recent_work: [],
            doc_created_at: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            console.log('New History created!');
            navigation.navigate('Home');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          })
          .catch(err => console.log(err));
      }
      navigation.navigate('Home');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainView}>
          <View style={styles.centeredView}>
            <View style={styles.paddingView}>
              <Text style={[styles.titleText, { fontFamily: 'Poppins-Bold' }]}>
                Stay Informed
              </Text>
              <Text style={[styles.subtitleText, { fontFamily: 'Poppins-SemiBold' }]}>
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
                />
                <View style={styles.policyView}>
                  <TouchableOpacity
                    disabled={!networkInformation}
                    onPress={() => Linking.openURL('https://portfoliobrief-frontend.vercel.app/privacypolicy')}
                  >
                    <Text style={[styles.policyText, { fontFamily: 'Poppins-SemiBold' }]}>
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.separatorText}> • </Text>
                  <TouchableOpacity
                    disabled={!networkInformation}
                    onPress={() => Linking.openURL('https://portfoliobrief-frontend.vercel.app/termsnconditions')}
                  >
                    <Text style={[styles.policyText, { fontFamily: 'Poppins-SemiBold' }]}>
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
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
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
    width: 288,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#282828',
    marginTop: 12,
    marginBottom: 20,
  },
  lottieView: {
    height: 240,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.5 }],
  },
  lottieAnimation: {
    height: '100%',
    width: 320,
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
