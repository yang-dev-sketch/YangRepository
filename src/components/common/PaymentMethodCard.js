import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import LinearGradient from 'react-native-linear-gradient';
import CommonInput from './CommonInput';
import SetValueGroup from './SetValueGroup';
import { SCREEN_WIDTH } from 'react-native-common-date-picker/src/contants';
import { CommonUtils } from '../../utils';

export default class PaymentMethodCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: null,
      validity: '04/45',
      cvv: '488',
      id: null,
      cardFocus: false,
      validFocus: false,
      cvvFocus: false,
      cardholderFocus: false,
    };
  }

  render() {
    return (
      <View style={styles.pay_item}>
        <VerticalLayout>
          <SetValueGroup
            style={{ marginBottom: 17, backgroundColor: 'transparent', borderWidth: 0 }}
            title="הזנת מספר כרטיס אשראי"
            textStyle={{ fontSize: 14, lineHeight: 17, color: '#0D65D9' }}
            inputNode={
              <CommonInput
                inputStyle={[
                  { height: 40, borderWidth: 1 },
                  (this.state.cardFocus && { borderColor: '#0D65D9' }) || {
                    borderColor: '#D8D8D8',
                  },
                ]}
                fontSize={16}
                lineHeight={19}
                numberOfLines={1}
                maxLength={24}
                backgroundColor="white"
                value={CommonUtils.formatCreditCard(this.state.ticketNumber)}
                icon={
                  (this.state.cardFocus && require('src/assets/image/ic_payment.png')) ||
                  require('src/assets/image/ic_payment_black.png')
                }
                placeholder={'0000 0000 0000 0000 0000'}
                onFocus={() => {
                  this.setState({ cardFocus: true });
                }}
                onBlur={() => {
                  this.setState({ cardFocus: false });
                }}
                onChangeText={(text) => {
                  this.setState({ ticketNumber: text });
                }}
              />
            }
          />
          <HorizontalLayout style={{ justifyContent: 'space-between' }}>
            <SetValueGroup
              style={{
                marginBottom: 17,
                backgroundColor: 'transparent',
                width: (SCREEN_WIDTH - 111) / 2,
                borderWidth: 0,
              }}
              title="הזנת תוקף"
              textStyle={{ fontSize: 14, lineHeight: 16.8, color: '#6F6F6F' }}
              inputNode={
                <CommonInput
                  inputStyle={[
                    { height: 40, borderWidth: 1 },
                    (this.state.validFocus && { borderColor: '#0D65D9' }) || {
                      borderColor: '#D8D8D8',
                    },
                  ]}
                  fontSize={16}
                  lineHeight={19}
                  numberOfLines={1}
                  backgroundColor="white"
                  value={this.state.validity}
                  icon={
                    (this.state.validFocus && require('src/assets/image/ic_calendar.png')) ||
                    require('src/assets/image/ic_calendar_black.png')
                  }
                  onFocus={() => {
                    this.setState({ validFocus: true });
                  }}
                  onBlur={() => {
                    this.setState({ validFocus: false });
                  }}
                  placeholder={'YY/MM'}
                  onChangeText={(text) => {
                    this.setState({ validity: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={{
                marginBottom: 17,
                backgroundColor: 'transparent',
                width: (SCREEN_WIDTH - 111) / 2,
                borderWidth: 0,
              }}
              title="הזנת CVV"
              textStyle={{ fontSize: 14, lineHeight: 16.8, color: '#6F6F6F' }}
              inputNode={
                <CommonInput
                  inputStyle={[
                    { height: 40, borderWidth: 1 },
                    (this.state.cvvFocus && { borderColor: '#0D65D9' }) || {
                      borderColor: '#D8D8D8',
                    },
                  ]}
                  fontSize={16}
                  lineHeight={19}
                  numberOfLines={1}
                  backgroundColor="white"
                  value={this.state.cvv}
                  icon={
                    (this.state.cvvFocus && require('src/assets/image/ic_info.png')) ||
                    require('src/assets/image/ic_info_black.png')
                  }
                  onFocus={() => {
                    this.setState({ cvvFocus: true });
                  }}
                  onBlur={() => {
                    this.setState({ cvvFocus: false });
                  }}
                  placeholder={'....'}
                  onChangeText={(text) => {
                    this.setState({ cvv: text });
                  }}
                />
              }
            />
          </HorizontalLayout>
          <SetValueGroup
            style={{ marginBottom: 12, backgroundColor: 'transparent', borderWidth: 0 }}
            title="שם בעל הכרטיס"
            textStyle={{ fontSize: 14, lineHeight: 16.8, color: '#6F6F6F' }}
            inputNode={
              <CommonInput
                inputStyle={[
                  { height: 40, borderWidth: 1 },
                  (this.state.cardholderFocus && { borderColor: '#0D65D9' }) || {
                    borderColor: '#D8D8D8',
                  },
                ]}
                fontSize={16}
                lineHeight={19}
                numberOfLines={1}
                maxLength={24}
                backgroundColor="white"
                value={CommonUtils.formatCreditCard(this.state.id)}
                onFocus={() => {
                  this.setState({ cardholderFocus: true });
                }}
                onBlur={() => {
                  this.setState({ cardholderFocus: false });
                }}
                placeholder={'הזן את שמו המלא של בעל הכרטיס'}
                onChangeText={(text) => {
                  this.setState({ id: text });
                }}
              />
            }
          />
          <HorizontalLayout
            style={{ justifyContent: 'flex-end', width: '100%', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, lineHeight: 19.2, color: '#000' }}>כרטיס שמור</Text>
            <LocalImage
              source={require('src/assets/image/ic_check_on.png')}
              style={{ width: 14.67, height: 14.67, marginLeft: 7.67 }}
            />
          </HorizontalLayout>
        </VerticalLayout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pay_item: {
    width: '100%',
    borderRadius: 11,
    paddingHorizontal: 25,
    paddingVertical: 27,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#FFF',
  },
});
