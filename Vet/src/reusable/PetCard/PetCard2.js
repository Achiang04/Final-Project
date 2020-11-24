import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PetCard1(props) {
  return (
    <TouchableOpacity onPress={props.press}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <MaterialCommunityIcons
            name={props.name}
            size={props.size}
            color={props.color}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.gender}</Text>
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
    marginHorizontal: 10,
    backgroundColor: '#E0E9F5',
  },
  imageContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  image: {
    width: 35,
    height: 35,
  },
  text: {
    fontSize: 14,
  },
  textContainer: {
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
});
