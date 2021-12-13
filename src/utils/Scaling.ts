import { Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');
export const guidelineBaseWidth = 414;
export const guidelineBaseHeight = 896;
export const scale = (size: number) => width / guidelineBaseWidth * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const defaultFactor = (width > guidelineBaseWidth) ? 0.5 : 1
export const moderateScale = (size: number, factor = defaultFactor) => size + (scale(size) - size) * factor;

