import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {wp, hp} from '../../reusable/Responsive/dimen';

export default function AppointCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.kotak}>
          <Text style={styles.text1}>{props.tanggal}</Text>
          <Text style={styles.text1}>{props.bulan}</Text>
        </View>
        <View>
          <Text style={styles.text2}>{props.lokasi}</Text>
          <Text style={styles.text3} numberOfLines={1}>
            {props.nama}
          </Text>
          <View style={styles.container2}>
            <View style={styles.statusContainer}>
              <Text style={styles.text4}>{props.jam}</Text>
              <Text style={styles.text6}>{props.status}</Text>
            </View>
            <Text style={styles.text5}>{props.waktu}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: wp(335),
    backgroundColor: 'white',
    padding: wp(10),
    margin: wp(10),
    alignSelf: 'center',
    shadowColor: '#000',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  container2: {
    flexDirection: 'row',
  },
  kotak: {
    width: wp(60),
    height: wp(60),
    borderWidth: 1,
    backgroundColor: '#1A3150',
    borderRadius: 5,
    alignItems: 'center',
    padding: wp(5),
    marginLeft: hp(5),
  },
  text1: {
    fontSize: 20,
    color: 'white',
  },
  text2: {
    marginLeft: hp(20),
    color: '#875C25',
  },
  text3: {
    width: wp(185),

    marginLeft: hp(20),
    color: 'black',
    fontSize: 20,

    fontWeight: 'bold',
  },
  text4: {
    marginLeft: hp(20),
    color: '#1A3150',
    fontWeight: 'bold',
    marginRight: -10,
  },
  text5: {
    color: '#1A3150',
    fontWeight: 'bold',
  },
  text6: {
    marginLeft: hp(15),
    color: '#875C25',
    left: wp(40),
    justifyContent: 'flex-end',
  },
  statusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tampungIcon: {
    flexDirection: 'row',
    position: 'absolute',
    left: wp(215),
    top: wp(10),
  },
});
