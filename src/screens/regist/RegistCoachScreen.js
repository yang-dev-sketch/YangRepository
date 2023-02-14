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
import { requestPost } from '../../utils/ApiUtils';
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
      logo: '',
      firstName: '',
      lastName: '',
      email: '',
      firstPhone: '049',
      secondPhone: '',
      birthday: '',
      genderType: [{ name: 'איש' }, { name: 'אִשָׁה' }],
      selectedGender: 'איש',
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

  registUser = () => {
    if (
      // this.state.logo === '' ||
      this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.firstPhone === '' ||
      this.state.secondPhone === '' ||
      this.state.birthday === ''
    ) {
      Toast.show('Enter details to signup!');
    } else {
      auth()
        .createUserWithEmailAndPassword(this.state.email, 'Fantasy123!@#')
        .then((res) => {
          res.user.updateProfile({
            logo: this.state.logo,
            displayName: this.state.firstName + ' ' + this.state.lastName,
            phone: this.state.firstPhone + ' ' + this.state.secondPhone,
            birthday: this.state.birthday,
            gender: this.state.selectedGender,
          });
          Toast.show('User registered successfully!');
          this.setState({
            logo: '',
            firstName: '',
            lastName: '',
            email: '',
            firstPhone: '',
            secondPhone: '',
            birthday: '',
            selectedGender: 'איש',
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
            <Button
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
                }}>
                הקודם
              </Text>
            </Button>
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
              <Text style={{ fontSize: 14, lineHeight: 16.8, color: '#000' }}>תמונה פרופיל</Text>
            </VerticalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="שם פרטי"
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.firstName}
                  onChangeText={(text) => {
                    this.setState({ firstName: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="שם משפחה"
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.lastName}
                  onChangeText={(text) => {
                    this.setState({ lastName: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="דוא”ל"
              image={require('src/assets/image/ic_email.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
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
                { marginBottom: 20, backgroundColor: 'white', elevation: 1 },
              ]}
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
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 45 }}>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: '#FFF' }]}
                  title="תאריך לידה"
                  image={require('src/assets/image/ic_birthday.png')}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={20}
                      lineHeight={24}
                      numberOfLines={1}
                      backgroundColor="#F5F5F5"
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
                  style={[Styles.input_wrapper, { backgroundColor: '#FFF' }]}
                  title="מִין"
                  image={require('src/assets/image/ic_gender.png')}
                  inputNode={
                    <DropDownPicker
                      editIcon={false}
                      data={this.state.genderType}
                      backgroundColor="#F5F5F5"
                      selectedValue={this.state.selectedGender}
                      onSelect={(value) => {
                        this.setState({ selectedGender: value.name });
                      }}
                    />
                  }
                />
              </View>
            </HorizontalLayout>
            <ActiveButton
              text="הבא"
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.registUser();
                // this.props.navigation.navigate('Login');
              }}
            />
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
