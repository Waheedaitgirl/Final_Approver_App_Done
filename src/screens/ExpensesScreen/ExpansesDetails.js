import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  View,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SwipeListView} from 'react-native-swipe-list-view';
import {AcceptOrRejectTimeSheetOrExpenses} from '../../api';
import {commonStyles, textStyles} from '../../styles';
import CustomHeader from '../../components/CustomHeader';
import ExpansesItem from './ExpansesCard';
// import {scale} from 'react-native-size-matters';
import {colors} from '../../constants/theme';
import {AppScreenWidth, height} from '../../constants/sacling';
import Spacer from '../../components/Spacer';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getExpensesDetails} from '../../api';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import {downloadFile} from '../../helpers';
import CommentsBox from '../TimeSheetScreen/CommentsBox';
// Import FontAwesome icons (you can use other icon libraries as well)

const Item = ({
  date,
  expense_type,
  bill_type,
  category,
  amount,
  filename,
  expense_receipt,
  approver_comments = '',
  expense_comments,
  Linking,
  com,
  setCom,
}) => {
  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const navigation = useNavigation();
  const [ext, setExt] = useState(null);
  useEffect(() => {
    setCom(approver_comments);
    setExt(getFileExtention(filename));
  }, []);
  return (
    <View style={{width: AppScreenWidth}}>
      <View style={styles.CardView}>
        <View style={styles.row}>
          <View>
            <Text style={styles.buleText}> Expense Date:</Text>
            <Text style={styles.title}>{date}</Text>
          </View>
          <View>
            <Text style={styles.buleText}>Expense Type:</Text>
            <Text style={styles.title}>{expense_type}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.buleText}>Bill Type:</Text>
            <Text style={styles.title}>{bill_type}</Text>
          </View>
          <View>
            <Text style={styles.buleText}>Category:</Text>
            <Text style={styles.title}>{category}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.buleText}>Amount:</Text>
            <Text includeFontPadding={false} style={styles.title}>
              ${amount}
            </Text>
          </View>
          <View>
            <Text style={styles.buleText}>Receipt:</Text>
            {/* <Text style={styles.title}>{filename}</Text>   */}

            <TouchableOpacity
              disabled={!filename}
              style={styles.title}
              onPress={() => {
                if (
                  ext == 'png' ||
                  ext == 'jpg' ||
                  ext == 'gif' ||
                  ext == 'jpeg' ||
                  ext == 'webp'
                ) {
                  console.log('filename', filename);
                  navigation.navigate('Preview', {
                    file: filename,
                  });
                } else {
                  if (
                    ext == 'doc' ||
                    ext == 'docx' ||
                    ext == 'pdf' ||
                    ext == 'rtf'
                  ) {
                    let url = filename;
                    Alert.alert(
                      'Attention!',
                      'Do you want to download the file?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {},
                          style: 'cancel',
                        },
                        {
                          text: 'Download',
                          onPress: () => {
                            downloadFile(url);
                          },
                        },
                      ],
                    );
                  } else {
                    null;
                  }
                }
                // navigation.navigate('ImageView', {
                //   file: filename,
                // });
              }}>
              {/* <Image
                style={styles.imageStyle}
                source={{
                  uri: filename,
                }}
              /> */}
              {ext == 'pdf' ? (
                <AntDesign
                  name={'pdffile1'}
                  color={'red'}
                  size={30}
                  style={{margin: 6}}
                />
              ) : ext == 'png' ||
                ext == 'jpg' ||
                ext == 'gif' ||
                ext == 'jpeg' ||
                ext == 'webp' ? (
                <Image style={styles.imageStyle} source={{uri: filename}} />
              ) : ext == 'doc' ||
                ext == 'docx' ||
                ext == 'rtf' ||
                ext == 'txt' ? (
                <AntDesign
                  name={'wordfile1'}
                  color={'blue'}
                  size={30}
                  style={{margin: 6}}
                />
              ) : (
                <Text>No receipt available!</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            {expense_comments !== null && expense_comments !== '' && (
              <View>
                <Text style={styles.buleText}>Comments:</Text>
                <Text style={styles.title}>{expense_comments}</Text>
              </View>
            )}
            {/* {approver_comments !== null && approver_comments !== '' && ( */}
            <View>
              <Text style={styles.buleText}>Approver Comments:</Text>

              <TextInput
                style={styles.title}
                value={com}
                onChangeText={setCom}
                placeholder={''}
                underlineColorAndroid={'transparent'}
                autoCorrect={true}
                autoFocus={true}
              />
            </View>
            {/* )} */}
          </View>
        </View>
      </View>
      {/* <CommentsBox
            title={'Approver Comment'}
            // name={'Approver'}
           // name={'appro÷ver_comments'}
            comment={approver_comments
            }
          editable={true}
          /> */}
    </View>
  );
};

