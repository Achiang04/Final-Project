import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../reusable/Button/Buttons';
import Modal from 'react-native-modal';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function Modals(props) {
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
        <Text style={styles.text}>{props.text}</Text>
        <Text style={styles.text2}>{props.text2}</Text>
        <View style={styles.container2}>
          <Button
            width={wp(125)}
            bgColor="#FDCB5A"
            borColor="#FDCB5A"
            press={props.press}
            text="Close"
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
    fontSize: 30,
    color: '#1A3150',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: 20,
    marginVertical: hp(20),
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
    width: wp(300),
    height: wp(200),
    borderRadius: wp(10),
  },
});
