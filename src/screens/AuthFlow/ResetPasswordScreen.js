import axios from 'axios';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import Spacer from '../../components/Spacer';
import CustomTextInput from '../../components/TextInput';
import { AuthRoutes } from '../../constants/routes';
import { AppScreenWidth, width } from '../../constants/sacling';
import { colors } from '../../constants/theme';
import { commonStyles, textStyles } from '../../styles';
const ResetPasswordScreen = ({navigation, route}) => {
  const candidate_auth_id = route?.params?.candidate_auth_id;
  const [is_api_error, set_api_error] = useState('');
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [newpasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
  const [confirm_newpassword, setConfirm_NewPassword] = useState('');
  const [confirm_newpasswordErrorMessage, setConfirm_NewPasswordErrorMessage] =
    useState('');
  const [loading, setLoading] = useState(false);
  const RequestCode = () => {

   
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (newpassword.length <4) {
      setNewPasswordErrorMessage('Please enter password at least 4 characters');
    return;
    }
    if (confirm_newpassword === newpassword) {
      setSuccessMessage('Password is correct');
    } else {
      setConfirm_NewPasswordErrorMessage('Pasword mis-matched');
      return;
    }

    setLoading(true);
    setNewPasswordErrorMessage("");
    setConfirm_NewPasswordErrorMessage("");
    setSuccessMessage("");
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.recruitbpm.com/candidatemobilelogin?changepassword=1',
      headers: {
        Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
        //   'Cookie': 'PHPSESSID=o074gvappb0ishmsln1trrb676',
        //   ...data.getHeaders()
      },
      data: {
        candidate_auth_id: candidate_auth_id,
        password: newpassword,
        confirm_newpassword: confirm_newpassword,
      },
    };

    axios
      .request(config)
      .then(response => {
        // console.log(response?.data)
        setLoading(false);
        if (response?.data?.status == true) {
        
          if (response.data?.status == true) {
            Alert.alert(`${response?.data?.message}`);
            navigation.replace(AuthRoutes.SignInScreen);
          } else {
            setApiErrorMessage(response?.data?.error);
            set_api_error(true);
          }
        } else {
          setApiErrorMessage(
            `Server Error ${response?.status} occured. Please try again`,
          );
          set_api_error(true);
        }
     
      })
      .catch(error => {
        setLoading(false);
        setApiErrorMessage(`Server Error  occured. Please try again`);
        set_api_error(true);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
    <View style={commonStyles.container}>
      <CustomHeader
        show_backButton={true}
        onPress={() => navigation.navigate(AuthRoutes.VerifyCodeScreen)}
        isdrawer={false}
        title={'Password Reset'}
      />
      {/* <CustomHeader 
                    show_backButton={true}
                    onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
                    isdrawer={false}
                    title={"Restore password"}
                /> */}

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
        {/* <DrawLine height={0.6} /> */}
        <Spacer />

        <CustomTextInput
          placeholder={'New Password'}
          value={newpassword}
          secureTextEntry={true}
          onChangeText={text => setNewPassword(text)}
          errorMessage={newpasswordErrorMessage}
        />
        {/* <DrawLine height={0.6} /> */}
        <Spacer />
        <CustomTextInput
          placeholder={'Confirm New Password'}
          value={confirm_newpassword}
          secureTextEntry={true}
          onChangeText={text => setConfirm_NewPassword(text)}
          errorMessage={confirm_newpasswordErrorMessage}
        />
        <View style={{alignSelf: 'center', width: AppScreenWidth}}>
          {is_api_error ? (
            <Text style={{...textStyles.errorText, textAlign: 'left'}}>
              {apiErrorMessage}
            </Text>
          ) : null}
        </View>

        <Spacer />
        <View style={{width: width - scale(20), alignItems: 'flex-start'}}>
          <Text style={{...textStyles.title, color: colors.dark_primary_color}}>
            {successMessage}
          </Text>
        </View>
        <CustomButton
          onPress={() => RequestCode()}
          loading={loading}
          text={'Submit'}
          loadingText={'Processing'}
        />
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;















