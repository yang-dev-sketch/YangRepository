import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton } from '../common';
import { ScrollView } from 'react-navigation';
import { API, API_RES_CODE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';
import DatePicker from 'react-native-date-picker';
import TimePicker from '../controls/TimePicker';

@observer
class HoursLimitPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourList: [{ id: 1, startTime: '08', endTime: '09' }],
      scrollEnabled: true,
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
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>
                סוג מסלול:
              </Text>
            </HorizontalLayout>
            <View
              style={{
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#F2F2F2',
                marginBottom: 20,
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>
                תכונות ייחודיות
              </Text>
            </View>
            <ScrollView scrollEnabled={this.state.scrollEnabled}>
              <Text style={{ fontSize: 16, lineHeight: 19.2, marginBottom: 15, color: '#000', fontFamily: 'Danidin' }}>
                הגבלת שעות
              </Text>
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
                          width: SCREEN_WIDTH - 70,
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
                        <View
                          onTouchStart={() => {
                            this.setState({ scrollEnabled: false });
                          }}
                          onTouchEnd={() => {
                            this.setState({ scrollEnabled: true });
                          }}>
                          <TimePicker
                            selectedValue={item.startTime}
                            onValueChange={(value) => {
                              this.setState({ startTime: value, scrollEnabled: true });
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 19,
                            color: '#6F6F6F',
                            marginBottom: 6,
                            marginTop: 10,
                          }}>
                          זמן סגירת רישום
                        </Text>
                        <View
                          onTouchStart={() => {
                            this.setState({ scrollEnabled: false });
                          }}
                          onTouchEnd={() => {
                            this.setState({ scrollEnabled: true });
                          }}>
                          <TimePicker
                            selectedValue={item.startTime}
                            onValueChange={(value) => {
                              this.setState({ startTime: value, scrollEnabled: true });
                            }}
                          />
                        </View>
                      </VerticalLayout>
                      <Button
                        onPress={() => {
                          const hourList = this.state.hourList;
                          this.state.hourList.length > 1 &&
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
                  hourList.push({ id: hourList.length + 1, startTime: '01', endTime: '01' });
                  this.setState({ hourList: hourList });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: 45,
                  flexDirection: 'row',
                }}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                  הוספת הגבלת זמן נוספת לרישום
                </Text>
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
