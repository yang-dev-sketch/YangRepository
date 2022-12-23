import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import LinearGradient from 'react-native-linear-gradient';
import CommonInput from './CommonInput';
import SetValueGroup from './SetValueGroup';
import { SCREEN_WIDTH } from 'react-native-common-date-picker/src/contants';
import { CommonUtils } from "../../utils";

export default class PaymentMethodCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: null,
      validity: '04/45',
      cvv: '488',
      id: null,
    };
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#1E6FD9', '#94BDF2']}
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
              style={{ width: 33, height: 26 }}
            />
            <LocalImage
              source={require('src/assets/image/ic_punch.png')}
              style={{ width: 42.29, height: 26.12 }}
            />
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
                numberOfLines={1}
                backgroundColor="white"
                value={CommonUtils.formatCreditCard(this.state.ticketNumber)}
                onChangeText={(text) => {
                  this.setState({ ticketNumber: text });
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
                numberOfLines={1}
                backgroundColor="white"
                value={commonUtils.formatCreditCard(this.state.id)}
                onChangeText={(text) => {
                  this.setState({ id: text });
                }}
              />
            }
          />
        </VerticalLayout>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  pay_item: {
    width: '100%',
    borderRadius: 21,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
});
