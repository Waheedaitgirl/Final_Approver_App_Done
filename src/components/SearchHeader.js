import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, fonts} from '../constants/theme';
import {scale, verticalScale} from 'react-native-size-matters';
import {AppScreenWidth, width} from '../constants/sacling';

import Animated, {
  LightSpeedInRight,
  LightSpeedOutLeft,
  FadeOutDown,
  FadeInDown,
} from 'react-native-reanimated';
import Menu, {
  renderers,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {commonStyles, textStyles} from '../styles';
import {RFValue} from 'react-native-responsive-fontsize';

// const API_Endpoints = "https://api.recruitbpm.com/expenses?account_id=1&isZapier=1";

FontAwesome.loadFont();
const {ContextMenu} = renderers;
const CustomHeader = ({
  title,
  onPress,
  NotificationPress,
  FilterPress,
  isdrawer,
  filterOptionZero = "All",
  filterOptionOne = 'Approved',
  filterOptionTwo = 'Unsubmitted',
  filterOptionThree = 'Submitted',
  SearchPress,
  isShowSearch=true,
  isShowFilter=true,
}) => {
  // Alert.alert(`${isShowSearch}`)
  const [showmenu, setShowMenu] = useState(false);
  const [show_search, setShowSearch] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fulldata, setFulldata] = useState([]);

  // useEffect(()=>{
  //   setLoading(true);
  //   fetchData(API_Endpoints);
  // },[]);

  // const fetchData = async(url)=>{
  //   try{
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     setData(json.results);

  //     console.log(json.results);
  //   } catch (error){
  //     setError(error);
  //     console.log(error);
  //   }
  // }

  // const handlesearch = query => {
  //   setSearchQuery(query);
  // };
  if (show_search) {
    return (
      <View style={{...commonStyles.hedaerWithIcons, justifyContent: 'center'}}>
        <Animated.View
          style={styles.AnimatedView}
          entering={LightSpeedInRight.duration(1000)}
          exiting={LightSpeedOutLeft.duration(1000)}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,.3)',
              justifyContent: 'center',
              alignItems: 'center',
              width: scale(35),
              height: verticalScale(35),
            }}
            onPress={() => setShowSearch(!show_search)}>
            <FontAwesome name={'search'} color={'#000'} size={scale(20)} />
          </TouchableOpacity>
          <TextInput
            placeholder={'Search Here'}
            placeholderTextColor={'#000'}
            // style={styles.TextInput}
            onChangeText = {(text) => SearchPress(text)}
            style={styles.Txtinput}
            // value={searchQuery}
            // onChangeText={queury => handlesearch(queury)}
          />

          <TouchableOpacity onPress={() => setShowSearch(!show_search)}>
            <AntDesign name={'close'} color={'#000'} size={scale(20)} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  } else {
    return (
      <View style={{...commonStyles.hedaerWithIcons}}>
        <TouchableOpacity style={styles.menuButton} onPress={onPress}>
          {isdrawer ? (
            <AntDesign
              color={colors.white}
              name="menu-fold"
              size={RFValue(24)}
            />
          ) : (
            <Entypo
              color={'#fff'}
              name="chevron-thin-left"
              size={RFValue(24)}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.LeftIconView}>
          {
            isShowSearch &&
          <TouchableOpacity onPress={() => setShowSearch(!show_search)}>
            <FontAwesome name={'search'} color={'#fff'} size={RFValue(18)} />
          </TouchableOpacity>
          }



          <TouchableOpacity onPress={() => setShowMenu(!showmenu)}>
            <Menu
              onBackdropPress={() => setShowMenu(!showmenu)}
              renderer={ContextMenu}>
              <MenuTrigger>
                {
                  
                    isShowFilter &&
                <FontAwesome
                name={'filter'}
                color={'#fff'}
                size={RFValue(18)}
                />
              }
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                  customStyles={optionStyles}
                  value={filterOptionZero}
                  onSelect={() => FilterPress(filterOptionZero)}>
                  <Text style={textStyles.Label}>{filterOptionZero}</Text>
                </MenuOption>
                
                <MenuOption
                  customStyles={optionStyles}
                  value={filterOptionOne}
                  onSelect={() => FilterPress(filterOptionOne)}>
                  <Text style={textStyles.Label}>{filterOptionOne}</Text>
                </MenuOption>
                <MenuOption
                  customStyles={optionStyles}
                  value={filterOptionThree}
                  onSelect={() => FilterPress(filterOptionThree)}>
                  <Text style={textStyles.Label}>{filterOptionThree}</Text>
                </MenuOption>
                <MenuOption
                  customStyles={optionStyles}
                  value={filterOptionTwo}
                  onSelect={() => FilterPress(filterOptionTwo)}>
                  <Text style={textStyles.Label}>{filterOptionTwo}</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={NotificationPress} >
                      <Ionicons name={"notifications"} color={"#fff"} size={scale(18)} />
                  </TouchableOpacity> */}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Txtinput: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: scale(10),
    fontFamily: fonts.Light,
    fontSize: scale(12),
    color: '#000',
    includeFontPadding: false,
    height: verticalScale(30),
    width: AppScreenWidth - scale(60),
    borderRadius: scale(5),
    backgroundColor: 'rgba(0,0,0,0)',
  },
  AnimatedView: {
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'space-between',
    paddingRight: scale(7),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(5),
    overflow: 'hidden',
    alignSelf: 'center',
    height: verticalScale(35),
    width: width - scale(10),
  },
  menuButton: {
    marginLeft: 12,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: fonts.Medium,
    fontSize: RFValue(15),
    color: colors.white,
  },
  LeftIconView: {
    flexDirection: 'row',
    width: width / 5,
    justifyContent: 'space-around',
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: '#fff',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: '#fff',
  },
  optionWrapper: {
    backgroundColor: '#fff',
    margin: 5,
  },
  optionText: {
    color: '#fff',
  },
};

const optionStyles = {
  optionTouchable: {
    underlayColor: '#fff',
    activeOpacity: 40,
  },
  optionWrapper: {
    backgroundColor: '#fff',
    margin: 5,
  },
};

export default CustomHeader;
