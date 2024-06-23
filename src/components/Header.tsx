import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';

const Header = (props: { name: string, search?: boolean, onPressSearch?: () => void }) => {
    const { isDarkMode } = useTheme();

    return (
        <View style={[styles.container]}>
            <Text style={[styles.text, isDarkMode ? styles.darkModeText : styles.lightModeText]}>
                {props.name}
            </Text>
            {props.search && (
                <TouchableOpacity onPress={props.onPressSearch}>
                    <Ionicons name="search" size={20} color={isDarkMode ? 'white' : '#666'} />
                </TouchableOpacity>
            )}
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
