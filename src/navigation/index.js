import React, { useEffect, useState } from 'react';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import { colors } from '../constants/theme';
import {useDispatch,useSelector} from 'react-redux';
const MainApp = () => {
    const { is_logged_in} = useSelector(state => state.LoginReducer);
   
    return(
        <NavigationContainer>
            <StatusBar
                backgroundColor={colors.dark_primary_color}
                barStyle={"light-content"}
            />
            {
                is_logged_in
                
                ?
                    <MainStack />
                :
                    <AuthStack />
            }
        </NavigationContainer>
    )
};

export default MainApp

