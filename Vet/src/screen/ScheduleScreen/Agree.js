import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../reusable/Button/Buttons';
import Modal from 'react-native-modal';
import {wp} from '../../reusable/Responsive/dimen';

export default function Agree(props) {
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
      onBackdropPress={props.cancel}
      onBackButtonPress={props.cancel}>
      <View style={styles.modal}>
        <Text style={styles.text}>Delete Doctor from Clinic</Text>
        <View style={styles.container2}>
          <View style={styles.button}>
            <Button
              style={styles.button}
              width={100}
              bgColor="#FDCB5A"
              borColor="#FDCB5A"
              press={props.cancel}
              text="Cancel"
            />
          </View>
          <View style={styles.button}>
            <Button
              width={wp(100)}
              bgColor="#FDCB5A"
              borColor="#FDCB5A"
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
    width: 350,
    height: 150,
    borderRadius: 10,
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
});
