import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Langs, Styles } from '../../constants';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_WIDTH } from '../../constants/Constants';
import {
  AppScreen,
  Button,
  HorizontalLayout,
  LocalImage,
  VerticalLayout,
} from '../../components/controls';
import { requestPost, requestUpload } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';
import DropDownPicker from '../../components/controls/DropDownPicker';
import ImageCropPicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import LoginUserPopup from '../../components/popups/LoginUserPopup';
import Toast from 'react-native-root-toast';

export default class RegistBusinessThreeScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      userPhoto: '',
      firstName: 'firstname',
      lastName: 'lastname',
      firstPhone: '1',
      secondPhone: '8508104265',
      email: 'andasedev@hotmail.com',
      birthday: '1997-01-19',
      genderType: [{ name: Langs.common.man }, { name: Langs.common.women }],
      selectedGender: Langs.common.man,
      showLoginUserPopup: false,
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
      // this.state.userPhoto === '' ||
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.firstPhone === '' ||
      this.state.secondPhone === '' ||
      this.state.email === '' ||
      this.state.birthday === ''
    ) {
      Toast.show('All field must be entered.');
    } else {
      // this.setState({
      //   userPhoto: '',
      //   firstName: '',
      //   lastName: '',
      //   firstPhone: '',
      //   secondPhone: '',
      //   email: '',
      //   birthday: '',
      //   selectedGender: this.state.genderType[0].name,
      // });
      this.props.navigation.navigate({
        routeName: 'BankDetail',
        params: {
          businessName: this.props.navigation.getParam('businessName'),
          businessType: this.props.navigation.getParam('businessType'),
          hp: this.props.navigation.getParam('hp'),
          companyName: this.props.navigation.getParam('companyName'),
          phone: this.props.navigation.getParam('phone'),
          email: this.props.navigation.getParam('email'),
          profile: this.props.navigation.getParam('profile'),
          description: this.props.navigation.getParam('description'),
          branchName: this.props.navigation.getParam('branchName'),
          businessAddress: this.props.navigation.getParam('businessAddress'),
          permanentPlace: this.props.navigation.getParam('permanentPlace'),
          userPhoto: this.state.userPhoto,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          firstPhone: this.state.firstPhone,
          secondPhone: this.state.secondPhone,
          email: this.state.email,
          birthday: this.state.birthday,
          selectedGender: this.state.selectedGender,
        },
        key: 'BankDetail',
      });
    }
  };

  userLogin = () => {
    this.setState({ showLoginUserPopup: true });
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
              source={require('src/assets/image/ic_step_three.png')}
              style={{ width: 172, height: 206 }}
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
                {(this.state.userPhoto === '' && (
                  <LocalImage
                    source={require('src/assets/image/ic_add_image.png')}
                    style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 35 }}
                  />
                )) || (
                  <FastImage
                    source={{ uri: this.state.userPhoto ? this.state.userPhoto : IMAGE_FOO_URL }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 35 }}
                  />
                )}
              </Button>
              <Text style={{ fontSize: 14, lineHeight: 17, color: '#000', fontWeight: '400' }}>
                {Langs.regist.userPhoto}
              </Text>
            </VerticalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.common.first_name}
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#FFF"
                  value={this.state.firstName}
                  onChangeText={(text) => {
                    this.setState({ firstName: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.common.last_name}
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#FFF"
                  value={this.state.lastName}
                  onChangeText={(text) => {
                    this.setState({ lastName: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginBottom: 15, backgroundColor: '#F5F5F5', elevation: 1 },
              ]}
              title={Langs.common.phone_number}
              image={require('src/assets/image/ic_phone.png')}
              inputNode={
                <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <CommonInput
                    style={{ width: 70 }}
                    textAlignCenter={true}
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
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title={Langs.common.email}
              image={require('src/assets/image/ic_email.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#FFF"
                  value={this.state.email}
                  onChangeText={(text) => {
                    this.setState({ email: text });
                  }}
                />
              }
            />
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 45 }}>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: '#F5F5F5' }]}
                  title={Langs.common.birthday}
                  image={require('src/assets/image/ic_birthday.png')}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={16}
                      lineHeight={19}
                      numberOfLines={1}
                      backgroundColor="#FFF"
                      value={this.state.birthday}
                      onChangeText={(text) => {
                        this.setState({ birthday: text });
                      }}
                    />
                  }
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: '#F5F5F5' }]}
                  title={Langs.common.sex}
                  image={require('src/assets/image/ic_gender.png')}
                  inputNode={
                    <DropDownPicker
                      editIcon={false}
                      data={this.state.genderType}
                      backgroundColor="#FFF"
                      selectedValue={this.state.selectedGender}
                      onSelect={(value) => {
                        this.setState({ selectedGender: value.name });
                      }}
                    />
                  }
                />
              </View>
            </HorizontalLayout>
            <DisactiveButton
              text={Langs.regist.login_your_user}
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.userLogin();
              }}
            />
            <ActiveButton
              text={Langs.common.next}
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.next();
              }}
            />
          </VerticalLayout>
        </ScrollView>
        <LoginUserPopup
          visible={this.state.showLoginUserPopup}
          onCancel={() => {
            this.setState({ showLoginUserPopup: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
