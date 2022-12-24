import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Langs, Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import DatePicker from 'react-native-date-picker';

@observer
class DatePickerPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount = () => {
    this.setState({ date: this.props.date });
  };

  onCancel = () => {
    this.props.onCancel();
  };
  setTrainDate = () => {
    this.props.setTrainDate(this.state.date);
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
            <HorizontalLayout
              style={{
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#D8D8D8',
              }}>
              <Button
                onPress={() => {
                  this.onCancel();
                }}>
                <Text>לְבַטֵל</Text>
              </Button>
              <Button
                onPress={() => {
                  this.setTrainDate();
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
              date={this.props.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              // minDate="2016-05-01"
              // maxDate="2016-06-01"
              onDateChange={(date) => {
                this.setState({ date: date });
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

export default DatePickerPopup;
