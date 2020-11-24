import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Button from '../../reusable/Button/Buttons';
import ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import TextBar from '../../reusable/TextBar/TextBar';
import {responsiveWidth} from 'react-native-responsive-dimensions';

export default function ClinicRegister() {
  const [image, SetImage] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  const handleEdit = async () => {
    try {
      if (image == '') {
        Alert.alert(`image`);
      } else if (city == '') {
        Alert.alert(`city`);
      } else if (address == '') {
        Alert.alert(`address`);
      }
      const form = new FormData();

      form.append('city', city);
      form.append('address', address);
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
      navigation.replace('TabScreen');
    } catch (error) {}
  };

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
      if (response.customButton) {
        alert(response.customButton);
      } else {
        SetImage(response);
      }
    });
  };

  let Images;
  if (image == 0) {
    Images = (
      <View style={styles.box2Container}>
        <TouchableOpacity onPress={chooseImage}>
          <View style={styles.box2}>
            <Text>Add image</Text>
            <MaterialCommunityIcons name="plus" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    Images = (
      <View style={styles.clinicImageContainer}>
        <Image
          style={styles.clinicImage}
          source={
            image ? {uri: image.uri} : require('../../assets/image/clinic.png')
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Lets add your Clinic detail</Text>
      <View style={styles.box1}>
        <Text style={styles.text}>Clinic Image</Text>
      </View>

      {Images}
      <View style={styles.box1}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Clinic Address</Text>
          <Entypo
            style={styles.icon}
            name={'location-pin'}
            size={30}
            color={'red'}
          />
        </View>
      </View>
      <TextBar
        title={'City'}
        holder={'Add your City'}
        entry={false}
        color="#000"
        text={(value) => setCity(value)}
        value={city}
        color={'#f8f8f8'}
      />
      <TextBar
        title={'Address'}
        holder={'Add your Address'}
        color="#000"
        text={(value) => setAddress(value)}
        color={'#f8f8f8'}
        value={address}
      />
      <View style={styles.button}>
        <Button
          width={responsiveWidth(91)}
          bgColor="#FDCB5A"
          text="Continue"
          borColor="#FDCB5A"
          press={handleEdit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A3150',
  },
  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff',
  },
  text: {
    textAlign: 'center',
  },
  clinicImageContainer: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
  clinicImage: {
    alignSelf: 'center',
    width: '85%',
    height: '100%',
    borderRadius: 10,
  },
  box1: {
    width: 'auto',
    alignItems: 'center',
    paddingVertical: 10,
    height: 40,
    marginTop: 20,
    backgroundColor: '#F1F1F1',
  },
  box2Container: {
    alignSelf: 'center',
    marginTop: 20,
  },
  box2: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  icon: {
    position: 'absolute',
    left: 100,
    bottom: -5,
  },
  button: {
    marginVertical: 25,
  },
});
