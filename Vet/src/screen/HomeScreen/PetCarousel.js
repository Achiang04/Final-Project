import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from '../../reusable/Responsive/Responsive';
import {wp, hp} from '../../reusable/Responsive/dimen';

const ENTRIES1 = [
  {
    id: 1,

    illustration: require('../../assets/image/Post-1.png'),
  },
  {
    id: 2,

    illustration: require('../../assets/image/Post-2.png'),
  },
  {
    id: 3,
    illustration: require('../../assets/image/Post-3.png'),
  },
  {
    id: 4,
    illustration: require('../../assets/image/Post-4.png'),
  },
  {
    id: 5,
    illustration: require('../../assets/image/Post-5.png'),
  },
];
const {width: screenWidth} = Dimensions.get('window');

const PetCarousel = (props) => {
  const [entries, setEntries] = useState([]);
  const [slider1ActiveSlide, setSlider1ActiveSlide] = useState(0);

  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({item}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item.illustration}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        activedo
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={wp(260)}
        autoplay={true}
        loopClonesPerSide={5}
        autoplayInterval={5000}
        onSnapToItem={(index) => setSlider1ActiveSlide(index)}
        loop={true}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />

      <Pagination
        dotsLength={entries.length}
        activeDotIndex={slider1ActiveSlide}
        dotColor={'#FDCB5A'}
        dotStyle={styles.paginationDot}
        inactiveDotColor={'lightgrey'}
        inactiveDotOpacity={0.75}
        inactiveDotScale={1}
        carouselRef={carouselRef}
      />
    </View>
  );
};

export default PetCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationDot: {
    width: wp(7.5),
    height: wp(7.5),
    borderRadius: 50,
    marginTop: wp(-7),
    marginHorizontal: hp(0),
  },
  item: {
    alignSelf: 'center',
    width: wp(260),
    height: wp(135),
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: moderateScale(0),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'stretch',
    backgroundColor: '#1A3150',
  },
});
