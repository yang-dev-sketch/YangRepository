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
import Toast, { ToastContainer } from 'react-native-root-toast';

export default class PaymentDetailScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      creditNumber: '00000000000000000000',
      validity: '04/45',
      cvv: '488',
      cardHolderName: 'cardHolderName',
    };
  }

  next = () => {
    if (
      this.state.creditNumber === '' ||
      this.state.validity === '' ||
      this.state.cvv === '' ||
      this.state.cardHolderName === ''
    ) {
      Toast.show('All field must be entered.');
    } else {
      // this.setState({
      // creditNumber: '',
      // validity: '',
      // cvv: '',
      // cardHolderName: '',
      // });
      requestPost(API.Regist.regist_business, {
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
        accountNumber: this.props.navigation.getParam('accountNumber'),
        bankNumber: this.props.navigation.getParam('bankNumber'),
        branchNumber: this.props.navigation.getParam('branchNumber'),
        accountName: this.props.navigation.getParam('accountName'),
        programType: this.props.navigation.getParam('programType'),
        creditNumber: this.state.creditNumber,
        validity: this.state.validity,
        cvv: this.state.cvv,
        cardHolderName: this.state.cardHolderName,
      }).then((result) => {
        console.log(result)
        if (result.success) {
          requestPost(API.Regist.regist_coach, {
            avatar: this.props.navigation.getParam('userPhoto'),
            firstName: this.props.navigation.getParam('firstName'),
            lastName: this.props.navigation.getParam('lastName'),
            phone:
              this.props.navigation.getParam('firstPhone') +
              this.props.navigation.getParam('secondPhone'),
            email: this.props.navigation.getParam('email'),
            birthday: this.props.navigation.getParam('birthday'),
            gender: this.props.navigation.getParam('selectedGender'),
          }).then(async (res) => {
            if (res.success) {
              this.props.navigation.navigate('SuccessRegist');
            } else {
              Toast.show(res.err);
            }
          });
        } else {
          Toast.show(result.message);
        }
      });
    }
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
            <PaymentMethodCard
              creditNumber={this.state.creditNumber}
              changeCreditNumber={(text) => {
                this.setState({ creditNumber: text });
              }}
              validity={this.state.validity}
              changeValidity={(text) => {
                this.setState({ validity: text });
              }}
              cvv={this.state.cvv}
              changeCvv={(text) => {
                this.setState({ cvv: text });
              }}
              cardHolderName={this.state.cardHolderName}
              changeCardHolderName={(text) => {
                this.setState({ cardHolderName: text });
              }}
            />
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
                this.next();
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
