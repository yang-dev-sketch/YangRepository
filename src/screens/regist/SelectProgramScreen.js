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
import { requestPost } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton } from '../../components/common';
import { RotateInDownLeft } from 'react-native-reanimated';
import GlobalState from '../../mobx/GlobalState';

export default class SelectProgramScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      monthlyPrice: 29.9,
      profitablePrice: 199,
    };
  }

  next = () => {
    // this.setState({
    // type: 0,
    // });
    this.props.navigation.navigate({
      routeName: 'PaymentDetail',
      params: {
        businessName: this.props.navigation.getParam('businessName'),
        businessType: this.props.navigation.getParam('businessType'),
        hp: this.props.navigation.getParam('hp'),
        companyName: this.props.navigation.getParam('companyName'),
        phone: this.props.navigation.getParam('phone'),
        email: this.props.navigation.getParam('email'),
        profile: this.props.navigation.getParam('profile'),
        description: this.props.navigation.getParam('description'),
        branchName: this.props.navigation.getParam('branchName'),
        businessAddress: this.props.navigation.getParam('businessAddress'),
        permanentPlace: this.props.navigation.getParam('permanentPlace'),
        userPhoto: this.props.navigation.getParam('userPhoto'),
        firstName: this.props.navigation.getParam('firstName'),
        lastName: this.props.navigation.getParam('lastName'),
        firstPhone: this.props.navigation.getParam('firstPhone'),
        secondPhone: this.props.navigation.getParam('secondPhone'),
        email: this.props.navigation.getParam('email'),
        birthday: this.props.navigation.getParam('birthday'),
        selectedGender: this.props.navigation.getParam('selectedGender'),
        accountNumber: this.props.navigation.getParam('accountNumber'),
        bankNumber: this.props.navigation.getParam('bankNumber'),
        branchNumber: this.props.navigation.getParam('branchNumber'),
        accountName: this.props.navigation.getParam('accountName'),
        type: this.state.type
      },
      key: 'PaymentDetail',
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
            }}>
            {/* <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ alignSelf: 'center', position: 'absolute', top: 60, left: 21 }}>
              <Text style={{ fontSize: 14, lineHeight: 17, textDecorationLine: 'underline' }}>
                הקודם
              </Text>
            </Button> */}
            <LocalImage
              source={require('src/assets/image/ic_gyme.png')}
              style={{ width: 152.26, height: 152.26, position: 'absolute', top: 60.36 }}
            />
            <LocalImage
              source={require('src/assets/image/ic_gyme_blue.png')}
              style={{ width: 48, height: 48, position: 'absolute', top: 226 }}
            />
            <Text
              style={{
                fontSize: 18,
                lineHeight: 22,
                position: 'absolute',
                top: 284,
                color: '#000',
                fontWeight: '600',
              }}>
              {Langs.regist.choose_suit_program}
            </Text>
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -34 }}>
            <Button
              onPress={() => {
                this.setState({ type: 0 });
              }}
              style={[
                (this.state.type === 0 && { borderWidth: 2, borderColor: '#5C9DF2' }) || {
                  borderWidth: 1,
                  borderColor: '#D8D8D8',
                },
                {
                  width: '100%',
                  borderRadius: 11,
                  marginBottom: 15,
                  height: 179,
                  position: 'relative',
                  overflow: 'hidden',
                },
              ]}>
              <View
                style={[
                  {
                    width: 309,
                    height: 309,
                    position: 'absolute',
                    top: -65,
                    borderRadius: 154.5,
                    backgroundColor: '#EFF7FD',
                  },
                  (GlobalState.langPopup.langStatus === 'en' && { right: -93 }) || { left: -93 },
                ]}></View>
              <HorizontalLayout
                style={{ padding: 25, alignItems: 'center', justifyContent: 'space-between' }}
                reverse={true}>
                <VerticalLayout style={{ justifyContent: 'space-between', height: '100%' }}>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                </VerticalLayout>
                <VerticalLayout
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                    height: '100%',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 19,
                      color: '#6F6F6F',
                      width: 90,
                      textAlign: 'center',
                    }}
                    numberOfLines={2}>
                    {Langs.regist.subscription_monthly}
                  </Text>
                  <LocalImage
                    source={require('src/assets/image/ic_train_blue.png')}
                    style={{ width: 36, height: 20.51 }}
                  />
                  <HorizontalLayout style={{ alignItems: 'center' }}>
                    <LocalImage
                      source={require('src/assets/image/ic_income_blue.png')}
                      style={{ width: 15, height: 12, marginRight: 6 }}
                    />
                    <Text
                      style={{ fontSize: 32, lineHeight: 38, color: '#1E6FD9', fontWeight: '700' }}>
                      {this.state.monthlyPrice}
                    </Text>
                  </HorizontalLayout>
                </VerticalLayout>
              </HorizontalLayout>
            </Button>
            <Button
              onPress={() => {
                this.setState({ type: 'profitable' });
              }}
              style={[
                (this.state.type === 'profitable' && {
                  borderWidth: 2,
                  borderColor: '#5C9DF2',
                }) || { borderWidth: 1, borderColor: '#D8D8D8' },
                {
                  width: '100%',
                  borderRadius: 11,
                  marginBottom: 17,
                  height: 179,
                  position: 'relative',
                  overflow: 'hidden',
                },
              ]}>
              <View
                style={[
                  {
                    width: 309,
                    height: 309,
                    position: 'absolute',
                    top: -65,
                    borderRadius: 154.5,
                    backgroundColor: '#EFF7FD',
                  },
                  (GlobalState.langPopup.langStatus === 'en' && { right: -93 }) || { left: -93 },
                ]}></View>
              <HorizontalLayout
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: 25,
                  paddingVertical: 0,
                  height: '100%',
                }}
                reverse={true}>
                <VerticalLayout
                  style={{
                    justifyContent: 'space-between',
                    height: '100%',
                    alignItems: 'center',
                    paddingVertical: 25,
                  }}>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
                    <Text style={{ fontSize: 14, lineHeight: 17, color: '#000' }}>
                      {Langs.regist.text}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_blue.png')}
                      style={{ width: 15.5, height: 11.39, marginHorizontal: 11.97 }}
                    />
                  </HorizontalLayout>
                  <Text
                    style={{ fontSize: 16, lineHeight: 19, fontWeight: '600', color: '#5C9DF2' }}>
                    שבוע נסיון חינם
                  </Text>
                </VerticalLayout>
                <HorizontalLayout
                  style={{ alignItems: 'center', padding: 0, height: '100%' }}
                  reverse={true}>
                  <VerticalLayout
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      height: '100%',
                      paddingVertical: 30,
                      marginHorizontal: 25,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        color: '#6F6F6F',
                        width: 90,
                        textAlign: 'center',
                      }}
                      numberOfLines={2}>
                      {Langs.regist.subscription_monthly}
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_train_blue.png')}
                      style={{ width: 36, height: 20.51 }}
                    />
                    <HorizontalLayout style={{ alignItems: 'center' }}>
                      <LocalImage
                        source={require('src/assets/image/ic_income_blue.png')}
                        style={{ width: 15, height: 12, marginRight: 6 }}
                      />
                      <Text
                        style={{
                          fontSize: 32,
                          lineHeight: 38,
                          color: '#1E6FD9',
                          fontWeight: '700',
                        }}>
                        {this.state.profitablePrice}
                      </Text>
                    </HorizontalLayout>
                  </VerticalLayout>
                  <View
                    style={[
                      {
                        width: 23,
                        height: 179,
                        backgroundColor: '#5C9DF2',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'visible',
                      },
                      (GlobalState.langPopup.langStatus === 'en' && {
                        borderTopRightRadius: 11,
                        borderBottomRightRadius: 11,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      }) || {
                        borderTopLeftRadius: 11,
                        borderBottomLeftRadius: 11,
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      },
                    ]}></View>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 17,
                      color: '#FFF',
                      width: '100%',
                      position: 'absolute',
                      left: 70,
                      bottom: (GlobalState.langPopup.langStatus === 'en' && 100) || 40,
                      transform: [{ rotate: '-90deg' }],
                    }}
                    numberOfLines={1}>
                    {Langs.regist.most_profitable}
                  </Text>
                </HorizontalLayout>
              </HorizontalLayout>
            </Button>
            <ActiveButton
              text={Langs.regist.start_now}
              style={{ width: '100%', marginBottom: 45 }}
              action={() => {
                this.next();
              }}
            />
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 30 }}>
              <Button>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 17,
                    textDecorationLine: 'underline',
                    opacity: 0.7,
                    color: '#000',
                  }}>
                  {Langs.regist.privacy_policy}
                </Text>
              </Button>
              <Button>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 17,
                    textDecorationLine: 'underline',
                    opacity: 0.7,
                    color: '#000',
                  }}>
                  {Langs.regist.terms_of_use}
                </Text>
              </Button>
            </HorizontalLayout>
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
