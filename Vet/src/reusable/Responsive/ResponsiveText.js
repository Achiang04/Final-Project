import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 834;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const size = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export {size};
