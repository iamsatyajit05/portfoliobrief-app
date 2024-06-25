import React, { useState, useEffect, useRef } from 'react';
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
};

const getDomainName = (url: string) => {
  const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
  const matches = url.match(domainRegex);
  return matches ? matches[1].split('.')[0] : '';
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface NewsItem {
  title: string;
  articleUrl: string;
  imageUrl: string;
  publishTime: string;
  summary: string;
}

interface Props {
  route: {
    params: {
      index: number;
      news: NewsItem[];
    };
  };
  navigation: any; // Adjust the type based on your navigation setup
}

const NewsFeedScreen: React.FC<Props> = ({ route, navigation }) => {
  const { index, news: initialNews } = route.params;
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true); // Loading state
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [summaryFontSize, setSummaryFontSize] = useState(16); // Initial font size
  const summaryRef = useRef<Text>(null);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  // Effect to measure summary text size and adjust font size dynamically
  useEffect(() => {
    const measureSummaryText = () => {
      if (summaryRef.current) {
        summaryRef.current.measure((_fx, _fy, width, _height) => {
          if (width > windowWidth - 32) {
            // If summary text width exceeds available width, decrease font size
            setSummaryFontSize(summaryFontSize - 1);
          } else if (summaryFontSize < 16) {
            // If there is space and font size is less than default, increase font size
            setSummaryFontSize(summaryFontSize + 1);
          }
        });
      }
    };

    // Call measure function on component mount and whenever summaryFontSize changes
    measureSummaryText();

    // Cleanup function to clear event listeners
    return () => {};
  }, [summaryFontSize]);

  if (loading) {
    // Skeleton loading UI
    return (
      <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.buttonContainer}
          onPress={goBack}>
          <Icon name="chevron-left" size={20} color={'#FFF'} />
        </TouchableOpacity>

        <Swiper
          index={index} // Ensure the initial index is correctly set
          showsButtons={false}
          horizontal={false}
          showsPagination={false}
          loop={false}
        >
          {initialNews.map((item, idx) => (
            <View key={idx} style={styles.child}>
              <View style={[styles.image, { backgroundColor: '#ccc' }]} />
              <View style={styles.contentContainer}>
                <View style={[styles.titleContainer, { backgroundColor: '#ccc', height: 20 }]} />
                <View style={styles.infoContainer}>
                  <View style={[styles.source, { backgroundColor: '#ccc', height: 16, width: '50%' }]} />
                  <View style={[styles.date, { backgroundColor: '#ccc', height: 16, width: '30%' }]} />
                </View>
                <View style={styles.summaryContainer}>
                  <View style={[styles.summaryText, { backgroundColor: '#ccc', height: 24 }]} />
                  <View style={[styles.summaryText, { backgroundColor: '#ccc', height: 24 }]} />
                  <View style={[styles.summaryText, { backgroundColor: '#ccc', height: 24 }]} />
                </View>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    );
  }

  // Actual news feed UI
  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.buttonContainer}
        onPress={goBack}>
        <Icon name="chevron-left" size={20} color={'#FFF'} />
      </TouchableOpacity>

      <Swiper
        index={index} // Ensure the initial index is correctly set
        showsButtons={false}
        horizontal={false}
        showsPagination={false}
        loop={false}
      >
        {news.map((item, idx) => (
          <View key={idx} style={styles.child}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
            />
            <View style={styles.contentContainer}>
              <TouchableOpacity onPress={() => Linking.openURL(item.articleUrl)}>
                <Text style={[styles.title, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{item.title}</Text>
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                <Text style={[styles.source, isDarkMode ? styles.darkModeText : styles.lightModeText]}>
                  by {getDomainName(item.articleUrl)}
                </Text>
                <Text style={[styles.date, isDarkMode ? styles.darkModeText : styles.lightModeText]}>
                  {formatDate(item.publishTime)}
                </Text>
              </View>
              <View style={styles.summaryContainer}>
                <Text
                  ref={summaryRef}
                  style={[styles.summaryText, isDarkMode ? styles.darkModeText : styles.lightModeText, { fontSize: summaryFontSize }]}
                >
                  {item.summary}
                </Text>
              </View>
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
    height: windowHeight * 0.35,
    resizeMode: 'cover',
    width: windowWidth - 32,
    margin: 16,
    borderRadius: 8,
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    backgroundColor: '#ccc',
    height: 20,
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
  summaryContainer: {
    marginTop: 16,
  },
  summaryText: {
    color: '#334155',
    opacity: 0.8,
    lineHeight: 24,
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
