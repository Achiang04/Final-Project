import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import qs from 'querystring';
import {wp, hp} from '../../reusable/Responsive/dimen';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Header from '../../reusable/Header/Header';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

export default function IsiChatnya1(props) {
  const roomId = props.route.params.roomId;
  const [message, setMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [userId, setuserId] = useState('');
  const [userSender, setuserSender] = useState('');
  const [avoiding, setAvoiding] = useState(false);

  const sendChat = async () => {
    setSendLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    const requestBody = {
      message: message,
    };
    const config = {
      headers: {
        access_token: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    axios
      .post(
        `https://vet-booking.herokuapp.com/chat/message/${roomId}`,
        qs.stringify(requestBody),
        config,
      )
      .then((result) => {
        setSendLoading(false);
      })
      .catch((err) => {});
  };

  const getChatRoom = async () => {
    setChatLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `https://vet-booking.herokuapp.com/chat/${roomId}`,
        {
          headers: {
            access_token: token,
          },
        },
      );
      setChat(response.data.data.room.message);
      setuserId(response.data.data.room.user[0]._id);
      setuserSender(response.data.data.userSender);
      getChatRoom();
      setChatLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getChatRoom();
  }, []);

  let loader;
  if (chatLoading) {
    loader = <ActivityIndicator color={'#1A3150'} size={35} />;
  }

  let sendLoader;
  if (sendLoading) {
    sendLoader = <ActivityIndicator color={'#1A3150'} size={35} />;
  }

  const RenderChat = ({item}) => {
    return item.sender === userId ? (
      <View>
        <Text style={styles.text2}>{item.message}</Text>
      </View>
    ) : (
      <View>
        <Text style={styles.text1}>{item.message}</Text>
      </View>
    );
  };

  let nullChat;
  if (chat == 0) {
    nullChat = (
      <View style={styles.iconChat}>
        <FontAwesome5
          style={styles.iconUntukChat}
          name={'comments'}
          color={'black'}
          size={wp(100)}
        />
        <Text style={styles.chatText}>No Message Yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        name={props.route.params.namaClinicFromChat}
        bgColor="#1A3150"
        icon="arrow-left"
        press={() => props.navigation.goBack()}
      />
      {loader}
      {nullChat}
      <ScrollView scrollsToTop={true}>
        <View style={{flex: 1, marginBottom: 47}}>
          <FlatList
            data={chat}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => {
              return <RenderChat index={index} item={item} />;
            }}
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior="position" enabled={avoiding}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.container1}>
            <TextInput
              style={styles.textinput}
              placeholder="Type your message here ..."
              onChangeText={(item) => setMessage(item)}
              value={message}
              focus={() => {
                setAvoiding(true);
              }}
            />

            {sendLoading ? (
              sendLoader
            ) : (
              <TouchableOpacity
                onPress={() => {
                  sendChat();
                  setMessage('');
                }}>
                <FontAwesome5
                  style={styles.icon}
                  name={'paper-plane'}
                  size={20}
                  color="#9F9F9F"
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    width: responsiveWidth(95),
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: '#1A3150',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  textinput: {
    width: responsiveWidth(85),
  },
  icon: {
    marginTop: 8,
    marginLeft: 10,
  },
  text1: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderColor: '#1A3150',
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  text2: {
    borderWidth: 1,
    padding: 5,
    alignSelf: 'flex-end',
    margin: 5,
    borderColor: '#1A3150',
    borderRadius: 5,
    marginRight: 11,
  },
  iconChat: {
    alignSelf: 'center',
    marginTop: hp(200),
  },
  iconUntukChat: {
    opacity: 0.6,
  },
  chatText: {
    alignSelf: 'center',
    opacity: 0.8,
  },
});
