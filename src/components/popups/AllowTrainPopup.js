import { observer } from 'mobx-react';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput, SetValueGroup } from '../common';
import { ScrollView } from 'react-navigation';
import CommonInput from '../common/CommonInput';
import CheckBox from '@react-native-community/checkbox';
import { requestUpload } from '../../utils/ApiUtils';
import ImageCropPicker from 'react-native-image-crop-picker';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_HEIGHT } from '../../constants/Constants';
import DropDownPicker from '../controls/DropDownPicker';
import CommonItem from '../items/CommonItem';
import { SCREEN_WIDTH } from 'react-native-common-date-picker/src/contants';

@observer
class AllowTrainPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limitRegist: false,
      upto: 0,
      timeType: [{ name: 'חודשים' }, { name: 'שבועות' }, { name: 'יום' }],
      selectedTimeType: 'חודשים',
      excludingType: [{ name: 'לא לכלול' }, { name: 'לא לכלול' }, { name: 'לא לכלול' }],
      selectedExclude: 'לא לכלול',
      limitRate: false,
      rateType: [{ name: 'פתח את GYM' }, { name: 'פתח את GYM' }, { name: 'פתח את GYM' }],
      selectedRateType:'פתח את GYM',
      rateUpto: 2,
      timesB: [{ name: 'שנה' }, { name: 'שנה' }, { name: 'שנה' }],
      selectedTimesB: 'שנה'
    };
  }

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
                alignItem: 'center',
                justifyContent: 'space-between',
                marginBottom: 16.94,
              }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => {
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
            <View
              style={{
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#F2F2F2',
                marginBottom: 20,
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19.2 }}>תכונות ייחודיות</Text>
            </View>
            <Text style={{ fontSize: 16, lineHeight: 19.2, marginBottom: 15 }}>
              לאפשר לפי הגדרת התדירות אימונים הבאה
            </Text>
            <HorizontalLayout style={{ alignItems: 'center', width: '100%', marginBottom: 15 }}>
              <VerticalLayout
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#D8D8D8',
                  borderRadius: 11,
                  width: SCREEN_WIDTH - 69,
                }}>
                <Button
                  onPress={() => {
                    this.setState({ limitRegist: !this.state.limitRegist });
                  }}
                  style={{
                    width: '100%',
                    paddingLeft: 18.29,
                    paddingVertical: 12.5,
                    paddingRight: 15,
                    borderRadius: 50,
                    backgroundColor: '#F5F5F5',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <LocalImage
                    source={
                      (this.state.limitRegist && require('src/assets/image/ic_up.png')) ||
                      require('src/assets/image/ic_down.png')
                    }
                    style={{ width: 17.41, height: 9.17 }}
                  />
                  <Text>הגבל את תדירות הרישום</Text>
                </Button>
                {this.state.limitRegist && (
                  <>
                    <HorizontalLayout
                      style={{
                        width: '100%',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <CommonInput
                        style={{ width: '60%' }}
                        textAlign="center"
                        numberOfLines={1}
                        backgroundColor="#F5F5F5"
                        value={this.state.upto}
                        onChangeText={(text) => {
                          this.setState({ upto: text });
                        }}
                      />
                      <Text style={{ fontSize: 16, lineHeight: 19.2, color: '#6F6F6F' }}>עד ל</Text>
                    </HorizontalLayout>
                    <HorizontalLayout
                      style={{
                        width: '100%',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <DropDownPicker
                        backgroundColor="#F5F5F5"
                        style={{ width: '60%' }}
                        data={this.state.timeType}
                        selectedValue={this.state.selectedTimeType}
                        onSelect={(value) => {
                          this.setState({ selectedTimeType: value.name });
                        }}
                      />
                      <Text style={{ fontSize: 16, lineHeight: 19.2, color: '#6F6F6F' }}>
                        פעמים לכל
                      </Text>
                    </HorizontalLayout>
                    <HorizontalLayout
                      style={{
                        width: '100%',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <DropDownPicker
                        backgroundColor="#F5F5F5"
                        style={{ width: '60%' }}
                        data={this.state.excludingType}
                        selectedValue={this.state.selectedExclude}
                        onSelect={(value) => {
                          this.setState({ selectedExclude: value.name });
                        }}
                      />
                      <Text style={{ fontSize: 16, lineHeight: 19.2, color: '#6F6F6F' }}>
                        לְמַעֵט
                      </Text>
                    </HorizontalLayout>
                  </>
                )}
              </VerticalLayout>
              <Button
                onPress={() => {
                  this.setState({ limitRegist: false });
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close_red.png')}
                  style={{ width: 17.5, height: 17.5, marginLeft: 16.17 }}
                />
              </Button>
            </HorizontalLayout>
            <HorizontalLayout style={{ alignItems: 'center', width: '100%', marginBottom: 15 }}>
              <VerticalLayout
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#D8D8D8',
                  borderRadius: 11,
                  width: SCREEN_WIDTH - 69,
                }}>
                <Button
                  onPress={() => {
                    this.setState({ limitRate: !this.state.limitRate });
                  }}
                  style={{
                    width: '100%',
                    paddingLeft: 18.29,
                    paddingVertical: 12.5,
                    paddingRight: 15,
                    borderRadius: 50,
                    backgroundColor: '#F5F5F5',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <LocalImage
                    source={
                      (this.state.limitRate && require('src/assets/image/ic_up.png')) ||
                      require('src/assets/image/ic_down.png')
                    }
                    style={{ width: 17.41, height: 9.17 }}
                  />
                  <Text>הגבלת רישום לפי שיעור ותדירות</Text>
                </Button>
                {this.state.limitRate && (
                  <>
                    <HorizontalLayout
                      style={{
                        width: '100%',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <DropDownPicker
                        backgroundColor="#F5F5F5"
                        style={{ width: '60%' }}
                        data={this.state.rateType}
                        selectedValue={this.state.selectedRateType}
                        onSelect={(value) => {
                          this.setState({ selectedRateType: value.name });
                        }}
                      />
                      <Text style={{ fontSize: 16, lineHeight: 19.2, color: '#6F6F6F' }}>
                        פעמים לכל
                      </Text>
                    </HorizontalLayout>
                    <HorizontalLayout
                      style={{
                        width: '100%',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <CommonInput
                        style={{ width: '60%' }}
                        textAlign="center"
                        numberOfLines={1}
                        backgroundColor="#F5F5F5"
                        value={this.state.rateUpto}
                        onChangeText={(text) => {
                          this.setState({ rateUpto: text });
                        }}
                      />
                      <Text style={{ fontSize: 16, lineHeight: 19.2, color: '#6F6F6F' }}>עד ל</Text>
                    </HorizontalLayout>
                    <HorizontalLayout
                      style={{
                        width: '100%',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <DropDownPicker
                        backgroundColor="#F5F5F5"
                        style={{ width: '60%' }}
                        data={this.state.timesB}
                        selectedValue={this.state.selectedTimesB}
                        onSelect={(value) => {
                          this.setState({ selectedTimesB: value.name });
                        }}
                      />
                      <Text style={{ fontSize: 16, lineHeight: 19.2, color: '#6F6F6F' }}>
                        לְמַעֵט
                      </Text>
                    </HorizontalLayout>
                  </>
                )}
              </VerticalLayout>
              <Button
                onPress={() => {
                  this.setState({ limitRate: false });
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close_red.png')}
                  style={{ width: 17.5, height: 17.5, marginLeft: 16.17 }}
                />
              </Button>
            </HorizontalLayout>
            <ActiveButton
              text="הבא"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onNext();
              }}
            />
            <DisactiveButton
              text="לבטל"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onCancel();
              }}
            />
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
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
});

export default AllowTrainPopup;
