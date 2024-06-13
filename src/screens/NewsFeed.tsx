import React from 'react';
import { Text, Dimensions, StyleSheet, View, TouchableOpacity, Linking, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome6';

const formatDate = (para: any) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const date = new Date(para);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    return `${day} ${month} '${year}`;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NewsFeedScreen = ({ route, navigation }: any) => {
    const { index, news } = route.params;

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.buttonContainer}
                onPress={goBack}>
                <>
                    <Icon name="chevron-left" size={20} color={'#FFF'} />
                    {/* <Text style={styles.buttonText}>
                                Discovery
                            </Text> */}
                </>
            </TouchableOpacity>
            {/* <SwiperFlatList
                index={index}
                data={news}
                horizontal={false}
                renderItem={({ item }) => (
                    <View style={styles.child}>
                        <Image
                            source={{ uri: item.article_lead_image_url }}
                            style={styles.image}
                        />
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={() => Linking.openURL(item.article_url)}>
                                <Text style={styles.title}>
                                    {item.article_title}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.infoContainer}>
                                <Text style={styles.source}>
                                    by {item.article_source}
                                </Text>
                                <Text style={styles.date}>
                                    {formatDate(item.article_date_published)}
                                </Text>
                            </View>
                            <Text style={styles.summary}>
                                {item.article_summary} ...
                            </Text>
                        </View>
                    </View>
                )}
            /> */}
            <Swiper
                index={index}
                showsButtons={false}
                horizontal={false}
                showsPagination={false}
                loop={false}>
                {news.map((item: any, index: number) => (
                    <View style={styles.child} key={index}>
                        <Image
                            source={{ uri: item.article_lead_image_url }}
                            style={styles.image}
                        />
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={() => Linking.openURL(item.article_url)}>
                                <Text style={styles.title}>
                                    {item.article_title}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.infoContainer}>
                                <Text style={styles.source}>
                                    by {item.article_source}
                                </Text>
                                <Text style={styles.date}>
                                    {formatDate(item.article_date_published)}
                                </Text>
                            </View>
                            <Text style={styles.summary}>
                                {item.article_summary} ...
                            </Text>
                        </View>
                    </View>
                ))}
            </Swiper>
        </View>
    )
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    child: { width: windowWidth, height: windowHeight, },
    text: { fontSize: windowWidth * 0.5, textAlign: 'center', color: 'black' },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 100,
        position: 'absolute',
        zIndex: 100,
        top: 4,
        left: 4,
        minWidth: 40,
    },
    buttonText: {
        fontSize: 18,
        color: '#FAFAFA',
        fontWeight: '600',
        fontFamily: "Inter-SemiBold",
    },
    image: {
        height: '35%',
        resizeMode: 'cover',
        width: windowWidth - 32,
        margin: 16,
        borderRadius: 8,
        backgroundColor: 'blue'
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        color: 'black',
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'Inter-Bold',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    source: {
        color: '#334155',
        opacity: 0.8,
        fontFamily: 'Inter-Medium',
    },
    date: {
        color: '#334155',
        opacity: 0.8,
        fontFamily: 'Inter-Medium',
    },
    summary: {
        color: '#334155',
        opacity: 0.8,
        fontSize: 16,
        lineHeight: 24,
        marginTop: 16,
        fontFamily: 'Inter-Medium',
    },
});

export default NewsFeedScreen;

