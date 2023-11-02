import React, {useEffect, useState, useCallback} from 'react';
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
import LeavesCard from './LeavesCard';
import {scale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../constants/theme';
import {useSelector} from 'react-redux';
import Spacer from '../../components/Spacer';
import moment from 'moment';
import {getUnapprovedLeavesList, AcceptorRejectLeaves} from '../../api';
import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const UnApprovedLeavesScreens = ({navigation, route}) => {
  // let isShowSearchBox = route?.params?.isAddSearchBox !=undefined ? route.params.isAddSearchBox :true;
  let isShowFilter =
    route?.params?.isShowFilter != undefined ? route.params.isShowFilter : true;
  const {
    user,
    user_type,
    placement_approver_module_id,
    placement_approver_module_pk_id,
  } = useSelector(state => state.LoginReducer);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [error_message, setErrorMessage] = useState('');
  const [accept_loading, setAcceptLoading] = useState(false);
  const [reject_loading, setRejectLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    getLeavesListLocal();
    () => {
      setFilterData(data);
    };
  }, []);

  const FilterByTitle = title => {
    let lowerTitle = title.toLowerCase();
    let draft_data = data?.filter(item => {
      let itemStatus = '';
      if (item?.status === '0') {
        itemStatus = 'Pending';
      } else if (item?.status === '1') {
        itemStatus == 'Approved';
      } else {
        itemStatus = 'Declined';
      }
      itemStatus = itemStatus?.toLowerCase();
      console.log('----------->', item?.status, itemStatus);
      return (
        item?.policy_name?.toLowerCase()?.includes(lowerTitle) ||
        item?.policy_name?.toLowerCase()?.includes(lowerTitle) ||
        item?.account_id?.toLowerCase()?.includes(lowerTitle) ||
        item?.approved_by?.toLowerCase()?.includes(lowerTitle) ||
        item?.approved_by_module_id?.toLowerCase()?.includes(lowerTitle) ||
        moment(item?.approved_date)
          .format('DD-MMM-YYYY HH:mm A')
          .toLowerCase()
          .includes(lowerTitle) ||
        item?.approver_id?.toLowerCase()?.includes(lowerTitle) ||
        item?.candidate_name?.toLowerCase()?.includes(lowerTitle) ||
        item?.city?.toLowerCase()?.includes(lowerTitle) ||
        moment(item?.end_date)
          .format('DD-MMM-YYYY')
          .toLowerCase()
          .includes(lowerTitle) ||
        item?.is_half_day?.toLowerCase()?.includes(lowerTitle) ||
        item?.is_paid?.toLowerCase()?.includes(lowerTitle) ||
        item?.leave_policy_id?.toLowerCase()?.includes(lowerTitle) ||
        item?.leave_request_id?.toLowerCase()?.includes(lowerTitle) ||
        item?.maximum_leaves?.toLowerCase()?.includes(lowerTitle) ||
        item?.module_id?.toLowerCase()?.includes(lowerTitle) ||
        item?.requested_by?.toLowerCase()?.includes(lowerTitle) ||
        moment(item?.requested_date)
          .format('DD-MMM-YYYY hh:mm a')
          .toLowerCase()
          ?.includes(lowerTitle) ||
        item?.requested_hours?.toLowerCase()?.includes(lowerTitle) ||
        `${moment(item?.start_date).format('DD-MM-YYYY')} - ${moment(
          item?.end_date,
        ).format('DD-MM-YYYY')}`
          .toLowerCase()
          ?.includes(lowerTitle) ||
        item?.state_name?.toLowerCase()?.includes(lowerTitle) ||
        itemStatus?.includes(lowerTitle) ||
        moment(item?.updated_date)
          .format('DD-MMM-YYYY')
          .toLowerCase()
          .includes(lowerTitle) ||
        item?.username?.toLowerCase()?.includes(lowerTitle) ||
        item?.approver_comments?.toLowerCase()?.includes(lowerTitle) ||
        item?.comments?.toLowerCase()?.includes(lowerTitle)
      );
    });
    // let draft_data = data?.filter(item =>
    //   item?.policy_name?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.policy_name?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.account_id?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.approved_by?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.approved_by_module_id?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.approved_date?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.approver_id?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.candidate_name?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.city?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.end_date?.toLowerCase()?.match(regex)
    //   ||  item?.is_half_day?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.is_paid?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.leave_policy_id?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.leave_request_id?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.maximum_leaves?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.module_id?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.requested_by?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.requested_date?.toLowerCase()?.match(regex)
    //   ||  item?.requested_hours?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.start_date?.toLowerCase()?.match(regex)
    //   ||  item?.state_name?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.status?.toLowerCase()?.includes(lowerTitle)

    //   ||  item?.updated_date?.toLowerCase()?.match(regex)

    //   ||  item?.username?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.approver_comments?.toLowerCase()?.includes(lowerTitle)
    //   ||  item?.comments?.toLowerCase()?.includes(lowerTitle)
    //  ,
    // );

    // console.log(draft_data);
    setFilterData(draft_data);
  };

  getLeavesListLocal = () => {
    setLoading(true);
    getUnapprovedLeavesList(
      user.id,
      user.account_id,
      '2',
      user_type,
      placement_approver_module_id,
      placement_approver_module_pk_id,
    )
      .then(response => {
        console.log('response', response);

        if (response.status == 200) {
          setData(response.data.data);
          setFilterData(response.data.data);
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
  const onStatusHandler = useCallback((leave_request_id, statusCode) => {
    Alert.alert(
      'Attention!',
      `Are you sure you want to ${statusCode === 0 ? 'Reject' : 'Approve'}?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            statusCode === 1
              ? AccpetExpense(leave_request_id)
              : RejectLeaves(leave_request_id);
          },
          style: 'cancel',
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  }, []);
  const renderItem = ({item}) => <LeavesCard item={item} />;

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.HiddenBtnView}>
        <Pressable
          style={styles.Acceptbtn}
          onPress={() => onStatusHandler(data.item.leave_request_id, 1)}>
          <Ionicons name="checkmark" color={'#fff'} size={scale(22)} />
          <Text style={{...textStyles.Label, color: '#fff'}}>Approve</Text>
        </Pressable>
        <Pressable
          style={styles.RejectBtn}
          onPress={() => onStatusHandler(data.item.leave_request_id, 0)}>
          <MaterialIcons name="cancel" color={'#fff'} size={scale(22)} />
          <Text style={{...textStyles.Label, color: '#fff'}}>Reject</Text>
        </Pressable>
        {/* {accept_loading ? (
          <Pressable
            disabled={true}
            style={styles.Acceptbtn}
            onPress={() => AccpetExpense(data.item.leave_request_id)}>
            <ActivityIndicator size={'large'} color={colors.white} />
          </Pressable>
        ) : (
          <Pressable
            style={styles.Acceptbtn}
            onPress={() => AccpetExpense(data.item.leave_request_id)}>
            <Ionicons name="checkmark" color={'#fff'} size={scale(22)} />
            <Text style={{...textStyles.Label, color: '#fff'}}>Approve</Text>
          </Pressable>
        )}
        {reject_loading ? (
          <Pressable disabled={true} style={styles.RejectBtn}>
            <ActivityIndicator size={'large'} color={colors.white} />
          </Pressable>
        ) : (
          <Pressable
            style={styles.RejectBtn}
            onPress={() => RejectLeaves(data.item.leave_request_id)}>
            <MaterialIcons name="cancel" color={'#fff'} size={scale(22)} />
            <Text style={{...textStyles.Label, color: '#fff'}}>Reject</Text>
          </Pressable>
        )} */}
      </View>
    );
  };

  const AccpetExpense = id => {
    setAcceptLoading(true);
    AcceptorRejectLeaves(user.id, user.account_id, '1', id)
      .then(response => {
        setAcceptLoading(false);
        if (response.status === 200) {
          getLeavesListLocal();
          alert('Leave request accepted successfully');
        } else {
          alert('Some error in accepting leave request');
        }
      })
      .catch(err => {
        setAcceptLoading(false);
        alert('Some error in accepting leave request');
      });
  };

  const RejectLeaves = id => {
    setRejectLoading(true);
    AcceptorRejectLeaves(user.id, user.account_id, '2', id)
      .then(response => {
        setRejectLoading(false);
        if (response.status === 200) {
          getLeavesListLocal();
          alert('Leave request rejected successfully');
        } else {
          alert('Some error in rejecting leave request');
        }
      })
      .catch(err => {
        setRejectLoading(false);
        alert('Some error in rejecting leave request');
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
            // isShowSearch={true}
            isShowFilter={isShowFilter}
            SearchPress={text => FilterByTitle(text)}
            // SearchPress={() => alert("Search Press")}
            NotificationPress={() => alert('NotificationPress')}
            FilterPress={data => alert(data)}
            onPress={() => navigation.goBack()}
            title={'UnApproved Leaves'}
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
          // isShowSearch={isShowSearchBox}
          isShowFilter={isShowFilter}
          //  SearchPress={() => alert("Search Press")}
          NotificationPress={() => alert('NotificationPress')}
          FilterPress={data => alert(data)}
          onPress={() => navigation.goBack()}
          title={'UnApproved Leaves'}
        />

        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={filterData} //data
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

export default UnApprovedLeavesScreens;

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
