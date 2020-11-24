import React, {useEffect, useState} from 'react';
import qs from 'querystring';
import axios from 'axios';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';
import Entypo from 'react-native-vector-icons/Entypo';
import {BASE_URL} from '../../redux/Constant/general';
import {useNavigation} from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Header from '../Header/Header';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Buttons from '../Button/Buttons';

export default function DetailCard(props) {
  const [loading, setLoading] = useState(true);
  const [reservationData, setReservationData] = useState([]);
  const [jam, setJam] = useState([]);
  const [pet, setPet] = useState([]);
  const [reservationIndex, setReservationIndex] = useState('');
  const [jamIndex, setJamIndex] = useState('');
  const [tanggalPilih, setTanggalPilih] = useState('');
  const [JamPilih, setJamPilih] = useState('');
  const [userRole, setUserRole] = useState('');
  const [hasilPost, setHasilPost] = useState([]);
  const [schedulesId, setSchedulesId] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [petId, setPetId] = useState([]);
  const [docter, setDocter] = useState([]);
  const [petLoading, setPetLoading] = useState(false);
  const [docterLoading, setDocterLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [dataId, setDataId] = useState('');
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [indicator, setIndicator] = useState(false);

  const clinicId = props.route.params.id;
  const namaClinicFromHome = props.route.params.namaClinic;
  const navigation = useNavigation();

  const getRole = async () => {
    setRoleLoading(true);
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
      setUserRole(response.data.data.user.role);
      setRoleLoading(false);
    } catch (error) {}
  };

  const getReservationData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}reservation/form/${clinicId}`,
      );
      setReservationData(response.data.data.dateBooking);
      setJam(response.data.data.hour);
      setLoading(false);
    } catch (error) {}
  };

  const getPet = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(`${BASE_URL}animal/user`, {
        headers: {
          access_token: token,
        },
      });
      setPet(response.data.data.animals);
    } catch (error) {}
  };

  const removePet = async (item) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      await axios.delete(`${BASE_URL}animal/remove/${item}`, {
        headers: {
          access_token: token,
        },
      });
      getPet();
      setPetLoading(false);
    } catch (error) {}
  };

  const handleDoctor = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const requestBody = {
      dateReservation: reservationIndex,
      hourReservation: jamIndex,
    };
    const config = {
      headers: {
        access_token: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    axios
      .post(
        `${BASE_URL}reservation/choose/${clinicId}`,
        qs.stringify(requestBody),
        config,
      )
      .then((result) => {
        setHasilPost(result.data.data);
        setDocter(result.data.data.schedules);
        setReservationDate(result.data.data.reservationDate);
        setDocterLoading(false);
      })
      .catch((err) => {
        setDocterLoading(false);
      });
  };

  const getDataChat = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        'https://vet-booking.herokuapp.com/chat/',
        {
          headers: {
            access_token: token,
          },
        },
      );
      setDataId(response.data.data);
    } catch (error) {}
  };

  const handleChat = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        `https://vet-booking.herokuapp.com/chat/initiate/${clinicId}`,
        null,
        {
          headers: {
            access_token: token,
          },
        },
      );
      navigation.navigate('ChatScreen1', {
        namaClinicFromChat: namaClinicFromHome,
        roomId: dataId,
      });
    } catch (error) {}
  };

  const booking = async () => {
    if (tanggalPilih == '') {
      setAlert(true, setIndicator(false), setMessage('Choose Day'));
    } else if (JamPilih == '') {
      setAlert(true), setIndicator(false), setMessage('Choose Time');
    } else if (reservationDate == '') {
      setAlert(true), setIndicator(false), setMessage('Choose Doctor');
    } else if (petId == '') {
      setAlert(true), setIndicator(false), setMessage('Choose Pet');
    }
    const token = await AsyncStorage.getItem('userToken');
    const requestBody = {
      animalId: petId,
      dateReservation: reservationDate,
    };
    const config = {
      headers: {
        access_token: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(
        `${BASE_URL}reservation/create/${schedulesId}`,
        qs.stringify(requestBody),
        config,
      )
      .then((result) => {
        setIndicator(false);
        navigation.navigate('Booking');
      })
      .catch((err) => {
        setIndicator(false);
      });
  };

  useEffect(() => {
    getPet();
    getReservationData();
    removePet();
    getRole();
    getDataChat();

    const unsubscribe = navigation.addListener('focus', () => {
      getPet();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const handleGoBack = () => {
    props.navigation.goBack();
  };

  let dokterData1;
  if (hasilPost.schedules == undefined) {
    dokterData1 = (
      <View style={styles.data}>
        <Text style={{color: '#1A3150'}}>Choose Your Reservation</Text>
      </View>
    );
  }

  let dokterData2;
  if (hasilPost.schedules == 0) {
    dokterData2 = (
      <View style={styles.data}>
        <Text style={{color: '#1A3150'}}>
          Doctor In This Schedule Is Empty, Choose Another Schedule
        </Text>
      </View>
    );
  }

  let petData;
  if (pet == 0) {
    petData = (
      <View style={{marginLeft: hp(17)}}>
        <Text style={{color: '#1A3150'}}>Add Your Pet</Text>
      </View>
    );
  }

  const updateOnPressPet = (index) => {
    const WarnaPet = pet.map((item) => {
      item.selected = false;
      return item;
    });
    WarnaPet[index].selected = true;
    setPet(WarnaPet);
  };

  const updateOnPressDocter = (index) => {
    const WarnaDocter = docter.map((item) => {
      item.selected = false;
      return item;
    });
    WarnaDocter[index].selected = true;
    setDocter(WarnaDocter);
  };

  let chatView;
  if (userRole === 'patient') {
    chatView = (
      <View style={styles.chat}>
        <TouchableOpacity
          onPress={() => {
            handleChat();
          }}>
          <Text style={styles.textChat}>Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }

  let loader;
  if (petLoading) {
    loader = <ActivityIndicator color={'#1A3150'} size={wp(30)} />;
  }

  let loaderDocter;
  if (docterLoading) {
    loaderDocter = <ActivityIndicator color={'#1A3150'} size={wp(30)} />;
  }

  let roleLoader;
  if (roleLoading) {
    roleLoader = <ActivityIndicator color={'#1A3150'} size={wp(30)} />;
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
  let buffer;
  if (indicator) {
    buffer = <ActivityIndicator color={'#1A3150'} size={wp(20)} />;
  }

  return (
    <View style={styles.wrap}>
      <Header
        name="Previous"
        bgColor="#1A3150"
        icon="arrow-left"
        press={handleGoBack}
      />
      <ScrollView>
        <View>
          <ImageBackground
            style={styles.gambar}
            source={props.route.params.linkGambar}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.kota}>{props.route.params.kota}</Text>
          <Text style={styles.nama}>{props.route.params.nama}</Text>
          <Text style={styles.jadwal}>{props.route.params.jalan}</Text>
        </View>
        {roleLoader}
        {chatView}
        <View style={styles.containerCal}>
          <Text style={styles.waktu}>Choose Reservation</Text>
        </View>
        <FlatList
          contentContainerStyle={{marginLeft: 15}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={reservationData}
          keyExtractor={(item) => item._id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setReservationIndex(index);
                  setTanggalPilih(item);
                }}>
                <View
                  style={
                    item == tanggalPilih
                      ? styles.selectedText
                      : styles.normalText
                  }>
                  <Text>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          contentContainerStyle={{marginLeft: hp(15)}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={jam}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setJamIndex(index);
                  setJamPilih(item);
                }}>
                <View
                  style={
                    item == JamPilih ? styles.selectedText : styles.normalText
                  }>
                  <Text>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View>
          <TouchableOpacity
            style={styles.okeButton}
            onPress={() => {
              handleDoctor(), setDocterLoading(true);
            }}>
            <Text style={styles.bookBtn}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerRekom}>
          <Text style={styles.rekom}>Doctor's Recommendation</Text>
          {loaderDocter}
          {dokterData1}
          {dokterData2}
        </View>
        <View>
          <FlatList
            data={hasilPost.schedules}
            keyExtractor={(item) => item._id}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSchedulesId(item._id);
                    updateOnPressDocter(index);
                  }}>
                  <View style={styles.docterContainer}>
                    <View style={styles.docterImageContainer}>
                      <Image
                        source={{uri: item.veterinary.image}}
                        style={styles.docterImage}
                      />
                    </View>
                    <View style={styles.textDocterContainer}>
                      <Text style={styles.text2}>{item.veterinary.name}</Text>
                    </View>
                    <View style={styles.iconDocterContainer}>
                      {item.selected ? (
                        <MaterialIcons
                          style={styles.icon}
                          name={'check-circle'}
                          size={wp(20)}
                          color={'#FDCB5A'}
                        />
                      ) : (
                        <MaterialIcons
                          style={styles.icon}
                          name={'check-circle'}
                          size={wp(20)}
                          color={'grey'}
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.containerAdd}>
          <Text style={styles.rekomPet}>Your Pet's</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('AddPet')}>
            <View style={styles.containerAdd2}>
              <FontAwesome5
                style={styles.icon}
                name={'plus-circle'}
                size={wp(15)}
                color={'grey'}
              />
              <Text style={styles.add}>Add Pet</Text>
            </View>
          </TouchableOpacity>
        </View>
        {loader}
        <FlatList
          data={pet}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => {
            let petDetector;
            if (item.type == 'Dog') {
              petDetector = (
                <Image
                  style={styles.petDetector}
                  source={require('../../assets/image/dog.png')}
                />
              );
            } else {
              petDetector = (
                <Image
                  style={styles.petDetector}
                  source={require('../../assets/image/cat.png')}
                />
              );
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  setPetId(item._id);
                  updateOnPressPet(index);
                }}>
                <View
                  style={
                    item.selected
                      ? styles.containerPetSelected
                      : styles.containerPet
                  }>
                  <View style={styles.imageContainer}>{petDetector}</View>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      {item.name} / {item.gender ? 'Male' : 'Female'}
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        removePet(item._id);
                        setPetLoading(true);
                      }}>
                      <Entypo name={'cross'} size={wp(25)} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {petData}
        <View style={styles.buttonContainer}>
          <Buttons
            press={() => {
              booking();
            }}
            loading={buffer}
            text="Booking"
            bgColor="#FDCB5A"
            borColor="#FDCB5A"
            width={wp(335)}
          />
        </View>
      </ScrollView>
      <AwesomeAlert
        show={alert}
        showProgress={false}
        title="Alert"
        message={message}
        contentContainerStyle={{
          width: wp(275),
          height: wp(150),
        }}
        titleStyle={{fontSize: 25}}
        messageStyle={{fontSize: 20}}
        confirmButtonStyle={{
          width: wp(60),
          textAlign: 'center',
          height: wp(30),
        }}
        confirmButtonTextStyle={{
          fontSize: 16.5,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Close"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          setAlert(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gambar: {
    width: wp(375),
    alignSelf: 'center',
    height: wp(200),
  },
  petDetector: {
    width: wp(30),
    height: 40,
    margin: wp(5),
    marginLeft: hp(10),
  },
  container: {
    marginLeft: hp(15),
    marginTop: wp(20),
  },

  containerCal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(5),
  },
  calender: {
    marginLeft: hp(140),
  },
  containerAdd: {
    marginRight: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  containerAdd2: {
    flexDirection: 'row',
    width: wp(95),
    height: wp(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: wp(25),
    borderColor: '#FDCB5A',
  },

  kota: {
    fontSize: 15,
    color: '#875C25',
  },
  nama: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jadwal: {
    color: '#1A3150',
    marginBottom: hp(10),
  },
  rekom: {
    fontSize: 20,
    marginTop: hp(15),
  },
  containerRekom: {
    marginLeft: wp(15),
    marginVertical: wp(10),
  },
  rekomPet: {
    fontSize: 20,
    marginLeft: wp(15),
    alignSelf: 'center',
  },
  bookBtn: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  add: {
    fontSize: 15,
  },
  icon: {
    marginRight: 5,
  },
  waktu: {
    fontSize: 20,
    marginLeft: hp(15),
    marginTop: hp(10),
  },
  selectedText: {
    backgroundColor: '#FDCB5A',
    padding: wp(5),
    paddingRight: wp(15),
    paddingLeft: wp(15),
    height: wp(30),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: wp(10),
    marginBottom: wp(8),
    marginRight: hp(10),
    borderColor: '#FDCB5A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  normalText: {
    backgroundColor: 'white',
    padding: wp(5),
    paddingRight: wp(15),
    paddingLeft: wp(15),
    height: wp(30),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: wp(10),
    marginBottom: wp(8),
    marginRight: hp(10),
    backgroundColor: '#fff',
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  containerPet: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: wp(335),
    height: wp(40),
    margin: wp(5),
    marginBottom: wp(8),
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
  containerPetSelected: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: wp(335),
    height: wp(40),
    margin: wp(5),
    marginBottom: wp(8),
    borderRadius: 5,
    backgroundColor: '#FDCB5A',
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
    marginLeft: wp(10),
    justifyContent: 'center',
  },

  textContainer: {
    paddingVertical: hp(12.5),
    paddingHorizontal: wp(20),
  },
  text: {
    fontSize: 15,
  },
  iconContainer: {
    paddingVertical: wp(7.5),
    position: 'absolute',
    right: wp(20),
  },
  okeButton: {
    height: wp(35),
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(70),
    padding: wp(10),
    borderColor: '#FDCB5A',
    backgroundColor: '#FDCB5A',
    marginLeft: hp(15),
    marginTop: wp(10),
  },
  docterContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: wp(5),
    marginBottom: wp(8),
    width: wp(335),
    height: wp(70),
    borderRadius: 5,
    shadowColor: '#FDCB5A',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.62,
    elevation: 4,
  },
  docterImageContainer: {
    marginLeft: wp(5),
    justifyContent: 'center',
    marginTop: hp(4),
  },
  docterImage: {
    width: wp(45),
    height: wp(45),
    margin: wp(11),
    borderRadius: wp(50),
  },
  textDocterContainer: {
    justifyContent: 'center',
    marginLeft: wp(15),
    marginTop: hp(3),
  },
  iconDocterContainer: {
    padding: wp(25),
    position: 'absolute',
    right: wp(-5),
  },
  text1: {
    fontSize: 12,
    color: '#875C25',
  },
  data: {
    marginLeft: hp(0),
    marginVertical: wp(5),
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(75),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: wp(5), height: wp(15)},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  indicator: {
    width: wp(250),
    height: wp(250),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  chat: {
    borderWidth: 1,
    borderRadius: 5,
    padding: wp(5),
    width: wp(70),
    borderColor: '#FDCB5A',
    backgroundColor: '#FDCB5A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp(15),
    height: wp(30),
  },
  textChat: {
    fontWeight: 'bold',
  },
});
