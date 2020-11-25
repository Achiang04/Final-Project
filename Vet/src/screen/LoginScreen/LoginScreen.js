import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AwesomeAlert from 'react-native-awesome-alerts';
import TextBar from '../../reusable/TextBar/TextBar';
import Buttons from '../../reusable/Button/Buttons';
import Header from '../../reusable/Header/Header';
import Icon from '../../reusable/Button/Icon';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from 'react-redux';
import {loginAction} from '../../redux/Actions/authAction';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [holder, setHolder] = useState('Enter Your Password');
  const [indicator, setIndicator] = useState(false);
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(true);
  const [data, setData] = useState({
    isValidPassword: true,
    isValidEmail: true,
  });

  const emailReg = /[^@]+@[^\.]+\..+/;
  const passReg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
  const dispatch = useDispatch();

  const handleValidEmail = () => {
    if (email == '') {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else if (emailReg.test(email) === false) {
      setData({
        ...data,
        isValidEmail: false,
      });
    } else {
      setData({
        ...data,
        isValidEmail: true,
      });
    }
  };

  const handleValidPassword = () => {
    if (password == '') {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else if (passReg.test(password) === false) {
      setData({
        ...data,
        isValidPassword: false,
      });
    } else {
      setData({
        ...data,
        isValidPassword: true,
      });
    }
  };

  let buffer;
  if (indicator) {
    buffer = <ActivityIndicator color={'#1A3150'} size={wp(20)} />;
  } else {
    buffer = <Text>Submit</Text>;
  }

  let Holders;
  if (!password) {
    Holders = (
      <View pointerEvents="none" style={{justifyContent: 'center'}}>
        <Text style={styles.holder}>{holder}</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Header
          press={() => navigation.replace('WelcomeScreen')}
          name={'Previous'}
          icon={'arrow-left'}
        />
        <View>
          <Text style={styles.welcome}>Welcome Back</Text>
          <TextBar
            title={'Email'}
            holder={'Enter your Email'}
            keyType={'email-address'}
            text={(value) => setEmail(value)}
            editing={(e) => handleValidEmail(e)}
            color={'#C2CDDB'}
            value={email}
          />

          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.error}>Invalid email</Text>
            </Animatable.View>
          )}
          <View>
            <TextBar
              title={'Password'}
              entry={visible}
              text={(value) => setPassword(value)}
              color={'#C2CDDB'}
              length={35}
              editing={(e) => {
                handleValidPassword(e);
              }}
              value={password}
            />
            {Holders}
          </View>
          <View style={styles.hide}>
            <Icon
              name={show === true ? 'eye-off' : 'eye'}
              size={wp(20)}
              color="#F1F1F1"
              press={() => {
                setVisible(!visible);
                setShow(!show);
              }}
            />
          </View>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.error}>Invalid Password</Text>
          </Animatable.View>
        )}
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <Buttons
          width={responsiveWidth(91)}
          bgColor={'#FDCB5A'}
          text={buffer}
          color={'#1A3150'}
          borColor={'#FDCB5A'}
          press={() => {
            dispatch(loginAction(email, password)).then((e) => {
              if (e) {
                navigation.replace('TabScreen');
              } else if (email == '') {
                setAlert(true), setMessage('Fill your Email');
              } else if (emailReg.test(email) === false) {
                setAlert(true), setMessage('Invalid Email');
              } else if (passReg.test(password) === false) {
                setAlert(true, setMessage('Invalid Password'));
              } else {
                setAlert(true), setMessage('Invalid Account');
              }
            });
            setIndicator(true),
              dispatch(loginAction(email, password)).then((e) => {
                if (e) {
                  {
                    navigation.navigate('TabScreen'),
                      setIndicator(false),
                      setEmail(''),
                      setPassword('');
                  }
                } else if (email == '') {
                  setAlert(true),
                    setMessage('Fill your Email'),
                    setIndicator(false);
                } else if (emailReg.test(email) === false) {
                  setAlert(true),
                    setMessage('Invalid Email'),
                    setIndicator(false);
                } else if (passReg.test(password) === false) {
                  setAlert(true),
                    setMessage('Invalid Password'),
                    setIndicator(false);
                } else {
                  setAlert(true), setMessage('Wrong Email or Password');
                  setIndicator(false);
                }
              });
          }}
        />
        <View style={styles.container1}>
          <Text style={styles.text1}>Don't have account? Please </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisScreen')}>
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A3150',
  },
  welcome: {
    fontSize: wp(15),
    fontWeight: 'bold',
    marginLeft: hp(15),
    color: 'white',
    marginTop: wp(45),
    marginBottom: wp(10),
  },
  holder: {
    position: 'absolute',
    left: wp(25.5),
    alignSelf: 'center',
    marginVertical: '8.5%',
    color: '#C2CDDB',
  },
  forgot: {
    color: '#FDCB5A',
    alignSelf: 'flex-end',
    marginRight: hp(15),
    marginTop: wp(3),
    marginBottom: wp(30),
    textDecorationLine: 'underline',
  },
  container1: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text1: {
    color: 'white',
    marginTop: 10,
    marginLeft: 10,
  },
  text2: {
    color: '#FDCB5A',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  hide: {
    position: 'absolute',
    bottom: hp(12),
    right: wp(40),
  },
  error: {
    fontSize: 16,
    color: 'red',
    paddingTop: 5,
    paddingHorizontal: 20,
    paddingLeft: 20,
  },
  keyboardAvoid: {
    position: 'absolute',
    bottom: -100,
  },
});
