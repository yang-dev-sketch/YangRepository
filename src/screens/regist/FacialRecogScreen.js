import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Langs, Styles } from '../../constants';
import { API, API_RES_CODE, SCREEN_WIDTH } from '../../constants/Constants';
import {
  AppScreen,
  Button,
  HorizontalLayout,
  LocalImage,
  VerticalLayout,
} from '../../components/controls';
import { requestPost } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, DisactiveButton } from '../../components/common';

export default class FacialRecogScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }

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
        this.props.navigation.navigate('FaceApproval');
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
              height: 355,
              alignItems: 'center',
              justifyContent: 'center',
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
              source={require('src/assets/image/ic_mark.png')}
              style={{ width: 73, height: 73 }}
            />
            <Text
              style={{
                fontSize: 24,
                lineHeight: 29,
                letterSpacing: -0.17,
                marginTop: 14,
                color: '#000',
                fontWeight: '600',
                fontFamily: 'Danidin',
              }}>
              {Langs.regist.face_id}
            </Text>
          </LinearGradient>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 22,
              marginHorizontal: 20,
              letterSpacing: -0.17,
              color: '#000',
              fontWeight: '600',
              fontFamily: 'Danidin',
            }}>
            {Langs.regist.face_recog_text}
          </Text>
          <HorizontalLayout
            style={{ justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 205 }}>
            <View style={{ width: (SCREEN_WIDTH - 65) / 2 }}>
              <ActiveButton
                text={Langs.regist.agree}
                style={{ width: '100%', marginBottom: 40 }}
                action={() => {
                  this.handleBiometric();
                }}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - 65) / 2 }}>
              <DisactiveButton
                text={Langs.regist.no_thanks}
                style={{ width: '100%', marginBottom: 40 }}
                action={() => {
                  this.props.navigation.goBack();
                }}
              />
            </View>
          </HorizontalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
