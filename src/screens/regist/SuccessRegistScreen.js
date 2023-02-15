import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { API, API_RES_CODE, SCREEN_WIDTH } from '../../constants/Constants';
import { AppScreen, LocalImage } from '../../components/controls';
import { requestPost } from '../../utils/ApiUtils';
import { ActiveButton } from '../../components/common';
import { Langs } from "../../constants";

export default class SplashScreen extends AppScreen {
  constructor(props) {
    super(props);
  }

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
            backgroundColor: 'white',
          },
        ]}>
        <LocalImage
          source={require('src/assets/image/ic_splash.png')}
          style={[{ width: '100%', height: '100%', position: 'absolute', top: 0 }]}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 32,
            lineHeight: 38.4,
            letterSpacing: -0.17,
            color: '#000',
            textAlign: 'center',
            position: 'absolute',
            fontWeight: '600',
            top: 79
          }}>
          {Langs.regist.welcome}
        </Text>
        <Text
          style={{
            width: SCREEN_WIDTH - 150,
            fontSize: 20,
            lineHeight: 24,
            position: 'absolute',
            top: 465,
            textAlign: 'center',
            color: '#000',
            fontWeight: '600',
          }}>
          {Langs.regist.success_registered}
        </Text>
        <ActiveButton
          text={Langs.regist.start}
          style={{ width: SCREEN_WIDTH - 124, position: 'absolute', bottom: 55 }}
          action={() => {
            this.props.navigation.navigate('Main');
          }}
        />
      </SafeAreaView>
    );
  }
}
