import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton } from '../common';
import { API } from '../../constants/Constants';

@observer
class EditTraineePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  onCancel = () => {
    this.props.onCancel();
  };

  addTrainee = () => {
    this.props.addTrainee();
  };

  render() {
    return (
      <SwipeUpDownModal
        ContentModalStyle={styles.Modal}
        modalVisible={this.props.visible}
        onClose={() => {
          this.props.onCancel();
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
                marginBottom: 19.5,
              }}>
              <Button
                onPress={() => {
                  this.props.onCancel();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 31, height: 31 }}
                />
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>עריכת מתאמנים</Text>
            </HorizontalLayout>
            <Button
              onPress={() => {
                this.addTrainee();
              }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#0D65D9',
                  textDecorationLine: 'underline',
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                הוספת מתאמנים
              </Text>
            </Button>
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#94BDF2',
                borderRadius: 11,
                paddingTop: 18,
                paddingBottom: 21,
                marginBottom: 60,
                alignItems: 'center',
              }}>
              <Text>לא קיימים כרגע מתאמנים באימון</Text>
            </View>
            <DisactiveButton
              text="שמירה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onSave();
              }}
            />
            <ActiveButton
              text="שמירה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onSave();
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

export default EditTraineePopup;
