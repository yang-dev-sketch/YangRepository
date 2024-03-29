import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Styles } from '../../constants';
import {
  API,
  API_RES_CODE,
  IMAGE_FOO_URL,
  MAIN_TAB,
  SCREEN_WIDTH,
} from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import { requestGet, requestPost, requestUpload } from '../../utils/ApiUtils';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';
import DropDownPicker from '../../components/controls/DropDownPicker';
import CheckBox from './../../components/controls/CheckBox';
import BranchDetailPopup from '../../components/popups/BranchDetailPopup';
import Toast from 'react-native-root-toast';
import ToastContainer from '../../components/controls/ToastContainer';

@observer
export default class AddBusinessScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessLogo: '',
      title: '',
      description: '',
      address: '',
      firstPhone: '1',
      secondPhone: '5555215554',
      permanentPlace: false,
      showBranchDetailPopup: false,
    };
  }

  getInfo = () => {};

  componentDidMount() {
    this.getInfo();
  }

  onGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then((image) => {
      this.uploadLogo(image.path);
    });
  };

  uploadLogo = (filepath) => {
    requestUpload(API.Upload.upload, filepath, '').then((result) => {
      console.log(result);
      if (result.code == API_RES_CODE.SUCCESS) {
        this.setState({ businessLogo: result.data.file_path });
      } else {
        Toast.show(result.msg);
      }
    });
  };

  onDelete = () => {
    GlobalState.setTabIndex(MAIN_TAB.BUSINESS);
  };

  onSave = () => {
    GlobalState.setTabIndex(MAIN_TAB.BUSINESS);
    Toast.show(<ToastContainer title="הפרטים נשמרו בהצלחה" />, {
      duration: 3000,
      position: 20,
      opacity: 1,
      containerStyle: { backgroundColor: 'transparent' },
    });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29, paddingBottom: 90 }}>
            <HorizontalLayout
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22.25,
              }}>
              <Button
                onPress={() => {
                  GlobalState.setTabIndex(MAIN_TAB.BUSINESS);
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 19.87, height: 19.44 }}
                />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  letterSpacing: 1,
                  color: '#000',
                  fontWeight: '700',
                  fontFamily: 'Danidin',
                }}>
                הגדרות
              </Text>
              <Button onPress={() => {}}>
                <LocalImage
                  source={require('src/assets/image/ic_bottom_gyme_off.png')}
                  style={{ width: 39, height: 39 }}
                />
              </Button>
            </HorizontalLayout>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 22,
                marginBottom: 15,
                fontWeight: '600',
                color: '#000',
                fontFamily: 'Danidin',
              }}>
              הוספת סניף חדש
            </Text>
            <VerticalLayout
              style={{
                width: (SCREEN_WIDTH - 65) / 2,
                borderRadius: 11,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 18,
                alignSelf: 'center',
                marginBottom: 15,
              }}>
              <Button
                onPress={() => {
                  this.onGallery();
                }}>
                {(this.state.businessLogo === '' && (
                  <LocalImage
                    source={require('src/assets/image/ic_add_image.png')}
                    style={{ width: 70, height: 70 }}
                  />
                )) || (
                  <FastImage
                    source={{
                      uri: this.state.businessLogo ? this.state.businessLogo : IMAGE_FOO_URL,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 70, height: 70, borderRadius: 35 }}
                  />
                )}
              </Button>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  marginTop: 10,
                  color: '#000',
                  fontFamily: 'Danidin',
                }}>
                לוגו של העסק
              </Text>
            </VerticalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: 'white' }]}
              title="כותרת"
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.title}
                  onChangeText={(text) => {
                    this.setState({ title: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: 'white' }]}
              title="כמה מילים על העסק"
              image={require('src/assets/image/ic_info.png')}
              inputNode={
                <CommonInput
                  numberOfLines={4}
                  backgroundColor="#F5F5F5"
                  value={this.state.description}
                  onChangeText={(text) => {
                    this.setState({ description: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: 'white' }]}
              title="כתובת העסק"
              image={require('src/assets/image/ic_address.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.address}
                  onChangeText={(text) => {
                    this.setState({ address: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: 'white' }]}
              title="נייד"
              image={require('src/assets/image/ic_phone.png')}
              inputNode={
                <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <CommonInput
                    style={{ width: 70 }}
                    numberOfLines={1}
                    backgroundColor="#F5F5F5"
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
                    backgroundColor="#F5F5F5"
                    maxLength={10}
                    value={this.state.secondPhone}
                    onChangeText={(text) => {
                      this.setState({ secondPhone: text });
                    }}
                  />
                </HorizontalLayout>
              }
            />
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 40 }}>
              <Text style={{ fontSize: 16, lineHeight: 19, fontFamily: 'Danidin' }}>
                אין ברשותי מקום אימונים קבוע
              </Text>
              <CheckBox
                value={this.state.permanentPlace}
                onChange={(value) => {
                  this.setState({ permanentPlace: value }, () => {
                    this.state.permanentPlace && this.setState({ showBranchDetailPopup: true });
                  });
                }}
              />
            </HorizontalLayout>
            <DisactiveButton
              text="מחק סניף"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onDelete();
              }}
            />
            <ActiveButton
              text="שמירה של הסניף החדש"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onSave();
              }}
            />
          </VerticalLayout>
        </ScrollView>
        <BranchDetailPopup
          visible={this.state.showBranchDetailPopup}
          onCancel={() => {
            this.setState({ showBranchDetailPopup: false });
          }}
          onSave={() => {}}
        />
      </SafeAreaView>
    );
  }
}
