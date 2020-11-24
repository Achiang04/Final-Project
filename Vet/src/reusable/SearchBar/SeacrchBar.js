import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import {wp} from '../../reusable/Responsive/dimen';
export default function SeacrchBar(props) {
  return (
    <View style={styles.container}>
      <Octicons
        style={styles.icon}
        name={'search'}
        size={wp(15)}
        color="#CACA"
      />
      <TextInput
        style={styles.textinput}
        placeholder="Search for clinic"
        onChangeText={props.onChange}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(330),
    height: wp(35),
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: wp(10),
    backgroundColor: '#f1f1f1',
  },
  icon: {
    padding: wp(10),
  },
  textinput: {
    width: wp(330),
    height: wp(35),
  },
});
