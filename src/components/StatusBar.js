import React from 'react';
import {
    View,
    StatusBar,
  } from 'react-native';
import { colors } from '../constants/theme';  
import {useSafeAreaInsets} from 'react-native-safe-area-context';
    
const CustomStatusBar = ({backgroundColor =colors.dark_primary_color,barStyle ="light-content"}) => { 
    const insets = useSafeAreaInsets();
        return (
            <View style={{ height: insets.top, backgroundColor }}>
                <StatusBar
                animated={true}
                backgroundColor={backgroundColor}
                barStyle={barStyle} />
            </View>
        );
    }
export default CustomStatusBar