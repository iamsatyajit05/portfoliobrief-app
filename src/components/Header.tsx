import { View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return (
        <View>
            <Text style={styles.text}>
                {props.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        opacity: 0.8,
        fontSize: 20,
        fontFamily: 'Inter-Bold',
    },
});

export default Header;