import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import NetworkError from '../components/NetworkError';
import { CheckConnection } from '../utils/connection';
import NewsSummaryCard from '../components/NewsSummaryCard';
import Topics from '../components/Topics';
import TopHighlightsSkeleton from '../components/TopHighlightsSkeleton';
import { fetchNews } from '../constants/api';

const HomeScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const networkInformation = CheckConnection();
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchNewsData = async () => {
    try {
      const response = await fetchNews();
      setHighlights(response.news);
    } catch (error) {
      console.log('Error fetching news:', error);
    } finally {
      setLoading(false); // Set loading to false once data fetching completes
    }
  };

  useEffect(() => {
    fetchNewsData();

    const interval = setInterval(fetchNewsData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNewsData();
    setRefreshing(false);
  };

  const onNewsPress = (index: number) => {
    navigation.navigate('NewsFeedScreen', {
      index,
      news: highlights
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
      <StatusBar
        animated={true}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#000" : "#fff"} />
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
        <Text style={[styles.subHeading, { color: isDarkMode ? '#fff' : '#000' }]}>Top Highlights</Text>

        {/* Render skeleton loading or actual data */}
        {loading ? (
          <View>
            <TopHighlightsSkeleton />
            <TopHighlightsSkeleton />
            <TopHighlightsSkeleton />
          </View>
        ) : (
          highlights.map((item, index) => (
            <NewsSummaryCard key={index} news={item} onPress={() => onNewsPress(index)} />
          ))
        )}

        <Topics navigation={navigation} />
      </ScrollView>
      {!networkInformation && <NetworkError />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
});

export default HomeScreen;
