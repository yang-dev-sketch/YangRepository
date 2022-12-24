import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SetValueGroup } from '../common';
import CommonInput from '../common/CommonInput';
import { API, API_RES_CODE } from '../../constants/Constants';

@observer
class AvailableStorePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentItem: 1,
      description: '',
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
              <Text style={{ fontSize: 16, lineHeight: 19.2 }}>תכונות ייחודיות</Text>
            </View>
            <Text style={{ fontSize: 16, lineHeight: 19.2, marginBottom: 15 }}>זמין בחנות</Text>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="רכישה חד פעמית תוגבל ל:"
              inputNode={
                <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#5C9DF2' }}>
                    תשלומים עבור פריט זה
                  </Text>
                  <CommonInput
                    style={{ width: 105, marginLeft: 15 }}
                    textAlign="center"
                    numberOfLines={1}
                    backgroundColor="white"
                    value={this.state.paymentItem}
                    onChangeText={(text) => {
                      this.setState({ paymentItem: text });
                    }}
                  />
                </HorizontalLayout>
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 55, backgroundColor: '#F5F5F5' }]}
              title="תיאור מוצר"
              inputNode={
                <CommonInput
                  textAlign="center"
                  numberOfLines={1}
                  backgroundColor="white"
                  value={this.state.description}
                  onChangeText={(text) => {
                    this.setState({ description: text });
                  }}
                />
              }
            />
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
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
  },
});

export default AvailableStorePopup;
