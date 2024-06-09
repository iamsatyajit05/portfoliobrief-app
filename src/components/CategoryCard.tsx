import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';

const CategoryCard = ({ item, topic, setTopic }) => {
    const [loading, setLoading] = useState(true);

    return (
        <TouchableHighlight style={{
            ...styles.container,
            borderWidth: item.title === topic ? 4 : 0,
            borderColor: item.title === topic ? "gray" : ""
        }} onPress={() => setTopic(item.title)}>
            <View>
                {loading && (
                    <View style={[styles.categoryImage, styles.loadingPlaceholder]}>
                        <Text style={styles.categoryText}>{item.title}</Text>
                    </View>
                )}
                <ImageBackground
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                    imageStyle={styles.categoryImageStyle}
                    onLoad={() => setLoading(false)}
                >
                    {!loading && (
                        <View style={styles.categoryTextContainer}>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </View>
                    )}
                </ImageBackground>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 6,
        alignItems: 'center',
        borderRadius: 12,
    },
    categoryImage: {
        width: 140,
        height: 80,
        justifyContent: 'flex-end',
    },
    categoryImageStyle: {
        borderRadius: 8,
    },
    categoryTextContainer: {
        borderRadius: 8,
        padding: 8
    },
    categoryText: {
        fontSize: 14,
        color: 'white',
        fontFamily: "Inter-Bold"
    },
    loadingPlaceholder: {
        position: 'absolute',
        backgroundColor: '#cccccc',
        justifyContent: 'flex-end',
        width: 140,
        height: 80,
        borderRadius: 8,
        padding: 8
    },
});

export default CategoryCard;
