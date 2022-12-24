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
              height: 350,
              alignItems: 'center',
              justifyContent: 'center',
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
              source={require('src/assets/image/ic_mark.png')}
              style={{ width: 73, height: 73 }}
            />
            <Text style={{ fontSize: 24, lineHeight: 29, letterSpacing: -0.17, marginTop: 14 }}>
              Face ID
            </Text>
          </LinearGradient>
          <Text
            style={{ fontSize: 16, lineHeight: 22, marginHorizontal: 20, letterSpacing: -0.17 }}>
            וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני הספירה. מה שהופך אותו לעתיק מעל 2000 שנה.
            ריצ'רד מקלינטוק, פרופסור לטיני בקולג' של המפדן-סידני בורג'יניה, חיפש את אחת המילים
            המעורפלות ביותר בלטינית - מתוך פסקאות של ודרך ציטוטים של המילה מתוך הספרות הקלאסית, הוא
            גילה מקור בלתי ניתן
          </Text>
          <HorizontalLayout
            style={{ justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 150 }}>
            <View style={{ width: (SCREEN_WIDTH - 65) / 2 }}>
              <DisactiveButton
                text="לא תודה"
                style={{ width: '100%', marginBottom: 40 }}
                action={() => {
                  this.props.navigation.goBack();
                }}
              />
            </View>
            <View style={{ width: (SCREEN_WIDTH - 65) / 2 }}>
              <ActiveButton
                text="אני מסכים"
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
