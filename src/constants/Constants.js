import { Dimensions } from 'react-native';

export const IS_OFFLINE_MODE = true;
export const IS_UI_MODE = false;

export const SERVER_URL = IS_OFFLINE_MODE ? 'http://10.0.2.2:5000/' : 'http://api.made.me';
export const API_URL = SERVER_URL;
export const IMAGE_FOO_URL = 'http://localhost:8081/src/assets/image/ic_shadow.png';

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
  SETTING: 0,
  REPORT: 1,
  CARD: 2,
  HOME: 3,
  TRAIN: 4,
  CHAT: 5,
  GYME: 6,
  MORE: 7,
  SHOP: 8,
  PRODUCT: 9,
  PROFILE: 10,
  PAYMENT: 11,
  BUSINESS: 12,
  ADDBUSINESS: 13,
  PAYMETHOD: 14,
  SUBSCRIPTION: 15,
  PERMISSION: 16,
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

  Regist: {
    regist_coach: 'regist/regist_coach/',
    check_login: 'regist/check_login',
    check_domain: 'regist/check_domain',
    check_password: 'regist/check_password',
    check_nickname: 'regist/check_nickname',
    get_cert_num: 'regist/get_cert_num',
    check_cert_num: 'regist/check_cert_num',
    get_signup_terms: 'regist/get_signup_terms',
    sign_up: 'regist/sign_up',
    check_phone: 'regist/check_phone',
  },
  Home: {
    update_train_time: 'Home/update_train_time',
    get_branch: 'Home/get_branch',
    add_branch: 'Home/add_branch',
    delete_branch: 'Home/delete_branch',
    get_product: 'home/get_product',
    add_product: 'home/add_product',
    update_product: 'home/update_product',
    delete_product: 'home/delete_product',
    get_train: 'home/get_train',
    add_trainee: 'home/add_trainee',
    get_trainee: 'home/get_trainee',
    delete_trainee: 'home/delete_trainee',
    send_invitation: 'home/send_invitation',
    get_task: 'home/get_task',
    get_role: 'home/get_role',
    set_role: 'home/set_role',
  }
};
