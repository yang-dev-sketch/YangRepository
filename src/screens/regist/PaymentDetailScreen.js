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
import { CommonUtils } from '../../utils';
import { requestPost } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, SetValueGroup } from '../../components/common';
import PaymentMethodCard from '../../components/common/PaymentMethodCard';

export default class PaymentDetailScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      creditCardNumber: null,
      validity: '04/45',
      cvv: '488',
      id: null,
    };
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
            }}></LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -305, alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 24,
                lineHeight: 29,
                marginBottom: 5,
                color: '#000',
                fontWeight: '700',
              }}>
              {Langs.regist.payment_detail}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 19, marginBottom: 20, color: '#000' }}>
              {Langs.regist.business_registration}
            </Text>
            <PaymentMethodCard />
            <Text
              style={{
                fontSize: 14,
                lineHeight: 17,
                marginBottom: 20,
                marginTop: 25,
                color: '#000',
              }}>
              {Langs.regist.lorem_ipsum}
            </Text>
            <ActiveButton
              text={Langs.regist.add_card}
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.props.navigation.navigate('SuccessRegist');
              }}
            />
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pay_item: {
    width: '100%',
    borderRadius: 21,
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginBottom: 15,
  },
});
