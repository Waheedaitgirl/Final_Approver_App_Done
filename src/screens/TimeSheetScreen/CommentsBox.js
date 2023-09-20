import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  InteractionManager,
  FlatList,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import DrawLine from '../../components/DrawLine';
import {AppScreenWidth} from '../../constants/sacling';
import {fonts} from '../../constants/theme';
import {textStyles} from '../../styles/textStyles';
const CommentsBox = ({title, comments, editable = true,}) => {
  console.log("Edit Cooments",editable);
  const [text, setText] = useState(comments|| '');
  console.log([],comments);
  return (
    <View
      style={{
        marginTop: scale(5),
        width: AppScreenWidth,
        marginRight: scale(5),
        
      }}>
      <Text style={{...textStyles.smallheading, backgroundColor: '#0000'}}>
        {title}
      </Text>
      {
    
      <TextInput
     
      value={text}
      onChangeText={setText}
      editable={editable}
     // underlineColorAndroid='transparent'
      underlineColorAndroid='rgba(0,0,0,0)' 
      style={{...textStyles.Label,  color:'#000',}}
      />
    }
      {/* {comment !== null ? (
        <Text style={{...textStyles.Label, backgroundColor: '#0000'}}>
          {comment}
        </Text>
      ) : (
        <Text
          style={{
            ...textStyles.Label,
            color: 'rgba(0,0,0,.3)',
            backgroundColor: '#0000',
          }}>
          No Comments by {title}
        </Text>
      )} */}
      <DrawLine marginTop={scale(5)} />
    </View>
  );
};
export default CommentsBox;
const styles = StyleSheet.create({});
