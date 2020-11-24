import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../reusable/Button/Buttons';
import Modal from 'react-native-modal';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function Agree(props) {
  return (
    <Modal
      isVisible={props.visible}
      style={styles.modalContainer}
      animationOut="zoomOut"
      animationOutTiming={500}
      initialState
      animationIn="zoomIn"
      animationInTiming={500}
      backdropOpacity={0.5}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      onBackdropPress={props.cancel}
      onBackButtonPress={props.cancel}>
      <View style={styles.modal}>
        <Text style={styles.text}>{props.text}</Text>
        <View style={styles.container2}>
          <View style={styles.button}>
            <Button
              style={styles.button}
              width={wp(95)}
              bgColor="#448ef6"
              borColor="#448ef6"
              press={props.cancel}
              text="Cancel"
            />
          </View>
          <View style={styles.button}>
            <Button
              width={wp(95)}
              bgColor="#ec5858"
              borColor="#ec5858"
              press={props.delete}
              text="Delete"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container2: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 25,
    color: '#1A3150',

    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modal: {
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: wp(325),
    height: wp(150),
    borderRadius: 5,
  },
  button: {
    marginHorizontal: hp(15),
    marginVertical: wp(20),
  },
});
