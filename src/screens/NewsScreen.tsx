import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
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
  const [page, setPage] = useState<number>(1);

  const fetchNews = async (isRefresh: boolean = false, firstTime: boolean = false) => {
    console.log(page, isRefresh);

    try {
      const user = auth().currentUser;
      const googleId = user ? user.uid : '';
      if (isRefresh) {
        setPage(1);
        const response = await fetchNewsByStocks(googleId, 1, 10);
        setNews(response);
      } else {
        const response = await fetchNewsByStocks(googleId, firstTime ? 1 : page + 1, 10);
        setPage(page + 1);
        if (isRefresh || firstTime) {
          setNews(response);
        } else {
          setNews([...news, ...response]);
        }
      }

    } catch (error) {
      console.log('Error fetching personalized news:', JSON.stringify(error));
    } finally {
      setLoading(false); // Set loading to false once data fetching completes
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews(false, true);

    const interval = setInterval(fetchNews, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    let mHeight = layoutMeasurement.height;
    let cSize = contentSize.height;
    let Y = contentOffset.y;

    if (Math.ceil(mHeight + Y) >= cSize) return true;
    return false;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews(true);
    setRefreshing(false);
  };

  const onNewsPress = (index: number) => {
    navigation.navigate('NewsFeedScreen', {
      index,
      news,
      fetchNews
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
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            fetchNews();
          } else {
            console.log('Not close to bottom');

          }
        }}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={isDarkMode ? ['#FFF'] : ['#6200EE']}
            progressBackgroundColor={isDarkMode ? '#000' : '#fff'}
          />
        }
      >
        {loading ? (
          // Skeleton loading
          Array.from({ length: 5 }, (_, index) => (
            <NewsItemSkeleton key={index} />
          ))
        ) : news.length > 0 ? (
          // Render news items
          news.map((item, index) => (
            <NewsSummaryCard key={index} news={item} onPress={() => onNewsPress(index)} />
          ))
        ) : (
          // No news found message
          <View style={styles.noNewsContainer}>
            <Text style={styles.noNewsText}>No news found. Please select stocks to have personalized feed.</Text>
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
  noNewsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noNewsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

export default NewsScreen;
