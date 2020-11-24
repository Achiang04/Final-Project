import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function PetCard1(props) {
  return (
    <TouchableOpacity onPress={props.press}>
      <View style={[styles.container, {backgroundColor: props.bg}]}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={props.source} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.pet}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 120,
    height: 50,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#E0E9F5',
  },
  imageContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  image: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 14,
  },
  textContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
});
