import React from 'react';
import {
  BackHandler,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
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
import PaymentMethodCard from '../../components/common/PaymentMethodCard';
import { ActiveButton, CommonInput, SetValueGroup } from '../../components/common';

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
            <Text style={{ fontSize: 24, lineHeight: 29, marginBottom: 5 }}>הרשמה לעסקים</Text>
            <Text style={{ fontSize: 16, lineHeight: 19, marginBottom: 20 }}>פרטי תשלום</Text>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={
                (this.props.navigation.getParam('type') === 'monthly' && [
                  '#688EF8',
                  '#94BDF2',
                ]) || ['#1E6FD9', '#94BDF2']
              }
              style={styles.pay_item}>
              <VerticalLayout>
                <HorizontalLayout
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_sim.png')}
                    style={{ width: 33.07, height: 26.2 }}
                  />
                  {(this.props.navigation.getParam('type') === 'monthly' && (
                    <LocalImage
                      source={require('src/assets/image/ic_visa.png')}
                      style={{ width: 52.84, height: 16.33 }}
                    />
                  )) || (
                    <LocalImage
                      source={require('src/assets/image/ic_punch.png')}
                      style={{ width: 42.29, height: 26.12 }}
                    />
                  )}
                </HorizontalLayout>
                <SetValueGroup
                  style={{ marginBottom: 12, backgroundColor: 'transparent' }}
                  title="כותרת הסניף"
                  textStyle={{ fontSize: 14, lineHeight: 16.8, color: 'white' }}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={20}
                      lineHeight={24}
                      maxLength={24}
                      numberOfLines={1}
                      backgroundColor="white"
                      value={CommonUtils.formatCreditCard(this.state.creditCardNumber)}
                      onChangeText={(text) => {
                        this.setState({ creditCardNumber: text });
                      }}
                    />
                  }
                />
                <HorizontalLayout style={{ justifyContent: 'space-between' }}>
                  <SetValueGroup
                    style={{
                      marginBottom: 12,
                      backgroundColor: 'transparent',
                      width: (SCREEN_WIDTH - 111) / 2,
                    }}
                    title="תוקף"
                    textStyle={{ fontSize: 14, lineHeight: 16.8, color: 'white' }}
                    inputNode={
                      <CommonInput
                        inputStyle={{ height: 40 }}
                        fontSize={20}
                        lineHeight={24}
                        numberOfLines={1}
                        backgroundColor="white"
                        value={this.state.validity}
                        onChangeText={(text) => {
                          this.setState({ validity: text });
                        }}
                      />
                    }
                  />
                  <SetValueGroup
                    style={{
                      marginBottom: 12,
                      backgroundColor: 'transparent',
                      width: (SCREEN_WIDTH - 111) / 2,
                    }}
                    title="CVV"
                    textStyle={{ fontSize: 14, lineHeight: 16.8, color: 'white' }}
                    inputNode={
                      <CommonInput
                        inputStyle={{ height: 40 }}
                        fontSize={20}
                        lineHeight={24}
                        numberOfLines={1}
                        backgroundColor="white"
                        value={this.state.cvv}
                        onChangeText={(text) => {
                          this.setState({ cvv: text });
                        }}
                      />
                    }
                  />
                </HorizontalLayout>
                <SetValueGroup
                  style={{ marginBottom: 12, backgroundColor: 'transparent' }}
                  title="תעודת זהות"
                  textStyle={{ fontSize: 14, lineHeight: 16.8, color: 'white' }}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={20}
                      lineHeight={24}
                      maxLength={24}
                      numberOfLines={1}
                      backgroundColor="white"
                      value={CommonUtils.formatCreditCard(this.state.id)}
                      onChangeText={(text) => {
                        this.setState({ id: text });
                      }}
                    />
                  }
                />
              </VerticalLayout>
            </LinearGradient>
            <Text style={{ fontSize: 14, lineHeight: 17, marginBottom: 45 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been.
            </Text>
            <ActiveButton
              text="הוספת כרטיס"
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.props.navigation.navigate('BankDetail');
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
