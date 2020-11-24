import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function ClinicCard1(props) {
  return (
    <View style={styles.container}>
      <View>
        <ImageBackground style={styles.image} source={props.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{props.kota}</Text>
        <Text style={styles.text2}>{props.nama}</Text>
        <Text style={styles.text4}>{props.dokter}</Text>
        <Text style={styles.text3}>{props.status}</Text>
        <TouchableOpacity style={styles.button} onPress={props.press}>
          <Text style={styles.buttonText}>Book Again</Text>
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
    paddingHorizontal: wp(10),
  },
  text1: {
    paddingTop: hp(5),
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
    height: wp(27.5),
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
