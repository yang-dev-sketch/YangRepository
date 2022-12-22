import React from 'react';
import {
  BackHandler,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import { Langs, Styles } from '../../constants';
import {
  API,
  API_RES_CODE,
  IMAGE_FOO_URL,
  PREF_PARAMS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/Constants';
import {
  AppScreen,
  Button,
  HorizontalLayout,
  LocalImage,
  VerticalLayout,
} from '../../components/controls';
import { CommonUtils, PrefUtils } from '../../utils';
import { requestPost } from '../../utils/ApiUtils';
import GlobalState from '../../mobx/GlobalState';
import EventBus from 'react-native-event-bus';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import DropDownPicker from '../../components/controls/DropDownPicker';
import CheckBox from '@react-native-community/checkbox';

export default class RegistBusinessTwoScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      logo: '',
      branchName: '',
      description: '',
      address: '',
      firstPhone: '',
      secondPhone: '',
      permanentPlace: false,
    };
  }

  onGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then((image) => {
      this.uploadLogo(image.path);
    });
  };

  uploadLogo = (filepath) => {
    requestUpload(API.Upload.upload, filePath, '').then((result) => {
      console.log(result);
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

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(92,157,242,0.25)', 'rgba(92,157,242,0)']}
            style={{
              width: '100%',
              height: 350,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LocalImage
              source={require('src/assets/image/ic_step_two.png')}
              style={{ width: 171, height: 206 }}
            />
            {/* <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ alignSelf: 'center', position: 'absolute', top: 60, left: 21 }}>
              <Text style={{ fontSize: 14, lineHeight: 17, textDecorationLine: 'underline' }}>
                הקודם
              </Text>
            </Button> */}
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -4 }}>
            <VerticalLayout
              style={{
                alignSelf: 'flex-end',
                borderRadius: 11,
                backgroundColor: '#F5F5F5',
                paddingVertical: 18,
                paddingHorizontal: 29,
                marginBottom: 15,
                alignItems: 'center',
                elevation: 1,
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
              <Text style={{ fontSize: 16, lineHeight: 19 }}>לוגו של העסק</Text>
            </VerticalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="שם הסניף"
              image={require('src/assets/image/ic_t.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.branchName}
                  onChangeText={(text) => {
                    this.setState({ branchName: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
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
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="כתובת העסק"
              image={require('src/assets/image/ic_address.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.description}
                  onChangeText={(text) => {
                    this.setState({ description: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginBottom: 15, backgroundColor: 'white', elevation: 1 },
              ]}
              title="נייד"
              image={require('src/assets/image/ic_phone.png')}
              inputNode={
                <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <CommonInput
                    style={{ width: 70 }}
                    numberOfLines={1}
                    backgroundColor="#F5F5F5"
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
                    value={this.state.secondPhone}
                    onChangeText={(text) => {
                      this.setState({ secondPhone: text });
                    }}
                  />
                </HorizontalLayout>
              }
            />
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 45 }}>
              <Text style={{ fontSize: 16, lineHeight: 19 }}>אין ברשותי מקום אימונים קבוע</Text>
              <CheckBox
                onFillColor="#0D65D9"
                value={this.state.permanentPlace}
                onChange={() => {
                  this.setState({ permanentPlace: !this.state.permanentPlace });
                }}
              />
            </HorizontalLayout>
            <ActiveButton
              text="הבא"
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.props.navigation.navigate('RegistBusinessThree');
              }}
            />
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
