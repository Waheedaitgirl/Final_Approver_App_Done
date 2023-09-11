import React, { useState } from "react";
import { View,TextInput,Text,ScrollView,FlatList, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { AppScreenWidth } from "../../constants/sacling";
import { colors, fonts } from "../../constants/theme";
import { textStyles } from "../../styles/textStyles";
import TimeInput from "./TimeInput";
const WeeklySummary = ({logs,editable, time_types}) => {
  
    return(
        <View style={styles.mainview}>
          
            {
                logs.map((item, index) => {
                  
                    return(
                        <View key={`${index}`} >
                            <View style={styles.textbox}>
                                <Text style={styles.text}>{time_types[index]}</Text>
                            </View>
                            <FlatList 
                                data={item[1]}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item, index}) => {
                                    return(
                                    <TimeInput 
                                            item={item} 
                                            editable={editable} 
                                            index={index} 
                                           
                                        />
                                    )
                                }}
                            />
                        </View>
                    )
                })
            }
           
        </View>
    )
}
export default WeeklySummary

const styles = StyleSheet.create({
    text:{
        ...textStyles.smallheading,
        backgroundColor:"#0000",
    },
    textbox:{
                               
        maxWidth:scale(120), 
        marginTop:scale(5),
        backgroundColor:colors.divide_color, 
        borderWidth:0, 
        borderRadius:scale(5),
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:scale(5)
    },
    textinput:{
        backgroundColor:"rgba(0,0,0,.1)",
        paddingTop:0,
        paddingBottom:0, 
        marginTop:scale(5),
        textAlign:"center",
        height:scale(30),
        fontFamily:fonts.Regular,
        borderRadius:5,
    },
    mainview:{
        width:AppScreenWidth-scale(10),
        paddingVertical:scale(10),
        alignSelf:"center",
    }
})