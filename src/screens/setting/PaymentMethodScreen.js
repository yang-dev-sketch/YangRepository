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
import { SCREEN_HEIGHT } from 'react-native-common-date-picker/src/contants';
import PaymentMethodCard from '../../components/common/PaymentMethodCard';

@observer
export default class PaymentMethodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <PaymentMethodCard />
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

const styles = StyleSheet.create({});
