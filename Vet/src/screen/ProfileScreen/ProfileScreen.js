import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Modal from '../../reusable/Modal/Modal';
import Header1 from '../../reusable/Header/Header1';
import Icon from '../../reusable/Button/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {wp, hp} from '../../reusable/Responsive/dimen';
import AsyncStorage from '@react-native-community/async-storage';

export default function ProfileScreen() {
  const [userData, setUserData] = useState('');
  const [userData1, setUserData1] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    AsyncStorage.removeItem('userToken'), navigation.navigate('LoginScreen');
  };

  const handleEdit = () => {
    navigation.navigate('EditProfileScreen');
  };

  useEffect(() => {
    async function setProfile() {
      const value = await AsyncStorage.getItem('userToken');
      try {
        const response = await axios.get(
          'https://vet-booking.herokuapp.com/user/edit',
          {
            headers: {
              access_token: value,
            },
          },
        );
        setUserData(response.data.data.user);
        setUserData1(response.data.data);
        setLoading(false);
      } catch (error) {}
    }
    setProfile();
  }, []);

  const schedulePress = () => {
    navigation.navigate('ClinicSchedule', {id: userData._id});
  };

  let Schedule;
  if (userData.role === 'clinic') {
    Schedule = (
      <TouchableOpacity onPress={schedulePress}>
        <View style={styles.wrap}>
          <MaterialCommunityIcons
            name="calendar-check"
            size={wp(25)}
            color="#1A3150"
          />
          <Text style={styles.text}>Schedule</Text>
        </View>
      </TouchableOpacity>
    );
  } else if (userData.role === 'patient') {
    Schedule = (
      <TouchableOpacity onPress={() => navigation.navigate('PetList')}>
        <View style={styles.wrap}>
          <MaterialCommunityIcons name="paw" size={wp(25)} color="#1A3150" />
          <Text style={styles.text}>{userData1.totalAnimals} Pets</Text>
        </View>
      </TouchableOpacity>
    );
  } else if (userData.role === 'veterinary') {
    Schedule = (
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={styles.wrap}>
          <FontAwesome5 name="id-card" size={wp(25)} color="#1A3150" />
          <Text style={styles.text}>Doctor ID</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View
        style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
        <Image
          style={styles.indicator}
          source={require('../../assets/image/LOADING.gif')}
        />
      </View>
    );
  }

  let Roles = userData.role;
  let Roless = Roles.charAt(0).toUpperCase() + Roles.slice(1);

  return (
    <View style={styles.container}>
      <Header1 bgColor="#1A3150" name="Profile" />
      <View style={styles.card}>
        <View style={styles.info}>
          <Image style={styles.image} source={{uri: userData.image}} />
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {userData.name}
            </Text>

            <Text style={styles.number}>{userData.phone}</Text>
          </View>
          <View style={styles.edit}>
            <Icon name="pencil" size={wp(25)} color="#000" press={handleEdit} />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.wrap}>
            <FontAwesome5 name="user-alt" size={wp(23)} color="#1A3150" />
            <Text style={styles.text}>{Roless}</Text>
          </View>

          {Schedule}
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutContainer}>
          <Ionicons name="exit-outline" size={wp(30)} color="#1A3150" />
          <Text style={styles.logout}>Logout</Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={visible}
        text="Doctor ID"
        text2={userData._id}
        modal={() => setVisible(false)}
        press={() => setVisible(false)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  indicator: {
    width: wp(250),
    height: wp(250),
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  card: {
    alignSelf: 'center',
    marginVertical: hp(15),
    width: wp(335),
    height: wp(175),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  image: {
    width: wp(65),
    height: wp(65),
    borderRadius: 50,
  },

  info: {
    flexDirection: 'row',
    padding: wp(20),
    paddingLeft: wp(30),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',
  },
  textContainer: {
    paddingHorizontal: hp(15),
    padding: wp(12.5),
  },
  name: {
    fontSize: 20,
    width: wp(175),
    fontWeight: '700',
  },
  number: {
    fontSize: 14,
    color: '#1A3150',
  },
  wrap: {
    alignItems: 'center',
  },
  edit: {
    position: 'absolute',
    right: wp(20),
    top: wp(25),
  },
  logoutContainer: {
    flexDirection: 'row',

    padding: wp(10),
    paddingLeft: wp(40),
    alignSelf: 'center',
    marginVertical: wp(5),
    width: wp(335),
    height: wp(50),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logout: {
    color: '#1A3150',
    padding: wp(5),
    paddingTop: wp(5),
    fontSize: 17,
  },
});
