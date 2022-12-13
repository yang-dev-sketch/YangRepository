import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Dimens from './Dimens';
import FontFamily from './FontFamily';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    fontFamily: FontFamily.danidin,
    direction: 'rtl',
  },
  full: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
});
