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
import { ActiveButton, CommonInput, SetValueGroup } from '../../components/common';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import DropDownPicker from '../../components/controls/DropDownPicker';
import Toast from 'react-native-root-toast';
import auth from '@react-native-firebase/auth';

export default class RegistCoachScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      firstName: 'firstname',
      lastName: 'lastname',
      email: 'oleksandrbokii@gmail.com',
      firstPhone: '1',
      secondPhone: '2345678912',
      birthday: '2000-01-01',
      genderType: [{ name: Langs.common.man }, { name: Langs.common.women }],
      selectedGender: Langs.common.man,
      height: '180',
      weight: '70',
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
    requestUpload(API.Upload.upload, filepath, '').then((result) => {
      console.log(result);
      if (result.code == API_RES_CODE.SUCCESS) {
        this.setState({
          avatar: result.data.file_path,
        });
      } else {
        Toast.show(result.msg);
      }
    });
  };

  registCoach = () => {
    if (
      // this.state.avatar === '' ||
      this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.firstPhone === '' ||
      this.state.secondPhone === '' ||
      this.state.birthday === '' ||
      this.state.weight === '' ||
      this.state.height === ''
    ) {
      Toast.show('Enter details to signup!');
    } else {
      auth()
        .createUserWithEmailAndPassword(this.state.email, 'Fantasy123!@#')
        .then((res) => {
          res.user.updateProfile({
            avatar: this.state.avatar,
            displayName: this.state.firstName + this.state.lastName,
            phone: this.state.firstPhone + this.state.secondPhone,
            birthday: this.state.birthday,
            gender: this.state.selectedGender,
            height: this.state.height,
            width: this.state.width
          });

      // requestPost(API.Regist.regist_coach, {
      //   avatar: this.state.avatar,
      //   firstName: this.state.firstName,
      //   lastName: this.state.lastName,
      //   email: this.state.email,
      //   phone: this.state.firstPhone + this.state.secondPhone,
      //   birthday: this.state.birthday,
      //   gender: this.state.selectedGender,
      //   height: this.state.height,
      //   weight: this.state.weight,
      // });

      this.setState({
        avatar: '',
        firstName: '',
        lastName: '',
        email: '',
        firstPhone: '',
        secondPhone: '',
        birthday: '',
        selectedGender: 'איש',
        height: '',
        weight: ''
      });
      this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Toast.show('That email address is invalid!');
        }

        if (error.code === 'auth/weak-password') {
          Toast.show('Password should be at least 6 characters');
        }

        if (error.code === 'auth/email-already-in-use') {
          Toast.show('The email address is already in use by another account.');
        }

        console.error(error);
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
              height: 350,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LocalImage
              source={require('src/assets/image/ic_gyme.png')}
              style={{ width: 152.26, height: 152.26 }}
            />
            {/* <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ alignSelf: 'center', position: 'absolute', top: 60, left: 21 }}>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 17,
                  textDecorationLine: 'underline',
                  color: '#000',
                  fontFamily: 'Danidin',
                }}>
                הקודם
              </Text>
            </Button> */}
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -77 }}>
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
                {(this.state.avatar === '' && (
                  <LocalImage
                    source={require('src/assets/image/ic_add_image.png')}
                    style={{ width: 70, height: 70, marginBottom: 10 }}
                  />
                )) || (
                  <FastImage
                    source={{ uri: this.state.avatar ? this.state.avatar : IMAGE_FOO_URL }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 35 }}
                  />
                )}
              </Button>
              <Text
                style={{ fontSize: 14, lineHeight: 16.8, color: '#000', fontFamily: 'Danidin' }}>
                {Langs.regist.profile_image}
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
                    textAlignCenter={true}
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
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 15 }}>
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
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 20 }}>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: '#F5F5F5' }]}
                  title={Langs.common.height}
                  image={require('src/assets/image/ic_man.png')}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={16}
                      lineHeight={19}
                      numberOfLines={1}
                      backgroundColor="#FFF"
                      value={this.state.height}
                      onChangeText={(text) => {
                        this.setState({ height: text });
                      }}
                    />
                  }
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: '#F5F5F5' }]}
                  title={Langs.common.weight}
                  image={require('src/assets/image/ic_man.png')}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={16}
                      lineHeight={19}
                      numberOfLines={1}
                      backgroundColor="#FFF"
                      value={this.state.weight}
                      onChangeText={(text) => {
                        this.setState({ weight: text });
                      }}
                    />
                  }
                />
              </View>
            </HorizontalLayout>
            <ActiveButton
              text={Langs.common.next}
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.registCoach();
              }}
            />
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
