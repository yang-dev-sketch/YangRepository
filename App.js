/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { firebase } from '@react-native-firebase/messaging';
import { observer } from 'mobx-react';
import React from 'react';
import { ActivityIndicator, Alert, BackHandler, LogBox, View } from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { Colors, Langs } from './src/constants';
import { IS_OFFLINE_MODE, SHARE_TYPE } from './src/constants/Constants';
import GlobalState from './src/mobx/GlobalState';
import MyInfo from './src/mobx/MyInfo';
import AppNavigator from './src/navigation/AppNavigator';
import NavigationService from './src/navigation/NavigationService';

const reporter = (error) => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  console.log(error); // sample
};

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    reporter(e);
    Alert.alert(
      Langs.app_error.title,
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        ${Langs.app_error.msg}
        `,
      [
        {
          text: Langs.common.ok,
          onPress: () => {},
        },
      ],
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

const APP_QUIT_ROUTES = ['Splash', 'Usage'];

setJSExceptionHandler(errorHandler);

setNativeExceptionHandler((errorString) => {
  //You can do something like call an api to report to dev team here
  // When you call setNativeExceptionHandler, react-native-exception-handler sets a
  // Native Exception Handler popup which supports restart on error in case of android.
  // In case of iOS, it is not possible to restart the app programmatically, so we just show an error popup and close the app.
  // To customize the popup screen take a look at CUSTOMIZATION section.
});

@observer
class App extends React.Component {
  constructor(props) {
    super(props);

    this.INTRO_TIME = 2; // splash delay time in seconds

    this.state = {
      loadedMetaData: false,
      introTimeOver: false,
    };

    LogBox.ignoreAllLogs(true);
  }

  componentDidMount() {
    if (!GlobalState.applicationCreated) {
      GlobalState.applicationCreated = true;

      if (!IS_OFFLINE_MODE) {
        this.checkPermission();
        this.createNotificationListeners();
      }
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const currentRouteName = NavigationService.getCurrentRoute(
      NavigationService.getTopLevelNavigator().state.nav,
    );

    if (currentRouteName == 'Main') {
      return true;
    }

    if (!APP_QUIT_ROUTES.includes(currentRouteName)) {
      return false;
    }

    if (this.confirmExit == true) {
      BackHandler.exitApp();
    } else {
      Toast.show(Langs.app_exit);
      this.confirmExit = true;
      this.timeOut = setTimeout(() => {
        this.confirmExit = false;
        clearTimeout(this.timeOut);
      }, 2000);
    }

    return true;
  };

  componentWillUnmount() {
    if (!IS_OFFLINE_MODE) {
      if (this.unsubscribeMessaging) {
        this.unsubscribeMessaging();
      }
    }
  }

  async getToken() {
    MyInfo.fcm_token = await firebase.messaging().getToken();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled > 0) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    this.unsubscribeMessaging = firebase.messaging().onMessage((message) => {
      console.log('FCM Message Data:', message.data);

      const type = Number(message.data.type);
      if (type == 0) {
        // TODO: do sth
      }
    });
  }

  render() {
    return (
      <RootSiblingParent>
        <View style={{ width: '100%', height: '100%' }}>
          <AppNavigator
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
          {GlobalState.isLoading && (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              <ActivityIndicator
                style={{ backgroundColor: 'transparent' }}
                size="large"
                color={Colors.primary}
              />
            </View>
          )}
        </View>
      </RootSiblingParent>
    );
  }
}

export default App;
