import { observer } from 'mobx-react';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
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
import { FlatList } from 'react-native-gesture-handler';
import CommonItem from '../items/CommonItem';
import DropDownPicker from '../controls/DropDownPicker';

@observer
class ReservationAvailabilityPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyNumber: 2,
      rangeType: [{ name: 'חודשים' }, { name: 'שבועות' }, { name: 'יום' }],
      selectedRange: 'חודשים',
      beforeClassHour: 1,
    };
  }

  render() {
    const data = this.props.data;
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
              <Text style={{ fontSize: 16, lineHeight: 19.2 }}>הזמנה על בסיס מקום פנוי</Text>
            </View>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="כמות הפעמים שהוגדרה בהגבלת התדירות"
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="white"
                  textAlign="center"
                  value={this.state.frequencyNumber}
                  onChangeText={(text) => {
                    this.setState({ frequencyNumber: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="טווח"
              inputNode={
                <DropDownPicker
                  editIcon={false}
                  data={this.state.rangeType}
                  selectedValue={this.state.selectedRange}
                  onSelect={(value) => {
                    this.setState({ selectedRange: value.name });
                  }}
                />
              }
            />
            <HorizontalLayout
              style={{
                alignItems: 'center',
                width: '100%',
                borderRadius: 11,
                backgroundColor: '#F5F5F5',
                padding: 10,
                justifyContent: 'flex-end',
                marginBottom: 45,
              }}>
              <Text style={{ color: '#5C9DF2', marginRight: 12 }}>שעות לפני השיעורים</Text>
              <CommonInput
                style={{ width: 135 }}
                numberOfLines={1}
                backgroundColor="white"
                textAlign="center"
                value={this.state.beforeClassHour}
                onChangeText={(text) => {
                  this.setState({ beforeClassHour: text });
                }}
              />
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 20,
    maxHeight: SCREEN_HEIGHT * 0.9
  },
});

export default ReservationAvailabilityPopup;
