import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import CustomTextInput from '../../components/TextInput';
import {width} from '../../constants/sacling';
import DrawLine from '../../components/DrawLine';
import CustomHeader from '../../components/CustomHeader';
import {commonStyles, textStyles} from '../../styles';
import CustomButton from '../../components/Button';
import {AuthRoutes} from '../../constants/routes';
import {scale} from 'react-native-size-matters';
import Spacer from '../../components/Spacer';
import {colors} from '../../constants/theme';
// import { approverforgotpassword } from '../../api';
import {useDispatch} from 'react-redux';
import axios from 'axios';

// const ForgotPasswordScreen = ({navigation}) => {
//     const [oldpassword, setOldPassword] = useState("")
//     const [oldpasswordErrorMessage, setOldPasswordErrorMessaage] = useState("")

//     const [currentpassword, setCurrentPassword] = useState('');
//     const [currentpasswordErrorMessage, setCurrentPasswordErrorMessage] = useState('');
//     const [confrim_currentpassword, confrim_setCurrentPassword] = useState('');
//     const [confrim_currentpasswordErrorMessage, confrim_setCurrentPasswordErrorMessage] = useState('');

const AccountVerificationScreen = ({navigation, route}) => {
  const {account_id, email: EMAIL_ADDRESS} = route?.params || {};
  const [email_address, setEmailAddress] = useState('');
  const [email_addressErrorMessage, setUseremailErrorMessaage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [is_api_error, set_api_error] = useState('');
  const [data, setData] = useState([]);
  const [email, setEmail] = useState(EMAIL_ADDRESS||'');
  const dispatch = useDispatch();
  const userLogin = data => dispatch(Login(data));

  
  const RequestCode = () => {
    // set_api_error(false)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(email)) {
      setUseremailErrorMessaage('Please enter valid email');
      //   setPasswordErrorMessage('');
      return;
    }
     setLoading(true);
    
    //             let data = new FormData();
    // data.append('email', 'waheeda@recruitbpm.com');
    // data.append('account_id', '899');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.recruitbpm.com/candidatemobilelogin?forgotpassword=1',
      headers: {
        Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
        // 'Cookie': 'PHPSESSID=o074gvappb0ishmsln1trrb676',
        // ...data.getHeaders()
      },
      data: {email: email,account_id},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
       
        navigation.navigate(AuthRoutes.VerifyCodeScreen);
       
      })
      .catch(error => {
        console.log(error);
      });

  
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
    <View style={commonStyles.container}>
     
      <CustomHeader
        show_backButton={true}
        onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
        isdrawer={false}
        title={'Verify Account Data'}
      />

      {/* <Spacer />
                <CustomTextInput
                    placeholder={'Old Password'}
                    value={oldpassword}
                    secureTextEntry={true}
                    onChangeText={text => setOldPassword(text)}
                    errorMessage={oldpasswordErrorMessage}
                /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#fff',
          flexGrow: 1,
          alignItems: 'center',
        }}>
        <Image
          resizeMode={'cover'}
          resizeMethod={'resize'}
          style={{width: width}}
          source={require('../../assets/images/login.png')}
        />
        <DrawLine height={0.6} />
        <Spacer />

        {/* <CustomTextInput
                    placeholder={'Current Password'}
                    value={currentpassword}
                    secureTextEntry={true}
                    onChangeText={text => setCurrentPassword(text)}
                    errorMessage={currentpasswordErrorMessage}
                /> */}

        <CustomTextInput
          placeholder={'Enter your email'}
          value={email}
          secureTextEntry={false}
          onChangeText={text => setEmail(text)}
          errorMessage={email_addressErrorMessage}
        />
        {/* <CustomTextInput
                    placeholder={'C
                    onfrim Current Password'}
                    value={confrim_currentpassword}
                    secureTextEntry={true}
                    onChangeText={text => confrim_setCurrentPassword(text)}
                    errorMessage={confrim_currentpasswordErrorMessage}
                />
                <CustomButton 
                    onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
                    loading={false}
                    text={"Next"}
                    loadingText={"Processing"}
                /> */}

        <View style={{width: width - scale(20), alignItems: 'flex-start'}}>
          <Text style={{...textStyles.title, color: colors.dark_primary_color}}>
            {successMessage}
          </Text>
        </View>

        <CustomButton
          onPress={() => RequestCode()}
          //  onPress={() => navigation.navigate(AuthRoutes.VerifyCodeScreen)}
          loading={loading}
          text={'Request Code'}
          // title= {()=> Alert('Verification code sent to your email address.')}
          loadingText={'Processing'}
        />
        <View style={{height: scale(20)}} />

        {/* <CustomButton
          //  onPress={() => RequestCode()}
          onPress={() => navigation.navigate(AuthRoutes.VerifyCodeScreen)}
          loading={loading}
          text={'Request Code'}
          title={() => Alert('Verification code sent to your email address.')}
          loadingText={'Processing'}
        /> */}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default AccountVerificationScreen;
