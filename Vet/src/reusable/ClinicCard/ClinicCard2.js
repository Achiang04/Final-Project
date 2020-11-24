import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {wp} from '../../reusable/Responsive/dimen';
export default function ClinicCard2(props) {
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground style={styles.image} source={props.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text2}>Patient : {props.nama}</Text>
        <Text style={styles.text4}>Veterinary : {props.dokter}</Text>
        <Text style={styles.text3}>Status : {props.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: wp(335),
    height: wp(60),
    borderRadius: wp(5),
    marginVertical: wp(10),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.27,
    elevation: 10,
  },
  image: {
    borderTopLeftRadius: wp(5),
    borderBottomLeftRadius: wp(5),
    width: wp(60),
    height: wp(60),
  },
  textContainer: {
    padding: wp(1),
    paddingLeft: wp(5),
  },
  text1: {
    fontSize: 1,
    fontFamily: 'Roboto-bold',
    fontWeight: '700',
    color: '#875C25',
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 15,
    color: '#875C25',
  },
  text4: {
    fontSize: 15,
    color: '#1A3150',
  },
});
