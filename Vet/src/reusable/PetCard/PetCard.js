import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

export default function PetCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={props.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {props.name} / {props.kelamin} / {props.type}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Entypo name={'cross'} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 380,
    height: 50,
    margin: 5,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
  imageContainer: {
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  image: {
    width: 35,
    height: 35,
  },
  textContainer: {
    paddingVertical: 12.5,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 15,
  },
  iconContainer: {
    paddingVertical: 7.5,
    position: 'absolute',
    right: 20,
  },
});
