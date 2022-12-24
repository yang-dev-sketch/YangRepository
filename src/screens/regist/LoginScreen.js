import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Langs, Styles } from '../../constants';
import { API, API_RES_CODE } from '../../constants/Constants';
import {
  AppScreen,
  Button,
  HorizontalLayout,
  LocalImage,
  VerticalLayout,
} from '../../components/controls';
import { PrefUtils } from '../../utils';
import { requestPost } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';

export default class LoginScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.navigation.getParam('type'),
      firstPhone: '',
      secondPhone: '',
      code: '',
    };
  }

  onGoEasyLogin = (login_type) => {
    let sns_id = '';
    switch (login_type) {
      case 1: //Google
        sns_id = 'test@google.com';
        break;
      case 2: //Line
        sns_id = 'test@line.com';
        break;
      default:
        break;
    }

    //check login
    requestPost(API.Login.check_login, {
      user_id: sns_id,
      password: '',
      dev_type: Platform.OS == 'android' ? 0 : 1,
      fcm_token: this.myInfo.fcm_token,
      login_type: login_type,
    }).then(async (result) => {
      if (result.code == API_RES_CODE.SUCCESS) {
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

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(92,157,242,0.25)', 'rgba(92,157,242,0)']}
            style={{
              width: '100%',
              height: 350,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 7,
            }}>
            <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ alignSelf: 'center', position: 'absolute', top: 60, left: 21 }}>
              <Text style={{ fontSize: 14, lineHeight: 17, textDecorationLine: 'underline' }}>
                הקודם
              </Text>
            </Button>
            <LocalImage
              source={require('src/assets/image/ic_gyme.png')}
              style={{ width: 152.26, height: 152.26 }}
            />
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20 }}>
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginBottom: 20, backgroundColor: 'white', elevation: 1 },
              ]}
              title="מספר טלפון"
              image={require('src/assets/image/ic_phone.png')}
              inputNode={
                <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <CommonInput
                    style={{ width: 70 }}
                    numberOfLines={1}
                    backgroundColor="#F5F5F5"
                    maxLength={3}
                    value={this.state.firstPhone}
                    onChangeText={(text) => {
                      this.setState({ firstPhone: text });
                    }}
                  />
                  <View
                    style={{ width: 12, height: 0, borderWidth: 1, borderColor: '#000' }}></View>
                  <CommonInput
                    style={{ width: 230 }}
                    numberOfLines={1}
                    backgroundColor="#F5F5F5"
                    maxLength={10}
                    value={this.state.secondPhone}
                    onChangeText={(text) => {
                      this.setState({ secondPhone: text });
                    }}
                  />
                </HorizontalLayout>
              }
            />
            {(this.state.firstPhone === '' && this.state.secondPhone === '' && (
              <>
                <Button style={{ alignSelf: 'center', marginBottom: 30 }}>
                  <Text style={{ fontSize: 16, lineHeight: 19, textDecorationLine: 'underline' }}>
                    הזדהות ע״י איימיל
                  </Text>
                </Button>
                <ActiveButton
                  text="להיכנס"
                  style={{ width: '100%', marginBottom: 15 }}
                  action={() => {}}
                />
                <DisactiveButton
                  text="השתמש בזיהוי פנים"
                  image={true}
                  style={{ width: '100%', marginBottom: 40 }}
                  action={() => {
                    this.props.navigation.navigate('Facial');
                  }}
                />
                {(this.state.type === 'coach' && (
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate('RegistCoach');
                    }}
                    style={{ alignSelf: 'center', marginBottom: 15 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        textDecorationLine: 'underline',
                        color: '#0D65D9',
                      }}>
                      הרשמה
                    </Text>
                  </Button>
                )) || (
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate('RegistBusinessOne');
                    }}
                    style={{
                      width: '100%',
                      height: 50,
                      borderRadius: 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#94BDF2',
                      marginBottom: 15,
                    }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}> הרשמה</Text>
                  </Button>
                )}
              </>
            )) || (
              <>
                <SetValueGroup
                  style={[Styles.input_wrapper, { marginBottom: 40, backgroundColor: '#FFF' }]}
                  title="להזין את הקוד"
                  inputNode={
                    <CommonInput
                      numberOfLines={1}
                      backgroundColor="#F5F5F5"
                      maxLength={10}
                      value={this.state.code}
                      onChangeText={(text) => {
                        this.setState({ code: text });
                      }}
                    />
                  }
                />
                <ActiveButton
                  text="כניסה"
                  style={{ width: '100%', marginBottom: 15 }}
                  action={() => {
                    this.props.navigation.navigate('Facial');
                  }}
                />
              </>
            )}
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
