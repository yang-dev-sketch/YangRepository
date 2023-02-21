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
import { CommonUtils, PrefUtils } from '../../utils';
import { requestPost } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';
import auth from '@react-native-firebase/auth';
import GlobalState from '../../mobx/GlobalState';
import TouchID from 'react-native-touch-id';
import Toast from 'react-native-root-toast';

export default class LoginScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.navigation.getParam('type'),
      firstPhone: '1',
      secondPhone: '3232879385',
      code: '',
      confirm: null,
      verifyState: false,
      faceSupport: false,
      touchSupport: false,
      isAuth: false,
    };
  }

  componentDidMount = () => {
    const optionalConfigObject = {
      title: 'Provide Your Touch ID', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.isSupported(optionalConfigObject)
      .then((biometryType) => {
        if (biometryType === 'FaceID') {
          this.setState({ faceSupport: true });
        } else if (biometryType === 'TouchID') {
          this.setState({ touchSupport: true });
        } else if (biometryType === true) {
          // Touch ID is supported on Android
          this.setState({ faceSupport: true, touchSupport: true });
        }
      })
      .catch((error) => {
        // Failure code if the user's device does not have touchID or faceID enabled
        console.log('error: ', error);
      });
  };

  signInWithPhoneNumber = async () => {
    const phoneNumber = '+' + this.state.firstPhone + this.state.secondPhone;
    this.setState({ verifyState: true });
    const confirmation = auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
        if (error.code == 'auth/invalid-phone-number') {
          console.log('The format of the phone number provided is incorrect.');
        }
      });
    console.log('confirmation: ', confirmation);
    if (confirmation) {
      this.setState({ confirm: confirmation });
    }
  };

  confirmCode = async () => {
    try {
      let data = await this.state.confirm.confirm(this.state.code);
      console.log('data: ', data);
      this.setState({ verifyState: false });
      this.props.navigation.navigate('Facial');
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log('Account linking error');
      }
    }
  };

  handleBiometric = () => {
    const optionalConfigObject = {
      title: 'Provide Your Touch ID', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    if (this.state.isAuth) {
      return null;
    }
    TouchId.authenticate('', optionalConfigObject)
      .then((success) => {
        this.setState({ isAuth: success });
        this.props.navigation.navigate('Main');
      })
      .catch((err) => {
        Toast.show('Error: ', err);
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
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 17,
                  textDecorationLine: 'underline',
                  color: '#000',
                  fontFamily: 'Danidin',
                }}>
                {Langs.common.previous}
              </Text>
            </Button>
            <LocalImage
              source={require('src/assets/image/ic_gyme.png')}
              style={{ width: 152.26, height: 152.26 }}
            />
            <Text
              style={{
                fontSize: 24,
                lineHeight: 32,
                color: '#000',
                fontWeight: '700',
                position: 'absolute',
                bottom: 13,
                fontFamily: 'Danidin',
              }}>
              {Langs.common.entrance}
            </Text>
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20 }}>
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginBottom: 20, backgroundColor: '#F5F5F5', elevation: 1 },
              ]}
              title={Langs.common.phone_number}
              image={require('src/assets/image/ic_phone.png')}
              inputNode={
                <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <CommonInput
                    style={{ width: 70 }}
                    numberOfLines={1}
                    backgroundColor="#FFF"
                    textAlignCenter={true}
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
                    backgroundColor="#FFF"
                    maxLength={10}
                    value={this.state.secondPhone}
                    onChangeText={(text) => {
                      this.setState({ secondPhone: text });
                    }}
                  />
                </HorizontalLayout>
              }
            />
            {(this.state.verifyState == false && (
              <>
                <Button
                  style={{ alignSelf: 'center', marginBottom: 35 }}
                  onPress={() => {
                    this.signInWithPhoneNumber();
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 19,
                      textDecorationLine: 'underline',
                      color: '#000',
                      fontWeight: '600',
                      fontFamily: 'Danidin',
                    }}>
                    {Langs.regist.identi_by_email}
                  </Text>
                </Button>
                {this.state.touchSupport && (
                  <Button
                    onPress={() => {
                      this.handleBiometric();
                    }}>
                    <LocalImage
                      source={require('src/assets/image/ic_fingerprint.png')}
                      style={{ width: 36, height: 36, marginBottom: 20, alignSelf: 'center' }}
                    />
                  </Button>
                )}
                <ActiveButton
                  text={Langs.common.entrance}
                  style={{ width: '100%', marginBottom: 15 }}
                  action={() => {}}
                />
                {this.state.faceSupport && (
                  <DisactiveButton
                    text={Langs.regist.use_facial_recog}
                    image={true}
                    style={{ width: '100%', marginBottom: 40 }}
                    action={() => {
                      this.props.navigation.navigate('Facial');
                    }}
                  />
                )}
                {(this.state.type === 'coach' && (
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate('RegistCoach');
                    }}
                    style={{ alignSelf: 'center', marginBottom: 15 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 22,
                        textDecorationLine: 'underline',
                        color: '#0D65D9',
                        fontWeight: '600',
                        fontFamily: 'Danidin',
                      }}>
                      {Langs.regist.enrollment}
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
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>
                      {Langs.regist.enrollment}
                    </Text>
                  </Button>
                )}
              </>
            )) || (
              <>
                <SetValueGroup
                  style={[Styles.input_wrapper, { marginBottom: 40, backgroundColor: '#F5F5F5' }]}
                  title={Langs.regist.enter_code}
                  inputNode={
                    <CommonInput
                      numberOfLines={1}
                      backgroundColor="#FFF"
                      maxLength={6}
                      value={this.state.code}
                      onChangeText={(text) => {
                        this.setState({ code: text });
                      }}
                    />
                  }
                />
                <ActiveButton
                  text={Langs.common.entrance}
                  style={{ width: '100%', marginBottom: 15 }}
                  action={() => {
                    if (this.state.code.length === 6) {
                      this.confirmCode();
                    }
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
