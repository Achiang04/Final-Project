import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {wp, hp} from '../../reusable/Responsive/dimen';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Icon from '../../reusable/Button/Icon';
import TextBar from '../../reusable/TextBar/TextBar';
import Buttons from '../../reusable/Button/Buttons';
import Header from '../../reusable/Header/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from 'react-redux';
import {regisAction} from '../../redux/Actions/regisAction';
import {ScrollView} from 'react-native-gesture-handler';

export default function RegisScreen({navigation}) {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [holder, setHolder] = useState('Enter Your Password');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(true);
  const [navigator, setNavigator] = useState('');
  const [slider, setSlider] = useState(0);
  const [avoiding, setAvoiding] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [data, setData] = useState({
    isValidPassword: true,
    isValidPhone: true,
    isValidEmail: true,
  });
  const passReg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
  const phoneReg = /\(?(?:\+62|62|0)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/;
  const emailReg = /[^@]+@[^\.]+\..+/;
  const dispatch = useDispatch();

  const handleRole = (value) => {
    if (value == 'clinic') {
      setNavigator('ClinicRegister');
    } else {
      setNavigator('TabScreen');
    }
  };

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

  const handleValidPhone = () => {
    if (phone == '') {
      setData({
        ...data,
        isValidPhone: true,
      });
    } else if (phoneReg.test(phone) === false) {
      setData({
        ...data,
        isValidPhone: false,
      });
    } else {
      setData({
        ...data,
        isValidPhone: true,
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
  if (password == '') {
    Holders = (
      <View pointerEvents="none">
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
        <ScrollView>
          <Text style={styles.welcome}>Create Your Account</Text>

          <ScrollView>
            <View>
              <KeyboardAvoidingView behavior="position" enabled={avoiding}>
                <TextBar
                  title={'Username'}
                  holder={'Enter your Username'}
                  text={(value) => setName(value)}
                  color={'#C2CDDB'}
                  focus={() => setAvoiding(true)}
                  value={name}
                />
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
                    <Text style={styles.error}>Email must be valid</Text>
                  </Animatable.View>
                )}
                <TextBar
                  title={'Phone Number'}
                  holder={'Enter your Phone Number'}
                  keyType={'phone-pad'}
                  text={(value) => setPhone(value)}
                  color={'#C2CDDB'}
                  editing={(e) => handleValidPhone(e)}
                  value={phone}
                />
                {data.isValidPhone ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.error}>Phone number must be valid</Text>
                  </Animatable.View>
                )}
                <Text style={styles.roleText}>Role</Text>
                <View style={[styles.choose, {paddingBottom: hp(slider)}]}>
                  <DropDownPicker
                    items={[
                      {label: 'Clinic', value: 'clinic'},
                      {label: 'Patient', value: 'patient'},
                      {label: 'Veterinary', value: 'veterinary'},
                    ]}
                    style={{backgroundColor: '#1A3150', borderColor: '#749DD2'}}
                    onOpen={() => setSlider(175)}
                    onClose={() => setSlider(0)}
                    dropDownStyle={{backgroundColor: '#1A3150'}}
                    activeLabelStyle={{color: '#FDCB5A'}}
                    defaultNull
                    labelStyle={{
                      fontSize: 14,
                      textAlign: 'left',
                      color: '#C2CDDB',
                    }}
                    placeholder="Choose your Role"
                    containerStyle={{height: wp(40)}}
                    onChangeItem={(item) => {
                      setRole(item.value), handleRole(item.value);
                    }}
                  />
                </View>

                <TextBar
                  title={'Password'}
                  entry={visible}
                  length={35}
                  text={(value) => setPassword(value)}
                  color={'#C2CDDB'}
                  editing={(e) => handleValidPassword(e)}
                  value={password}
                  focus={() => {
                    setAvoiding(true);
                  }}
                />
                {Holders}
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
              </KeyboardAvoidingView>
            </View>

            {data.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.error}>
                  Password must contain 6 characters with minimum 1 letter and 1
                  number
                </Text>
              </Animatable.View>
            )}

            <View style={styles.btn}>
              <Buttons
                width={responsiveWidth(91)}
                bgColor={'#FDCB5A'}
                text={'Submit'}
                borColor={'#FDCB5A'}
                color={'#1A3150'}
                press={() => {
                  setIndicator(true);
                  dispatch(
                    regisAction(name, email, phone, role, password),
                  ).then((e) => {
                    console.log(e);
                    if (e) {
                      {
                        navigation.navigate(
                          navigator ? navigator : 'TabScreen',
                        ),
                          setIndicator(false);
                      }
                    } else if (name == '') {
                      setAlert(true),
                        setMessage('Insert Username'),
                        setIndicator(false);
                    } else if (emailReg.test(email) === false) {
                      setAlert(true),
                        setMessage('Invalid Email'),
                        setIndicator(false);
                    } else if (phoneReg.test(phone) === false) {
                      setAlert(true),
                        setMessage('Invalid Phone Number'),
                        setIndicator(false);
                    } else if (role == '') {
                      setAlert(true),
                        setMessage('Choose your role'),
                        setIndicator(false);
                    } else if (passReg.test(password) === false) {
                      setAlert(true),
                        setMessage('Invalid Password'),
                        setIndicator(false);
                    } else {
                      setIndicator(false);
                    }
                  });
                }}
              />
            </View>
          </ScrollView>

          <View style={styles.container1}>
            <Text style={styles.text1}>Already have an account? Please </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.text2}>Sign In</Text>
            </TouchableOpacity>
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
            height: wp(30),
          }}
          confirmButtonTextStyle={{
            fontSize: 16.5,
            alignSelf: 'center',
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
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: hp(17),
    color: 'white',
    marginTop: 10,
  },
  container1: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text1: {
    color: 'white',
    marginTop: wp(10),
  },
  text2: {
    color: '#FDCB5A',
    marginTop: hp(10),
    textDecorationLine: 'underline',
  },
  btn: {
    marginTop: hp(35),
  },
  hide: {
    position: 'absolute',
    bottom: hp(10),
    right: wp(40),
  },
  holder: {
    position: 'absolute',
    left: wp(27),
    bottom: hp(14),
    color: '#C2CDDB',
  },
  error: {
    fontSize: 16,
    color: 'red',
    paddingTop: hp(5),
    paddingHorizontal: wp(20),
    paddingLeft: wp(20),
  },
  choose: {
    alignSelf: 'center',
    width: wp(325),
    height: hp(45),
    color: '#C2CDDB',
    borderColor: '#749DD2',
  },

  roleText: {
    marginTop: hp(10),
    marginBottom: hp(5),
    color: '#C2CDDB',
    alignSelf: 'flex-start',
    color: '#C2CDDB',
    paddingVertical: hp(0),
    marginLeft: hp(25),
  },
});
