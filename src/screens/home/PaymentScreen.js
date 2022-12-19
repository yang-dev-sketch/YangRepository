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
import Swiper from 'react-native-swiper';
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
import { requestGet, requestPost } from '../../utils/ApiUtils';
import { SearchInput } from '../../components/common';
import PaymentItem from '../../components/items/PaymentItem';

@observer
export default class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentList: [],
    };
  }

  getInfo = () => {
    const paymentList = [
      { id: 1, state: 'נכשל', method: 'אמצעי תשלום', date: '2022-06-10 22:45:00' },
      { id: 2, state: 'שולם', method: 'אמצעי תשלום', date: '2022-06-10 22:45:00' },
      { id: 3, state: 'נכשל', method: 'אמצעי תשלום', date: '2022-06-10 22:45:00' },
      { id: 4, state: 'שולם', method: 'אמצעי תשלום', date: '2022-06-10 22:45:00' },
      { id: 5, state: 'שולם', method: 'אמצעי תשלום', date: '2022-06-10 22:45:00' },
    ];
    this.setState({
      paymentList: paymentList,
    });
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <VerticalLayout
          style={{ paddingVertical: 29, backgroundColor: '#F5F5F5', paddingHorizontal: 20, flex: 1 }}>
          <HorizontalLayout
            style={{
              alignItem: 'center',
              justifyContent: 'space-between',
              marginBottom: 16.94,
            }}>
            <Button
              onPress={() => {
                this.props.onCancel();
              }}>
              <LocalImage
                source={require('src/assets/image/ic_close.png')}
                style={{ width: 31, height: 31 }}
              />
            </Button>
            <Text style={{ fontSize: 18, lineHeight: 22 }}>תשלומים</Text>
          </HorizontalLayout>
          <SearchInput setSearch={(search) => {}} />
          <ScrollView style={{marginTop: 15}}>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsVerticalScrollIndicator={false}
              data={this.state.paymentList}
              numColumns={1}
              renderItem={({ item, index }) => {
                return <PaymentItem data={item} />;
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
              }}
            />
          </ScrollView>
          <Button onPress={() => {}}>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
              <Text style={{ fontSize: 16, lineHeight: 19 }}>חיוב ידני</Text>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 24, height: 24, marginLeft: 6 }}
              />
            </HorizontalLayout>
          </Button>
        </VerticalLayout>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
