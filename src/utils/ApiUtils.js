import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import { API, API_RES_CODE, API_URL, IS_OFFLINE_MODE } from '../constants/Constants';
import { Langs } from '../constants';
import CommonUtils from './CommonUtils';
import GlobalState from '../mobx/GlobalState';


async function request(options, showLoading = true) {
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept': 'application/json',
    'App-Package': DeviceInfo.getBundleId(),
    'App-Version-Name': DeviceInfo.getVersion(),
    'App-Version-Code': DeviceInfo.getBuildNumber(),
    'App-Device': Platform.OS === 'android' ? 'android' : 'ios',
    'App-Did': DeviceInfo.getUniqueId(),
    'App-Access-Token': '',
  };
  let defaults = {headers: headers};
  const options1 = Object.assign({}, defaults, options);

  if (
    // not show global loading bar
    showLoading
  ) {
    GlobalState.setLoading(true);
  }

  console.log('@@@@@@@@Request url: ' + API_URL + options1.url);
  console.log('@@@@@@@@Request: ' + JSON.stringify(options1));

  let firstResponse = await fetch(API_URL + options1.url, options1).catch((error) => {
    GlobalState.setLoading(false);
    console.log('>>>>>>>>> REPONSE FAILED <<<<<<<<<<');
    Toast.show(Langs.app_error.network);
    throw Error(error);
  });

  let resultTxt = await firstResponse.clone().text();
  console.log('@@@@@@@@Result: ' + resultTxt);

  GlobalState.setLoading(false);
  if (firstResponse.ok) {
    let result = await firstResponse.json();
    return result;
  } else {
    Toast.show(Langs.app_error.network);
    throw Error(resultTxt);
  }
}

export function requestGet(url, param = null, showLoading = true) {
  let queryString = new URLSearchParams();
  if (param !== undefined && param != null) {
    for (let key in param) {
      queryString.append(key, param[key]);
    }
  }

  let options = {
    url: url + '?' + queryString.toString(),
    method: 'GET',
  };
  return request(options, showLoading);
}

export function requestPost(url, param = null, showLoading = true) {
  let options = {
    url: url,
    method: 'POST',
  };

  if (param !== undefined && param != null) {
    param['lang'] = GlobalState.langPopup.langStatus == 'en' ? 0 : 1;

    let formBody = [];
    for (let property in param) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(param[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    options.body = formBody.join('&');
  }

  return request(options, showLoading);
}

export async function requestUpload(url, file_uri, category = '') {
  let formData = new FormData();
  formData.append('category', category);

  if (Array.isArray(file_uri)) {
    file_uri.forEach((uri) => {
      let fileType = uri.substring(uri.lastIndexOf('.') + 1);
      let file = {
        fileName: uri.replace(/^.*[\\\/]/, ''),
        type: 'image/jpeg',
        uri: uri, // file:///storage/emulated/0/Pictures/Hire/hire_34852646.jpg
      };

      formData.append('uploadfile[]', {
        name: file.fileName,
        type: file.type,
        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
      });
    });
  } else {
    let fileType = file_uri.substring(file_uri.lastIndexOf('.') + 1);
    let file = {
      fileName: file_uri.replace(/^.*[\\\/]/, ''),
      type: 'image/jpeg',
      uri: file_uri, // file:///storage/emulated/0/Pictures/Hire/hire_34852646.jpg
    };

    formData.append('uploadfile', {
      name: file.fileName,
      type: file.type,
      uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
    });
  }

  let options = {
    url: API_URL + url,
    method: 'POST',
    body: formData,
  };

  let headers = {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    'App-Package': IS_OFFLINE_MODE ? 'com.real' : DeviceInfo.getInstallerPackageName(),
    'App-Version-Name': DeviceInfo.getVersion(),
    'App-Version-Code': DeviceInfo.getBuildNumber(),
    'App-Device': Platform.OS === 'android' ? 'android' : 'ios',
    'App-Did': DeviceInfo.getUniqueId(),
    'App-Access-Token': '',
  };

  let defaults = {headers: headers};
  const options1 = Object.assign({}, defaults, options);
  GlobalState.setLoading(true);

  console.log('@@@@@@@@Request url: ' + options1.url);
  // console.log('@@@@@@@@Request: ' + JSON.stringify(options1));

  let firstResponse = await fetch(options1.url, options1).catch((error) => {
    GlobalState.setLoading(false);
    console.log('@@@@@@@@Response upload: ', error);
    throw Error(error);
  });
  // console.log('@@@@@@@@Response upload: ' + JSON.stringify(firstResponse));
  GlobalState.setLoading(false);
  // let resultTxt = await firstResponse.clone().text();
  // console.log('@@@@@@@@Result: ' + resultTxt);

  let result = await firstResponse.json();

  if (firstResponse.ok) {
    if (result.code !== API_RES_CODE.SUCCESS) {
      // CommonUtils.showConfirm(
      //   '',
      //   Langs.app_error.network,
      //   Langs.common.ok,
      //   Langs.common.cancel1,
      //   () => {
      //     requestUpload(url, category, file_uri);
      //   },
      // );
    }
    return result;
  } else {
    if (result.code !== API_RES_CODE.SUCCESS) {
      CommonUtils.showConfirm(
        '',
        Langs.app_error.network,
        Langs.common.ok,
        Langs.common.cancel1,
        () => {
          requestUpload(url, category, file_uri);
        },
      );
    }
    throw Error(result.result_msg);
  }
}
