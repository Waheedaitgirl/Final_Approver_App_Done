import React, { useState } from "react";
import {View,Text,TouchableOpacity, StyleSheet} from 'react-native'
import { scale, verticalScale } from "react-native-size-matters";
import { width } from "../constants/sacling";
import { colors, fonts } from "../constants/theme";
import Animated, {
   LightSpeedInRight, LightSpeedOutLeft, FadeOutDown, FadeInUp, FadeInDown
  } from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo'
import { textStyles } from "../styles/textStyles";
import DocumentPicker from 'react-native-document-picker'
const PickerInput = ({value,placeholder,errorMessage,onChangeText}) => {
    const pickDocument  = async () => {
        try {
          const pickerResult = await DocumentPicker.pickSingle({
            presentationStyle: 'fullScreen',
            copyTo: 'cachesDirectory',
          })
          onChangeText(pickerResult.fileCopyUri)
        } catch (e) {
          
        }
      }
    return (
        <View style={styles.main} >
            { 
                value !== "" && 
                <Animated.Text 
                    entering={FadeInDown} 
                    exiting={FadeOutDown}
                  
                    style={textStyles.Label}>
                        {placeholder}
                </Animated.Text>
            }
            <View>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                    style={styles.Text}
                >
                    {value !== ""?value:placeholder}
                </Text>
                <TouchableOpacity 
                        onPress={() => pickDocument("aja")}
                        style={styles.RigtIcon} >
                        <Entypo name={"attachment"} size={scale(16)} color={colors.text_primary_color}  />
                </TouchableOpacity>
            </View>
           
            { 
                errorMessage !== "" && 
                <Animated.Text 
                    entering={LightSpeedInRight} 
                    exiting={LightSpeedOutLeft}
                    style={textStyles.errorText}>
                        {errorMessage}
                </Animated.Text>
            }
        </View>
    )
};

export default PickerInput
const styles = StyleSheet.create({
    main:{ 
        width:width-scale(20),
        justifyContent:"center",  
        minHeight:verticalScale(50),
        paddingVertical:scale(5), 
        marginVertical:scale(0)
    },
    Text:{
        backgroundColor:"#fff", 
        marginVertical:verticalScale(5),
        width:width-scale(20), 
        borderColor:colors.divide_color,
        borderBottomWidth:1,
        paddingRight:scale(45),
        textAlignVertical:"center",
        height:verticalScale(40),
        fontFamily:fonts.Medium,
        paddingHorizontal:scale(10),
        color:colors.text_primary_color
    },
    RigtIcon:{
        position:"absolute", 
        width:scale(30), 
        marginVertical:verticalScale(5),
        right:0,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        backgroundColor:"rgba(0,0,0,0)",
        height:verticalScale(40),
        justifyContent:"center",
        alignItems:"center"
    }
})
