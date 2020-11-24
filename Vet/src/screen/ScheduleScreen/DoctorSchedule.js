import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import qs from 'querystring';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {wp, hp} from '../../reusable/Responsive/dimen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Button from '../../reusable/Button/Buttons';
import Modal1 from './Agree';
import Header1 from '../../reusable/Header/Header1';
import Modal from './Success';
import {ScrollView} from 'react-native-gesture-handler';

export default function DoctorSchedule(props) {
  const [doctorId, setDoctorId] = useState('');
  const [clinic, setClinic] = useState([]);
  const [response, setResponse] = useState('');
  const [modal1, setModal1] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState('');
  const [shift, setShift] = useState('');
  const [dayText, setDayText] = useState('');
  const [shiftText, setShiftText] = useState('');
  const [hari, setHari] = useState([
    {id: '1', _hari: 'Monday', index: '0'},
    {id: '2', _hari: 'Tuesday', index: '1'},
    {id: '3', _hari: 'Wednesday', index: '2'},
    {id: '4', _hari: 'Thursday', index: '3'},
    {id: '5', _hari: 'Friday', index: '4'},
    {id: '6', _hari: 'Saturday', index: '5'},
    {id: '7', _hari: 'Sunday', index: '6'},
  ]);
  const [waktu, setWaktu] = useState([
    {id: '1', _waktu: '09.00 AM - 12.00 PM', index: '0'},
    {id: '2', _waktu: '12.30 PM- 03.30 PM', index: '1'},
    {id: '3', _waktu: '04.00 PM - 07.00 PM', index: '2'},
  ]);

  const route = props.route.params;
  const navigation = useNavigation();

  const removeDoctor = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.delete(
        `https://vet-booking.herokuapp.com/clinic/veterinary/${doctorId}`,
        {
          headers: {
            access_token: token,
          },
        },
      );
      navigation.goBack();
    } catch (error) {}
  };
  const getClinic = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        'https://vet-booking.herokuapp.com/user/edit',
        {
          headers: {
            access_token: token,
          },
        },
      );
      setClinic(response.data.data.user);
      setLoading(false);
    } catch (error) {}
  };
  const handleSchedule = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const requestBody = {
      day: day,
      shift: shift,
      VetId: route.id,
    };
    const config = {
      headers: {
        access_token: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    await axios
      .post(
        `https://vet-booking.herokuapp.com/clinic/add`,
        qs.stringify(requestBody),
        config,
      )
      .then((result) => {
        setResponse(result.data.success);
      })
      .catch((err) => {});
  };

  const updateOnPressDay = (index) => {
    const WarnaDay = hari.map((item) => {
      item.selected = false;
      return item;
    });
    WarnaDay[index].selected = true;
    setHari(WarnaDay);
  };

  const updateOnPressShift = (index) => {
    const WarnaShift = waktu.map((item) => {
      item.selected = false;
      return item;
    });
    WarnaShift[index].selected = true;
    setWaktu(WarnaShift);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    getClinic();
  }, []);

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

  let box;
  if (shiftText == 0 && dayText == 0) {
    box = (
      <View style={styles.textContainer}>
        <Text style={styles.text4}>Day</Text>
        <Text style={styles.text3}>Doctor Shift</Text>
      </View>
    );
  } else if (shiftText != 0 && dayText == 0) {
    box = (
      <View style={styles.textContainer}>
        <Text style={styles.text4}>Day</Text>
        <Text style={styles.text3}>{shiftText}</Text>
      </View>
    );
  } else if (shiftText == 0 && dayText != 0) {
    box = (
      <View style={styles.textContainer}>
        <Text style={styles.text4}>{dayText.slice(0, 3).toUpperCase()}</Text>
        <Text style={styles.text3}>Doctor Shift</Text>
      </View>
    );
  } else {
    box = (
      <View style={styles.textContainer}>
        <Text style={styles.text4}>{dayText.slice(0, 3).toUpperCase()}</Text>
        <Text style={styles.text3}>{shiftText}</Text>
      </View>
    );
  }

  let modalStatus;
  if (shiftText == 0 && dayText == 0) {
    modalStatus = (
      <Modal
        visible={modal}
        modal={() => closeModal()}
        press={() => closeModal()}
        text="Add day and shift"
      />
    );
  } else if (shiftText != 0 && dayText == 0) {
    modalStatus = (
      <Modal
        visible={modal}
        modal={() => closeModal()}
        press={() => closeModal()}
        text="Add day "
      />
    );
  } else if (shiftText == 0 && dayText != 0) {
    modalStatus = (
      <Modal
        visible={modal}
        modal={() => closeModal()}
        press={() => closeModal()}
        text="Add shift"
      />
    );
  } else if (response == true) {
    modalStatus = (
      <Modal
        visible={modal}
        modal={() => closeModal()}
        press={() => closeModal()}
        text="Schedule added !"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header1 bgColor="#1A3150" name="Add Doctor Schedule" />
      <ScrollView>
        <View style={styles.header}>
          <ImageBackground
            style={styles.container1}
            source={{uri: clinic.image}}>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                {
                  setDoctorId(route.id), setModal1(true);
                }
              }}>
              <MaterialCommunityIcons
                name={'account-remove'}
                size={wp(25)}
                color={'black'}
              />
            </TouchableOpacity>
            <Image style={styles.image} source={{uri: route.gambar}} />
            <View style={styles.doctorNameContainer}>
              <Text style={styles.doctorName} numberOfLines={1}>
                {route.nama}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.text1}>Choose Shift</Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={waktu}
              keyExtractor={(item) => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={item.selected ? styles.time2 : styles.time}
                  onPress={() => {
                    setShift(item.index),
                      setShiftText(item._waktu),
                      updateOnPressShift(index);
                  }}>
                  <View>
                    <Text style={styles.inside}>{item._waktu}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <Text style={styles.text1}>Choose Day</Text>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={hari}
              keyExtractor={(item) => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={item.selected ? styles.day2 : styles.day}
                  onPress={() => {
                    setDay(item.index),
                      setDayText(item._hari),
                      updateOnPressDay(index);
                  }}>
                  <View>
                    <Text style={styles.inside}>{item._hari}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={styles.box}>
          {box}

          <Button
            width={wp(100)}
            bgColor="#FDCB5A"
            borColor="#FDCB5A"
            text="Add"
            press={() => {
              handleSchedule(), setModal(true);
            }}
          />
        </View>
        <Modal1
          visible={modal1}
          cancel={() => setModal1(false)}
          delete={() => removeDoctor()}
        />
        {modalStatus}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container1: {
    justifyContent: 'center',
    width: '100%',
    height: wp(175),
  },
  image: {
    width: wp(75),
    height: wp(75),
    marginTop: wp(50),
    borderRadius: wp(50),
    alignSelf: 'center',
  },
  delete: {
    position: 'absolute',
    right: wp(15),
    top: hp(15),
  },
  doctorNameContainer: {
    alignSelf: 'center',
    padding: wp(5),
    marginVertical: wp(5),
    borderRadius: wp(5),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  doctorName: {
    fontSize: 20,
    width: wp(10),
    fontWeight: 'bold',
    width: 'auto',
    textAlign: 'center',
  },
  box: {
    position: 'relative',
    width: '100%',
    height: wp(250),
    marginTop: wp(50),
    borderTopRightRadius: wp(40),
    borderTopStartRadius: wp(40),
    bottom: 0,
    backgroundColor: '#1A3150',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 20,
    paddingLeft: wp(5),
    marginVertical: wp(15),
    fontWeight: '700',
  },

  text3: {
    fontSize: 20,
    width: wp(200),
    color: '#000',
    textAlign: 'center',
    alignSelf: 'center',
  },
  text4: {
    fontSize: 20,
    width: wp(55),
    height: wp(45),
    borderTopLeftRadius: wp(5),
    borderBottomLeftRadius: wp(5),
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: hp(12.5),
    textAlign: 'center',
    backgroundColor: '#FDCB5A',
    alignSelf: 'center',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 6.27,
  },
  textContainer: {
    width: wp(275),
    height: wp(45),
    marginVertical: wp(20),
    marginTop: hp(75),
    borderRadius: wp(5),
    backgroundColor: '#FFF',
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  inside: {
    fontSize: 15,
  },
  time: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(150),
    height: wp(40),
    marginVertical: hp(5),
    marginHorizontal: wp(5),
    borderRadius: wp(5),
    backgroundColor: '#E0E9F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 3,
  },
  time2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(150),
    height: wp(40),
    marginVertical: hp(5),
    marginHorizontal: wp(5),
    borderRadius: wp(5),
    backgroundColor: '#FDCB5A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 3,
  },
  day: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(90),
    height: wp(40),
    marginVertical: wp(5),
    marginHorizontal: wp(5),
    borderRadius: wp(5),
    backgroundColor: '#E0E9F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 3,
  },
  day2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(90),
    height: wp(40),
    marginVertical: wp(5),
    marginHorizontal: wp(5),
    borderRadius: wp(5),
    backgroundColor: '#FDCB5A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 3,
  },
  indicator: {
    width: wp(250),
    height: wp(250),
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  timeContainer: {
    marginLeft: wp(10),
  },
});
