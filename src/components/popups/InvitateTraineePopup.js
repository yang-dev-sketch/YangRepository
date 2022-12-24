import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SetValueGroup } from '../common';
import CommonInput from '../common/CommonInput';
import { API, API_RES_CODE } from '../../constants/Constants';

@observer
class InvitateTraineePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_email: '',
      firstName: '',
      lastName: '',
    };
  }

  sendInvitation = () => {
    // requestPost(API.Home.send_invitation, {
    //   phone_email: this.state.phone_email,
    //   name: this.state.firstName + this.state.lastName,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.props.onBack();
    //   } else {
    //   }
    // });
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>מתאמנים באירגון</Text>
            </HorizontalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="שם פרטי ושם משפחה"
              image={require('src/assets/image/ic_email.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="white"
                  value={this.state.phone_email}
                  onChangeText={(text) => {
                    this.setState({ phone_email: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 55, backgroundColor: '#F5F5F5' }]}
              title="כתובת העסק"
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <HorizontalLayout
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 43,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                  }}>
                  <TextInput
                    style={{ width: '45%', textAlign: 'right' }}
                    value={this.state.lastName}
                    onChangeText={(text) => this.setState({ lastName: text })}
                  />
                  <Text>/</Text>
                  <TextInput
                    style={{ width: '45%', textAlign: 'right' }}
                    value={this.state.firstName}
                    onChangeText={(text) => this.setState({ firstName: text })}
                  />
                </HorizontalLayout>
              }
            />
            <ActiveButton
              text="שליחת הזמנה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.sendInvitation();
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
  },
});

export default InvitateTraineePopup;
