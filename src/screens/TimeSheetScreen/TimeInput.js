import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {AppScreenWidth} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {textStyles} from '../../styles/textStyles';
import moment from 'moment';
const TimeInput = ({item, index, editable, setHours}) => {
  const [error, isError] = useState(false);
  return (
    <View style={styles.mainview}>
      <Text style={styles.label}>
        {moment(item.date).format('MMM-DD-YYYY')}
      </Text>

      <TextInput
        keyboardType={'numeric'}
        placeholder={editable ? '0.0' : 'Disable'}
        placeholderTextColor={'rgba(255,255,255,.5)'}
        // placeholderbackgroundColor = {'grey'}
        value={item.hours}
        editable={editable}
        onChangeText={data => {
          if (data < 0 || data > 24) {
            isError(true);
            setHours(index, data);
          } else {
            isError(false);
            setHours(index, data);
          }
        }}
        style={{
          ...styles.textinput,
          backgroundColor: editable ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,1)',
        }}
      />
      {error && (
        <Text style={{...styles.label, color: colors.delete_icon}}>
          Invalid
        </Text>
      )}
    </View>
  );
};
export default TimeInput;
const styles = StyleSheet.create({
  textinput: {
    backgroundColor: 'rgba(0,0,0,1)',
    paddingTop: 0,
    paddingBottom: 0,
    width: AppScreenWidth / 3,
    marginTop: scale(5),
    color: '#fff',
    textAlign: 'center',
    height: scale(30),
    fontFamily: fonts.Regular,
    borderRadius: 5,
  },
  mainview: {
    width: AppScreenWidth / 3 + scale(10),
    marginTop: scale(5),
    marginRight: scale(5),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.3)',
    borderRadius: 5,
    padding: scale(5),
  },
  label: {
    ...textStyles.title,
    alignSelf: 'center',
    backgroundColor: '#0000',
  },
});
