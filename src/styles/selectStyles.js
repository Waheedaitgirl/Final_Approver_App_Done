import React from "react";
import {Icon } from "native-base";
import {Platform} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { scale } from "react-native-size-matters";
import { colors } from "../constants/theme";
import { fonts } from "../constants/theme";
const selectStyles = {
    _item:{
        pt: Platform.OS === "android"?0:2,
        pb:Platform.OS === "android"?0:2,
        borderBottomWidth:1,
        justifyContent:"center",
        borderRadius:5,
        borderBottomColor:"rgba(0,0,0,.1)",
        _text:{
            includeFontPadding:false,
            textAlign:"center",
            fontFamily:fonts.Medium,
            color:colors.secondary_text_color
        }
    
    },
    _selectedItem:{
        bg:colors.dark_primary_color,
        justifyContent:"center",
        _text:{
            includeFontPadding:false,
            textAlign:"center",
            textAlignVertical:"center",
            fontFamily:fonts.Bold,
            color:"#fff"
        },
        endIcon: <Icon as={Entypo} name={"check"} size={scale(25)} color={colors.white}  />
    }
}

export default  selectStyles