import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Langs, Styles } from '../../constants';
import { API, API_RES_CODE, IMAGE_FOO_URL, SERVER_URL } from '../../constants/Constants';
import {
  AppScreen,
  Button,
  HorizontalLayout,
  LocalImage,
  VerticalLayout,
} from '../../components/controls';
import { requestPost, requestUpload } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, SetValueGroup } from '../../components/common';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import CheckBox from './../../components/controls/CheckBox';
import Toast from 'react-native-root-toast';

export default class RegistBusinessTwoScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      description: 'description',
      branchName: 'branchName',
      businessAddress: 'businessAddress',
      permanentPlace: false,
    };
  }

  uploadProfile = (filepath) => {
    requestUpload(API.Upload.upload, filepath, '').then((result) => {
      if (result.err) {
        Toast.show(result.message);
      } else {
        this.setState({
          profile: result.data,
        });
      }
    });
  };

  onGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then((image) => {
      this.uploadProfile(image.path);
    });
  };

  next = () => {
    if (
      // this.state.profile === '' ||
      this.state.description === '' ||
      this.state.branchName === '' ||
      this.state.businessAddress === ''
    ) {
      Toast.show('All field must be entered.');
    } else {
      // this.setState({
      //   profile: '',
      //   description: '',
      //   branchName: '',
      //   businessAddress: '',
      //   permanentPlace: false,
      // });
      this.props.navigation.navigate({
        routeName: 'RegistBusinessThree',
        params: {
          businessName: this.props.navigation.getParam('businessName'),
          businessType: this.props.navigation.getParam('businessType'),
          hp: this.props.navigation.getParam('hp'),
          companyName: this.props.navigation.getParam('companyName'),
          phone: this.props.navigation.getParam('phone'),
          email: this.props.navigation.getParam('email'),
          profile: this.state.profile,
          description: this.state.description,
          branchName: this.state.branchName,
          businessAddress: this.state.businessAddress,
          permanentPlace: this.state.permanentPlace === true ? 1 : 0,
        },
        key: 'RegistBusinessThree',
      });
    }
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
              height: 355,
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
              <Text style={{ fontSize: 14, lineHeight: 17, textDecorationLine: 'underline', fontFamily: 'Danidin' }}>
                הקודם
              </Text>
            </Button> */}
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -19 }}>
            <VerticalLayout
              style={{
                alignSelf: 'center',
                marginBottom: 20,
                alignItems: 'center',
              }}>
              <Button
                onPress={() => {
                  this.onGallery();
                }}>
                {(this.state.profile === '' && (
                  <LocalImage
                    source={require('src/assets/image/ic_add_image.png')}
                    style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 35 }}
                  />
                )) || (
                  <FastImage
                    source={{
                      uri: this.state.profile ? SERVER_URL + this.state.profile : IMAGE_FOO_URL,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 35 }}
                  />
                )}
              </Button>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 17,
                  color: '#000',
                  fontWeight: '400',
                  fontFamily: 'Danidin',
                }}>
                {Langs.regist.profile_image}
              </Text>
            </VerticalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.regist.few_word_business}
              image={require('src/assets/image/ic_info.png')}
              inputNode={
                <CommonInput
                  numberOfLines={4}
                  backgroundColor="#FFF"
                  value={this.state.description}
                  onChangeText={(text) => {
                    this.setState({ description: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.regist.branch_name}
              image={require('src/assets/image/ic_address.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#FFF"
                  value={this.state.branchName}
                  onChangeText={(text) => {
                    this.setState({ branchName: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.regist.business_address}
              image={require('src/assets/image/ic_address.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#FFF"
                  value={this.state.businessAddress}
                  onChangeText={(text) => {
                    this.setState({ businessAddress: text });
                  }}
                />
              }
            />
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 25 }}
              reverse={true}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#000',
                  marginHorizontal: 7,
                  fontFamily: 'Danidin',
                }}>
                {Langs.regist.not_have_train_place}
              </Text>
              <CheckBox
                value={this.state.permanentPlace}
                onChange={(value) => {
                  this.setState({ permanentPlace: value });
                }}
              />
            </HorizontalLayout>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                color: '#000',
                textAlign: 'center',
                marginHorizontal: 57,
                marginBottom: 45,
                fontFamily: 'Danidin',
              }}
              numberOfLines={3}>
              {Langs.regist.if_branch_can_add_regist}
            </Text>
            <ActiveButton
              text={Langs.common.next}
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.next();
              }}
            />
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
