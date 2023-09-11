import React, {useState} from 'react';
import { SafeAreaView,ScrollView,StatusBar,View,StyleSheet,Text, TouchableOpacity} from 'react-native';
import CustomTextInput from '../../components/TextInput';
import CustomButton from '../../components/Button';
import LOGIN_SVG from '../../assets/images/login.svg'
import { commonStyles, textStyles } from '../../styles';
import { AppScreenWidth, width } from '../../constants/sacling';
import { scale } from 'react-native-size-matters';
import { AuthRoutes } from '../../constants/routes';
import Spacer from '../../components/Spacer';
import DrawLine from '../../components/DrawLine';
import { colors } from '../../constants/theme';
import GOOGLE from '../../assets/images/google.svg'
import FACEBOOK from '../../assets/images/facebook.svg'
    const SignUpScreen = ({navigation}) => {
        const [username, setUsername] = useState("")
        const [usernameErrorMesage , setUsernameErrorMessaage] = useState("")
        const [password, setPassword] = useState('')
        const [passwordErrorMessage,setPasswordErrorMessage] = useState("")
        const [loading , setLoading] = useState(false)
        const  submitdate = () => {
            if(username.trim().length < 5){
                setUsernameErrorMessaage("Please Enter username")
                return
            }
            if(password.trim().length < 5){
                setUsernameErrorMessaage("")
                setPasswordErrorMessage("Please Enter password")
                return
            }
            setLoading(true)
            setPasswordErrorMessage("")
            setUsernameErrorMessaage("")
            setTimeout(() => {
                navigation.replace(AuthRoutes.WelcomeScreen)
            },2000)
        }
        return (
            <SafeAreaView style={commonStyles.container} >
                <StatusBar />
                <ScrollView contentContainerStyle={{backgroundColor:"#fff", justifyContent:"center", alignItems:"center"}} >
                
                    <LOGIN_SVG width={width-scale(20)} height={width/2} />
                    <CustomTextInput
                        placeholder={"Enter your username"}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        errorMessage={usernameErrorMesage}
                    />
                    <CustomTextInput
                        placeholder={"Enter your password"}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        errorMessage={passwordErrorMessage}
                    />
                    <CustomButton 
                        onPress={() => submitdate()}
                        loading={loading}
                        text={"Sign Up"}
                        loadingText={"Processing"}
                    />
                    <DrawLine />
                    <Spacer />
                    <Text style={{...textStyles.Label, textAlign:"center"}} >OR</Text>
                   
                    <View style={{width:AppScreenWidth,flexDirection:"row", justifyContent:"space-between" }}>
                        <TouchableOpacity style={styles.GoogleButton}>
                            <GOOGLE width={scale(20)} height={scale(20)}  />
                            <Text style={{...textStyles.Label, backgroundColor:"#0000", marginLeft:scale(5), textAlign:"center"}} >Sign Up With Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.GoogleButton}}>
                            <FACEBOOK width={scale(20)} height={scale(20)}  />
                            <Text style={{...textStyles.Label,marginLeft:scale(5),textAlign:"center"}} >Sign Up With Facebook</Text>
                        </TouchableOpacity>
                    </View>
                    <DrawLine />
                    <Spacer />
                    <Text style={{...textStyles.Label, textAlign:"center"}} >Already have account</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(AuthRoutes.SignInScreen) } >
                        <Text style={{...textStyles.Label,color:colors.default_primary_color, textAlign:"center"}} >Sign In</Text>
                    </TouchableOpacity>
                    <DrawLine />
                    <Spacer />
                    <Text style={{...textStyles.Label, textAlign:"center"}} >All Rights Reserved</Text>
                    <Text style={{...textStyles.Label,color:colors.default_primary_color, textAlign:"center"}} >@Recruit BPM {new Date().getFullYear()}</Text>
                </ScrollView>
            </SafeAreaView>
        );
    };

const styles = StyleSheet.create({
 GoogleButton:{
    flexDirection:"row",
    width:AppScreenWidth/2-scale(2),
    borderWidth:1,
    marginVertical:10,
    elevation:1,
    backgroundColor:"#fff",
    borderColor:colors.text_primary_color,
    height:scale(40),
    justifyContent:"center",
    alignItems:"center",
    borderRadius:scale(5)
 }
});

export default SignUpScreen;
