import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {wp} from '../../reusable/Responsive/dimen';

export default function Header1(props) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.bgColor,
        },
      ]}>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: wp(40),
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
