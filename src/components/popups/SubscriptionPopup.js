import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SetValueGroup } from '../common';
import { ScrollView } from 'react-navigation';
import CommonInput from '../common/CommonInput';
import { API, API_RES_CODE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';
import SwitchItem from '../items/SwitchItem';
import DropDownPicker from '../controls/DropDownPicker';

@observer
class SubscriptionPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sku: null,
      period: 1,
      expirationPeriod: false,
      displayInPurchase: false,
      periodType: [{ name: 'חודשים' }, { name: 'שבועות' }, { name: 'יום' }],
      timePeriod: 'חודשים',
    };
  }

  formatData = () => {
    this.setState({
      name: '',
      sku: null,
      price: 1,
      expirationPeriod: false,
      displayInPurchase: false,
      timePeriod: 'חודשים',
    });
  };

  onCancel = () => {
    this.formatData();
    this.props.onCancel();
  };

  render() {
    return (
      <SwipeUpDownModal
        ContentModalStyle={styles.Modal}
        modalVisible={this.props.visible}
        onClose={() => {
          this.props.onCancel();
        }}
        ContentModal={
          <VerticalLayout style={{ height: '100%' }}>
            <View
              style={{ width: '100%', height: 23, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: 47,
                  height: 3,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  opacity: 0.2,
                }}></View>
            </View>
            <HorizontalLayout
              style={{
                paddingHorizontal: 20,
                alignItem: 'center',
                justifyContent: 'space-between',
                marginBottom: 14.63,
              }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    this.formatData();
                    this.props.onBack();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_left.png')}
                    style={{ width: 11.62, height: 20.73, marginRight: 20.93 }}
                  />
                </Button>
                <Button
                  onPress={() => {
                    this.props.onCancel();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_close.png')}
                    style={{ width: 31, height: 31 }}
                  />
                </Button>
              </HorizontalLayout>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>סוג מסלול:</Text>
            </HorizontalLayout>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 18, lineHeight: 22, textAlign: 'right', marginBottom: 15 }}>
                מִנוּי
              </Text>
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
                title="שם המנוי"
                inputNode={
                  <CommonInput
                    numberOfLines={1}
                    backgroundColor="white"
                    value={this.state.name}
                    onChangeText={(text) => {
                      this.setState({ name: text });
                    }}
                  />
                }
              />
              <HorizontalLayout
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <SetValueGroup
                  style={[
                    Styles.input_wrapper,
                    {
                      marginBottom: 15,
                      backgroundColor: '#F5F5F5',
                      width: (SCREEN_WIDTH - 63) / 2,
                    },
                  ]}
                  title='מק"ט'
                  inputNode={
                    <CommonInput
                      numberOfLines={1}
                      backgroundColor="white"
                      keyboardType="numeric"
                      value={this.state.sku}
                      onChangeText={(text) => {
                        this.setState({ sku: text });
                      }}
                    />
                  }
                />
                <SetValueGroup
                  style={[
                    Styles.input_wrapper,
                    {
                      marginBottom: 15,
                      backgroundColor: '#F5F5F5',
                      width: (SCREEN_WIDTH - 63) / 2,
                    },
                  ]}
                  title="מחיר"
                  inputNode={
                    <CommonInput
                      numberOfLines={1}
                      backgroundColor="white"
                      keyboardType="numeric"
                      value={this.state.price}
                      onChangeText={(text) => {
                        this.setState({ price: text });
                      }}
                    />
                  }
                />
              </HorizontalLayout>
              {this.props.selectedMembershipId !== 1 && (
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#F2F2F2',
                    marginTop: 15,
                  }}></View>
              )}
              <VerticalLayout
                style={{
                  paddingVertical: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F2F2F2',
                }}>
                <SwitchItem
                  style={{ marginBottom: 15 }}
                  data={{ name: 'ללא תקופת תפוגה', checked: this.state.expirationPeriod }}
                  onSelect={() => {
                    this.setState({ expirationPeriod: !this.state.expirationPeriod });
                  }}
                />
                {this.state.expirationPeriod && (
                  <SetValueGroup
                    style={[
                      Styles.input_wrapper,
                      {
                        backgroundColor: '#F5F5F5',
                      },
                    ]}
                    title={(this.state.selectedMembershipId === 1 && 'תקופת זמן') || 'קביעת תקופה'}
                    inputNode={
                      <HorizontalLayout style={{ justifyContent: 'space-between' }}>
                        <View style={{ width: (SCREEN_WIDTH - 82) / 2 }}>
                          <DropDownPicker
                            data={this.state.periodType}
                            selectedValue={this.state.timePeriod}
                            onSelect={(value) => {
                              this.setState({ timePeriod: value.name });
                            }}
                          />
                        </View>
                        <CommonInput
                          style={{ width: (SCREEN_WIDTH - 82) / 2 }}
                          textAlign={'center'}
                          numberOfLines={1}
                          backgroundColor="white"
                          keyboardType="numeric"
                          value={this.state.period}
                          onChangeText={(text) => {
                            this.setState({ period: text });
                          }}
                        />
                      </HorizontalLayout>
                    }
                  />
                )}
              </VerticalLayout>
              {this.props.selectedMembershipId !== 1 && (
                <SwitchItem
                  style={{ paddingVertical: 15 }}
                  data={{ name: 'מוצג בדף הרכישה', checked: this.state.displayInPurchase }}
                  onSelect={() => {
                    this.setState({ displayInPurchase: !this.state.displayInPurchase }, () => {
                      this.state.displayInPurchase && this.props.displayInPurchase();
                    });
                  }}
                />
              )}
              {this.props.selectedMembershipId !== 1 && (
                <Button
                  onPress={() => {
                    this.props.setTrain();
                  }}
                  style={{
                    width: '100%',
                    height: 65,
                    borderWidth: 1,
                    borderColor: '#D8D8D8',
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    paddingVertical: 19,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginBottom: 7,
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_round_left.png')}
                    style={{ width: 27, height: 27 }}
                  />
                  <Text>סוג אימון</Text>
                </Button>
              )}
              {this.props.selectedMembershipId !== 1 && (
                <Text style={{ marginBottom: 45 }}>ברירת המחדל הינה לכל הסוגים</Text>
              )}
              {this.props.selectedMembershipId === 1 && (
                <Button
                  onPress={() => {
                    this.props.setSetting();
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 19.2,
                      color: '#0D65D9',
                      textDecorationLine: 'underline',
                      marginTop: 15,
                      marginBottom: 40,
                    }}>
                    הגדרות נוספות
                  </Text>
                </Button>
              )}
              {this.props.selectedMembershipId !== 1 && (
                <DisactiveButton
                  text="המשך להגדרות מתקדמות"
                  style={{ marginBottom: 15 }}
                  action={() => {}}
                />
              )}
              <ActiveButton text="שמירה" style={{ marginBottom: 15 }} action={() => {}} />
              {this.props.selectedMembershipId === 1 && (
                <DisactiveButton text="לבטל" style={{ marginBottom: 15 }} action={() => {}} />
              )}
            </ScrollView>
          </VerticalLayout>
        }
        onClose={() => {
          this.props.onCancel();
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  Modal: {
    position: 'absolute',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
});

export default SubscriptionPopup;
