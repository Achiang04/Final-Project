import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Header from '../../reusable/Header/Header1';
import AppointCard from '../../reusable/AppointCard/AppointCard';
import AppointCard1 from '../../reusable/AppointCard/AppointCard1';
import ClinicCard1 from '../../reusable/ClinicCard/ClinicCard1';
import ClinicCard2 from '../../reusable/ClinicCard/ClinicCard2';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function NotifScreen() {
  const [appointmentPatient, setAppointmentPatient] = useState([]);
  const [appointmentClinic, setAppointmentClinic] = useState([]);
  const [appointmentDocter, setAppointmentDocter] = useState([]);
  const [historyPatient, setHistoryPatient] = useState([]);
  const [historyClinic, setHistoryClinic] = useState([]);
  const [historyDocter, setHistoryDocter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigation = useNavigation();

  const getAppointmentPatient = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        'https://vet-booking.herokuapp.com/reservation/appointment-patient',
        {
          headers: {
            access_token: value,
          },
        },
      );
      setAppointmentPatient(response.data.data);
      setLoading(false);
    } catch (error) {}
  };

  const getAppointmentDocter = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        'https://vet-booking.herokuapp.com/reservation/appointment-vet',
        {
          headers: {
            access_token: value,
          },
        },
      );
      setAppointmentDocter(response.data.data);
      setLoading(false);
    } catch (error) {}
  };

  const getAppointmentClinic = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        'https://vet-booking.herokuapp.com/reservation/appointment-clinic',
        {
          headers: {
            access_token: value,
          },
        },
      );
      setAppointmentClinic(response.data.data);
      setLoading(false);
    } catch (error) {}
  };

  const getHistoryPatient = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        'https://vet-booking.herokuapp.com/reservation/history-patient',
        {
          headers: {
            access_token: value,
          },
        },
      );
      setHistoryPatient(response.data.data);
      setLoading(false);
    } catch (error) {}
  };

  const getHistoryClinic = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        'https://vet-booking.herokuapp.com/reservation/history-clinic',
        {
          headers: {
            access_token: value,
          },
        },
      );
      setHistoryClinic(response.data.data);
      setLoading(false);
    } catch (error) {}
  };

  const getHistoryDocter = async () => {
    setLoading(true);
    const value = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        'https://vet-booking.herokuapp.com/reservation/history-vet',
        {
          headers: {
            access_token: value,
          },
        },
      );
      setHistoryDocter(response.data.data);
      setLoading(false);
    } catch (error) {}
  };

  const getRole = async () => {
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
    } catch (error) {}
  };

  const RenderAppointmentPatient = (item) => {
    const date = item.item.tanggal;
    const jam = item.item.jam;
    return (
      <AppointCard
        tanggal={date.slice(0, 2)}
        bulan={date.slice(2)}
        lokasi={
          appointmentPatient.reservations[item.index].schedule.veterinary.name
        }
        nama={appointmentPatient.reservations[item.index].schedule.clinic.name}
        jam={jam}
        status={appointmentPatient.reservations[item.index].status}
      />
    );
  };

  const RenderAppointmentClinic = (item) => {
    const date = item.item.tanggal;
    const jam = item.item.jam;
    return (
      <AppointCard
        tanggal={date.slice(0, 2)}
        bulan={date.slice(2)}
        lokasi={
          appointmentClinic.reservations[item.index].schedule.veterinary.name
        }
        nama={appointmentClinic.reservations[item.index].patient.name}
        jam={jam}
        status={appointmentClinic.reservations[item.index].status}
      />
    );
  };

  const RenderAppointmentDocter = (item) => {
    let dataGender;
    let dataPetName;
    let dataType;
    let dataNama;
    if (
      appointmentDocter.reservations[item.index].animals == null ||
      appointmentDocter.reservations[item.index].animals == undefined ||
      appointmentDocter.reservations[item.index].animals == 0
    ) {
      dataGender = '';
      dataPetName = 'Rejected';
      dataType = 'gagal';
      dataNama = 'Failed';
    } else {
      dataGender = appointmentDocter.reservations[item.index].animals[0].gender;
      dataPetName = appointmentDocter.reservations[item.index].animals[0].name;
      dataType = appointmentDocter.reservations[item.index].animals[0].type;
      dataNama = appointmentDocter.reservations[item.index].patient.name;
    }

    return (
      <AppointCard1
        patientName={dataNama}
        gender={dataGender}
        petName={dataPetName}
        type={dataType}
        status={appointmentDocter.reservations[item.index].status}
        reservationId={appointmentDocter.reservations[item.index]._id}
        onReload={() => {
          getAppointmentDocter();
        }}
      />
    );
  };

  const RenderHistoryPatient = (item) => {
    return (
      <ClinicCard1
        image={{
          uri: historyPatient.reservations[item.index].schedule.clinic.image,
        }}
        kota={
          historyPatient.reservations[item.index].schedule.clinic.clinic.city
        }
        nama={historyPatient.reservations[item.index].schedule.clinic.name}
        dokter={
          historyPatient.reservations[item.index].schedule.veterinary.name
        }
        status={historyPatient.reservations[item.index].status}
        press={() =>
          navigation.navigate('DetailCard', {
            linkGambar: {
              uri:
                historyPatient.reservations[item.index].schedule.clinic.image,
            },
            kota:
              historyPatient.reservations[item.index].schedule.clinic.clinic
                .city,
            nama: historyPatient.reservations[item.index].schedule.clinic.name,
            id:
              historyPatient.reservations[item.index].schedule.clinic.clinic
                ._id,
          })
        }
      />
    );
  };

  useEffect(() => {
    getRole();
    getAppointmentPatient();
    getAppointmentClinic();
    getAppointmentDocter();
    getHistoryPatient();
    getHistoryClinic();
    getHistoryDocter();

    const unsubscribe = navigation.addListener(() => {
      getAppointmentDocter();
      getHistoryDocter();
    });

    return () => {
      unsubscribe;
    };
  }, [navigation]);

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

  const RenderHistoryClinic = (item) => {
    return (
      <ClinicCard2
        image={{
          uri: historyClinic.reservations[item.index].schedule.veterinary.image,
        }}
        nama={historyClinic.reservations[item.index].patient.name}
        status={historyClinic.reservations[item.index].status}
        dokter={historyClinic.reservations[item.index].schedule.veterinary.name}
      />
    );
  };

  const RenderHistoryDocter = (item) => {
    return (
      <ClinicCard2
        image={{
          uri: historyDocter.reservations[item.index].schedule.clinic.image,
        }}
        nama={historyDocter.reservations[item.index].patient.name}
        status={historyDocter.reservations[item.index].status}
        dokter={historyDocter.reservations[item.index].schedule.clinic.name}
      />
    );
  };

  let historyData;
  if (userRole === 'patient') {
    if (historyPatient.reservations === 0) {
      historyData = (
        <View style={styles.data}>
          <Image
            style={styles.images}
            source={require('../../assets/image/history.png')}
          />
        </View>
      );
    }
  } else if (userRole === 'clinic') {
    if (historyClinic.reservations == 0) {
      historyData = (
        <View style={styles.data}>
          <Image
            style={styles.images1}
            source={require('../../assets/image/history.png')}
          />
        </View>
      );
    }
  } else if (userRole === 'veterinary') {
    if (historyDocter.reservations === 0) {
      historyData = (
        <View style={styles.data}>
          <Image
            style={styles.images}
            source={require('../../assets/image/history.png')}
          />
        </View>
      );
    }
  }

  let appointmentData;
  if (userRole === 'patient') {
    if (appointmentPatient.reservations == 0) {
      appointmentData = (
        <View style={styles.data}>
          <Image
            style={styles.images}
            source={require('../../assets/image/Appointment.png')}
          />
        </View>
      );
    }
  } else if (userRole === 'clinic') {
    if (appointmentClinic.reservations == 0) {
      appointmentData = (
        <View style={styles.data}>
          <Image
            style={styles.images}
            source={require('../../assets/image/Appointment.png')}
          />
        </View>
      );
    }
  } else if (userRole === 'veterinary') {
    if (appointmentDocter.reservations == 0) {
      appointmentData = (
        <View style={styles.data}>
          <Image
            style={styles.images}
            source={require('../../assets/image/Appointment.png')}
          />
        </View>
      );
    }
  }

  let viewForAppointment;
  if (userRole === 'patient') {
    viewForAppointment = (
      <FlatList
        data={appointmentPatient.times}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return <RenderAppointmentPatient index={index} item={item} />;
        }}
      />
    );
  } else if (userRole === 'clinic') {
    viewForAppointment = (
      <FlatList
        data={appointmentClinic.times}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return <RenderAppointmentClinic index={index} item={item} />;
        }}
      />
    );
  } else if (userRole === 'veterinary') {
    viewForAppointment = (
      <FlatList
        data={appointmentDocter.times}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return <RenderAppointmentDocter index={index} item={item} />;
        }}
      />
    );
  }

  let viewForHistory;
  if (userRole === 'patient') {
    viewForHistory = (
      <FlatList
        data={historyPatient.times}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return <RenderHistoryPatient index={index} item={item} />;
        }}
      />
    );
  } else if (userRole === 'clinic') {
    viewForHistory = (
      <FlatList
        data={historyClinic.times}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return <RenderHistoryClinic index={index} item={item} />;
        }}
      />
    );
  } else if (userRole === 'veterinary') {
    viewForHistory = (
      <FlatList
        data={historyDocter.times}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return <RenderHistoryDocter index={index} item={item} />;
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header bgColor="#1A3150" name="Notifications" />
      <ScrollView>
        <View style={styles.appointContainer}>
          <Text style={styles.appointment}>My Appointment</Text>
          <ScrollView nestedScrollEnabled={true}>
            {viewForAppointment}
            {appointmentData}
          </ScrollView>
        </View>
        <View style={styles.historyContainer}>
          <Text style={styles.history}>History</Text>
          <ScrollView nestedScrollEnabled={true}>
            {viewForHistory}
            {historyData}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appointContainer: {
    height: wp(330),
  },
  appointment: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: hp(10),
    paddingLeft: wp(20),
  },
  historyContainer: {
    height: wp(400),
  },
  history: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: wp(20),
  },
  data: {
    padding: wp(25),
  },
  indicator: {
    width: wp(250),
    height: wp(250),
    alignSelf: 'center',
  },
  images: {
    width: wp(200),
    height: wp(175),
    opacity: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  images1: {
    width: wp(250),
    height: wp(175),
    opacity: 0.55,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
