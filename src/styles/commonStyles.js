import React from "react";
import { StyleSheet,Platform } from "react-native";
import {verticalScale } from "react-native-size-matters";
import { width } from "../constants/sacling";
import { colors } from "../constants/theme";
export const commonStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignSelf:"center",
        alignItems:"center"
    },
    headerMianView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:"flex-end",
        width:width,
        position: 'relative',
        height:Platform.OS === "android"?verticalScale(40):verticalScale(40),
        backgroundColor:colors.dark_primary_color,
        paddingVertical: verticalScale(10),
    },
    hedaerWithIcons:{
        flexDirection: 'row',
        justifyContent:'space-between' ,  
        alignItems:"flex-end",
        width:width,
        position: 'relative',
        height:Platform.OS === "android"?verticalScale(40):verticalScale(40),
        backgroundColor:colors.dark_primary_color,
        paddingBottom: verticalScale(5),
    }
})