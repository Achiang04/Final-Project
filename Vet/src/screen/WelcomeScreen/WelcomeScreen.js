import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Buttons from '../../reusable/Button/Buttons';
import {wp} from '../../reusable/Responsive/dimen';

export default function WelcomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/image/Vet.png')}
      />
      <View style={styles.button}>
        <Buttons
          width={wp(325)}
          bgColor={'#FDCB5A'}
          text={'Login'}
          borColor={'#FDCB5A'}
          color={'#1A3150'}
          press={() => navigation.replace('LoginScreen')}
        />
      </View>
      <Buttons
        width={wp(325)}
        bgColor={'#fff'}
        text={'Register'}
        borColor={'#1A3150'}
        color={'#875C25'}
        press={() => navigation.replace('RegisScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1A3150',
  },
  image: {
    marginTop: wp(150),
    marginBottom: wp(50),
    width: wp(200),
    height: wp(200),
    resizeMode: 'contain',
  },
  button: {
    paddingBottom: 25,
  },
});
