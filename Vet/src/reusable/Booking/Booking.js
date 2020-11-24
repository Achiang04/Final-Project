import React, {useState, useEffect} from 'react';
import {Modal, StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {wp, hp} from '../../reusable/Responsive/dimen';

const BookingModal = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const loading = props.loadingFromModal;
  
  if (loading === false) {
    setModalVisible(false);
  }

  const navigation = useNavigation();

  const setVisible = () => {
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
    setTimeout(() => {
      navigation.navigate('TabScreen');
    }, 3000);
  };

  useEffect(() => {
    setVisible();
  }, []);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          null;
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.gambar}
              source={require('../../assets/image/true.png')}
            />
            <Text style={styles.kata}>Booking Success</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#1A3150',
    padding: wp(35),
    alignItems: 'center',
    shadowColor: '#FDCB5A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: wp(15),
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: wp(75),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 15},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  gambar: {
    width: wp(100),
    height: wp(100),
    marginTop: hp(185),
    marginBottom: hp(15),
  },
  x: {
    position: 'absolute',
    bottom: wp(20),
  },
  kata: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  indicator: {
    width: 250,
    height: 250,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
});

export default BookingModal;
