import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTheme } from "./ThemeContext";

const NewsSummaryCard = ({ news, onPress }: any) => {
    const { isDarkMode } = useTheme();

    return (
        <TouchableOpacity style={isDarkMode ? styles.highlightDarkItem : styles.highlightLightItem} onPress={onPress}>
            <View style={styles.highlightTextContainer}>
                <Text style={[styles.highlightTitle, isDarkMode ? styles.darkModeText : styles.lightModeText]}>{news.article_title}</Text>
            </View>
            <Image source={{ uri: "https://cdn.pixabay.com/photo/2017/11/12/13/37/forest-2942477_1280.jpg" }} style={styles.highlightImage} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    highlightDarkItem: {
        flexDirection: 'row',
        marginTop: 8,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        backgroundColor: '#333',
        padding: 4
    },
    highlightLightItem: {
        flexDirection: 'row',
        marginTop: 8,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        backgroundColor: '#f9f9f9',
        padding: 4
    },
    highlightImage: {
        borderRadius: 6,
        width: 60,
        height: 60,
    },
    highlightTextContainer: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
    },
    highlightTitle: {
        fontSize: 14,
        fontFamily: "Inter-Medium"
    },
    highlightCategory: {
        fontSize: 6,
        color: '#666',
        marginBottom: 2,
    },
    highlightDate: {
        fontSize: 6,
        color: '#aaa',
    },

    darkModeText: {
        color: '#fff',
    },
    lightModeText: {
        color: '#000',
    }
})

export default NewsSummaryCard;