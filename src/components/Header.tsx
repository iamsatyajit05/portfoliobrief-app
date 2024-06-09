import { View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';

const Header = (props: { name: string, search?: boolean }) => {
    const { isDarkMode } = useTheme();

    return (
        <View style={[styles.container]}>
            <Text style={[styles.text, isDarkMode ? styles.darkModeText : styles.lightModeText]}>
                {props.name}
            </Text>
            {props.search && <View>
                <Ionicons name="search" size={20} color={isDarkMode ? 'white' : '#666'} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        opacity: 0.8,
        fontSize: 20,
        fontFamily: 'Inter-Bold',
    },
    darkModeText: {
        color: '#fff',
    },
    lightModeText: {
        color: '#000',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        borderRadius: 16,
        paddingHorizontal: 10,
    },
});

export default Header;