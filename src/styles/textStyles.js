import React from "react";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { scale } from "react-native-size-matters";
import { colors, fonts } from "../constants/theme";
export const textStyles = StyleSheet.create({
    heading:{
        fontFamily:fonts.Bold,
        fontSize:RFValue(18),
        color:colors.text_primary_color,
        backgroundColor:"#0000",
    },
    mediumheading:{
        fontFamily:fonts.Medium,
        fontSize:RFValue(16),
        color:colors.text_primary_color,
        backgroundColor:"#0000",
    },
    smallheading:{
        fontFamily:fonts.Medium,
        fontSize:RFValue(14),
        color:colors.text_primary_color,
        backgroundColor:"#0000",
    },
    title:{
        fontFamily:fonts.Medium,
        fontSize:RFValue(12),
        color:"rgba(0,0,0,.8)",
        backgroundColor:"#0000",
    },
    paragraph:{
        fontFamily:fonts.Regular,
        fontSize:RFValue(14),
        color:colors.text_primary_color,
        backgroundColor:"#0000",
    },
    Label:{
        fontFamily:fonts.Medium,
        fontSize:RFValue(12),
        color:colors.text_primary_color,
        backgroundColor:"#0000",
    },
    small:{
        fontFamily:fonts.Light,
        fontSize:RFValue(12),
        color:colors.text_primary_color,
        backgroundColor:"#0000",
    },
    errorText:{
        fontFamily:fonts.Regular,
        fontSize:RFValue(12),
        color:colors.error_text,
        backgroundColor:"#0000",
    },
    disabletext:{
        fontFamily:fonts.Regular,
        fontSize:RFValue(12),
        textAlign:"center",
        color:"rgba(0,0,0,.2)",
        backgroundColor:"#0000",
    }
})