import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {moderateScale} from '../../reusable/Responsive/Responsive';

export default function Header2(props) {
  <View style={styles.container}>
    <TouchableOpacity
      style={{position: 'absolute', right: moderateScale(370)}}
      onPress={props.press}>
      <FontAwesome5
        style={styles.icon}
        name={props.icon}
        color={'white'}
        size={20}
      />
    </TouchableOpacity>
    <Text style={styles.name}>{props.name}</Text>
  </View>;
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1A3150',
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    textAlign: 'center',
    marginLeft: 20,
  },
  icon: {
    marginTop: 13,
    marginLeft: 20,
  },
});
