import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Langs, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SetValueGroup } from '../common';
import CommonInput from '../common/CommonInput';
import { API, API_RES_CODE, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';

@observer
class LoginUserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPhone: '1',
      secondPhone: '5555215554',
      verifyState: false,
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
              }}
              reverse={true}>
              <Button
                onPress={() => {
                  this.props.onCancel();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 31, height: 31 }}
                />
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22, fontWeight: '600', color: '#000', fontFamily: 'Danidin' }}>
                {Langs.regist.login_your_user}
              </Text>
            </HorizontalLayout>
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginBottom: 20, backgroundColor: '#F5F5F5', elevation: 1 },
              ]}
              title={Langs.common.phone_number}
              image={require('src/assets/image/ic_phone.png')}
              inputNode={
                <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <CommonInput
                    style={{ width: 70 }}
                    numberOfLines={1}
                    backgroundColor="#FFF"
                    maxLength={3}
                    value={this.state.firstPhone}
                    onChangeText={(text) => {
                      this.setState({ firstPhone: text });
                    }}
                  />
                  <View
                    style={{ width: 12, height: 0, borderWidth: 1, borderColor: '#000' }}></View>
                  <CommonInput
                    style={{ width: 230 }}
                    numberOfLines={1}
                    backgroundColor="#FFF"
                    maxLength={10}
                    value={this.state.secondPhone}
                    onChangeText={(text) => {
                      this.setState({ secondPhone: text });
                    }}
                  />
                </HorizontalLayout>
              }
            />
            {(this.state.verifyState && (
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 115, backgroundColor: '#F5F5F5' }]}
                title={Langs.common.email}
                inputNode={
                  <CommonInput
                    numberOfLines={1}
                    backgroundColor="#FFF"
                    value={this.state.code}
                    keyboardType={'numeric'}
                    onChangeText={(text) => {
                      this.setState({ code: text });
                    }}
                  />
                }
              />
            )) || (
              <Button onPress={() => {}} style={{ marginBottom: 115 }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: '600',
                    color: '#000',
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                  }}>
                  {Langs.regist.identi_by_email}
                </Text>
              </Button>
            )}
            <ActiveButton
              text={Langs.common.confirm}
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
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
});

export default LoginUserPopup;
