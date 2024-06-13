import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "./ThemeContext";
import { topics } from "../utils/constants";
import CategoryCard from "./CategoryCard";
import { FlatList } from "react-native-gesture-handler";
import NewsSummaryCard from "./NewsSummaryCard";
import { useState } from "react";

const highlights = [
    {
        article_lead_image_url: 'https://example.com/image1.jpg',
        article_url: 'https://example.com/article1',
        article_title: 'Article Title 1',
        article_source: 'Source 1',
        article_date_published: '2024-06-01',
        article_summary: 'This is the summary of article 1.',
    },
    {
        article_lead_image_url: 'https://example.com/image2.jpg',
        article_url: 'https://example.com/article2',
        article_title: 'Article Title 2',
        article_source: 'Source 2',
        article_date_published: '2024-06-02',
        article_summary: 'This is the summary of article 2.',
    },
    {
        article_lead_image_url: 'https://example.com/image3.jpg',
        article_url: 'https://example.com/article3',
        article_title: 'Article Title 3',
        article_source: 'Source 3',
        article_date_published: '2024-06-03',
        article_summary: 'This is the summary of article 3.',
    },
];

const Topics = () => {
    const { isDarkMode } = useTheme();
    const [topic, setTopic] = useState("Finance");

    return (
        <View style={[styles.container, isDarkMode ? styles.darkModeContainer : styles.lightModeContainer]}>
            <Text style={[styles.subHeading, isDarkMode ? styles.darkModeText : styles.lightModeText]}>Topics</Text>
            <View>
                <FlatList
                    data={topics}
                    renderItem={({ item }) => <CategoryCard item={item} topic={topic} setTopic={setTopic} />}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                />
            </View>
            <View>
                {highlights.map((news, index) => (
                    <NewsSummaryCard key={index} news={news} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    darkModeContainer: {
        backgroundColor: '#000',
    },
    lightModeContainer: {
        backgroundColor: '#fff',
    },
    subHeading: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: "Inter-Bold"
    },
    darkModeText: {
        color: '#fff',
    },
    lightModeText: {
        color: '#000',
    },
    categoryList: {
        alignItems: 'center',
    },
})

export default Topics;