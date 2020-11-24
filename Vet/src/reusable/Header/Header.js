import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.press}>
        <FontAwesome5
          style={styles.icon}
          name={props.icon}
          color={'white'}
          size={wp(17)}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: wp(45),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A3150',
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: hp(15),
  },
  icon: {
    marginLeft: hp(15),
  },
});
