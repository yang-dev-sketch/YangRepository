import LocalizedStrings from 'react-native-localization';

import en from './../assets/locales/en.js'
import jp from './../assets/locales/jp.js'

const Langs = new LocalizedStrings({ en, jp });
Langs.setLanguage('jp');

export default Langs;
