import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput } from '../common';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_HEIGHT } from '../../constants/Constants';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-root-toast';
import ToastContainer from '../controls/ToastContainer';

@observer
class EditCoachPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onExchange = () => {
    this.props.onExchange();
  };

  onKeep = () => {
    // requestPost(API.Home.update_coach, {
    //   id: this.props.selectId,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    Toast.show(<ToastContainer title="המאמן עודכן בהצלחה" />, {
      duration: 3000,
      position: 20,
      opacity: 1,
      containerStyle: { backgroundColor: 'transparent' },
    });
    this.props.onCancel();
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
                    this.setState({ modifyState: false });
                    this.props.onCancel();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_close.png')}
                    style={{ width: 31, height: 31 }}
                  />
                </Button>
              </HorizontalLayout>
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600' }}>
                עריכת מאמנים
              </Text>
            </HorizontalLayout>
            <HorizontalLayout
              style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 17.5,
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderWidth: 1,
                borderColor: '#D8D8D8',
                borderRadius: 8,
                marginBottom: 45,
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>
                {this.props.coachName}
              </Text>
              <View style={{ width: 45, height: 30, overflow: 'hidden', marginLeft: 6 }}>
                <FastImage
                  source={{ uri: this.props.avatar ? this.props.avatar : IMAGE_FOO_URL }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{ width: 45, height: 45, marginTop: -7.5 }}
                />
              </View>
            </HorizontalLayout>
            <DisactiveButton
              text="החלפה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onExchange();
              }}
            />
            <ActiveButton
              text="שמירה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onKeep();
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
    paddingHorizontal: 20,
  },
});

export default EditCoachPopup;
