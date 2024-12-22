import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const FindSize = (size: number) => {
  return (size * width) / 414;
};

export const Size = {
  // Font Sizes
  _18: FindSize(18),
  _16: FindSize(16),
  _14: FindSize(14),
  _12: FindSize(12),
  _10: FindSize(10),

  // Other Sizes
  _3: FindSize(3),
  _8: FindSize(8),
  _15: FindSize(15),
  _20: FindSize(20),
  _24: FindSize(24),
  _28: FindSize(28),
  _30: FindSize(30),
  _32: FindSize(32),
  _40: FindSize(40),
  _50: FindSize(50),
  FindSize,
  width,
  height,
};
