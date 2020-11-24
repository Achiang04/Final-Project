import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Header from '../../reusable/Header/Header';
import Button from '../../reusable/Button/Buttons';
import {BASE_URL} from '../../redux/Constant/general';
import {useNavigation} from '@react-navigation/native';
import qs from 'querystring';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import TextBar from '../../reusable/TextBar/TextBar';
import {wp, hp} from '../../reusable/Responsive/dimen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddPet() {
  const [typePet, setTypePet] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [nama, setNama] = useState('');
  const [pet, setPet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chooseGender, setChooseGender] = useState([
    {jenis: '1', gender: 'Male', icon: 'gender-male'},
    {jenis: '0', gender: 'Female', icon: 'gender-female'},
  ]);

  const navigation = useNavigation();

  const getPetGender = async () => {
    setLoading(true);
    try {
      let response = await fetch(`${BASE_URL}animal-type`);
      let json = await response.json();
      setPet(json.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateOnPress = (index) => {
    const WarnaPet = pet.map((item) => {
      item.selected = false;
      return item;
    });
    WarnaPet[index].selected = true;
    setPet(WarnaPet);
  };

  const updateOnPressGender = (index) => {
    const WarnaGender = chooseGender.map((item) => {
      item.selected = false;
      return item;
    });
    WarnaGender[index].selected = true;
    setChooseGender(WarnaGender);
  };

  const handleAdd = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const requestBody = {
      name: nama,
      type: typePet,
      gender: genderValue,
    };
    const config = {
      headers: {
        access_token: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(
        `https://vet-booking.herokuapp.com/animal/add`,
        qs.stringify(requestBody),
        config,
      )
      .then((result) => {
        navigation.navigate('DetailCard');
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPetGender();
  }, []);

  let loader;
  if (loading) {
    loader = <ActivityIndicator color={'#1A3150'} size={35} />;
  }

  return (
    <View style={styles.container}>
      <Header
        press={() => navigation.goBack()}
        name={'Add Pet'}
        icon={'arrow-left'}
      />
      <ScrollView>
        <Text style={styles.text}>Your's Pet Name</Text>
        <View>
          <TextBar
            title={'Pet Name'}
            style={styles.textInput}
            holder={'Enter Your Pets Name'}
            color={'black'}
            text={(e) => setNama(e)}
          />
        </View>
        <Text style={styles.text}>Choose Your's Pet</Text>
        {loader}
        <View style={styles.petContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
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
                    setTypePet(item.type), updateOnPress(index);
                  }}>
                  <View
                    style={
                      item.selected ? styles.selectedText : styles.normalText
                    }>
                    <View style={styles.imagePetContainer}>{petDetector}</View>
                    <View style={styles.textPetContainer}>
                      <Text style={styles.textPet}>{item.type}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
          <Text style={styles.text}>Jenis Kelamin Peliharaan Kamu</Text>
          <View style={styles.genderContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={chooseGender}
              keyExtractor={(item) => item.id}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setGenderValue(item.jenis), updateOnPressGender(index);
                    }}>
                    <View
                      style={
                        item.selected ? styles.selectedText : styles.normalText
                      }>
                      <View style={styles.imageContainer}>
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={wp(28)}
                          color={'black'}
                        />
                      </View>
                      <View style={styles.textPetContainer}>
                        <Text style={styles.textPet}>{item.gender}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text="Add"
          bgColor="#FDCB5A"
          borColor="#FDCB5A"
          width={responsiveWidth(91)}
          press={() => handleAdd()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    backgroundColor: '#fff',
  },
  petDetector: {
    width: wp(40),
    height: wp(35),
    marginLeft: hp(7),
  },
  text: {
    paddingTop: hp(15),
    paddingHorizontal: wp(10),
    marginVertical: wp(5),
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1350',
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1A3150',
    borderWidth: 1,
    color: '#000',
  },
  petContainer: {
    flex: 1,

    flexDirection: 'row',
    paddingHorizontal: wp(10),
  },
  genderContainer: {
    justifyContent: 'center',
    paddingHorizontal: wp(10),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    bottom: 'auto',
    height: 75,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 15},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  selectedText: {
    flexDirection: 'row',
    width: wp(100),
    height: wp(40),
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#FDCB5A',
  },
  normalText: {
    flexDirection: 'row',
    width: wp(100),
    height: wp(40),
    borderRadius: 5,
    marginVertical: wp(5),
    marginHorizontal: hp(5),
    backgroundColor: '#E0E9F5',
  },
  imagePetContainer: {
    alignSelf: 'center',
    paddingHorizontal: wp(5),
  },
  textPetContainer: {
    alignSelf: 'center',
  },
  textPet: {
    fontSize: 14,
    marginLeft: hp(5),
  },
  imageContainer: {
    paddingVertical: hp(6),
    paddingHorizontal: wp(5),
  },
  imagePet: {
    width: wp(41),
    height: wp(41),
  },
});
