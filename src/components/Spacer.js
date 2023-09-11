import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
const Spacer = ({height=scale(10)}) => {
    return(
        <View style={{height:height}} />
    )
}
export default Spacer