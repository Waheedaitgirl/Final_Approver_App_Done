import React from 'react';
import { View,Text} from 'react-native';
import { commonStyles,textStyles } from '../../styles';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import { scale } from 'react-native-size-matters';
    const EditProfileScreen = ({navigation}) => {
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    isdrawer={false}
                    onPress={() => navigation.goBack()}
                    title={"Edit Profile"}
                />
                <View style={{height:scale(280)}} />
               
                <Text style={textStyles.heading} >Comming Soon</Text>
                <View style={{height:scale(20), position:"absolute", bottom:scale(50)}} >
                <CustomButton 
                    onPress={() => navigation.navigate.goBack()}
                    loading={false}
                    text={"Go back"}
                    loadingText={"Processing"}
                />
                </View>
            </View>
        );
    };


export default EditProfileScreen;
