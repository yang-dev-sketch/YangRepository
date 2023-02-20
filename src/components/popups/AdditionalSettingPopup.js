import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton } from '../common';
import { requestUpload } from '../../utils/ApiUtils';

@observer
class AdditionalSettingPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      additionSetting: '',
    };
  }

  onCheck = (id) => {
    const weekList = this.state.weekList;
    weekList.map((item, index) => {
      if (id === item.id) item.checked = !item.checked;
    });
    this.setState({ weekList: weekList });
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
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>סוג מסלול:</Text>
            </HorizontalLayout>
            <View
              style={{
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#F2F2F2',
                marginBottom: 20,
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>תכונות ייחודיות</Text>
            </View>
            <Text style={{ fontSize: 16, lineHeight: 19.2, marginBottom: 15, fontFamily: 'Danidin' }}>הגדרות נוספות</Text>
            <Button
              onPress={() => {
                this.setState({ additionSetting: 'removeCalOfActive' });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#D8D8D8',
                borderRadius: 11,
                paddingHorizontal: 15,
                paddingVertical: 11,
                marginBottom: 15,
              }}>
              {(this.state.additionSetting === 'removeCalOfActive' && (
                <LocalImage
                  source={require('src/assets/image/ic_check_on.png')}
                  style={{ width: 23, height: 23 }}
                />
              )) || (
                <LocalImage
                  source={require('src/assets/image/ic_check_off.png')}
                  style={{ width: 23, height: 23 }}
                />
              )}
              <Text style={{ fontSize: 16, lineHeight: 19.2, fontFamily: 'Danidin' }}>הסר מחישוב החברים הפעילים</Text>
            </Button>
            <Button
              onPress={() => {
                this.setState({ additionSetting: 'defineFreeMembership' });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#D8D8D8',
                borderRadius: 11,
                paddingHorizontal: 15,
                paddingVertical: 11,
                marginBottom: 45,
              }}>
              {(this.state.additionSetting === 'defineFreeMembership' && (
                <LocalImage
                  source={require('src/assets/image/ic_check_on.png')}
                  style={{ width: 23, height: 23 }}
                />
              )) || (
                <LocalImage
                  source={require('src/assets/image/ic_check_off.png')}
                  style={{ width: 23, height: 23 }}
                />
              )}
              <Text style={{ fontSize: 16, lineHeight: 19.2, fontFamily: 'Danidin' }}>מוגדר כחברות בחינם</Text>
            </Button>
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

export default AdditionalSettingPopup;
