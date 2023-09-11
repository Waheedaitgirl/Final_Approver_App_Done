import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import SplashScreen from '../screens/WelcomeScreens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreens/WelcomeScreen';
import SignInScreen from '../screens/AuthFlow/SignInScreen';
import SignUpScreen from '../screens/AuthFlow/SignUpScreen';
import ForgotPasswordScreen from '../screens/AuthFlow/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/AuthFlow/VerifyCodeScreen';
import ResetPasswordScreen from '../screens/AuthFlow/ResetPasswordScreen';
import AccountVerificationScreen from '../screens/AuthFlow/AccountVerificationScreen';
import { scale } from 'react-native-size-matters';
import { colors, fonts } from '../constants/theme';
const Stack = createNativeStackNavigator();
const options = { 
    title: 'Welcome',
    headerStyle: {
        backgroundColor:colors.dark_primary_color,
    },
    headerTintColor:colors.text_primary_color,
        headerTitleStyle: {
            fontSize:scale(18),
            color:colors.white,
            fontFamily:fonts.Bold
        }, 
}
const AuthStack = () => {
    return(
        <Stack.Navigator
            initialRouteName='SplashScreen'
        >
            <Stack.Screen 
                name="SplashScreen" 
                component={SplashScreen} 
                options={{headerShown:false}}
            />
            <Stack.Screen 
                name="WelcomeScreen" 
                component={WelcomeScreen} 
                options={{...options,headerBackVisible:false, headerTitleAlign:"center", title:"Welcome"}}
            />
            <Stack.Screen 
                name="SignInScreen" 
                component={SignInScreen} 
                options={{headerShown:false}}
            />
            <Stack.Screen 
                name="SignUpScreen" 
                component={SignUpScreen} 
                options={{...options,headerBackVisible:false, headerTitleAlign:"center", title:"Sign Up"}}
            />
            <Stack.Screen 
                name="ForgotPasswordScreen" 
                component={ForgotPasswordScreen} 
                options={{headerShown:false}}
            />
            <Stack.Screen 
                name="VerifyCodeScreen" 
                component={VerifyCodeScreen} 
                options={{headerShown:false}}
            />
            <Stack.Screen 
                name="ResetPasswordScreen" 
                component={ResetPasswordScreen} 
                options={{headerShown:false}}
            />
             <Stack.Screen 
                name="AccountVerificationScreen" 
                component={AccountVerificationScreen} 
                options={{headerShown:false}}
            />

        </Stack.Navigator>
    )
}

export default AuthStack