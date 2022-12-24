import { observer } from 'mobx-react';
import React from 'react';
import { BackHandler, SafeAreaView, View } from 'react-native';
import GlobalState from '../mobx/GlobalState';
import { MAIN_TAB, SCREEN_WIDTH } from '../constants/Constants';
import { Langs, Styles } from '../constants';
import AppScreen from '../components/controls/AppScreen';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../components/controls';
import HomeScreen from './home/HomeScreen';
import ShopScreen from './home/ShopScreen';
import Toast from 'react-native-root-toast';
import { BottomMenu } from '../components/common';
import ProfileScreen from './home/ProfileScreen';
import AddProduct from './home/AddProduct';
import PaymentScreen from './home/PaymentScreen';
import TrainScreen from './workout/TrainScreen';
import SettingScreen from './setting/SettingScreen';
import BusinessScreen from './setting/BusinessScreen';
import AddBusinessScreen from './setting/AddBusinessScreen';
import PaymentMethodScreen from './setting/PaymentMethodScreen';
import SubscriptionScreen from './setting/SubscriptionScreen';
import PermissionScreen from './setting/PermissionScreen';
import ReportScreen from './report/ReportScreen';

@observer
export default class MainScreen extends AppScreen {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.props.navigation.addListener('willFocus', async () => {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    });
    this.props.navigation.addListener('willBlur', () => {
      if (this.backHandler) {
        try {
          this.backHandler.remove();
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.backHandler) {
      try {
        this.backHandler.remove();
      } catch (e) {
        console.log(e);
      }
    }
  }

  handleBackPress = () => {
    let result = false;
    switch (GlobalState.getTabIndex) {
      case MAIN_TAB.HOME:
        break;
      case MAIN_TAB.CHALLENGE:
      case MAIN_TAB.OPEN:
      case MAIN_TAB.MYPAGE:
        GlobalState.setTabIndex(MAIN_TAB.HOME);
        result = true;
    }

    if (result) {
      return;
    }

    if (this.confirmExit == true) {
      BackHandler.exitApp();
    } else {
      Toast.show(Langs.app_exit);
      this.confirmExit = true;
      this.timeOut = setTimeout(() => {
        this.confirmExit = false;
        clearTimeout(this.timeOut);
      }, 2000);
    }
  };

  render() {
    return (
      <SafeAreaView>
        <VerticalLayout style={Styles.full}>
          <View style={{ flex: 1 }}>
            {GlobalState.getTabIndex == MAIN_TAB.SETTING && <SettingScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.REPORT && <ReportScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.CARD && <HomeScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.HOME && <HomeScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.TRAIN && <TrainScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.CHAT && <HomeScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.GYME && <ShopScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.MORE && <HomeScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.SHOP && <ShopScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.PRODUCT && <AddProduct navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.PROFILE && <ProfileScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.PAYMENT && <PaymentScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.BUSINESS && <BusinessScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.ADDBUSINESS && <AddBusinessScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.PAYMETHOD && <PaymentMethodScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.SUBSCRIPTION && <SubscriptionScreen navigation={this.props.navigation} />}
            {GlobalState.getTabIndex == MAIN_TAB.PERMISSION && <PermissionScreen navigation={this.props.navigation} />}
        </View>
        <BottomMenu />
        <View
          style={{
            height: 30,
            width: SCREEN_WIDTH,
            backgroundColor: '#F5F5F5',
            position: 'absolute',
            bottom: 0,
            zIndex: 9,
          }}></View>
        </VerticalLayout>
      </SafeAreaView>
    );
  }
}