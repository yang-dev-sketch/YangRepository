import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SetValueGroup } from '../common';
import { API, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';
import DatePicker from 'react-native-date-picker';
import TimePicker from '../controls/TimePicker';

@observer
class FilterByHourPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 8,
      endTime: 9,
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onFilter = () => {
    this.props.onFilter();
    this.onCancel();
  };

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
              <HorizontalLayout>
                <Text style={{ fontSize: 18, lineHeight: 22, fontFamily: 'Danidin' }}>סינון לפי: שעה</Text>
                <LocalImage
                  source={require('src/assets/image/ic_sort_black.png')}
                  style={{ width: 24, height: 24 }}
                />
              </HorizontalLayout>
            </HorizontalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="שעת התחלה"
              image={require('src/assets/image/ic_clock.png')}
              inputNode={
                <TimePicker
                  selectedValue={this.state.startTime}
                  onValueChange={(value) => {
                    this.setState({ startTime: value });
                  }}
                  minValue={this.state.startTime}
                  maxValue={this.state.endTime}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="שעת התחלה"
              image={require('src/assets/image/ic_clock.png')}
              inputNode={
                <TimePicker
                  selectedValue={this.state.endTime}
                  onValueChange={(value) => {
                    this.setState({ endTime: value });
                  }}
                  minValue={this.state.startTime}
                  maxValue={this.state.endTime}
                />
              }
            />
            <ActiveButton
              text="סנן"
              style={{ marginBottom: 15 }}
              action={() => {
                this.state.startTime > this.state.endTime && this.onFilter();
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
    maxHeight: SCREEN_HEIGHT * 0.9,
    paddingHorizontal: 20,
  },
});

export default FilterByHourPopup;
