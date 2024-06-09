import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StyleSheet } from "react-native";

interface buttonProps {
    title?: string;
    bgColor?: string;
    height?: number;
    borderColor?: string;
    radius?: number;
    fullWidth?: boolean;
    onBtnPress: any;
    underline?: boolean;
    iconComponent?: any;
    onlyIcon?: boolean;
    onlyLoading?: boolean;
    isLoading?: boolean;
    children?: any;
    orderReverse?: boolean;
    containerStyle?: any;
    fontStyle?: any;
    isDisabled?: boolean;
}

const ButtonComponent = (props: buttonProps) => {
    const style = StyleSheet.create({
        container: {
            alignItems: props.fullWidth == false ? 'center' : undefined
        },
        buttonContainer: {
            minHeight: props.height ? props.height : 48,
            flexDirection: props.orderReverse == true ? 'row-reverse' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            backgroundColor: props.bgColor ? props.bgColor : '#18181B',
            borderColor: props.borderColor ? props.borderColor : undefined,
            borderRadius: props.radius ? props.radius : 8,
            borderWidth: props.borderColor ? 1 : 0,
            paddingHorizontal: 16
        },
        buttonText: {
            fontSize: 18,
            color: '#FAFAFA',
            fontWeight: '600',
            borderBottomColor: props.underline ? '#FAFAFA' : undefined,
            borderBottomWidth: props.underline ? 1 : 0,
            fontFamily: "Inter-SemiBold",
        }
    })

    return (
        <View style={style.container}>
            <TouchableOpacity
                disabled={props.isDisabled}
                onPress={props.onBtnPress}
                activeOpacity={0.6}
                style={[style.buttonContainer, props.containerStyle]}>
                {/* Loading */}
                {props.isLoading && <ActivityIndicator size={22} color={'white'} />}

                {/* Children | Text | Icon */}
                {props.children
                    ? props.children
                    : !props.onlyLoading && (
                        <>
                            {!props.isLoading && props.iconComponent}
                            {!props.onlyIcon && (
                                <Text style={[style.buttonText, props.fontStyle]}>
                                    {props.title}
                                </Text>
                            )}
                        </>
                    )}
            </TouchableOpacity>
        </View>
    );
};

export default ButtonComponent;
