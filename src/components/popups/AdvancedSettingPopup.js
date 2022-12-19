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

@observer
class AdvancedSettingPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                marginBottom: 8.5,
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
                marginBottom: 15,
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19.2 }}>הגדרות מתקדמות</Text>
            </View>
            <SearchInput
              style={{ marginBottom: 15 }}
              setSearch={(search) => {
                this.props.setSearch(search);
              }}
            />
            <ScrollView>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.props.setAvailableStore();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  שם מוצר
                </Text>
              </Button>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.props.setRecurringStore();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  תוכנית תשלומים חוזרים
                </Text>
              </Button>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.props.setLimitTrainingType();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  הגבלת סוגי אימון
                </Text>
              </Button>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.props.setAllowTrain();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  לאפשר לפי הגדרת התדירות אימונים
                </Text>
              </Button>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.setAllowBooking();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  לאפשר הזמנה רק בימים ספציפיים
                </Text>
              </Button>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.props.setHourLimit();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  הגבלת שעות
                </Text>
              </Button>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.props.setReservationAvailability();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  הזמן על מקום פנוי
                </Text>
              </Button>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.props.setAllowPenalty();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  לאפשר עונשים או הגבלות עקב מספר גבוה של היעדרויות
                </Text>
              </Button>
              <Button
                style={styles.setting_item}
                onPress={() => {
                  this.props.setAdditionalSetting();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 23, height: 23 }}
                />
                <Text style={{ fontSize: 16, lineHeight: 19, width: '90%' }} numberOfLines={2}>
                  הגדרות אחרות
                </Text>
              </Button>
            </ScrollView>
            <DisactiveButton text="לבטל" style={{ marginVertical: 15 }} action={() => {}} />
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
  setting_item: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default AdvancedSettingPopup;
