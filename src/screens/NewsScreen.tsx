import React, { useEffect, useState } from 'react';
import { View, Text ,StyleSheet, ScrollView, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import NetworkError from '../components/NetworkError';
import { CheckConnection } from '../utils/connection';
import NewsSummaryCard from '../components/NewsSummaryCard';
import NewsItemSkeleton from '../components/NewsItemSkeleton';
import { fetchNewsByStocks } from '../constants/api';
import auth from '@react-native-firebase/auth';

const NewsScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const networkInformation = CheckConnection();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchNews = async () => {
    try {
      const user = auth().currentUser;
      const googleId = user ? user.uid : '';
      const response = await fetchNewsByStocks(googleId, 1, 10);
      setNews(response);
    } catch (error) {
      console.error('Error fetching personalized news:', error);
    } finally {
      setLoading(false); // Set loading to false once data fetching completes
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(fetchNews, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const onNewsPress = (index: number) => {
    navigation.navigate('NewsFeedScreen', {
      index,
      news,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#fff'}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={isDarkMode ? ['#FFF'] : ['#6200EE']}
            progressBackgroundColor={isDarkMode ? '#000' : '#fff'}
          />
        }
      >
        {news.length > 0 ? (
          news.map((item, index) => (
            <NewsSummaryCard key={index} news={item} onPress={() => onNewsPress(index)} />
          ))
        ) : (
          <View>
            {Array.from({ length: 10 }, (_, index) => (
              <NewsItemSkeleton key={index} />
            ))}
          </View>
        )}
      </ScrollView>
      {!networkInformation && <NetworkError />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default NewsScreen;
