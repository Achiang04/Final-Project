import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {wp, hp} from '../../reusable/Responsive/dimen';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default function TextBar(props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: props.color}]}>{props.title}</Text>
      <TextInput
        style={[styles.textBar, {color: props.color}]}
        placeholder={props.holder}
        onChangeText={props.text}
        secureTextEntry={props.entry}
        placeholderTextColor={props.color}
        keyboardType={props.keyType}
        maxLength={props.length}
        onFocus={props.focus}
        onBlur={props.blur}
        onEndEditing={props.editing}
        value={props.value}
      />
      <Entypo
        style={styles.icon}
        name={props.icon}
        size={30}
        color={props.iconColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: wp(5),
  },
  text: {
    paddingLeft: wp(20),
    alignSelf: 'flex-start',
    color: '#C2CDDB',
    paddingVertical: hp(5),
  },
  textBar: {
    width: responsiveWidth(91),
    height: wp(40),
    padding: wp(10),
    fontFamily: 'Roboto-Regular',
    borderRadius: 5,
    borderWidth: 1,
    color: '#C2CDDB',
    borderColor: '#749DD2',
  },
  icon: {
    position: 'absolute',
    left: 350,
    top: 37.5,
  },
});
