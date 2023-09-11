import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
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

import {useDispatch} from 'react-redux';
import axios from 'axios';
import { delay } from 'lodash';

const ForgotPasswordScreen = ({navigation}) => {
  const [email_address, setEmailAddress] = useState('');
  const [email_addressErrorMessage, setUseremailErrorMessaage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [is_api_error, set_api_error] = useState('');
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const [accounts, setAccounts] = useState([]);

  // const userLogin = data => dispatch(Login(data));
  const proceedWith = id => {
    //navigate to that screen
    setLoading(false);
    navigation.navigate(AuthRoutes.AccountVerificationScreen, {
      account_id: id,
      email: email_address,
    });
  };

  const RequestCode = () => {
    // set_api_error(false)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(email_address)) {
      setUseremailErrorMessaage('Please enter valid email');
      //   setPasswordErrorMessage('');
      return;
    }
    setLoading(true);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.recruitbpm.com/candidatemobilelogin?emailaccounts=1',
      headers: {
        Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
        // 'Cookie': 'PHPSESSID=ors127shte6k8pb10arbmbndtj',
        // ...data.getHeaders()
      },
      data: {email: email_address},
    };
    axios
      .request(config)
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setAccounts(response?.data);
        if(response.data.length > 1){
          Alert.alert('Please select an account to continue');
        }
     
        //   Alert.alert("Verification code sent to your email address.")
        //   console.log(JSON.stringify(response.data));
        // if (response.data.length > 1) {
        //   console.log('Nauman');
        // } else {
        //   console.log('Waheeda');
        // }
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });

   
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
    <View style={commonStyles.container}>
     
       <CustomHeader
        show_backButton={true}
        onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
        isdrawer={false}
        title={'Email Verification'}
      />

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

        <CustomTextInput
          placeholder={'Enter your email'}
          value={email_address}
          secureTextEntry={false}
          onChangeText={text => setEmailAddress(text)}
          errorMessage={email_addressErrorMessage}
        />

        <View style={{width: width - scale(20), alignItems: 'flex-start'}}>
          <Text style={{...textStyles.title, color: colors.dark_primary_color}}>
            {successMessage}
          </Text>
        </View>
        {/* <View style={{height: scale(20)}} /> */}

        <View style={{height: scale(20)}} />
        {console.log('accounts')}
        {accounts?.length > 0 ? (

          <View style={{height: scale(30)}}>
            {accounts?.map(btn => {
            
              return (
                <View style={{height: scale(20), marginVertical: 20}}>
                  <CustomButton
                    loading={loading}
                    loadingText={'Processing'}
                    text={`PROCEED WITH ${btn.account_name?.toUpperCase()}`}
                    onPress={() => {
                      setLoading(true);
                     delay(()=>{},2000);
                      proceedWith(btn.account_id);
                    }}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <CustomButton
            onPress={() => RequestCode()}
            text={'Proceed'}
            loading={loading}
            loadingText={'Processing'}
          />
        )}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

// import React,{useState} from 'react';
// import { Image,View,ScrollView,Text} from 'react-native';
// import CustomTextInput from '../../components/TextInput';
// import CustomHeader from '../../components/CustomHeader';
// import { commonStyles,textStyles } from '../../styles';
// import CustomButton from '../../components/Button';
// import { AuthRoutes } from '../../constants/routes';
// import { scale } from 'react-native-size-matters';
// import {colors} from '../../constants/theme';
// import Spacer from '../../components/Spacer';
// import DrawLine from '../../components/DrawLine';
// import { width } from '../../constants/sacling';
//     const ForgotPasswordScreen = ({navigation}) => {
//         const [email_address, setEmailAddress] = useState("")
//         const [email_addressErrorMessage, setUseremailErrorMessaage] = useState("")
//         const [successMessage, setSuccessMessage] = useState('')
//         const [disable, setDisable] = useState(false)
//         const [loading ,setLoading] = useState(false)
//         const RestorePassword = () => {
//             const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//             if (!reg.test(email_address)) {
//                 setUseremailErrorMessaage('Please enter valid email');

//                 return;
//             }
//             setLoading(true)
//             setTimeout(() => {
//                 setLoading(false)
//                 setSuccessMessage("An email has been send to your account")
//                 setDisable(true)
//             }, 2000);
//             setUseremailErrorMessaage("")
//         }

//         return (
//             <View style={commonStyles.container} >
//                 <CustomHeader
//                     show_backButton={true}
//                     onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
//                     isdrawer={false}
//                     title={"Restore password"}
//                 />
//                 <ScrollView
//                  showsVerticalScrollIndicator={false}
//                     contentContainerStyle={{
//                         backgroundColor: '#fff',
//                         flexGrow: 1,
//                         alignItems: 'center',
//                     }}>
//                 <Image
//                     resizeMode={'cover'}
//                     resizeMethod={'resize'}
//                     style={{width:width,}}
//                     source={require('../../assets/images/login.png')}
//                 />
//                      <DrawLine height={0.6} />
//                      <Spacer />

//                 <CustomTextInput
//                     placeholder={'Enter your email'}
//                     value={email_address}
//                     secureTextEntry={false}
//                     onChangeText={text => setEmailAddress(text)}
//                     errorMessage={email_addressErrorMessage}
//                 />
//                 <View style={{width: width-scale(20), alignItems:"flex-start"}}>
//                 <Text style={{...textStyles.title, color:colors.dark_primary_color}}>
//                  {successMessage}
//                 </Text>
//               </View>
//                <View style={{height:scale(20)}} />

//                 <CustomButton
//                     onPress={() => RestorePassword()}
//                     loading={loading}
//                     text={"Restore"}
//                     loadingText={"Processing"}
//                 />
//                 </ScrollView>
//             </View>
//         );
//     };

// export default ForgotPasswordScreen;
