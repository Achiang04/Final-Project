import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function Buttons(props) {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: props.width,
            backgroundColor: props.bgColor,
            borderColor: props.borColor,
          },
        ]}
        onPress={props.press}>
        <Text
          style={{color: props.color, fontSize: hp(18), fontWeight: 'bold'}}>
          {props.text}
        </Text>
        {props.loading}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    height: wp(40),
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
