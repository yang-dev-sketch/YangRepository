import { Dimensions } from 'react-native';

export const IS_OFFLINE_MODE = true;
export const IS_UI_MODE = false;

// export const SERVER_URL = IS_OFFLINE_MODE ? 'http://192.168.0.58:9006/admin/index.php' : 'http://api.made.me';
export const SERVER_URL = IS_OFFLINE_MODE ? 'http://192.168.0.33/Koeyou/PSJDC2202-Keoyou/admin/index.php' : 'http://api.made.me';
export const API_URL = SERVER_URL + '/api/';
export const IMAGE_FOO_URL = 'http://localhost:8081/src/assets/image/ic_shadow.png';
export const SHOPPING_MALL_URL = 'http://192.168.0.58:9006/admin/index.php/api/Login/test';

export const MANAGER_PHONE = '020000000';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('screen').width;

export const PREF_PARAMS = {
  EMAIL: 'email',
  PWD: 'pwd',
  ID: 'id',
  LOGIN_TYPE: 'login_type',
  LANG: 'language',
};

export const MAIN_TAB = {
  HOME: 0,
  CHALLENGE: 1,
  OPEN: 2,
  MYPAGE: 3,
};

export const API_RES_CODE = {
  SUCCESS: 0,
  API_RESULT_ERROR_PARAMETER: 1,
  API_RESULT_ERROR_DB: 2,
  API_RESULT_ERROR_INFO_NO_EXIST: 3,
  API_RESULT_ERROR_PASSWORD: 4,
  API_RESULT_ERROR_DUPLICATE: 5,
  API_RESULT_ERROR_PRIVILEGE: 6,
  API_RESULT_ERROR_EMAIL_DUPLICATE: 7,
  API_RESULT_ERROR_WITHDRAWAL: 8,
  API_RESULT_ERROR_FORCE_OUT: 9,
  API_RESULT_ERROR_UNKNOWN: 999,
};

export const API = {
  Upload: {
    upload: 'Upload/index',
    multi: 'Upload/multi_upload'
  },

  Login: {
    check_login: 'Login/check_login',
    check_domain: 'Login/check_domain',
    check_password: 'Login/check_password',
    check_nickname: 'Login/check_nickname',
    get_cert_num: 'Login/get_cert_num',
    check_cert_num: 'Login/check_cert_num',
    get_signup_terms: 'Login/get_signup_terms',
    sign_up: 'Login/sign_up',
    check_phone: 'Login/check_phone',
  },
  Home: {
    update_train_time: 'Home/update_train_time',
  }
};
