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
    this.state = {};
  }

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
              <Text style={{ fontSize: 14, lineHeight: 17, textDecorationLine: 'underline', color: '#000' }}>
                {Langs.common.previous}
              </Text>
            </Button>
            <LocalImage
              source={require('src/assets/image/ic_mark.png')}
              style={{ width: 73, height: 73 }}
            />
            <Text style={{ fontSize: 24, lineHeight: 29, letterSpacing: -0.17, marginTop: 14, color: '#000', fontWeight: '600' }}>
              {Langs.regist.face_id}
            </Text>
          </LinearGradient>
          <Text
            style={{ fontSize: 16, lineHeight: 22, marginHorizontal: 20, letterSpacing: -0.17, color: '#000', fontWeight: '600' }}>
            {Langs.regist.face_recog_text}
          </Text>
          <HorizontalLayout
            style={{ justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 205 }}>
            <View style={{ width: (SCREEN_WIDTH - 65) / 2 }}>
              <DisactiveButton
                text={Langs.regist.agree}
                style={{ width: '100%', marginBottom: 40 }}
                action={() => {
                  this.props.navigation.goBack();
                }}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - 65) / 2 }}>
              <ActiveButton
                text={Langs.regist.no_thanks}
                image={true}
                style={{ width: '100%', marginBottom: 40 }}
                action={() => {
                  this.props.navigation.navigate('FaceApproval');
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
