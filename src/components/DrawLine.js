import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import { width as FullWidth } from "../constants/sacling";
const DrawLine = ({width =  FullWidth-scale(20),marginTop=scale(0), height=scale(1) , backgroundColor="rgba(0,0,0,.2)" }) => {
    return(
        <View style={{height:height , marginTop:marginTop, width:width ,backgroundColor:backgroundColor}} />
    )
}
export default DrawLine