import LocalizedStrings from 'react-native-localization';

import en from './../assets/locales/en.js'
import hb from '../assets/locales/hb.js'

const Langs = new LocalizedStrings({ en, hb });
Langs.setLanguage('hb');

export default Langs;
