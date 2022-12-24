import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import DatePicker from 'react-native-date-picker';

@observer
class TimePickerPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };
  setTrainTime = () => {
    this.props.setTrainTime(this.state.time);
  };

  render() {
    return (
      <SwipeUpDownModal
        ContentModalStyle={styles.Modal}
        modalVisible={this.props.visible}
        DisableHandAnimation={true}
        onClose={() => {
          this.onCancel();
        }}
        ContentModal={
          <VerticalLayout style={{ alignItems: 'center' }}>
            <HorizontalLayout style={{ justifyContent: 'space-between', width: '100%', paddingHorizontal: 30, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#D8D8D8' }}>
              <Button
                onPress={() => {
                  this.onCancel();
                }}>
                <Text>לְבַטֵל</Text>
              </Button>
              <Button
                onPress={() => {
                  this.setTrainTime();
                  this.onCancel();
                }}>
                <Text>שְׁמִירָה</Text>
              </Button>
            </HorizontalLayout>
            <DatePicker
              open={true}
              style={{
                backgroundColor: 'white',
              }}
              date={this.props.time}
              mode="time"
              onDateChange={(time) => {
                this.setState({ time: time });
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

export default TimePickerPopup;
