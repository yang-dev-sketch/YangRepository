import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {Langs, Styles} from '../../constants';
import {AppScreen, Button, HorizontalLayout, LocalImage, VerticalLayout} from '../../components/controls';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import '../../utils/Extensions';
import {View} from 'react-native-animatable';
import {requestPost} from '../../utils/ApiUtils';
import {API, API_RES_CODE, PREF_PARAMS} from '../../constants/Constants';
import {PrefUtils} from '../../utils';


export default class LoginScreen extends AppScreen {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <KeyboardAvoidingView style={Styles.container}>
          <TouchableWithoutFeedback style={Styles.container}>
            <ScrollView style={{flex: 1}}
                        disableScrollViewPanResponder={true}
                        showsVerticalScrollIndicator={false}>
              <VerticalLayout style={[styles.login_content, {flex: 1}]}>
                <HorizontalLayout style={[Styles.h_center]}>
                  <LocalImage style={styles.img_vector} source={require('src/assets/image/ic_banner2.png')}/>
                </HorizontalLayout>

                <HorizontalLayout style={[Styles.h_center]}>
                  <LocalImage style={styles.img_logo} source={require('src/assets/image/ic_banner2.png')}/>
                </HorizontalLayout>

                <HorizontalLayout style={styles.log_com_pad}>
                  <Button style={[styles.btn_login, {justifyContent: 'center', alignItems: 'center'}]} onPress={() => {
                    this.onLoginEmail();
                  }}>
                    <Text style={styles.lbl_btn_login}>{Langs.login.login_with_email}</Text>
                  </Button>
                </HorizontalLayout>

                <HorizontalLayout style={[Styles.v_center, { marginTop: 25 }]}>
                  <Text onPress={() => {
                    this.onGoFindEmail();
                  }} style={styles.lbl_forgot_id}>{Langs.login.find_id}</Text>
                  <Text onPress={() => {
                    this.onGoResetPassword();
                  }} style={[styles.lbl_forgot_id, {marginLeft: 10}]}>{Langs.login.reset_password}</Text>
                  <View style={{flex: 1}}/>
                  <Text onPress={() => {
                    this.onGoSignUp();
                  }} style={[styles.lbl_forgot_id]}>{Langs.login.sign_up}</Text>
                </HorizontalLayout>

                <HorizontalLayout style={[Styles.space_between, Styles.v_center, {marginTop: 15}]}>
                  <Text style={styles.ornament_line}/>
                  <Text style={styles.lbl_easy_login}>{Langs.login.easy_login}</Text>
                  <Text style={styles.ornament_line}/>
                </HorizontalLayout>

                <HorizontalLayout style={[Styles.v_center, {marginTop: 15}]}>
                  <Button
                      onPress={() => {this.onGoEasyLogin(1)}}
                      style={{marginLeft: 'auto', marginRight: 60}}
                  >
                    <LocalImage style={styles.img_circle} source={require('src/assets/image/ic_banner2.png')}/>
                  </Button>
                  <Button
                      onPress={() => {this.onGoEasyLogin(2) }}
                      style={{marginRight: 'auto'}}
                  >
                    <LocalImage style={styles.img_circle} source={require('src/assets/image/ic_banner2.png')}/>
                  </Button>
                </HorizontalLayout>
              </VerticalLayout>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

      </SafeAreaView>
    )
  }

  onLoginEmail = () => {
    this.props.navigation.navigate('LoginEmail');
  };

  onGoSignUp = () => {
    this.props.navigation.navigate('Signup');
  };

  onGoFindEmail = () => {
    this.props.navigation.navigate('FindIdSec');
  };

  onGoResetPassword = () => {
    this.props.navigation.navigate('FindPwdSec');
  };

  onGoEasyLogin = (login_type) => {
    let sns_id = "";
    switch (login_type) {
      case 1: //Google
        sns_id = "test@google.com";
        break;
      case 2: //Line
        sns_id = "test@line.com";
        break;
      default:
        break;
    }

    //check login
    requestPost(
        API.Login.check_login,
        {
            user_id: sns_id,
            password: '',
            dev_type: Platform.OS == 'android' ? 0 : 1,
            fcm_token: this.myInfo.fcm_token,
            login_type: login_type,
        }
    ).then(async result => {
        if(result.code == API_RES_CODE.SUCCESS) {
            await PrefUtils.setString(PREF_PARAMS.EMAIL, sns_id);
            await PrefUtils.setString(PREF_PARAMS.PWD, '');
            await PrefUtils.setInt(PREF_PARAMS.LOGIN_TYPE, login_type);

            this.myInfo.uid = result.data.user_uid;
            this.myInfo.password = '';
            this.myInfo.login_type = login_type;

            this.props.navigation.goBack();
        } else {
            this.myInfo.login_type = login_type;
            this.myInfo.email = sns_id;
            this.myInfo.password = '';

            // this.props.navigation.navigate('SignupSec');
        }
    });
  };
}

const styles = StyleSheet.create({
  login_content: {
    paddingHorizontal: 57,
    marginTop: 37,
    paddingBottom: 50
  },

  btn_login: {
    height: 53,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'darkgrey',
    borderRadius: 5,
    marginTop: 30
  },

  lbl_btn_login: {
    color: '#222222',
    fontSize: 13
  },

  lbl_forgot_id: {
    color: '#222222',
    fontSize: 13
  },

  img_vector: {
    width: 454,
    height: 376
  },

  img_logo: {
    width: 270,
    height: 59,
    marginTop: 10
  },

  log_com_pad: {
    paddingTop: 60
  },

  ornament_line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgrey',
  },

  lbl_easy_login: {
    color: '#222222',
    fontSize: 15,
    marginTop: 20,
    fontWeight: 'bold',
    marginHorizontal: 5
  },

  img_circle: {
    width: 49,
    height: 49,
  }
});
