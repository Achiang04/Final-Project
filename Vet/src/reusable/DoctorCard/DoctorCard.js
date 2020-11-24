import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {wp} from '../../reusable/Responsive/dimen';

export default function DoctorCard(props) {
  return (
    <TouchableOpacity onPress={() => props.press}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={props.gambar} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text2}>{props.nama}</Text>
          <Text style={styles.text3}>{props.tahun}</Text>
        </View>
        <View style={styles.iconContainer}>
          {isClicked ? (
            <MaterialIcons
              style={styles.icon}
              name={'check-circle'}
              size={25}
              color={'black'}
            />
          ) : (
            <MaterialIcons
              style={styles.icon}
              name={'check-circle'}
              size={25}
              color={'grey'}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: wp(5),
    marginBottom: wp(8),
    width: wp(380),
    height: wp(90),
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
  imageContainer: {
    padding: 15,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  iconContainer: {
    padding: 30,
    position: 'absolute',
    right: -10,
  },
  text1: {
    fontSize: 12,
    color: '#875C25',
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 12,
  },
});
