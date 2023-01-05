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
import {
  IS_OFFLINE_MODE,
  SHARE_TYPE,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
} from './src/constants/Constants';
import GlobalState from './src/mobx/GlobalState';
import MyInfo from './src/mobx/MyInfo';
import AppNavigator from './src/navigation/AppNavigator';
import NavigationService from './src/navigation/NavigationService';
import SInfo from 'react-native-sensitive-info';
import Auth0 from 'react-native-auth0';
import jwtDecode from 'jwt-decode';

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

const APP_QUIT_ROUTES = ['Splash'];

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
      loading: true,
      loggedIn: null,
      userData: null,
    };
    LogBox.ignoreAllLogs(true);

    this.auth0 = new Auth0({
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENT_ID,
    });
  }

  login = async () => {
    try {
      const credentials = await this.auth0.webAuth.authorize({
        scope: 'openid email profile',
      });
      console.log('credentials', credentials);
      await SInfo.setItem('idToken', credentials.idToken, {});
      const user_data = await getUserData(credentials.idToken);
      this.setState({ loggedIn: true, userData: user_data });
    } catch (err) {
      console.log(err)
      alert('Error logging in');
    }
  };

  logout = async () => {
    try {
      await this.auth0.webAuth.clearSession({});
      await SInfo.deleteItem('idToken', {});
      this.setState({ loggedIn: false, userData: user_data });
    } catch (err) {
      alert('Error logging in');
    }
  };

  getUserData = async (id) => {
    const idToken = id ? id : await SInfo.getItem('idToken', {});
    const { name, picture, exp } = jwtDecode(idToken);

    if (exp < Date.now() / 1000) {
      throw new Error('ID token expired!');
    }

    return {
      name,
      picture,
    };
  };

  componentDidMount() {
    if (!GlobalState.applicationCreated) {
      GlobalState.applicationCreated = true;
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    // this.login();
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

  // async getToken() {
  //   MyInfo.fcm_token = await firebase.messaging().getToken();
  // }

  render() {
    return (
      <RootSiblingParent>
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
      </RootSiblingParent>
    );
  }
}

export default App;
