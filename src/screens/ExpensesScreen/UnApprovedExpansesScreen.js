import React, {useEffect, useState,useCallback} from 'react';
import {
  SafeAreaView,
  Image,
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {commonStyles, textStyles} from '../../styles';
import CustomHeader from '../../components/SearchHeader';
import ExpansesItem from './ExpansesCard';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../constants/theme';
import {MainRoutes} from '../../constants/routes';
import {useSelector} from 'react-redux';
import Spacer from '../../components/Spacer';
import {
  AcceptOrRejectTimeSheetOrExpenses,
  getUnApprovedTimeSheetExpensesListByApprooverID,
} from '../../api';

import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MODULE_ID = '54';
const UnApprovedExpansesScreen = ({navigation, route}) => {
  const [filterData, setFilterData] = useState([]);
//  let isShowSearchBox = route?.params?.isAddSearchBox !=undefined ? route.params.isAddSearchBox :true;
  let isShowFilter = route?.params?.isShowFilter !=undefined ? route.params.isShowFilter :true;
  const {user} = useSelector(state => state.LoginReducer);

  const {status} = useSelector(state => state.StatusReducer);
  const [local_status] = useState(
    status
      .filter(
        obj =>
          obj.module_id === MODULE_ID && obj.module_status_name === 'Submitted',
      )
      .map(o => o.module_status_id)[0],
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState('');
  useEffect(() => {
    getExpensesList();
    return () => {
      setFilterData(data);
    };
  }, []);

  const FilterByTitle = title => {
    //  let item = data[0].job_title?.toLowerCase();
    // console.log('title',title,item);
    let lowerTitle = title.toLowerCase();

    // console.log('item?.created_date',item?.created_date,lowerTitle)
    // let draft_data = data?.filter(
    //   item =>
    //     item?.job_title?.toLowerCase()?.includes(lowerTitle)
    //     ||item?.candidate_id?.toLowerCase()?.includes(lowerTitle)
    //      || item?.module_status_id?.toLowerCase()?.includes(lowerTitle) ||
    //     item?.candidate_name?.toLowerCase()?.includes(lowerTitle)
    //     || item?.created_date?.toLowerCase()?.includes(lowerTitle)
    //     || item?.expense_report_title?.toLowerCase()?.includes(lowerTitle)
    //     || item?.module_status_name?.toLowerCase()?.includes(lowerTitle)
    //     || item?.total_amount?.toLowerCase()?.includes(lowerTitle)
    //     || item?.type?.toLowerCase()?.includes(lowerTitle),
    // );

    let draft_data = data?.filter(item => {
    
      // console.log('FATIGUE',item);
      // moment(item?.created_date).format("DD-MMM-YYYY").toLowerCase())
      let xitem = (
        item?.job_title?.toLowerCase()?.includes(lowerTitle) ||
       
        item?.candidate_name?.toLowerCase()?.includes(lowerTitle) ||
        (moment(item.created_date).format('DD-MMM-YYYY'))?.toLowerCase()?.includes(lowerTitle) ||
        item?.expense_report_title?.toLowerCase()?.includes(lowerTitle) ||
        item?.module_status_name?.toLowerCase()?.includes(lowerTitle) ||
        parseFloat(item.total_amount).toFixed(2)?.toLowerCase()?.includes(lowerTitle) 
         || item?.type?.toLowerCase()?.includes(lowerTitle)
      );

      // console.log(xitem);



      return xitem;
    });

   console.log(draft_data);
    setFilterData(draft_data);
    return;
   
  };
  getExpensesList = () => {
    setLoading(true);

    getUnApprovedTimeSheetExpensesListByApprooverID(
      user.id,
      '2',
      user.account_id,
      local_status,
    )
      .then(response => {
       
        if (response.status == 200) {
         
          let organizeData = response?.data?.result?.sort(
            (a, b) => {

              return new Date(b.created_date) - new Date(a.created_date)
            }
          );
         // console.log('WAHEEDA', response?.data);
          setData(organizeData);
          // setData(response.data.result);
          setFilterData(organizeData);
          setLoading(false);
        } else {
          console.log('Some Error', response.status);
          setError(true);
          setLoading(false);
          setErrorMessage(
            'Some Error Ocured with status code' + response.status,
          );
        }
      })
      .catch(error => {
        console.log(error, 'error');

        setLoading(false);
        setError(true);
        setLoading(false);
        setErrorMessage('Some Error Ocured with status code 200');
      });
  };

  const renderItem = ({item}) => (
    <ExpansesItem
      item={item}
      billtype={item.expense_report_title}
      type={(item.type === 'employee') ? item.candidate_name : item.username}
      status={item.module_status_name}
      date={moment(item.created_date).format('DD-MMM-YYYY')}
      job={item.job_title}
      status_colour_code={item.status_colour_code}
      price={`$ ${parseFloat(item.total_amount).toFixed(2)}`}
      List={() => {
        navigation.navigate(MainRoutes.ExpenseDetailsScreen, {item,
          onAccept: (id)=> AccpetExpense(id),
          OnRejected:(id)=>RejectExpense(id)})} }
      
    />
  );
  const onStatusHandler = useCallback((expense_id, statusCode) => {
    Alert.alert(
      'Attention!',
      `Are you sure want to ${statusCode === 0 ? 'Reject' : 'Approve'}?`,
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: () => {
            statusCode === 1
              ? AccpetExpense(expense_id)
              : RejectExpense(expense_id);
          },
          style: 'cancel',
        },
      ],
    );
  }, []);
  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.HiddenBtnView}>
        <Pressable
          style={styles.Acceptbtn}
          onPress={() => onStatusHandler(data.item.expense_id, 1)}>
          <Ionicons name="checkmark" color={'#fff'} size={scale(22)} />
          <Text style={{...textStyles.Label, color: '#fff'}}>Approve</Text>
        </Pressable>
        <Pressable
          style={styles.RejectBtn}
          onPress={() => onStatusHandler(data.item.expense_id, 0)}>
          <MaterialIcons name="cancel" color={'#fff'} size={scale(22)} />
          <Text style={{...textStyles.Label, color: '#fff'}}>Reject</Text>
        </Pressable>
      </View>
    );
  };

  const AccpetExpense = id => {
    let module_status_id = status
      .filter(
        obj =>
          obj.module_id === MODULE_ID && obj.module_status_name === 'Approved',
      )
      .map(o => o.module_status_id)[0];
    AcceptOrRejectTimeSheetOrExpenses(
      user.account_id,
      user.id,
      '2',
      id,
      module_status_id,
    )
      .then(response => {
        if (response.status) {
          getExpensesList();
          alert('Expense request accepted successfully');
        } else {
          alert('Error While Accepting');
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const RejectExpense = id => {
    let module_status_id = status
      .filter(
        obj =>
          obj.module_id === MODULE_ID && obj.module_status_name === 'Rejected',
      )
      .map(o => o.module_status_id)[0];
    AcceptOrRejectTimeSheetOrExpenses(
      user.account_id,
      user.id,
      '2',
      id,
      module_status_id,
    )
      .then(response => {
        if (response.status) {
          getExpensesList();
          alert('Expense request rejected successfully');
        } else {
          alert('Error While Rejecting');
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <CustomStatusBar />
        <SafeAreaView style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={false}
            SearchPress={text => FilterByTitle(text)}
            // SearchPress={() => alert("Search Press")}
            // NotificationPress={() => alert("NotificationPress")}
            // FilterPress={(data) => alert(data)}
            onPress={() => navigation.goBack()}
            title={'UnApproved Expenses'}
            // isShowSearch={true}
            isShowFilter={isShowFilter}
          />
          <Spacer height={verticalScale(100)} />
          <ActivityIndicator size={'large'} color={colors.dark_primary_color} />
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
          SearchPress={text => FilterByTitle(text)}
          NotificationPress={() => alert('NotificationPress')}
          FilterPress={data => alert(data)}
          onPress={() => navigation.goBack()}
          title={'UnApproved Expenses'}
          filterOptionOne="Submitted"
          filterOptionTwo="Unsubmitted"
          // isShowSearch={isShowSearchBox}
          isShowFilter={isShowFilter}
        />

        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={filterData}
          renderItem={renderItem}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={80}
          initialNumToRender={20}
          windowSize={35}
          bounces={false}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: verticalScale(150),
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {error ? (
                  <Image
                    source={require('../../assets/images/error.gif')}
                    style={{
                      width: verticalScale(150),
                      height: verticalScale(150),
                      resizeMode: 'contain',
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/norecord.gif')}
                    style={{
                      width: verticalScale(150),
                      height: verticalScale(150),
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </View>
            );
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default UnApprovedExpansesScreen;

const styles = StyleSheet.create({
  HiddenBtnView: {
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(20),
  },
  Acceptbtn: {
    paddingVertical: 5,
    backgroundColor: 'green',
    flex: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 0,
    width: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  RejectBtn: {
    paddingVertical: 5,
    flex: 1,
    backgroundColor: colors.delete_icon,
    borderRadius: 5,
    borderWidth: 0,
    justifyContent: 'center',
    width: scale(100),
    alignItems: 'center',
  },
});
