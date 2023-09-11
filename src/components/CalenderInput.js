import React, { useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { scale, verticalScale } from "react-native-size-matters";
import { AppScreenWidth, width } from "../constants/sacling";
import { colors, fonts } from "../constants/theme";
import Animated, {
   LightSpeedInRight, LightSpeedOutLeft, FadeOutDown, FadeInDown
  } from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { textStyles } from "../styles/textStyles";


FontAwesome.loadFont();

const CalenderInput = ({value,w=width-scale(20),show_label = true, hght=verticalScale(50), placeholder,errorMessage,labelColor=colors.text_primary_color,onChangeText}) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const getCurrentDate = (v)=>{
        var date = new Date(v).getDate();
        var month = new Date(v).getMonth() + 1;
        var year = new Date(v).getFullYear();
        return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
  }
    return (
        <View style={{...styles.mainView,width:w,height:hght}} >
            { 
                value !== "" && show_label &&  
                <Animated.Text 
                    entering={FadeInDown} 
                    exiting={FadeOutDown}
                  
                    style={{...textStyles.Label,color:labelColor}}>
                        {placeholder}
                </Animated.Text>
            }
            <View 
                style={{
                    flexDirection:"row", 
                    width:w-scale(20), 
                    alignItems:"center",
                    justifyContent:"space-between",
                    backgroundColor:"rgba(0,0,0,0)"
                }} > 
                { 
                    value === "" 
                    ?  
                        <Text
                            style={{...textStyles.smallheading,fontSize:scale(13), color:labelColor}}>
                            {placeholder}
                        </Text>  
                    :  
                        <Text
                            style={textStyles.smallheading}>
                            {getCurrentDate(value)}
                        </Text> 
                } 
                       
                <TouchableOpacity 
                    onPress={() => setOpen(true)}
                    style={{ 
                        width:scale(30), 
                    
                        alignSelf:"flex-end",
                        borderTopRightRadius:5,
                        borderBottomRightRadius:5,
                        backgroundColor:"rgba(0,0,0,0)",
                        height:verticalScale(25),
                        justifyContent:"center",
                        alignItems:"center"
                    }} >
                    <FontAwesome name={"calendar"} size={scale(16)} color={colors.dark_primary_color}  />
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
            <DatePicker
                modal
                androidVariant={"nativeAndroid"}
                open={open}
                date={date}
                mode={"date"}
                onConfirm={(date) => {
                setOpen(false)
                onChangeText(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
        </View>
    )
};

export default CalenderInput

const styles = StyleSheet.create({
        mainView:{
        paddingHorizontal:scale(10),
        paddingVertical:scale(1),
        width:width-scale(20),
        borderRadius:3,
        borderWidth:1,
        borderColor:"rgba(0,0,0,.1)",
        justifyContent:"center",  
        minHeight:verticalScale(30),
        backgroundColor:"#fff",
        marginTop:scale(5),
    }
})