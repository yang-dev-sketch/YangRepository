import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SetValueGroup } from '../common';
import { ScrollView } from 'react-navigation';
import CommonInput from '../common/CommonInput';
import CheckBox from '@react-native-community/checkbox';
import { requestUpload } from '../../utils/ApiUtils';
import ImageCropPicker from 'react-native-image-crop-picker';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_HEIGHT } from '../../constants/Constants';
import FastImage from 'react-native-fast-image';

@observer
class AddBranchPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: '',
      title: '',
      info: '',
      address: '',
      pay_method: false,
    };
  }

  uploadLogo = (filepath) => {
    requestUpload(API.Upload.upload, filePath, '').then((result) => {
      if (result.code == API_RES_CODE.SUCCESS) {
        this.setState({
          profile_url: result.data.file_url,
          profile: result.data.file_path,
        });
      } else {
        Toast.show(result.msg);
      }
    });
  };

  onGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then((image) => {
      this.uploadLogo(image.path);
    });
  };

  addBranch = () => {
    // requestPost(API.Home.add_branch, {
    //   logo: this.state.logo,
    //   title: this.state.title,
    //   info: this.state.info,
    //   address: this.state.address,
    //   pay_method: this.state.pay_method,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.props.onCancel();
    //   } else {
    //   }
    // });
  };

  deleteBranch = () => {
    // requestPost(API.Home.delete_branch, {
    //   id: this.state.trainId,
    //   time: this.state.trainDateTime,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
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
                paddingHorizontal: 20,
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
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600' }}>הסניפים שלנו</Text>
            </HorizontalLayout>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <Text style={{ fontSize: 18, lineHeight: 22, textAlign: 'right', marginBottom: 15, color: '#000', fontWeight: '600' }}>
                הוספת סניף חדש
              </Text>
              <VerticalLayout
                style={{
                  alignSelf: 'center',
                  borderRadius: 11,
                  backgroundColor: '#F5F5F5',
                  paddingVertical: 18,
                  paddingHorizontal: 29,
                  marginBottom: 15,
                  alignItems: 'center',
                }}>
                <Button
                  onPress={() => {
                    this.onGallery();
                  }}>
                  {(this.state.logo === '' && (
                    <LocalImage
                      source={require('src/assets/image/ic_add_image.png')}
                      style={{ width: 70, height: 70, marginBottom: 10 }}
                    />
                  )) || (
                    <FastImage
                      source={{ uri: this.state.logo ? this.state.logo : IMAGE_FOO_URL }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 35 }}
                    />
                  )}
                </Button>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>לוגו של העסק</Text>
              </VerticalLayout>
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
                title="כותרת הסניף"
                image={require('src/assets/image/ic_branch.png')}
                inputNode={
                  <CommonInput
                    numberOfLines={1}
                    backgroundColor="white"
                    value={this.state.title}
                    onChangeText={(text) => {
                      this.setState({ title: text });
                    }}
                  />
                }
              />
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
                title="כמה מילים על העסק"
                image={require('src/assets/image/ic_info.png')}
                inputNode={
                  <CommonInput
                    numberOfLines={4}
                    backgroundColor="white"
                    value={this.state.info}
                    onChangeText={(text) => {
                      this.setState({ info: text });
                    }}
                  />
                }
              />
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
                title="כתובת העסק"
                image={require('src/assets/image/ic_address.png')}
                inputNode={
                  <CommonInput
                    numberOfLines={1}
                    backgroundColor="white"
                    value={this.state.address}
                    onChangeText={(text) => {
                      this.setState({ address: text });
                    }}
                  />
                }
              />
              <HorizontalLayout
                style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 40 }}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>עריכת אמצעי תשלום</Text>
                <CheckBox
                  onFillColor="#0D65D9"
                  value={this.state.pay_method}
                  onChange={() => {
                    this.setState({ pay_method: !this.state.pay_method });
                  }}
                />
              </HorizontalLayout>
              <DisactiveButton
                text="מחק סניף"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.deleteBranch();
                }}
              />
              <ActiveButton
                text="שמירה של הסניף החדש"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.addBranch();
                }}
              />
            </ScrollView>
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
    maxHeight: SCREEN_HEIGHT * 0.95
  },
});

export default AddBranchPopup;
