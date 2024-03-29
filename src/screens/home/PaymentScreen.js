import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Styles } from '../../constants';
import { API, API_RES_CODE, MAIN_TAB } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import { SearchInput } from '../../components/common';
import PaymentItem from '../../components/items/PaymentItem';
import ManualBillingPopup from '../../components/popups/ManualBillingPopup';

@observer
export default class PaymentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showManualBillingPopup: false,
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
    // requestGet(API.Home.get_payment, {
    //   search: this.state.search,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({
      paymentList: paymentList,
    });
    //   } else {
    //   }
    // });
  };

  componentDidMount() {
    this.getInfo();
  }

  search = (search) => {
    this.setState({ search: search }, () => {
      this.getInfo();
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <VerticalLayout
          style={{
            paddingVertical: 29,
            backgroundColor: '#F5F5F5',
            flex: 1,
            paddingBottom: 90,
          }}>
          <HorizontalLayout
            style={{
              alignItem: 'center',
              justifyContent: 'space-between',
              marginBottom: 16.94,
              paddingHorizontal: 20,
            }}>
            <Button
              onPress={() => {
                GlobalState.setTabIndex(MAIN_TAB.PROFILE);
              }}>
              <LocalImage
                source={require('src/assets/image/ic_close.png')}
                style={{ width: 27.12, height: 27.12 }}
              />
            </Button>
            <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>
              תשלומים
            </Text>
          </HorizontalLayout>
          <SearchInput
            setSearch={(search) => {
              this.search();
            }}
            style={{ marginHorizontal: 20 }}
          />
          <ScrollView style={{ marginTop: 15, paddingHorizontal: 20 }}>
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
          <Button
            onPress={() => {
              this.setState({ showManualBillingPopup: true });
            }}>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
              <Text style={{ fontSize: 16, lineHeight: 19, fontFamily: 'Danidin' }}>חיוב ידני</Text>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 24, height: 24, marginLeft: 6 }}
              />
            </HorizontalLayout>
          </Button>
        </VerticalLayout>
        <ManualBillingPopup
          visible={this.state.showManualBillingPopup}
          onCancel={() => {
            this.setState({ showManualBillingPopup: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
