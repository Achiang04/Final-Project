import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../reusable/Header/Header3';
import Modal from '../../reusable/Modal/Modal2';
import PetCard from '../../reusable/PetCard/PetCard3';
import {useNavigation} from '@react-navigation/native';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function PetList() {
  const [pet, setPet] = useState('');
  const [petLoading, setPetLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const getPet = async () => {
    if (pet === null) {
      console.log('pet null');
    }
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `https://vet-booking.herokuapp.com/animal/user`,
        {
          headers: {
            access_token: token,
          },
        },
      );
      setPet(response.data.data.animals);
      setLoading(false);
    } catch (error) {}
  };

  const removePet = async (item) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      await axios.delete(
        `https://vet-booking.herokuapp.com/animal/remove/${item}`,
        {
          headers: {
            access_token: token,
          },
        },
      );
      getPet();
      setPetLoading(false);
    } catch (error) {}
  };

  const RenderPet = ({item}) => {
    let gender;
    if (item.gender === true) {
      gender = 'Male';
    } else {
      gender = 'Female';
    }

    let petType;
    if (item.type == 'Cat') {
      petType = (
        <View>
          <PetCard
            gambar={require('../../assets/image/cat.png')}
            nama={item.name}
            type={gender}
            press={() => setVisible(true)}
          />
          <Modal
            visible={visible}
            text={'Delete Pet ?'}
            cancel={() => setVisible(false)}
            delete={() => {
              removePet(item._id), setVisible(false);
            }}
          />
        </View>
      );
    } else {
      petType = (
        <View>
          <PetCard
            gambar={require('../../assets/image/dog.png')}
            nama={item.name}
            type={gender}
            press={() => setVisible(true)}
          />
          <Modal
            visible={visible}
            text={'Delete Pet ?'}
            cancel={() => setVisible(false)}
            delete={() => {
              removePet(item._id), setVisible(false);
            }}
          />
        </View>
      );
    }
    return <View>{petType}</View>;
  };

  useEffect(() => {
    getPet();
    const unsubscribe = navigation.addListener('focus', () => {
      getPet();
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
  let image;
  if (pet == 0) {
    image = (
      <Image
        style={styles.image}
        source={require('../../assets/image/nopet.png')}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Header
        name={"Your Pet's"}
        icon={'arrow-left'}
        press={() => navigation.goBack()}
      />
      <View style={styles.list}>
        <FlatList
          data={pet}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <RenderPet item={item} />}
        />
      </View>
      {image}
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('AddPet2')}>
        <Text style={styles.addText}>Add Pet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  list: {
    marginVertical: hp(10),
  },
  add: {
    marginVertical: wp(10),
    width: wp(75),
    height: wp(35),
    borderRadius: 3,
    backgroundColor: '#FDCB5A',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  indicator: {
    width: wp(250),
    height: wp(250),
    alignSelf: 'center',
  },
  image: {
    width: wp(300),
    height: wp(200),
    marginVertical: hp(25),
    alignSelf: 'center',
    opacity: 0.5,
  },
});
