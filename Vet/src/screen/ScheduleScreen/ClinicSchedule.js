import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import Header from '../../reusable/Header/Header';
import DoctorAuth from './DoctorAuth';
import DoctorCard1 from '../../reusable/DoctorCard/DoctorCard1';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function ClinicSchedule(props) {
  const [doctor, setDoctor] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const getDoctor = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await Axios.get(
        `https://vet-booking.herokuapp.com/clinic/veterinary/`,
        {
          headers: {
            access_token: token,
          },
        },
      );
      setDoctor(response.data.data.veterinaries);
      setLoading(false);
    } catch (error) {}
  };

  const addDoctor = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      await Axios.post(
        `https://vet-booking.herokuapp.com/clinic/veterinary/${doctorId}`,
        null,
        {
          headers: {
            access_token: token,
          },
        },
      );
      getDoctor();
    } catch (error) {}
  };

  useEffect(() => {
    getDoctor();
    return () => {
      getDoctor();
    };
  }, []);

  const modalOpen = () => {
    setVisible(true);
  };
  const modalClose = () => {
    setVisible(false);
  };
  const goBack = () => {
    navigation.goBack();
  };

  const RenderDokter = (item) => {
    const items = item.item.item;
    return (
      <DoctorCard1
        nama={items.name}
        gambar={{uri: items.image}}
        press={() =>
          navigation.navigate('DoctorSchedule', {
            id: items._id,
            nama: items.name,
            gambar: items.image,
          })
        }
      />
    );
  };

  let DoctorList;
  if (doctor == 0) {
    DoctorList = (
      <Image
        style={styles.images}
        source={require('../../assets/image/noDoctor.png')}
      />
    );
  } else {
    DoctorList = (
      <FlatList
        data={doctor}
        keyExtractor={(item) => item._id}
        renderItem={(item) => <RenderDokter item={item} />}
      />
    );
  }
  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          style={styles.indicator}
          source={require('../../assets/image/LOADING.gif')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header press={goBack} name={'Previous'} icon="arrow-left" />
      <View style={styles.box}>
        <Text style={styles.text}>Doctor List</Text>
      </View>
      <View>{DoctorList}</View>
      <TouchableOpacity style={styles.doctor} onPress={modalOpen}>
        <Text style={styles.text1}>Add {'\n'} Doctor</Text>
        <Image
          style={styles.vet}
          source={require('../../assets/image/veterinary.png')}
        />
      </TouchableOpacity>

      <DoctorAuth
        visible={visible}
        text={(value) => setDoctorId(value)}
        value={doctorId}
        modal={() => {
          modalClose(), setDoctorId('');
        }}
        press={() => {
          addDoctor(), console.log('docterid di pree', doctorId), modalClose();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accordion: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  block: {
    height: 500,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: wp(35),
    marginBottom: wp(10),
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  },
  doctor: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp(115),
    height: wp(45),
    paddingHorizontal: wp(20),
    marginVertical: hp(15),
    borderRadius: 5,
    backgroundColor: '#E0E9F5',
    flexDirection: 'row-reverse',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  vet: {
    width: wp(27.5),
    height: wp(27.5),
  },
  text1: {
    textAlign: 'center',
    color: '#1A3150',
    fontSize: 15,
    fontWeight: '700',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  indicator: {
    width: 250,
    height: 250,
    marginTop: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  images: {
    width: wp(250),
    height: wp(250),
    alignSelf: 'center',
    justifyContent: 'center',
    opacity: 0.4,
  },
});
