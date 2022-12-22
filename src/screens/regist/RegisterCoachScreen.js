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
import {
  AppScreen,
  Button,
  HorizontalLayout,
  LocalImage,
  VerticalLayout,
} from '../../components/controls';
import { CommonUtils, PrefUtils } from '../../utils';
import { requestPost } from '../../utils/ApiUtils';
import GlobalState from '../../mobx/GlobalState';
import EventBus from 'react-native-event-bus';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';

export default class RegisterCoachScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
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
          <Button style={{ alignSelf: 'center', position: 'absolute', top: 60, left: 21 }}>
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
                  value={this.state.firstPhone}
                  onChangeText={(text) => {
                    this.setState({ firstPhone: text });
                  }}
                />
                <View style={{ width: 12, height: 0, borderWidth: 1, borderColor: '#000' }}></View>
                <CommonInput
                  style={{ width: 230 }}
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.secondPhone}
                  onChangeText={(text) => {
                    this.setState({ secondPhone: text });
                  }}
                />
              </HorizontalLayout>
            }
          />
          <Button style={{ alignSelf: 'center', marginBottom: 40 }}>
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
            style={{ width: '100%', marginBottom: 50 }}
            action={() => {}}
          />
          <Button style={{ alignSelf: 'center', marginBottom: 50 }}>
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
        </VerticalLayout>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});