import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "./ThemeContext";
import { topics } from "../utils/constants";
import CategoryCard from "./CategoryCard";
import { FlatList } from "react-native-gesture-handler";
import NewsSummaryCard from "./NewsSummaryCard";
import { useState } from "react";

const highlights = [
    { id: '1', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
    { id: '2', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
    { id: '3', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
    { id: '4', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
    { id: '5', title: 'Monarch population soars 4,900 percent', category: 'World in focus', date: '07/05/2024', image: 'https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg', url: 'https://example.com/monarch-population' },
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
        paddingHorizontal: 16,
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