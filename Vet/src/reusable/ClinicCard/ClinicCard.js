import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function ClinicCard(props) {
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground style={styles.image} source={props.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{props.kota}</Text>
        <Text numberOfLines={1} style={styles.text2}>
          {props.nama}
        </Text>
        <Text style={styles.text3}>{props.jalan}</Text>
        <TouchableOpacity style={styles.button} onPress={props.press}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: wp(330),
    height: wp(110),
    borderRadius: 5,
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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: wp(110),
    height: wp(110),
  },
  textContainer: {
    padding: wp(10),
  },
  text1: {
    paddingTop: hp(10),
    fontSize: 12,
    fontFamily: 'Roboto-bold',
    fontWeight: '700',
    color: '#875C25',
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A3150',
  },
  button: {
    width: wp(200),
    height: wp(30),
    borderRadius: 2,
    marginVertical: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDCB5A',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
