import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function PetCard3(props) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={props.gambar} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text2} numberOfLines={1}>
            {props.nama}
          </Text>
          <Text style={styles.text3}>{props.type}</Text>
        </View>
        <TouchableOpacity onPress={props.press} style={styles.delete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: hp(5),
    marginBottom: hp(8),
    width: wp(335),
    height: wp(70),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1,
    elevation: 1,
  },
  imageContainer: {
    padding: 15,
  },
  image: {
    width: wp(45),
    height: wp(45),
    borderRadius: 50,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: hp(20),
  },
  imageContainer: {
    justifyContent: 'center',
    marginLeft: hp(15),
  },
  iconContainer: {
    padding: wp(30),
    position: 'absolute',
    right: wp(-10),
  },
  text1: {
    fontSize: 12,
    color: '#875C25',
  },
  text2: {
    width: wp(175),
    fontSize: 16,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 15,
  },
  delete: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    left: wp(260),
    width: wp(50),
    height: wp(25),
    borderRadius: 2,
    backgroundColor: '#ec5858',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1,
    elevation: 2,
  },
  deleteText: {
    textAlign: 'center',
    fontWeight: '700',
  },
});
