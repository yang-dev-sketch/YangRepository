import React from 'react';
import { BackHandler, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { Langs, Styles } from '../../constants';
import {
  API,
  API_RES_CODE,
  PREF_PARAMS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/Constants';
import { AppScreen, LocalImage } from '../../components/controls';
import { CommonUtils, PrefUtils } from '../../utils';
import { requestPost } from '../../utils/ApiUtils';
import GlobalState from '../../mobx/GlobalState';
import EventBus from 'react-native-event-bus';
import { ActiveButton, DisactiveButton } from '../../components/common';

const SplashPermissionList = [PERMISSIONS.ANDROID.READ_PHONE_STATE];

export default class SplashScreen extends AppScreen {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView
        style={[
          {
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'white'
          },
        ]}>
        <LocalImage
          source={require('src/assets/image/ic_splash.png')}
          style={[{ width: '100%', height: '80%', position: 'absolute', top: 0 }]}
          resizeMode="cover"
        />
        <Text style={{ width: SCREEN_WIDTH - 124, fontSize: 24, lineHeight: 29, position: 'absolute', top: 465, textAlign: 'center' }}>נרשמת בהצלחה, אנו שמחים לראות אותך</Text>
        <ActiveButton
          text="הַתחָלָה"
          style={{ width: SCREEN_WIDTH - 124, position: 'absolute', bottom: 55 }}
          action={() => {
            this.props.navigation.navigate('Main');
          }}
        />
      </SafeAreaView>
    );
  }

  checkPermission = async () => {
    let result = await checkMultiple(
      Platform.select({
        android: SplashPermissionList,
      }),
    );

    let isAllGranted = true;
    for (let index in SplashPermissionList) {
      if (result[SplashPermissionList[index]] !== RESULTS.GRANTED) {
        isAllGranted = false;
      }
    }

    if (isAllGranted) {
      this.autoLogin();
    } else {
      this.requestPermission();
    }
  };

  requestPermission = async () => {
    let result = await requestMultiple(
      Platform.select({
        android: SplashPermissionList,
      }),
    );

    let isAllGranted = true;
    for (let index in SplashPermissionList) {
      if (result[SplashPermissionList[index]] !== RESULTS.GRANTED) {
        isAllGranted = false;
      }
    }
  };

  autoLogin = async () => {
    let email = await PrefUtils.getString(PREF_PARAMS.EMAIL);
    let pwd = await PrefUtils.getString(PREF_PARAMS.PWD);
    let login_type = await PrefUtils.getInt(PREF_PARAMS.LOGIN_TYPE);
    let lang = await PrefUtils.getString(PREF_PARAMS.LANG);
    if (CommonUtils.isEmpty(lang)) {
      lang = 'jp';
    }

    EventBus.getInstance().fireEvent('changeLang', { lang: lang });
    GlobalState.langPopup.langStatus = lang;
    Langs.setLanguage(lang);

    if (CommonUtils.isEmpty(email)) {
      this.go2Main();
    } else {
      requestPost(API.Login.check_login, {
        user_id: email,
        password: pwd,
        dev_type: Platform.OS == 'android' ? 0 : 1,
        fcm_token: this.myInfo.fcm_token,
        login_type: login_type,
      }).then((result) => {
        if (result.code == API_RES_CODE.SUCCESS) {
          this.myInfo.uid = result.data.user_uid;
          this.go2Main();
        } else {
          this.go2Main();
        }
      });
    }
  };

  go2Main = () => {
    setTimeout(() => {
      // this.props.navigation.navigate('Main');
      this.setState({ showButton: true });
    }, Math.max(0, this.INTRO_TIME - (new Date().getTime() - this.startTime)));
  };
}

const styles = StyleSheet.create({
  logo_text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff5f5',
  },

  logo: {
    color: 'black',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
  },
});
