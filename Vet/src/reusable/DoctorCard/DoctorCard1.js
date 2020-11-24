import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function DoctorCard1(props) {
  return (
    <TouchableOpacity onPress={props.press}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={props.gambar} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text2} numberOfLines={1}>
            {props.nama}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingLeft: wp(5),
    marginVertical: hp(5),
    marginBottom: wp(8),
    width: wp(335),
    height: hp(70),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  image: {
    width: wp(50),
    height: wp(50),
    borderRadius: 50,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: hp(20),
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp(15),
  },
  text1: {
    fontSize: 12,
    color: '#875C25',
  },
  text2: {
    fontSize: 16,
    width: wp(240),
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 12,
  },
});
