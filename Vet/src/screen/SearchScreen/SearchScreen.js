import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {wp} from '../../reusable/Responsive/dimen';
import Header1 from '../../reusable/Header/Header1';
import SearchBar from '../../reusable/SearchBar/SeacrchBar';
import ClinicCard from '../../reusable/ClinicCard/ClinicCard';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../redux/Constant/general';

export default function SearchScreen() {
  const [clinic, setClinic] = useState([]);
  const [filterClinic, setFilterClinic] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getClinic = async () => {
    try {
      let response = await fetch(`${BASE_URL}clinic/getAll`);
      let json = await response.json();
      setClinic(json.data);
      setFilterClinic(json.data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getClinic();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Image
          style={styles.indicator}
          source={require('../../assets/image/LOADING.gif')}
        />
      </View>
    );
  }

  const RenderClinic = ({item}) => {
    return (
      <ClinicCard
        image={{uri: item.image}}
        kota={item.clinic.city}
        nama={item.name}
        id={item._id}
        jalan={item.clinic.address}
        press={() =>
          navigation.navigate('DetailCard', {
            linkGambar: {uri: item.image},
            kota: item.clinic.city,
            id: item._id,
            nama: item.name,
            jalan: item.clinic.address,
          })
        }
      />
    );
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = clinic.filter(function (item) {
        const initialData =
          item.clinic == null
            ? null
            : item.clinic.address + item.name + item.clinic.city;
        const itemData = initialData
          ? initialData.replace(/\s/g, '').toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterClinic(newData);
      setSearch(text);
    } else {
      setFilterClinic(clinic);
      setSearch(text);
    }
  };

  let searchTrigger;
  if (search == 0) {
    searchTrigger = (
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/image/search.png')}
          />
        </View>
      </View>
    );
  } else {
    searchTrigger = (
      <FlatList
        data={filterClinic}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <RenderClinic item={item} />}
      />
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <Header1 name={'Search'} bgColor={'#1A3150'} />
        <SearchBar
          onChange={(text) => searchFilterFunction(text)}
          value={search}
        />
        <ScrollView>{searchTrigger}</ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  indicator: {
    width: wp(250),
    height: wp(250),
    marginTop: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: wp(275),
    height: wp(275),
    opacity: 0.3,
  },
  imageContainer: {
    marginVertical: '25%',
    alignSelf: 'center',
  },
});
