import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {scale, verticalScale} from 'react-native-size-matters';
import {commonStyles, textStyles} from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import {MainRoutes} from '../../constants/routes';
import {colors, fonts} from '../../constants/theme';
import {AppScreenWidth, hp, width} from '../../constants/sacling';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {GetStatus} from '../../store/actions/StatusActions';
import {getStatusList} from '../../api';
import {heightPercentageToDP} from 'react-native-responsive-screen';
FontAwesome.loadFont();
const HomeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();
  const getstatus = data => dispatch(GetStatus(data));

  useEffect(() => {
    getStatusList(user.account_id)
      .then(response => {
        if (response.status === 200) {
          //console.log(response.data.data);
          getstatus(response.data.data);
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        <CustomHeader
          show_backButton={true}
          isdrawer={true}
          onPress={() => navigation.openDrawer()}
          title={'Dashboard'}
        />
        <View
          style={{
            width: AppScreenWidth,
            marginVertical: scale(5),
            alignItems: 'flex-start',
            alignSelf: 'center',
          }}>
          <Text style={styles.headingtext}>Welcome!</Text>
          <Text style={styles.nameText}>
            {'\t'}
            {user.name}
          </Text>
        </View>
        <View style={styles.main} />
        <ScrollView>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(MainRoutes.TimeSheetListScreen)
              }
              style={styles.box}>
              <AntDesign
                name="clockcircle"
                color={colors.dark_primary_color}
                size={scale(50)}
              />
              <Text style={{...styles.textStyle, textAlign: 'center'}}>
                All{'\n'}TimeSheets
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(MainRoutes.UnApprovedTimeSheetListScreen, {
                  isShowFilter: false,
                  isAddSearchBox: true,
                })
              }
              style={styles.box}>
              <AntDesign
                name="clockcircle"
                color={colors.dark_primary_color}
                size={scale(50)}
              />

              <Text style={{...styles.textStyle, textAlign: 'center'}}>
                UnApproved TimeSheets
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate(MainRoutes.ExpensesListScreen)}
              style={styles.box}>
              <Entypo
                name="credit"
                color={colors.dark_primary_color}
                size={scale(50)}
              />

              <Text style={{...styles.textStyle, textAlign: 'center'}}>
                All{'\n'}Expenses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(MainRoutes.UnApprovedExpansesScreen, {
                  isShowFilter: false,
                  isAddSearchBox: true,
                })
              }
              style={styles.box}>
              <Entypo
                name="credit"
                color={colors.dark_primary_color}
                size={scale(50)}
              />
              <Text style={{...styles.textStyle, textAlign: 'center'}}>
                UnApproved Expenses
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate(MainRoutes.AllLeavesScreen)}
              style={styles.box}>
              <Entypo
                name="calendar"
                color={colors.dark_primary_color}
                size={scale(50)}
              />

              <Text style={{...styles.textStyle, textAlign: 'center'}}>
                All{'\n'}Leaves
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(MainRoutes.UnApprovedLeavesScreen,{
                  isShowFilter: false,
                  isAddSearchBox: true,
                })
              }
              style={styles.box}>
              <Entypo
                name="calendar"
                color={colors.dark_primary_color}
                size={scale(50)}
              />
              <Text style={{...styles.textStyle, textAlign: 'center'}}>
                UnApproved Leaves
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height: heightPercentageToDP(10)}} />
        </ScrollView>
        <View style={styles.main2}>
          <Text style={styles.paragraph}>
            Copyright @{new Date().getFullYear()} RecruitBPM All Rights Reserved
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    height: hp(55),
    width: width * 1.2,
    zIndex: -1,
    position: 'absolute',
    top: verticalScale(40),
    borderBottomRightRadius: hp(100),
    backgroundColor: colors.dark_primary_color,
  },
  main2: {
    height: hp(5),
    width: width,
    zIndex: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    bottom: scale(0),

    borderTopLeftRadius: hp(3),
    borderTopRightRadius: hp(3),
    backgroundColor: colors.dark_primary_color,
  },
  headingtext: {
    ...textStyles.heading,
    fontSize: scale(22),
    color: '#fff',
    textAlign: 'left',
  },
  nameText: {
    ...textStyles.title,
    fontSize: scale(18),
    marginTop: scale(2),
    marginHorizontal: scale(5),
    color: '#fff',
    textAlign: 'left',
  },
  paragraph: {
    ...textStyles.paragraph,
    fontSize: scale(12),
    color: '#fff',
    includeFontPadding: false,
    marginHorizontal: scale(5),
    textAlign: 'left',
  },
  row: {
    width: AppScreenWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: hp(2),
    justifyContent: 'space-evenly',
  },
  box: {
    width: AppScreenWidth / 2 - scale(20),
    height: AppScreenWidth / 2 - scale(20),
    backgroundColor: '#fff',
    elevation: 10,
    paddingVertical: hp(5),
    paddingHorizontal: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    borderBottomWidth: 0,
    borderWidth: 0,
    borderColor: '#fff',
    borderBottomColor: colors.secondary_text_color,
  },
  textStyle: {
    marginTop: scale(10),
    fontFamily: fonts.Medium,
    fontSize: scale(14),
    color: colors.secondary_text_color,
  },
});
