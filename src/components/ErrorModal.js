import React, {Component} from 'react';
import {View, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import Modal from 'react-native-modal';
import { scale,verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/MaterialIcons'
import { AppScreenWidth } from '../constants/sacling';
import {colors, fonts} from '../constants/theme'
import { textStyles } from '../styles';
import Spacer from './Spacer';
const ErrorModal = ({isVisible, title="Some Error with your request", onClose}) => {
    return(
        <Modal
            style={styles.ModalView}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            backdropTransitionOutTiming={0}
            animationInTiming={500}
            backdropOpacity={.1}
            animationOutTiming={500}
            isVisible={isVisible}
            onBackdropPress={() => onClose()}>

            <View  style={styles.mainView}>
                <AntDesign name='error' size={scale(62)} color={colors.delete_icon} />
                <Spacer />
                <Text style={textStyles.smallheading}>{title}</Text>
                <Spacer />
                <View style={{flexDirection:"row", justifyContent:"space-evenly", width:AppScreenWidth}}>
                   
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={() => {
                            onClose()
                        }}>
                         <Text style={styles.whitetext}>
                            GO BACK
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
} 

export default ErrorModal

const styles = StyleSheet.create({
    ModalView:{
        justifyContent:"center",
        margin: 0,
        marginHorizontal:scale(10)
    },
    mainView:{
        justifyContent: 'center',
        backgroundColor:"#fff",
        alignItems:"center",
        elevation:10,
        padding: verticalScale(16),
        borderRadius: scale(5),
    },
    Button:{
        marginTop: verticalScale(8),
        marginBottom: verticalScale(16),
        borderRadius: scale(5),
        height: verticalScale(40),
        width:AppScreenWidth/1.3,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:colors.delete_icon,
    },
    whitetext:{
        paddingHorizontal: scale(20),
        color:colors.white,
        fontSize: scale(12),
        fontFamily:fonts.Medium,
    }
})