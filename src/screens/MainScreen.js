import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler, SafeAreaView, StyleSheet, View} from 'react-native';
import GlobalState from '../mobx/GlobalState';
import {MAIN_TAB} from '../constants/Constants';
import {Langs, Styles} from '../constants';
import AppScreen from '../components/controls/AppScreen';
import {Button, HorizontalLayout, LocalImage, VerticalLayout} from '../components/controls';
import HomeScreen from './home/HomeScreen';

import Toast from 'react-native-root-toast';

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
                        {GlobalState.getTabIndex == MAIN_TAB.HOME && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.CHALLENGE && this.myInfo.uid > 0 && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.CHALLENGE && this.myInfo.uid == 0 && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.OPEN && this.myInfo.uid > 0 && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.OPEN && this.myInfo.uid == 0 && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.MYPAGE &&  this.myInfo.uid > 0 && <HomeScreen navigation={this.props.navigation} />}
                        {GlobalState.getTabIndex == MAIN_TAB.MYPAGE &&  this.myInfo.uid == 0 && <HomeScreen navigation={this.props.navigation} />}
                    </View>

                    {/*bottom menu*/}
                    <HorizontalLayout style={[styles.menu_bar]}>
                        <Button style={styles.menu}
                            onPress={() => {
                                if(GlobalState.getTabIndex != MAIN_TAB.HOME) {
                                    GlobalState.setTabIndex(MAIN_TAB.HOME);
                                }
                            }}>
                            <VerticalLayout style={Styles.center}>
                                <LocalImage source={
                                    GlobalState.getTabIndex == MAIN_TAB.HOME ? require('src/assets/image/ic_banner2.png') : require('src/assets/image/ic_banner2.png')
                                } style={{ width: 21, height: 21 }}/>
                            </VerticalLayout>
                        </Button>

                        <Button style={styles.menu}
                            onPress={() => {
                                if(GlobalState.getTabIndex != MAIN_TAB.CHALLENGE) {
                                    GlobalState.setTabIndex(MAIN_TAB.CHALLENGE);
                                }
                            }}>
                            <VerticalLayout style={Styles.center}>
                                <LocalImage source={
                                    GlobalState.getTabIndex == MAIN_TAB.CHALLENGE ? require('src/assets/image/ic_banner2.png') : require('src/assets/image/ic_banner2.png')
                                } style={{ width: 26, height: 26 }}/>
                            </VerticalLayout>
                        </Button>

                        <Button style={styles.menu}
                            onPress={() => {
                                this.props.navigation.navigate("ShoppingMall");
                            }}>
                            <VerticalLayout style={Styles.center}>
                                <LocalImage source={
                                    require('src/assets/image/ic_banner2.png')} style={{ width: 20, height: 19 }}
                                />
                            </VerticalLayout>
                        </Button>

                        <Button style={styles.menu}
                            onPress={() => {
                                if(GlobalState.getTabIndex != MAIN_TAB.OPEN) {
                                    GlobalState.setTabIndex(MAIN_TAB.OPEN);
                                }
                            }}>
                            <VerticalLayout style={Styles.center}>
                                <LocalImage source={
                                    GlobalState.getTabIndex == MAIN_TAB.OPEN ? require('src/assets/image/ic_banner2.png') : require('src/assets/image/ic_banner2.png')
                                } style={{ width: 27, height: 27 }}/>

                            </VerticalLayout>
                        </Button>

                        <Button style={styles.menu}
                            onPress={() => {
                                if(GlobalState.getTabIndex != MAIN_TAB.MYPAGE) {
                                    GlobalState.setTabIndex(MAIN_TAB.MYPAGE);
                                }
                            }}>
                            <VerticalLayout style={Styles.center}>
                                <LocalImage source={
                                    GlobalState.getTabIndex == MAIN_TAB.MYPAGE ? require('src/assets/image/ic_banner2.png') : require('src/assets/image/ic_banner2.png')
                                } style={{ width: 21, height: 21 }}/>
                            </VerticalLayout>
                        </Button>
                    </HorizontalLayout>
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
