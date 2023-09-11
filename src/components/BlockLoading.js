import React from "react";
import { View,ActivityIndicator,Text, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { textStyles } from "../styles";
const BlockLoading = () => {
    return(
        <View 
            style={styles.main} 
            pointerEvents={'none'}>
                <View style={styles.bg}>
                    <ActivityIndicator color={"#fff"} size={"large"} />
                    <Text style={{...textStyles.smallheading,marginTop:10, color:"#fff"}} >Loading</Text>
                </View>
        </View>
    )
}

export default BlockLoading

const styles = StyleSheet.create({
    main:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems:"center",
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.05)'
    },
    bg:{
        backgroundColor:"rgba(0,0,0,.8)",
        borderRadius:scale(10), 
        padding:scale(40)
    }
})