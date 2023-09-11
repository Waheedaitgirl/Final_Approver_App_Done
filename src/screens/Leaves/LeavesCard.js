import React, {memo} from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { scale } from "react-native-size-matters"
import { colors, fonts } from "../../constants/theme"
import { AppScreenWidth } from "../../constants/sacling"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import moment from "moment"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const LeaveCard = memo(({item,onPress}) => {
      return(
        <View 
          
            style={styles.mainView}>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <MaterialIcons  size={scale(20)} name={"policy"} color={colors.dark_primary_color} />
                </View>
                <Text style={styles.textStyle}>{item.policy_name}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <FontAwesome  size={scale(20)} name={"users"} color={colors.dark_primary_color} />
                </View>
                <Text style={styles.textStyle}>{item.candidate_name}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Entypo size={scale(20)} name={"calendar"} color={colors.dark_primary_color} />
                </View>
                <Text style={styles.textStyle}>{moment(item.requested_date).format("DD-MMM-YYYY HH:mm A")}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                <Entypo size={scale(20)} name={"time-slot"} color={colors.dark_primary_color} />
                </View>
                <Text style={styles.textStyle}>{item?.requested_hours} Hours</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                    <Entypo size={scale(20)} name={"calendar"} color={colors.dark_primary_color} />
                </View>
                <Text style={styles.textStyle}>{moment(item.start_date).format("DD-MMM-YYYY")} - {moment(item.end_date).format("DD-MMM-YYYY")}</Text>
            </View>
            <View   
                style={styles.btnView}>
                <View style={{width:scale(20), height:scale(20)}} >
                <MaterialCommunityIcons 
                        name="lightning-bolt" 
                        color={colors.dark_primary_color} 
                        size={scale(18)} 
                    />
                </View>
                <Text 
                    style={{
                        ...styles.textStyle, 
                        color:item.status === "0" ? "#000" : item.status === "1" ? "#ffff" : item.status === "2" ? "#fff":"#fff", 
                        backgroundColor:item.status === "0" ? "#0002" : item.status === "1" ? "green" : item.status === "2" ? colors.delete_icon:colors.delete_icon, 
                        paddingHorizontal:scale(10), 
                        paddingVertical:scale(2), 
                        borderRadius:scale(5) }}>
                            {item.status === "0" ? "Pending" : item.status ==="1" ? "Approved" : item.status === "2" ? "Declined":"Declined"}
                </Text>
            </View>
            
        </View>
    )
})

export default LeaveCard

const styles = StyleSheet.create({
    mainView:{
        width:AppScreenWidth, 
        alignSelf:"center",
        elevation:2,
        marginHorizontal:scale(5),
        backgroundColor:"#fefefe",
        marginVertical:scale(5),
        padding:scale(10),
        borderRadius:scale(10)
    },
    btnView: {
      
        marginBottom:scale(12),
        flexDirection: 'row',
        alignItems:"center"
    },
    textStyle: {
        marginLeft:scale(10), 
        fontFamily:fonts.Medium,
        color: colors.text_primary_color
    },
})