import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Swiper from 'react-native-swiper';
import { useTheme } from '../components/ThemeContext';

const formatDate = (dateString: string) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} '${year}`;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewsFeedScreen = ({ route, navigation }: any) => {
  const { index, news } = route.params;
  const { isDarkMode } = useTheme();

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.buttonContainer}
        onPress={goBack}>
        <Icon name="chevron-left" size={20} color={'#FFF'} />
      </TouchableOpacity>

      <Swiper
        index={index}
        showsButtons={false}
        horizontal={false}
        showsPagination={false}
        loop={false}
      >
        {news.map((item: any, idx: number) => (
          <View style={styles.child} key={idx}>
            <Image
              source={{ uri: item.imageUrl }} // Assuming 'imageUrl' is the correct field for the article image URL
              style={styles.image}
            />
            <View style={styles.contentContainer}>
              <TouchableOpacity onPress={() => Linking.openURL(item.articleUrl)}>
                <Text style={[styles.title, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.title}</Text>
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                <Text style={[styles.source, isDarkMode ? styles.darkModeText : styles.lightModeText]}>by {item.source}</Text>
                <Text style={[styles.date, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{formatDate(item.publishTime)}</Text>
              </View>
              <Text style={[styles.summary, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.summary} ...</Text>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  child: { width: windowWidth, height: windowHeight },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 100,
    position: 'absolute',
    zIndex: 100,
    top: 4,
    left: 4,
    minWidth: 40,
  },
  image: {
    height: '35%',
    resizeMode: 'cover',
    width: windowWidth - 32,
    margin: 16,
    borderRadius: 8,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    color: 'black',
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Inter-Bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  source: {
    color: '#334155',
    opacity: 0.8,
    fontFamily: 'Inter-Medium',
  },
  date: {
    color: '#334155',
    opacity: 0.8,
    fontFamily: 'Inter-Medium',
  },
  summary: {
    color: '#334155',
    opacity: 0.8,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    fontFamily: 'Inter-Medium',
  },
  darkModeContainer: {
    backgroundColor: '#333',
  },
  lightModeContainer: {
    backgroundColor: '#fff',
  },
  darkModeText: {
    color: '#fff',
  },
  lightModeText: {
    color: '#000',
  },
});

export default NewsFeedScreen;
