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

export default class RegistBusinessOneScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      businessType: [{ name: 'סוג העסק' }, { name: 'סוג העסק' }],
      selectedBusiness: 'סוג העסק',
      hp: '',
      firstPhone: '',
      secondPhone: '',
      email: '',
    };
  }

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
              source={require('src/assets/image/ic_step_one.png')}
              style={{ width: 172, height: 206, position: 'absolute', Top: 100 }}
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
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -50 }}>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="שם העסק"
              image={require('src/assets/image/ic_active_calendar.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.businessName}
                  onChangeText={(text) => {
                    this.setState({ businessName: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="סוג העסק"
              image={require('src/assets/image/ic_active_calendar.png')}
              inputNode={
                <DropDownPicker
                  editIcon={false}
                  backgroundColor="#F5F5F5"
                  data={this.state.businessType}
                  selectedValue={this.state.selectedBusiness}
                  onSelect={(value) => {
                    this.setState({ selectedBusiness: value.name });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="ח.פ"
              image={require('src/assets/image/ic_hp.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.hp}
                  onChangeText={(text) => {
                    this.setState({ hp: text });
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
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 30, backgroundColor: '#FFF' }]}
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
            <ActiveButton
              text="הבא"
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.props.navigation.navigate('RegistBusinessTwo');
              }}
            />
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
