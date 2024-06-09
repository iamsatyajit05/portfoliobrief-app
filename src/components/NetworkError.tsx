import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

const NetworkError = () => {
    const [modalVisible, setModalVisible] = useState(true);

    setTimeout(() => setModalVisible(false), 3000);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Please Check Your Internet!</Text>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 40,
        left: 16,
        right: 16,
        backgroundColor: '#b91c1c',
        padding: 24,
        borderRadius: 16,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    modalText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Inter-Medium',
    },
});


export default NetworkError;