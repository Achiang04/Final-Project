import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Icon(props) {
  return (
    <TouchableOpacity onPress={props.press}>
      <MaterialCommunityIcons
        name={props.name}
        size={props.size}
        color={props.color}
      />
    </TouchableOpacity>
  );
}
