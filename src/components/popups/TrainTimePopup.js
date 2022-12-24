import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SetValueGroup } from '../common';
import { SCREEN_WIDTH } from '../../constants/Constants';
import DisactiveButton from '../common/DisactiveButton';

@observer
class TrainTimePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  onCancel = () => {
    this.props.onCancel();
  };
  onBack = () => {
    this.props.onBack();
  };
  onConfirm = () => {
    this.props.onConfirm();
  };
  setDatePicker = () => {
    this.props.setDatePicker();
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
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    this.onBack();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_left.png')}
                    style={{ width: 11.62, height: 26.63, marginRight: 21.27 }}
                  />
                </Button>
                <Button
                  onPress={() => {
                    this.onCancel();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_close.png')}
                    style={{ width: 31, height: 31 }}
                  />
                </Button>
              </HorizontalLayout>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>התראות</Text>
            </HorizontalLayout>
            <HorizontalLayout
              style={[Styles.input_wrapper, { marginBottom: 45, justifyContent: 'space-between' }]}>
              <View style={{ width: (SCREEN_WIDTH - 85) / 2 }}>
                <SetValueGroup
                  title="תאריך האימון"
                  image={require('src/assets/image/ic_calendar.png')}
                  inputNode={
                    <Button
                      onPress={() => {
                        this.setDatePicker();
                      }}
                      style={{
                        width: (SCREEN_WIDTH - 85) / 2,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>{this.props.trainDate}</Text>
                    </Button>
                  }
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - 85) / 2 }}>
                <SetValueGroup
                  title="תאריך האימון"
                  image={require('src/assets/image/ic_clock.png')}
                  inputNode={
                    <Button
                      onPress={() => {
                        this.setTimePicker();
                      }}
                      style={{
                        width: (SCREEN_WIDTH - 85) / 2,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>{this.props.trainTime}</Text>
                    </Button>
                  }
                />
              </View>
            </HorizontalLayout>
            <DisactiveButton
              text="לְבַטֵל"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onCancel();
              }}
            />
            <ActiveButton
              text="שְׁמִירָה"
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

export default TrainTimePopup;