const ExpenseDetailsScreen = ({navigation, route}) => {
  const [logs, setLogs] = useState([]);
  const [com, setCom] = useState('');
  const {user} = useSelector(state => state.LoginReducer);
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let item = route.params.item;
  const status = item.module_status_name;

  useEffect(() => {
    getExpensesDetails(user.account_id, item.expense_id)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data.logs);
          setLoading(false);
          setLogs(response.data.logs);
        } else {
          setLoading(false);
          setError(true);
        }
      })
      .catch(err => {
        setLoading(false);
        setError(true);
        console.log(err, 'Error');
      });
  }, []);

  const onStatusHandler = useCallback(
    (expense_id, statusCode) => {
      Alert.alert(
        'Attention!',
        `Are you sure you want to ${statusCode === 0 ? 'Reject' : 'Approve'}?`,
        [
          {
            text: 'No',
            onPress: () => {},
          },
          {
            text: 'Yes',
            onPress: () => {
              statusCode === 1
                ? route.params?.onAccept(expense_id, com)
                : route.params?.OnRejected(expense_id, com);

              navigation?.goBack();
            },
            style: 'cancel',
          },
        ],
      );
    },
    [com],
  );

  if (loading) {
    return (
      <SafeAreaProvider>
        {/* <CustomStatusBar /> */}
        {/* <SafeAreaView style = {commonStyles.container}> */}
        {/* <CustomHeader
          show_backButton={true}
          isdrawer={false}
          onPress={() => navigation.goBack()}
          title={'Expenses Detail'}
        /> */}
        <Spacer height={AppScreenWidth} />
        <ActivityIndicator size={'large'} color={colors.dark_primary_color} />
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    );
  }
  if (error) {
    return (
      <SafeAreaProvider>
        <CustomStatusBar />
        <SafeAreaView style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={false}
            onPress={() => navigation.goBack()}
            title={'Expenses Detail'}
          />
          <Spacer height={AppScreenWidth / 2} />
          <Image
            source={require('../../assets/images/error.gif')}
            style={{
              width: verticalScale(150),
              height: verticalScale(150),
              resizeMode: 'contain',
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <SafeAreaView style={commonStyles.container}>
        <CustomHeader
          show_backButton={true}
          isdrawer={false}
          onPress={() => navigation.goBack()}
          title={'Expense Detail'}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {item && (
            <ExpansesItem
              item={item}
              billtype={item.expense_report_title}
              type={
                item.type === 'employee' ? item.candidate_name : item.username
              }
              status={item.module_status_name}
              date={moment(item.created_date).format('MMM-DD-YYYY')}
              job={item.job_title}
              status_colour_code={item.status_colour_code}
              price={`$ ${parseFloat(item.total_amount).toFixed(2)}`}
              onPress={() => {}}
              // navigation.navigate(MainRoutes.ExpenseDetailsScreen, {
              //   item: item,
              // });
              // }}
            />
          )}
          {logs.map((item, index) => {
            return (
              <View key={`${index}`}>
                <Item
                  date={moment(item.expense_date).format('MMM-DD-YYYY')}
                  expense_type={item.expense_type_name}
                  bill_type={item.expense_bill_type_name}
                  category={item.category_name}
                  amount={item.expense_amount}
                  approver_comments={item.approver_comments}
                  expense_comments={item.expense_comments}
                  com={com}
                  setCom={setCom}
                  filename={
                    item.expense_receipt != null
                      ? 'https://storage.googleapis.com/recruitbpm-document/' +
                        item.subdomain +
                        '/' +
                        item.expense_receipt
                      : null
                  }
                />
              </View>
            );
          })}
          <Spacer />
        </ScrollView>
        <View style={styles.HiddenBtnView}>
          {item.module_status_name === 'Submitted' ? (
            <>
              <Pressable
                style={styles.Acceptbtn}
                onPress={() => onStatusHandler(item.expense_id, 1)}>
                <Ionicons name="checkmark" color={'#fff'} size={scale(22)} />
                <Text style={{...textStyles.Label, color: '#fff'}}>
                  Approve
                </Text>
              </Pressable>
              <View style={{height: 1}} />
              <Pressable
                style={styles.RejectBtn}
                onPress={() => onStatusHandler(item.expense_id, 0)}>
                <MaterialIcons name="cancel" color={'#fff'} size={scale(22)} />
                <Text style={{...textStyles.Label, color: '#fff'}}>Reject</Text>
              </Pressable>
            </>
          ) : item.module_status_name === 'Rejected' ? (
            <Pressable
              style={styles.Acceptbtn}
              onPress={() => onStatusHandler(item.expense_id, 1)}>
              <Ionicons name="checkmark" color={'#fff'} size={scale(22)} />
              <Text style={{...textStyles.Label, color: '#fff'}}>Approve</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.RejectBtn}
              onPress={() => onStatusHandler(item.expense_id, 0)}>
              <MaterialIcons name="cancel" color={'#fff'} size={scale(22)} />
              <Text style={{...textStyles.Label, color: '#fff'}}>Reject</Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ExpenseDetailsScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  CardView: {
    elevation: 2,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: scale(10),
    width: AppScreenWidth,
    padding: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  // comments :{
  //   fontSize: scale(12),
  // },
  buleText: {
    ...textStyles.smallheading,
    fontSize: scale(10),
    backgroundColor: 'rgba(0,0,0,.1)',
    paddingLeft: 5,
    paddingTop: 0,
    paddingBottom: 0,
    width: AppScreenWidth / 2.1,
    color: colors.blue,
  },
  ButtonText: {
    ...textStyles.title,
    paddingHorizontal: 0,
    includeFontPadding: false,
    borderRadius: scale(5),
  },
  title: {
    ...textStyles.title,
    paddingLeft: 5,
    marginBottom: scale(3),
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  Acceptbtn: {
    paddingVertical: 2,
    backgroundColor: 'green',
    flex: 1,
    borderRadius: 5,
    // marginBottom: 10,
    borderWidth: 0,
    marginHorizontal: 24,
    // width: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  RejectBtn: {
    paddingVertical: 2,
    marginHorizontal: 24,
    flex: 1,
    backgroundColor: colors.delete_icon,
    borderRadius: 5,
    borderWidth: 0,
    justifyContent: 'center',
    //width: scale(100),
    alignItems: 'center',
  },

  HiddenBtnView: {
    marginTop: 2,
    marginBottom: 30,
    flexDirection: 'row',
    backgroundColor: '#fff',
    //  alignItems: 'flex-end',
    //  height: '100%',
    justifyContent: 'center',
    // paddingHorizontal: scale(20),
    //  paddingVertical: scale(20),
  },
});
