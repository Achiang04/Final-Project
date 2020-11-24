import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Header1 from '../../reusable/Header/Header1';
import {wp, hp} from '../../reusable/Responsive/dimen';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function ChatScreen1({navigation}) {
  const [clinic, setClinic] = useState([]);
  const [clinicLoading, setClinicLoading] = useState(false);

  const getChat = async () => {
    setClinicLoading(true);
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
      setClinic(response.data.data);
      setClinicLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getChat();
  }, []);

  const RenderChat = ({item}) => {
    return item.message == null ? (
      <View></View>
    ) : (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('IsiChatnya1', {
            namaClinicFromChat: item.user[1].name,
            roomId: item._id,
          })
        }>
        <View style={styles.container}>
          <Image
            style={styles.gambarBulat}
            source={{uri: item.user[1].image}}
          />
          <View>
            <Text style={styles.name}>{item.user[1].name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  let loader;
  if (clinicLoading) {
    loader = <ActivityIndicator color={'#1A3150'} size={35} />;
  }

  let nullChat;
  if (clinic == 0) {
    nullChat = (
      <View style={styles.iconChat}>
        <FontAwesome5
          style={styles.icon}
          name={'comments'}
          color={'black'}
          size={wp(100)}
        />
        <Text style={styles.chatText}>No Message Yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container3}>
      <Header1 name={'Message'} bgColor="#1A3150" />
      {loader}
      {nullChat}
      <FlatList
        data={clinic}
        keyExtractor={(item) => item._id}
        renderItem={({item, index}) => {
          return <RenderChat index={index} item={item} />;
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    borderBottomWidth: 1,
    borderColor: '#1A3150',
  },
  container2: {
    flexDirection: 'column',
  },
  container3: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gambarBulat: {
    width: 55,
    height: 55,
    borderRadius: 100,
    marginLeft: 10,
    marginTop: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 17,
  },
  iconChat: {
    alignSelf: 'center',
    marginTop: hp(230),
  },
  icon: {
    opacity: 0.6,
  },
  chatText: {
    alignSelf: 'center',
    opacity: 0.8,
  },
});
