import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import Entypo from  'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors, fonts } from '../constants/theme';
import { scale } from 'react-native-size-matters';
import { commonStyles } from '../styles/commonStyles';
import { RFValue } from 'react-native-responsive-fontsize';
const CustomHeader = ({isdrawer, show_backButton,title,onPress,}) => {
    return (
      <View
        style={{
            ...commonStyles.headerMianView,
            justifyContent:show_backButton ? 'space-between' : 'center',   
          }}>
        {
            show_backButton && (
                <TouchableOpacity
                    style={{
                        marginLeft: 12,
                        shadowColor: '#fff',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    onPress={onPress}>
                    {
                        isdrawer 
                            ? 
                                <AntDesign color={colors.white} name="menu-fold"  size={RFValue(24)} />
                            : 

                                <Entypo color={"#fff"} name="chevron-thin-left" size={RFValue(24)}  />
                    }
                </TouchableOpacity>
            )
        }

        <Text
            style={{
                fontFamily:fonts.Medium,
                fontSize: RFValue(15),
                color: colors.white,
            }}>
          {title}
        </Text>

        {
            show_backButton && 
                <View style={{width: 36, height: 36}} />
        }

      </View>
    );
  
};

export default CustomHeader;