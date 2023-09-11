import React from "react";
import {View, StyleSheet, Text ,ActivityIndicator, TouchableOpacity} from 'react-native'
import { scale, verticalScale } from "react-native-size-matters";
import { AppScreenWidth, width } from "../constants/sacling";
import {colors, fonts} from '../constants/theme'
const CustomButton = ({onPress,width=AppScreenWidth, loading ,backgroundColor= colors.dark_primary_color, text, loadingText}) => {
    return(
    <TouchableOpacity
        style={{
        ...styles.button,
        width:width,
        backgroundColor:backgroundColor
    }}
        onPress={onPress}
        disabled={loading}
    >   
        {
            loading
            ?
                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}} >
                    <ActivityIndicator 
                        style={{
                            marginRight:scale(10)
                        }} 
                        color={colors.white}
                    />
                    <Text style={{...styles.text}}>
                        {loadingText}
                    </Text>
                </View>
            :
                <Text style={{...styles.text}} >
                    {text}
                </Text>
        }
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:colors.dark_primary_color,
        width:width-scale(20),
        height:verticalScale(42),
        borderRadius:scale(25),
        borderWidth:0,
        borderColor:colors.dark_primary_color,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:colors.white,
        fontSize:scale(14),
        fontFamily:fonts.Medium
    }
})

export default CustomButton