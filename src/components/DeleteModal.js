import React, {Component} from 'react';
import {View, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import Modal from 'react-native-modal';
import { scale,verticalScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather'
import { AppScreenWidth } from '../constants/sacling';
import {colors, fonts} from '../constants/theme'
import { textStyles } from '../styles';
import Spacer from './Spacer';
const DeleteModal = ({isVisible, onCancel , onDelete}) => {
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
            onBackdropPress={() => onCancel()}>

            <View  style={styles.mainView}>
                <Feather name='alert-circle' size={scale(62)} color={colors.delete_icon} />
                <Spacer />
                <Text style={textStyles.smallheading}>Are you sure to delete?</Text>
                <Spacer />
                <View style={{flexDirection:"row", justifyContent:"space-evenly", width:AppScreenWidth}}>
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={() => { onCancel("Cancel") }}>
                        <Text style={styles.whitetext}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{...styles.Button, backgroundColor:colors.delete_icon}}
                        onPress={() => {
                            onDelete()
                        }}>
                         <Text style={styles.whitetext}>
                            DELETE
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
} 

export default DeleteModal

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
        width:AppScreenWidth/2.5,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:colors.dark_primary_color,
    },
    whitetext:{
        paddingHorizontal: scale(20),
        color:colors.white,
        fontSize: scale(12),
        fontFamily:fonts.Medium,
    }
})