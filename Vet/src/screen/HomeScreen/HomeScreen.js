import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import PetCarousel from './PetCarousel';
import ClinicCard from '../../reusable/ClinicCard/ClinicCard';
import {BASE_URL} from '../../redux/Constant/general';
console.disableYellowBox = true;

export default function HomeScreen({navigation}) {
  const [clinic, setClinic] = useState([]);
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(true);
  const [clinicLoading, setClinicLoading] = useState(true);
  const [filterKota, setFilterKota] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [kota, setKota] = useState([
    {id: '1', lokasi: 'All'},
    {id: '2', lokasi: 'Jakarta'},
    {id: '3', lokasi: 'Semarang'},
    {id: '4', lokasi: 'Dumai'},
    {id: '5', lokasi: 'Bandung'},
    {id: '6', lokasi: 'Surabaya'},
    {id: '7', lokasi: 'Pekanbaru'},
    {id: '8', lokasi: 'Medan'},
  ]);

  const getFilterKota = async (item) => {
    try {
      let response = await fetch(`${BASE_URL}clinic/filter/?city=${item}`);
      let json = await response.json();
      setFilterKota(json.data);
      setClinicLoading(false);
    } catch (error) {}
  };

  const getClinic = async () => {
    try {
      let response = await fetch(`${BASE_URL}clinic/getAll`);
      let json = await response.json();
      setClinic(json.data);
      setClinicLoading(false);
    } catch (error) {}
  };

  const RenderKota = ({item, index}) => {
    const city = item.lokasi;
    return (
      <TouchableOpacity
        onPress={() => {
          getFilterKota(item.lokasi),
            updateOnPressKota(index),
            setClinicLoading(true);
        }}>
        <View style={item.selected ? styles.WarnaText : styles.kota}>
          <Text style={styles.textKota}>{city}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderFilterKota = (item) => {
    const items = item.item;
    const id = userData._id;
    return items.clinic == null ? (
      <View></View>
    ) : (
      <ClinicCard
        image={{uri: items.image}}
        kota={items.clinic.city}
        nama={items.name}
        id={items._id}
        jalan={items.clinic.address}
        press={() =>
          navigation.navigate('DetailCard', {
            linkGambar: {uri: items.image},
            kota: items.clinic.city,
            id: items._id,
            nama: items.name,
            jalan: items.clinic.address,
            userId: id,
          })
        }
      />
    );
  };

  const RenderClinic = ({item}) => {
    const id = userData._id;
    return item.clinic == null ? (
      <View></View>
    ) : (
      <ClinicCard
        image={{uri: item.image}}
        kota={item.clinic.city}
        nama={item.name}
        id={item._id}
        jalan={item.clinic.address}
        press={() =>
          navigation.navigate('DetailCard', {
            linkGambar: {uri: item.image},
            kota: item.clinic.city,
            id: item._id,
            nama: item.name,
            jalan: item.clinic.address,
            userId: id,
            namaClinic: item.name,
          })
        }
      />
    );
  };

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
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const updateOnPressKota = (index) => {
    const WarnaKota = kota.map((item) => {
      item.selected = false;
      return item;
    });
    WarnaKota[index].selected = true;
    setKota(WarnaKota);
  };

  useEffect(() => {
    getClinic();
    setProfile();
  }, []);

  let clinicFiltered;
  if (filterKota == 0) {
    clinicFiltered = (
      <FlatList
        data={clinic}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <RenderClinic item={item} />}
      />
    );
  } else if (filterKota == '') {
    clinicFiltered = (
      <View>
        <Text>data kosong</Text>
      </View>
    );
  } else if (filterKota == 'All') {
    clinicFiltered = (
      <FlatList
        data={filterKota}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <RenderFilterKota item={item} />}
      />
    );
  } else {
    clinicFiltered = (
      <FlatList
        data={filterKota}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <RenderFilterKota item={item} />}
      />
    );
  }

  let loader;
  if (clinicLoading) {
    loader = <ActivityIndicator color={'#1A3150'} size={35} />;
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

  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <Image
          style={styles.gambar}
          source={require('../../assets/image/Vet.png')}
        />

        <View style={styles.header}>
          <FontAwesome5
            style={styles.icon}
            name={'envelope'}
            color={'white'}
            size={wp(20)}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.hText}>
              {userData.name.toUpperCase().slice(0, 1)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView scrollsToTop={scroll}>
        <View style={styles.oval} />
        <View style={styles.carousel}>
          <PetCarousel />
        </View>
        <View style={styles.container1}>
          <Text style={styles.text}>Clinic Consultation</Text>
        </View>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={kota}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => (
              <RenderKota item={item} index={index} />
            )}
          />
        </View>
        <View>
          {loader}
          {clinicFiltered}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: wp(45),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    backgroundColor: '#1A3150',
    flexDirection: 'row',
  },
  container1: {
    flexDirection: 'row',
  },
  indicator: {
    width: wp(250),
    height: wp(250),
    alignSelf: 'center',
  },
  oval: {
    alignSelf: 'center',
    position: 'absolute',
    top: hp(-60),
    width: wp(100),
    height: wp(90),
    borderRadius: 50,
    backgroundColor: '#1A3150',
    transform: [{scaleX: 5}, {scaleY: 2}],
  },

  carousel: {
    top: hp(25),
  },
  gambarVet: {
    width: wp(55),
    height: wp(35),
  },
  gambar: {
    height: wp(35),
    width: wp(40),
    marginLeft: hp(15),
    marginTop: wp(0),
    marginRight: hp(60),
  },
  header: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: wp(8),
  },
  hText: {
    color: 'black',
    borderRadius: wp(100),
    justifyContent: 'center',
    borderWidth: wp(1),
    borderColor: '#FDCB5A',
    height: wp(20),
    width: wp(20),
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#FDCB5A',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: wp(15),
  },
  lain: {
    marginLeft: hp(220),
    color: '#1A3150',
  },
  kota: {
    borderWidth: 1,
    height: wp(30),
    paddingHorizontal: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#FDCB5A',
    marginTop: hp(10),
    marginLeft: wp(15),
    marginBottom: hp(5),
  },
  WarnaText: {
    borderWidth: 1,
    height: wp(30),
    paddingHorizontal: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FDCB5A',
    borderColor: '#FDCB5A',
    marginTop: hp(10),
    marginLeft: wp(15),
    marginBottom: hp(5),
  },
  textKota: {
    color: '#1A3150',
  },
  gambarBulat: {
    width: 40,
    height: 40,
    margin: 10,
  },
  containerBulat: {
    alignSelf: 'center',
    marginTop: 20,
  },
  textBulat: {
    alignSelf: 'center',
  },
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
