import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SetValueGroup, DisactiveButton } from '../common';
import { SCREEN_WIDTH } from '../../constants/Constants';
import TimePicker from '../controls/TimePicker';
import CustomCalendar from '../controls/CustomCalendar';

@observer
class CreateSameWorkoutpopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingTime: 0,
      selectedDate: null,
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };
  onBack = () => {
    this.props.onBack();
  };
  onConfirm = () => {
    this.state.selectedDate != null &&
      this.props.onConfirm(this.state.trainingTime, this.state.selectedDate);
  };
  setTimePicker = () => {
    this.props.setTimePicker();
  };

  render() {
    return (
      <SwipeUpDownModal
        ContentModalStyle={styles.Modal}
        modalVisible={this.props.visible}
        onClose={() => {
          this.onCancel();
        }}
        ContentModal={
          <VerticalLayout style={{ height: '100%', paddingHorizontal: 20 }}>
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
              <Button
                onPress={() => {
                  this.onCancel();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 27.12, height: 27.12 }}
                />
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22, fontWeight: '600', color: '#000', fontFamily: 'Danidin' }}>
                יצירת אותו אימון
              </Text>
            </HorizontalLayout>
            <CustomCalendar
              style={{ width: '100%' }}
              selectedType="single"
              sortable={false}
              minDate={new Date()}
              selectedDate={(date) => {
                this.setState({ selectedDate: date });
              }}
            />
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginTop: 20, marginBottom: 45, backgroundColor: '#F5F5F5' },
              ]}
              title="בחרו את שעת האימון"
              image={require('src/assets/image/ic_clock.png')}
              inputNode={
                <TimePicker
                  selectedValue={this.state.trainingTime}
                  onValueChange={(value) => {
                    this.setState({ trainingTime: value });
                  }}
                />
              }
            />
            <ActiveButton
              text="שכפל"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onConfirm();
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
  },
});

export default CreateSameWorkoutpopup;
