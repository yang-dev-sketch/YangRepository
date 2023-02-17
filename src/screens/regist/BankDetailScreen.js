import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Langs, Styles } from '../../constants';
import { API, API_RES_CODE } from '../../constants/Constants';
import { AppScreen, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import { CommonUtils } from '../../utils';
import { requestPost } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, SetValueGroup } from '../../components/common';

export default class BankDetailScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      bankNumber: '',
      branchNumber: '',
      accountName: '',
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
            }}>
            <Text style={{ fontSize: 24, lineHeight: 29, position: 'absolute', top: 80, color: '#000', fontWeight: '700' }}>
            {Langs.regist.bank_detail}
            </Text>
            <LocalImage
              source={require('src/assets/image/ic_bank.png')}
              style={{ width: 191, height: 155, position: 'absolute', top: 138.98 }}
            />
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -36, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, lineHeight: 19, marginBottom: 35, textAlign: 'center', color: '#000' }}>
              {Langs.regist.where_want_money}
            </Text>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.regist.account_number}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  maxLength={19}
                  backgroundColor="#FFF"
                  value={CommonUtils.formatAccountNumber(this.state.accountNumber)}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ accountNumber: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.regist.bank_number_name}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#FFF"
                  value={this.state.bankNumber}
                  onChangeText={(text) => {
                    this.setState({ bankNumber: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.regist.branch_number}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#FFF"
                  maxLength={9}
                  value={this.state.branchNumber}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ branchNumber: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 45, backgroundColor: '#F5F5F5' }]}
              title={Langs.regist.account_name}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#FFF"
                  maxLength={9}
                  value={this.state.accountName}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({ accountName: text });
                  }}
                />
              }
            />
            <ActiveButton
              text={Langs.regist.preserve}
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.props.navigation.navigate('SelectProgram');
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
