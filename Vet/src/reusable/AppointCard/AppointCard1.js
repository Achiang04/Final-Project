import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function AppointCard1(props) {
  const reservationId = props.reservationId;

  const handleApprove = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await Axios.put(
        `https://vet-booking.herokuapp.com/reservation/approved/${reservationId}`,
        null,
        {
          headers: {
            access_token: token,
          },
        },
      );
      return response;
    } catch (error) {}
  };

  const handleReject = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await Axios.put(
        `https://vet-booking.herokuapp.com/reservation/rejected/${reservationId}`,
        null,
        {
          headers: {
            access_token: token,
          },
        },
      )
        .then((r) => {
          return r;
        })
        .catch((e) => {
          return e;
        });
    } catch (error) {}
  };

  const type = props.type;
  let imageView;
  if (type === 'Dog') {
    imageView = (
      <View style={styles.kotak}>
        <Image
          style={styles.imageView}
          source={require('../../assets/image/cat.png')}
        />
      </View>
    );
  } else if (type === 'Cat') {
    imageView = (
      <View style={styles.kotak}>
        <Image
          style={styles.imageView}
          source={require('../../assets/image/dog.png')}
        />
      </View>
    );
  } else {
    imageView = (
      <View style={styles.kotak}>
        <Ionicons name="close-outline" size={hp(50)} color="white" />
      </View>
    );
  }

  const gender = props.gender;
  let genderView;
  if (gender) {
    genderView = <Text style={styles.text4}>Male</Text>;
  } else if (gender === false) {
    genderView = <Text style={styles.text4}>Female</Text>;
  } else {
    genderView = <View></View>;
  }

  const status = props.status;
  let statusView;
  if (status === 'approved') {
    statusView = <View></View>;
  } else if (status === 'pending') {
    statusView = (
      <View style={styles.tampungIcon}>
        <TouchableOpacity
          onPress={() => {
            handleApprove();
            props.onReload();
          }}>
          <Ionicons name="checkmark-outline" size={wp(25)} color="#1A3150" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleReject();
            props.onReload();
          }}>
          <Ionicons name="close-outline" size={wp(27)} color="#1A3150" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        {imageView}
        <View>
          {statusView}
          <Text style={styles.text2}>{props.patientName}</Text>
          <Text style={styles.text3}>{props.petName}</Text>
          <View style={styles.container2}>
            <View style={styles.statusContainer}>
              {genderView}
              <Text style={styles.text6}>{props.status}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(91),
    backgroundColor: 'white',
    padding: wp(5),
    margin: wp(10),
    alignSelf: 'center',
    shadowColor: '#000',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  container2: {
    flexDirection: 'row',
  },
  kotak: {
    width: wp(60),
    height: wp(60),
    borderWidth: 1,
    backgroundColor: '#1A3150',
    borderRadius: 5,
    alignItems: 'center',
    padding: 5,
    marginLeft: 10,
  },
  text1: {
    fontSize: 20,
    color: 'white',
  },
  text2: {
    marginLeft: hp(15),
    color: '#875C25',
  },
  text3: {
    width: wp(200),
    height: wp(25),
    marginLeft: hp(15),
    color: 'black',
    fontSize: 20,

    fontWeight: 'bold',
  },
  text4: {
    marginLeft: hp(15),
    color: '#1A3150',
    fontWeight: 'bold',
    marginRight: hp(-10),
  },
  text5: {
    color: '#1A3150',
    fontWeight: 'bold',
  },
  text6: {
    marginLeft: hp(10),
    color: '#875C25',
    position: 'absolute',
    left: 200,
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tampungIcon: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    left: wp(185),
    top: hp(10),
  },
  imageView: {
    width: wp(50),
    height: wp(50),
    marginTop: hp(5),
    marginLeft: hp(3),
  },
});
