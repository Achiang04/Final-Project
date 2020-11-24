import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('WelcomeScreen'));
    }, 3000);
  });
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/image/Vet.gif')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1A3150',
  },
  imageContainer: {
    alignSelf: 'center',
  },
  image: {
    width: responsiveWidth(70),
    height: responsiveHeight(85),
    resizeMode: 'contain',
  },
  text1: {
    color: '#FDCB5A',
    fontSize: 25,
    opacity: 0.9,
  },
  text2: {
    color: '#FDCB5A',
    alignSelf: 'center',
    opacity: 0.8,
  },
});
