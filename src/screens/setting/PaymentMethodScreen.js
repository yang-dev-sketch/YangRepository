import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { API, API_RES_CODE, IMAGE_FOO_URL, MAIN_TAB } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import { requestGet, requestPost, requestUpload } from '../../utils/ApiUtils';
import { ActiveButton } from '../../components/common';
import PaymentMethodCard from '../../components/common/PaymentMethodCard';

@observer
export default class PaymentMethodScreen extends React.Component {
  constructor(props) {
    super(props);
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
                fontWeight: '700',
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
              marginBottom: 20,
              color: '#000',
              fontWeight: '600',
            }}>
            עריכת אזור עסקי
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 22,
              marginBottom: 15,
              color: '#000',
              fontWeight: '600',
            }}>
            את פרטי אמצעי התשלום
          </Text>
          <PaymentMethodCard />
          <ActiveButton
            text="שמירת פרטים"
            style={{ position: 'absolute', bottom: 0 }}
            action={() => {
              this.onSave();
            }}
          />
        </VerticalLayout>
      </SafeAreaView>
    );
  }
}
