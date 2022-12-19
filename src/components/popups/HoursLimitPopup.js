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
import DatePicker from 'react-native-date-picker';

@observer
class HoursLimitPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourList: [
        { id: 1, startTime: '08:00', endTime: '09:00' },
        { id: 2, startTime: '10:00', endTime: '11:00' },
      ],
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
            <ScrollView>
              <Text style={{ fontSize: 16, lineHeight: 19.2, marginBottom: 15 }}>הגבלת שעות</Text>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                data={this.state.hourList}
                numRows={1}
                renderItem={({ item, index }) => {
                  return (
                    <HorizontalLayout
                      style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <VerticalLayout
                        style={{
                          width: SCREEN_WIDTH - 72,
                          borderRadius: 11,
                          padding: 10,
                          backgroundColor: '#F5F5F5',
                          marginBottom: 15,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 19,
                            color: '#6F6F6F',
                            marginBottom: 6,
                          }}>
                          זמן פתיחת רישום
                        </Text>
                        <HorizontalLayout
                          style={{
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: 43,
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            paddingVertical: 10,
                            marginBottom: 10,
                          }}>
                          <Text>08</Text>
                          <Text>:</Text>
                          <Text>00</Text>
                        </HorizontalLayout>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 19,
                            color: '#6F6F6F',
                            marginBottom: 6,
                          }}>
                          זמן סגירת רישום
                        </Text>
                        <HorizontalLayout
                          style={{
                            width: '100%',
                            backgroundColor: 'white',
                            borderRadius: 43,
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            paddingVertical: 10,
                          }}>
                          <Text>08</Text>
                          <Text>:</Text>
                          <Text>00</Text>
                        </HorizontalLayout>
                        {/* <DatePicker
                          open={false}
                          style={{
                            backgroundColor: 'white',
                          }}
                          date={new Date()}
                          mode="time"
                          onDateChange={(time) => {
                            this.setState({ time: time });
                          }}
                        /> */}
                      </VerticalLayout>
                      <Button
                        onPress={() => {
                          const hourList = this.state.hourList;
                          this.setState({
                            hourList: this.state.hourList.filter((_item) => {
                              return _item.id != item.id;
                            }),
                          });
                        }}>
                        <LocalImage
                          source={require('src/assets/image/ic_close_red.png')}
                          style={{ width: 17.5, height: 17.5 }}
                        />
                      </Button>
                    </HorizontalLayout>
                  );
                }}
                keyExtractor={(item, idx) => idx.toString()}
                ItemSeparatorComponent={() => {
                  return <View style={{ height: 15 }} />;
                }}
              />
              <Button
                onPress={() => {
                  const hourList = this.state.hourList;
                  hourList.push({ id: hourList.length + 1, startTime: '', endTime: '' });
                  this.setState({ hourList: hourList });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: 45,
                  flexDirection: 'row',
                }}>
                <Text>הוספת הגבלת זמן נוספת לרישום</Text>
                <LocalImage
                  source={require('src/assets/image/ic_plus_sign.png')}
                  style={{ width: 24, height: 24, marginLeft: 6 }}
                />
              </Button>
            </ScrollView>
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

export default HoursLimitPopup;
