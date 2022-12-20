import React from 'react';
import { observer } from 'mobx-react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  RefreshControl,
  Touchable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { CommonUtils } from '../../utils';
import { Langs, Styles } from '../../constants';
import {
  API,
  API_RES_CODE,
  IMAGE_FOO_URL,
  MAIN_TAB,
  SCREEN_WIDTH,
} from '../../constants/Constants';
import {
  Button,
  HorizontalLayout,
  LocalImage,
  ScaledFastImage,
  VerticalLayout,
} from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import MyInfo from '../../mobx/MyInfo';
import { requestGet, requestPost, requestUpload } from '../../utils/ApiUtils';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';
import DropDownPicker from '../../components/controls/DropDownPicker';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_HEIGHT } from 'react-native-common-date-picker/src/contants';

@observer
export default class PaymentMethodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: '0000 0000 0000 0000 0000',
      validity: '04/45',
      cvv: '488',
      id: '0000 0000 0000 0000 0000',
    };
  }

  getInfo = () => {};

  componentDidMount() {
    this.getInfo();
  }

  onSave = () => {
    GlobalState.setTabIndex(MAIN_TAB.SETTING);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <VerticalLayout style={{ paddingVertical: 29 }}>
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
          <Text style={{ fontSize: 18, lineHeight: 22, marginBottom: 20 }}>עריכת אזור עסקי</Text>
          <Text style={{ fontSize: 18, lineHeight: 22, marginBottom: 15 }}>
            את פרטי אמצעי התשלום
          </Text>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#1E6FD9', '#94BDF2']}
            style={styles.pay_item}>
            <VerticalLayout>
              <HorizontalLayout
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_sim.png')}
                  style={{ width: 33, height: 26 }}
                />
                <LocalImage
                  source={require('src/assets/image/ic_double_round.png')}
                  style={{ width: 42.29, height: 26.12 }}
                />
              </HorizontalLayout>
              <SetValueGroup
                style={{ marginBottom: 12, backgroundColor: 'transparent' }}
                title="כותרת הסניף"
                textStyle={{ fontSize: 14, lineHeight: 16.8, color: 'white' }}
                inputNode={
                  <CommonInput
                    inputStyle={{ height: 40 }}
                    fontSize={20}
                    lineHeight={24}
                    numberOfLines={1}
                    backgroundColor="white"
                    value={this.state.ticketNumber}
                    onChangeText={(text) => {
                      this.setState({ ticketNumber: text });
                    }}
                  />
                }
              />
              <HorizontalLayout style={{ justifyContent: 'space-between' }}>
                <SetValueGroup
                  style={{
                    marginBottom: 12,
                    backgroundColor: 'transparent',
                    width: (SCREEN_WIDTH - 111) / 2,
                  }}
                  title="תוקף"
                  textStyle={{ fontSize: 14, lineHeight: 16.8, color: 'white' }}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={20}
                      lineHeight={24}
                      numberOfLines={1}
                      backgroundColor="white"
                      value={this.state.validity}
                      onChangeText={(text) => {
                        this.setState({ validity: text });
                      }}
                    />
                  }
                />
                <SetValueGroup
                  style={{
                    marginBottom: 12,
                    backgroundColor: 'transparent',
                    width: (SCREEN_WIDTH - 111) / 2,
                  }}
                  title="CVV"
                  textStyle={{ fontSize: 14, lineHeight: 16.8, color: 'white' }}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={20}
                      lineHeight={24}
                      numberOfLines={1}
                      backgroundColor="white"
                      value={this.state.cvv}
                      onChangeText={(text) => {
                        this.setState({ cvv: text });
                      }}
                    />
                  }
                />
              </HorizontalLayout>
              <SetValueGroup
                style={{ marginBottom: 12, backgroundColor: 'transparent' }}
                title="תעודת זהות"
                textStyle={{ fontSize: 14, lineHeight: 16.8, color: 'white' }}
                inputNode={
                  <CommonInput
                    inputStyle={{ height: 40 }}
                    fontSize={20}
                    lineHeight={24}
                    numberOfLines={1}
                    backgroundColor="white"
                    value={this.state.id}
                    onChangeText={(text) => {
                      this.setState({ id: text });
                    }}
                  />
                }
              />
            </VerticalLayout>
          </LinearGradient>
        </VerticalLayout>
        <ActiveButton
          text="שמירת פרטים"
          style={{ position: 'absolute', bottom: 30, left: 20 }}
          action={() => {
            this.onSave();
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pay_item: {
    width: '100%',
    borderRadius: 21,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
});
