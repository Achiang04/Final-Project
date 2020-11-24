import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../reusable/Header/Header3';
import TextBar from '../../reusable/TextBar/TextBar';
import Button from '../../reusable/Button/Buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import Axios from 'axios';
import {wp, hp} from '../../reusable/Responsive/dimen';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function EditProfileScreen() {
  const [image, SetImage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState('');
  const [userData, setUserData] = useState('');

  const chooseImage = () => {
    let options = {
      title: 'Select Avatar',
      cameraType: 'front',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.customButton) {
        alert(response.customButton);
      } else {
        SetImage(response);
      }
    });
  };
  const navigation = useNavigation();
  const radio_props = [
    {label: 'Male', value: 1},
    {label: 'Female', value: 0},
  ];
  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = async () => {
    try {
      const form = new FormData();

      form.append('name', name);
      form.append('phone', phone);
      form.append('gender', gender);
      form.append('city', city);
      form.append('address', address);
      form.append('email', email);
      form.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
      const token = await AsyncStorage.getItem('userToken');
      const response = await Axios.put(
        'https://vet-booking.herokuapp.com/user/edit',
        form,
        {
          headers: {access_token: token, 'Content-Type': 'multipart/form-data'},
        },
      )
        .then((r) => {
          return r;
        })
        .catch((e) => {
          return e;
        });
      navigation.replace('TabScreen', {screen: 'ProfileScreen'});
    } catch (error) {}
  };

  useEffect(() => {
    async function setProfile() {
      const value = await AsyncStorage.getItem('userToken');
      try {
        const response = await Axios.get(
          'https://vet-booking.herokuapp.com/user/edit',
          {
            headers: {
              access_token: value,
            },
          },
        );
        setUserData(response.data.data.user);
        setLoading(false);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    setProfile();
  }, []);

  let Role;
  if (userData.role == 'clinic') {
    Role = (
      <View>
        <TextBar
          title={'City'}
          holder={userData.clinic.city}
          entry={false}
          color="#000"
          text={(value) => setCity(value)}
          value={city}
        />
        <TextBar
          title={'Address'}
          holder={userData.clinic.address}
          entry={false}
          color="#000"
          text={(value) => setAddress(value)}
          value={address}
        />
      </View>
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
  return (
    <View style={styles.container}>
      <Header
        name="Edit Profile"
        bgColor="#1A3150"
        icon="arrow-left"
        press={handleBack}
      />
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.text}>Basic Information</Text>
        </View>
        <TouchableOpacity onPress={chooseImage}>
          <Image
            style={styles.profile}
            source={image ? {uri: image.uri} : {uri: userData.image}}
          />

          <MaterialCommunityIcons
            style={styles.icon}
            name={'camera-plus'}
            color={'#1A3150'}
            size={wp(30)}
          />
        </TouchableOpacity>
        <TextBar
          title={'Full Name'}
          holder={userData.name}
          entry={false}
          color="#000"
          text={(value) => setName(value)}
          value={name}
        />
        {Role}
        <Text style={styles.gender}>Gender</Text>
        <RadioForm
          style={styles.selector}
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          buttonColor="#FDCB5A"
          selectedButtonColor="#FDCB5A"
          buttonSize={wp(10)}
          onPress={(value) => {
            {
              setGender(value);
              if (value === 1) {
                setGender(true);
              } else {
                setGender(false);
              }
            }
          }}
        />
        <View style={styles.box1}>
          <Text style={styles.text}>Contact Details</Text>
        </View>
        <TextBar
          title={'Mobile Number'}
          holder={userData.phone}
          entry={false}
          color="#000"
          text={(value) => setPhone(value)}
          value={phone}
        />
        <TextBar
          title={'Email'}
          holder={userData.email}
          entry={false}
          color="#000"
          text={(value) => setEmail(value)}
          value={email}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text="Finish Editing"
          bgColor="#FDCB5A"
          borColor="#FDCB5A"
          width={wp(325)}
          press={handleEdit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    justifyContent: 'center',
    width: 'auto',
    height: wp(35),
    backgroundColor: '#F1F1F1',
  },
  text: {
    textAlign: 'center',
  },
  profile: {
    width: wp(80),
    height: wp(80),
    marginTop: wp(15),
    backgroundColor: '#fff',
    borderRadius: wp(70),
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    right: wp(140),
    top: hp(70),
  },
  box1: {
    justifyContent: 'center',

    width: 'auto',
    height: wp(35),
    marginTop: wp(15),
    backgroundColor: '#F1F1F1',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: wp(75),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 15},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  gender: {
    padding: wp(5),
    paddingLeft: wp(20),
  },
  selector: {
    padding: wp(5),
    right: wp(62),
    justifyContent: 'space-evenly',
  },

  indicator: {
    width: wp(250),
    height: wp(250),
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
});
