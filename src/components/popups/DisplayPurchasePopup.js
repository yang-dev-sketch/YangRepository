import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SetValueGroup } from '../common';
import { ScrollView } from 'react-navigation';
import CommonInput from '../common/CommonInput';
import { API, API_RES_CODE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';
import SwitchItem from '../items/SwitchItem';
import DropDownPicker from '../controls/DropDownPicker';

@observer
class DisplayPurchasePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startTime: '11:00',
      finishTime: '11:00',
      periodType: [{ name: 'חודשים' }, { name: 'שבועות' }, { name: 'יום' }],
      timePeriod: 'יום',
      presentReport: false,
      weekList: [
        { id: 1, name: 'יום ראשון' },
        { id: 2, name: 'יום שני' },
        { id: 3, name: 'יום שלישי' },
        { id: 4, name: 'יום חמישי' },
        { id: 5, name: 'יום שישי' },
        { id: 6, name: 'יום שבת' },
        { id: 7, name: 'יום רביעי' },
      ],
      selectedWeek: [],
    };
  }

  formatData = () => {
    this.setState({
      name: '',
      sku: null,
      price: 1,
      expirationPeriod: false,
      presentReport: false,
      timePeriod: 'חודשים',
    });
  };

  onCancel = () => {
    this.formatData();
    this.props.onCancel();
  };

  onCheck = (id) => {
    const weekList = this.state.weekList;
    weekList.map((item, index) => {
      if (id === item.id) item.checked = !item.checked;
    });
    this.setState({ weekList: weekList });
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
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  color: '#000',
                  fontWeight: '600',
                  fontFamily: 'Danidin',
                }}>
                סוג מסלול:
              </Text>
            </HorizontalLayout>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  textAlign: 'right',
                  marginBottom: 15,
                  color: '#000',
                  fontWeight: '600',
                }}>
                מִנוּי
              </Text>
              <HorizontalLayout
                style={{
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}>
                {[1, 2, 3, 4].map((item, index) => {
                  return (
                    <View
                      style={{
                        width: 76,
                        height: 37,
                        borderRadius: 11,
                        backgroundColor: '#0D65D9',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          color: 'white',
                          fontFamily: 'Danidin',
                        }}>
                        יוֹגָה
                      </Text>
                    </View>
                  );
                })}
              </HorizontalLayout>
              <View
                style={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderTopColor: '#F2F2F2',
                  borderBottomColor: '#F2F2F2',
                  paddingTop: 10,
                  paddingBottom: 15,
                }}>
                <Text
                  style={{ fontSize: 16, lineHeight: 19.2, marginTop: 10, fontFamily: 'Danidin' }}>
                  לאפשר הזמנה רק בימים ספציפיים
                </Text>
                <FlatList
                  ref={(ref) => {
                    this._flContent = ref;
                  }}
                  showsHorizontalScrollIndicator={false}
                  style={{ marginTop: 15, width: '100%' }}
                  data={this.state.weekList}
                  numColumns={3}
                  renderItem={({ item, index }) => {
                    return (
                      <HorizontalLayout
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '33.3%',
                          justifyContent: 'flex-end',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 19.2,
                            marginRight: 10,
                            color: '#000',
                            fontFamily: 'Danidin',
                          }}>
                          {item.name}
                        </Text>
                        <Button
                          onPress={() => {
                            this.onCheck(item.id);
                            console.log(item.id);
                          }}>
                          {(item.checked && (
                            <LocalImage
                              source={require('src/assets/image/ic_check_on.png')}
                              style={{ width: 23, height: 23 }}
                            />
                          )) || (
                            <LocalImage
                              source={require('src/assets/image/ic_check_off.png')}
                              style={{ width: 23, height: 23 }}
                            />
                          )}
                        </Button>
                      </HorizontalLayout>
                    );
                  }}
                  keyExtractor={(item, idx) => idx.toString()}
                  ItemSeparatorComponent={() => {
                    return <View style={{ height: 15 }} />;
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  textAlign: 'right',
                  marginBottom: 7,
                  marginTop: 10,
                  color: '#000',
                  fontFamily: 'Danidin',
                }}>
                שעות ספציפיות
              </Text>
              <SetValueGroup
                style={[
                  Styles.input_wrapper,
                  {
                    marginBottom: 15,
                    backgroundColor: '#F5F5F5',
                  },
                ]}
                title="התחלה"
                image={require('src/assets/image/ic_clock.png')}
                leftTitle="סיום"
                leftImage={require('src/assets/image/ic_clock.png')}
                inputNode={
                  <HorizontalLayout style={{ justifyContent: 'space-between' }}>
                    <CommonInput
                      style={{ width: (SCREEN_WIDTH - 67) / 2 }}
                      numberOfLines={1}
                      backgroundColor="white"
                      value={this.state.finishTime}
                      onChangeText={(text) => {
                        this.setState({ finishTime: text });
                      }}
                    />
                    <CommonInput
                      style={{ width: (SCREEN_WIDTH - 67) / 2 }}
                      numberOfLines={1}
                      backgroundColor="white"
                      value={this.state.startTime}
                      onChangeText={(text) => {
                        this.setState({ startTime: text });
                      }}
                    />
                  </HorizontalLayout>
                }
              />
              <Button onPress={() => {}}>
                <LocalImage
                  source={require('src/assets/image/ic_plus_sign.png')}
                  style={{
                    width: 30,
                    height: 30,
                    marginBottom: 10,
                    alignSelf: 'center',
                  }}
                />
              </Button>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#F2F2F2',
                  marginBottom: 10,
                }}></View>
              <SetValueGroup
                style={[
                  Styles.input_wrapper,
                  {
                    backgroundColor: '#F5F5F5',
                  },
                ]}
                title="כמות פעמים"
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
                      value={this.state.period}
                      onChangeText={(text) => {
                        this.setState({ period: text });
                      }}
                    />
                  </HorizontalLayout>
                }
              />
              <SwitchItem
                style={{ paddingVertical: 15 }}
                data={{ name: 'הצגת חברות מסוג זה בדוחות', checked: this.state.presentReport }}
                onSelect={() => {
                  this.setState({ presentReport: !this.state.presentReport });
                }}
              />
              <DisactiveButton
                text="שמירה וסוג אימון הבא"
                style={{ marginBottom: 15 }}
                action={() => {}}
              />
              <ActiveButton text="שמירה" style={{ marginBottom: 15 }} action={() => {}} />
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

export default DisplayPurchasePopup;
