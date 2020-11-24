import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../reusable/Button/Buttons';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';
import {wp} from '../../reusable/Responsive/dimen';

export default function DoctorAuth(props) {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Modal
      isVisible={props.visible}
      style={styles.modalContainer}
      animationOut="zoomOut"
      animationOutTiming={500}
      animationIn="zoomIn"
      animationInTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      onBackdropPress={props.modal}
      onBackButtonPress={props.modal}>
      <View style={styles.modal}>
        <Text style={styles.text}>Doctor ID</Text>
        <View style={styles.container2}>
          <TextInput
            style={styles.textInput}
            enabled
            textAlign={'center'}
            placeholder={'Enter Doctor ID'}
            onChangeText={props.text}
            placeholderTextColor={'#1A3150'}
            maxLength={35}
            value={props.value}
          />
          <Button
            width={wp(150)}
            bgColor="#FDCB5A"
            borColor="#FDCB5A"
            press={props.press}
            text="Add Doctor"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container2: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 25,
    color: '#1A3150',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    borderColor: '#1A3150',
    marginVertical: wp(20),
    borderRadius: wp(5),
    borderWidth: wp(1.25),
    width: wp(215),
  },
  modalContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  modal: {
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: wp(300),
    height: wp(200),
    borderRadius: wp(5),
  },
});
