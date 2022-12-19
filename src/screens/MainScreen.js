import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler, SafeAreaView, StyleSheet, View} from 'react-native';
import GlobalState from '../mobx/GlobalState';
import {MAIN_TAB} from '../constants/Constants';
import {Langs, Styles} from '../constants';
import AppScreen from '../components/controls/AppScreen';
import {Button, HorizontalLayout, LocalImage, VerticalLayout} from '../components/controls';
import HomeScreen from './home/HomeScreen';
import ShopScreen from './home/ShopScreen';

import Toast from 'react-native-root-toast';
import { BottomMenu } from "../components/common";
import ProfileScreen from "./home/ProfileScreen";
import AddProduct from "./home/AddProduct";
import PaymentScreen from "./home/PaymentScreen";

@observer
export default class MainScreen extends AppScreen {
    constructor(props) {
        super(props);

        this.state = {

        }
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
                        {GlobalState.getTabIndex == MAIN_TAB.SETTING && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.CHART && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.REPORT && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.HOME && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.TRAIN && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.CHAT && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.GYME && <ShopScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.MORE && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.SHOP && <ShopScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.PRODUCT && <AddProduct navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.PROFILE && <ProfileScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.PAYMENT && <PaymentScreen navigation={this.props.navigation} />}
                    </View>

                    {/*bottom menu*/}
                    <BottomMenu />
                </VerticalLayout>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    menu_bar: {
        height: 56,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#e1e1e1'
    },

    menu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
