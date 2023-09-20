import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
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
import {TextInput} from 'react-native-gesture-handler';
import axios from 'axios';

const VerifyCodeScreen = ({navigation}) => {
  const [code, setCode] = useState('');
  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();
  const [f1, setF1] = useState('');
  const [f2, setF2] = useState('');
  const [f3, setF3] = useState('');
  const [f4, setF4] = useState('');
  const [f5, setF5] = useState('');
  const [f6, setF6] = useState('');
  const[loading,setLoading]=useState(false);
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (count == 0) {
  //       clearInterval(interval);
  //     } else {
  //       setCount(count - 1);
  //     }
  //   // });
  //   // setInterval(() => {
  //   //   setCount(count - 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);

  // const otpValidate = () => {
  //   let otp = '123456';
  //   let enteredOtp = f1 + f2 + f3 + f4 + f5 + f6;
  //   if (enteredOtp == otp) {
  //     Alert.alert('OTP Matched');
  //   } else {
  //     Alert.alert('Wrong OTP');
  //   }
  // };

  const OtpRequest = () => {
    setLoading(true);
    // paste api data here
    //     let data = new FormData();
    // data.append('code', '993123');

    let code = `${f1}${f2}${f3}${f4}${f5}${f6}`;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.recruitbpm.com/candidatemobilelogin?verifycode=1',
      headers: {
        Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
        // 'Cookie': 'PHPSESSID=o074gvappb0ishmsln1trrb676',
        // ...data.getHeaders()
      },
      data: {code: code},
    };

    axios
      .request(config)
      .then(response => {
        if (response?.data?.status == true) {
          setLoading(false);
          // console.log(response.data.data[0].candidate_auth_id);
          // curernt we are dealing with an array if he sent an obejct please just pick the canidate auth id
          
          //TODO : 
          navigation.navigate(AuthRoutes.ResetPasswordScreen, {
            candidate_auth_id: response?.data?.data[0]?.candidate_auth_id,
          });
        } else {
          setLoading(false);
          Alert.alert(`${response?.data?.error}`);
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
    <View style={commonStyles.container}>
      {/* <CustomHeader
        show_backButton={true}
        onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
        isdrawer={false}
        title={'Password Reset'}
      /> */}
      <CustomHeader
        show_backButton={true}
        onPress={() => navigation.navigate(AuthRoutes.ForgotPasswordScreen)}
        isdrawer={false}
        title={'Verify Code'}
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
        <View style={styles.container}>
          <Text style={styles.title}> OTP Verification </Text>
        </View>
        <View style={styles.otpView}>
          <TextInput
            ref={et1}
            style={[
              styles.inputView,
              {
                backgroundColor:
                  f1.length >= 1 ? colors.dark_primary_color : '#fff',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f1}
            onChangeText={txt => {
              setF1(txt);
              if (txt.length >= 1) {
                et2.current.focus();
              }
            }}
          />
          <TextInput
            ref={et2}
            style={[
              styles.inputView,
              {
                backgroundColor:
                  f2.length >= 1 ? colors.dark_primary_color : '#fff',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f2}
            onChangeText={txt => {
              setF2(txt);
              if (txt.length >= 1) {
                et3.current.focus();
              } else if (txt.length < 1) {
                et1.current.focus();
              }
            }}
          />
          <TextInput
            ref={et3}
            style={[
              styles.inputView,
              {
                backgroundColor:
                  f3.length >= 1 ? colors.dark_primary_color : '#fff',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f3}
            onChangeText={txt => {
              setF3(txt);
              if (txt.length >= 1) {
                et4.current.focus();
              } else if (txt.length < 1) {
                et2.current.focus();
              }
            }}
          />
          <TextInput
            ref={et4}
            style={[
              styles.inputView,
              {
                backgroundColor:
                  f4.length >= 1 ? colors.dark_primary_color : '#fff',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f4}
            onChangeText={txt => {
              setF4(txt);
              if (txt.length >= 1) {
                et5.current.focus();
              } else if (txt.length < 1) {
                et3.current.focus();
              }
            }}
          />
          <TextInput
            ref={et5}
            style={[
              styles.inputView,
              {
                backgroundColor:
                  f5.length >= 1 ? colors.dark_primary_color : '#fff',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f5}
            onChangeText={txt => {
              setF5(txt);
              if (txt.length >= 1) {
                et6.current.focus();
              } else if (txt.length < 1) {
                et4.current.focus();
              }
            }}
          />
          <TextInput
            ref={et6}
            style={[
              styles.inputView,
              {
                backgroundColor:
                  f6.length >= 1 ? colors.dark_primary_color : '#fff',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={f6}
            onChangeText={txt => {
              setF6(txt);
              if (txt.length >= 1) {
                et6.current.focus();
              } else if (txt.length < 1) {
                et5.current.focus();
              }
            }}
          />
        </View>
        {/* <DrawLine height={0.6} /> */}
        <Spacer />

        <View style={{height: scale(30)}} />

        {/* <View style={styles.resendbtn}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: count == 0 ? 'blue' : 'grey',
            }}
            onPress={() => {
              setCount(10);
            }}>
            Resend
          </Text>
          {count !== 0 && (
            <Text style={{marginLeft: 17, fontSize: 18}}>
              {count + ' seconds'}
            </Text>
          )}
        </View> */}

        <View style={{height: scale(40)}} />
        <TouchableOpacity
          disabled={
            f1 !== '' &&
            f2 !== '' &&
            f3 !== '' &&
            f4 !== '' &&
            f5 !== '' &&
            f6 !== ''
              ? false
              : true
          }
          style={[
            styles.btn,
            {
              backgroundColor:
                f1 !== '' &&
                f2 !== '' &&
                f3 !== '' &&
                f4 !== '' &&
                f5 !== '' &&
                f6 !== ''
                  ? colors.dark_primary_color
                  : 'lightgrey',
            },
          ]}
          // onChangeText={text => setCode(text)}
          // onPress={() => otpValidate()}>
          onPress={() => OtpRequest()}
          // onPress={() => navigation.navigate(AuthRoutes.ResetPasswordScreen)}
        >
          {loading ? <ActivityIndicator color = '#fff'/> :  <Text style={styles.btnText}> Submit Code</Text>}
         
        </TouchableOpacity>

        {/* <CustomButton 
                     onPress={() => OtpRequest()}
                    //  onPress={() => navigation.navigate(AuthRoutes.VerifyCodeScreen)}
                    // loading={loading}
                    text={"Request Code"}
                    title= {()=> Alert('Verification code sent to your email address.')}
                    //  loadingText={"Processing"}
                /> */}
        <View style={{height: scale(20)}} />

        {/* <CustomButton 
        disabled= {
            f1 !== '' &&
            f2 !== '' &&
            f3 !== '' &&
            f4 !== '' &&
            f5 !== '' &&
            f6 !== ''
            ? false 
            : true
        }
        
        style = {[styles.btn,
          {backgroundColor:f1 !== '' && f2 !== '' && f3 !== '' && f4 !==''
        && f5 !=='' && f6 !== '' ?  
        colors.dark_primary_color : '#000'},]}
          onPress={() => navigation.navigate(AuthRoutes.ResetPasswordScreen)}
          loading={false}
          text={'Verify OTP'}
          loadingText={'Processing'}
        /> */}

        {/* <View style={{width: width-scale(20), alignItems:"flex-start"}}>
                <Text style={{...textStyles.title, color:colors.dark_primary_color}}>
                 {successMessage}
                </Text>
              </View>
               <View style={{height:scale(20)}} />
               
                <CustomButton 
                    onPress={() => RequestCode()}
                    loading={loading}
                    text={"Request code"}
                    loadingText={"Processing"}
                /> */}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

export default VerifyCodeScreen;

const styles = StyleSheet.create({
  container: {fles: 1},
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    alignSelf: 'center',
    color: '#000',
  },
  otpView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 100,
  },
  inputView: {
    width: 45,
    height: 45,
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  btn: {
    width: '85%',
    height: 55,
    backgroundColor: colors.dark_primary_color,
    borderRadius: 20,
    // borderWidth:2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
  resendbtn: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
