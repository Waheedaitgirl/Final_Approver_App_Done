import React from 'react';
import {colors, fonts} from '../constants/theme';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {MainRoutes} from '../constants/routes';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {Signout} from '../store/actions/LoginActions';
import {useSelector} from 'react-redux';
const DrawerContentt = ({navigation, props}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();
  const localSignout = () => dispatch(Signout(null));
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <DrawerContentScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={{
          alignItems: 'flex-start',
          paddingTop: 0,
          marginStart: 0,
          justifyContent: 'flex-start',
        }}>
        <View style={styles.drawercontent}>
          {/* <Image
            source={require('../assets/images/avatar.png')}
            style={{
              width: scale(50),
              borderRadius: scale(100),
              height: scale(50),
              resizeMode: 'cover',
            }}
          /> */}
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={styles.textStyleHeader}>                     {user.name}</Text>
          </View>
          {/* <TouchableOpacity
                               // onPress={() => navigation.navigate(MainRoutes.EditProfileScreen) }
                                style={{
                                    position:"absolute",
                                    top:scale(10),
                                    right:scale(10)
                                }} >
                                <Entypo name="edit" color={"#fff"} size={scale(20)} />
                            </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.HomeScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <AntDesign
              name="home"
              color={colors.dark_primary_color}
              size={scale(20)}
            />
          </View>
          <Text style={styles.textStyle}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.TimeSheetListScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <AntDesign
              name="clockcircle"
              color={colors.dark_primary_color}
              size={scale(18)}
            />
          </View>
          <Text style={styles.textStyle}>Time Sheet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.ExpensesListScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <Entypo
              name="credit"
              color={colors.dark_primary_color}
              size={scale(20)}
            />
          </View>
          <Text style={{...styles.textStyle}}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.AllLeavesScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <Entypo
              name="calendar"
              color={colors.dark_primary_color}
              size={scale(20)}
            />
          </View>
          <Text style={{...styles.textStyle}}>Leaves</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => localSignout()}
        style={styles.logoutbutton}>
        <View style={{width: scale(20), height: scale(20)}}>
          <Entypo
            name="log-out"
            color={colors.dark_primary_color}
            size={scale(20)}
          />
        </View>
        <Text style={{...styles.textStyle}}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default DrawerContentt;

const styles = StyleSheet.create({
  MainContent: {
    flex: 1,
    alignSelf: 'flex-start',
    backgroundColor: 'red',
  },
  drawercontent: {
    padding: scale(10),
    flex: 1,
    width: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: scale(20),
    alignItems: 'center',
    backgroundColor: colors.dark_primary_color,
  },

  btnView: {
    marginLeft: scale(15),
    marginBottom: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutbutton: {
    marginLeft: scale(15),
    marginBottom: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    paddingBottom: scale(10),
    paddingLeft: scale(15),
    backgroundColor: '#fff',
  },
  textStyle: {
    marginLeft: scale(10),
    fontFamily: fonts.Medium,
    color: colors.text_primary_color,
  },
  textStyleHeader: {
    marginLeft: scale(10),
    fontFamily: fonts.Medium,
    fontSize: scale(10),
    color: colors.white,
  },
});
