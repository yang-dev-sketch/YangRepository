import React from 'react';
import {
    KeyboardAvoidingView, Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {AppScreen, Button, HorizontalLayout, LocalImage, VerticalLayout, TopNavbar} from '../../components/controls';
import Styles from '../../constants/Styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Langs} from '../../constants';
import {CommonInputItem} from '../../components/items';
import ShakeAnimateView from '../../components/controls/ShakeAnimateView';
import {SCREEN_WIDTH, SCREEN_HEIGHT, API, API_RES_CODE, PREF_PARAMS} from '../../constants/Constants';
import {requestPost} from '../../utils/ApiUtils';
import {CommonUtils, PrefUtils} from '../../utils';
import GlobalState from '../../mobx/GlobalState';
import {observer} from 'mobx-react';

@observer
export default class SignupScreen extends AppScreen{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            id_type_check: 0,
            pwd: '',
            pwd_type_check: 0,
            pwd_confirm: '',
            pwd_confirm_check: 0,
            next_enable: 0,
        }
    }

    render() {
        return (
            <SafeAreaView style={Styles.container}>
                <KeyboardAvoidingView style={Styles.container}>
                    <TouchableWithoutFeedback style={Styles.container}>
                        <TopNavbar
                            borderBottomFlag={false}
                            title={Langs.signup.signup}
                            source={GlobalState.langPopup.langStatus == 'en' ? require('src/assets/image/ic_banner2.png') : require('src/assets/image/ic_banner2.png')}
                            source_url={() => {
                                CommonUtils.changeLang();
                            }}
                            onPress={() => {this.props.navigation.goBack();}}/>

                        <ScrollView style={{height: SCREEN_HEIGHT-154, marginBottom: 60}}
                        disableScrollViewPanResponder={true}
                        showsVerticalScrollIndicator={false}>
                            <VerticalLayout style={{paddingHorizontal: 16}}>
                                <VerticalLayout style={{marginTop: 10}}>
                                    <Text style={styles.item_title}>{Langs.signup.easy_signup}</Text>

                                    <HorizontalLayout style={[Styles.space_between, Styles.v_center, {marginTop: 15, marginBottom: 30, paddingHorizontal: SCREEN_WIDTH*0.1}]}>
                                        <Button
                                            onPress={() => {this.onGoSignupSec(1);}}
                                            style={{marginLeft: 'auto', marginRight: 60}}
                                        >
                                            <LocalImage style={ styles.img_circle} source={require('src/assets/image/ic_banner2.png')}/>
                                        </Button>
                                        <Button
                                            onPress={() => {this.onGoSignupSec(2);}}
                                            style={{marginRight: 60}}
                                        >
                                            <LocalImage style={ styles.img_circle} source={require('src/assets/image/ic_banner2.png')}/>
                                        </Button>
                                    </HorizontalLayout>
                                </VerticalLayout>
                            </VerticalLayout>

                            <View style={styles.border_line}/>

                            <VerticalLayout style={{paddingHorizontal: 16}}>
                                <VerticalLayout style={{marginTop: 28}}>
                                    <Text style={[styles.item_title, {marginBottom: 8}]}>{Langs.signup.direct_signup}</Text>
                                    <HorizontalLayout style={[Styles.v_center]}>
                                        <Text style={styles.item_title}>{Langs.signup.id}</Text>
                                    </HorizontalLayout>

                                    <ShakeAnimateView>
                                        <CommonInputItem
                                            ref={ref => {
                                                this._inputId = ref;
                                            }}
                                            value={this.state.id}
                                            style={{height: 26, paddingRight: SCREEN_WIDTH*0.13}}
                                            placeholder={Langs.signup.id_placeholder}
                                            maxLength={50}
                                            keyboardType='default'
                                            returnKeyType='next'
                                            onChangeText={text => {
                                                this.setState({
                                                    id: text,
                                                }, () => {this.onCheckIdFormat()});
                                            }}
                                            onSubmitEditing={() => {
                                                this._inputPwd.focus();
                                            }}
                                            showErrFlag={true}
                                        />
                                        <Text style={styles.double_check} onPress={
                                            this.state.id_type_check == 1 ? () => {this.onDblCheck()} : () => {}}>{Langs.signup.dbl_check}</Text>
                                    </ShakeAnimateView>
                                    <Text style={{color: 'red', fontSize: 11, marginTop: -40}}>
                                    {
                                        this.state.id_type_check == 0 ? Langs.signup.id_hint :   this.state.id_type_check == 1 ? Langs.signup.right_email : this.state.id_type_check == 2 ? Langs.signup.wrong_email :  this.state.id_type_check == 3 ? Langs.signup.used_email : Langs.signup.useful_email
                                    }
                                    </Text>
                                </VerticalLayout>

                                <VerticalLayout style={{marginTop: 15}}>
                                    <HorizontalLayout style={[Styles.v_center]}>
                                        <Text style={styles.item_title}>{Langs.signup.password}</Text>
                                    </HorizontalLayout>

                                    <ShakeAnimateView>
                                        <CommonInputItem
                                            ref={ref => {
                                                this._inputPwd = ref
                                            }}
                                            value={this.state.pwd}
                                            style={{height: 26}}
                                            placeholder={Langs.signup.pwd_placeholder}
                                            keyboardType='default'
                                            secureTextEntry={true}
                                            onChangeText={text => {
                                                this.setState({
                                                    pwd: text,
                                                }, () => {this.onCheckPwdFormat()});
                                            }}
                                            returnKeyType='next'
                                            onSubmitEditing={() => {
                                                this._inputPwdConfirm.focus();
                                            }}
                                            onBlur={() => {
                                                this.onCheckPwdFormat();
                                            }}
                                            showErrFlag={true}
                                        />
                                    </ShakeAnimateView>
                                    <Text style={{color: 'red', fontSize: 11, marginTop: -40}}>
                                    {
                                        this.state.pwd_type_check == 0 ? Langs.signup.id_hint :   this.state.pwd_type_check == 1 ? Langs.signup.short_password : this.state.pwd_type_check == 2 ? Langs.signup.password_type_wrong :  Langs.signup.password_type_right
                                    }
                                    </Text>
                                </VerticalLayout>

                                <VerticalLayout style={{marginTop: 15}}>
                                    <HorizontalLayout style={[Styles.v_center]}>
                                        <Text style={styles.item_title}>{Langs.signup.pwd_confirm}</Text>
                                    </HorizontalLayout>

                                    <ShakeAnimateView>
                                        <CommonInputItem
                                            ref={ref => {
                                                this._inputPwdConfirm = ref;
                                            }}
                                            value={this.state.pwd_confirm}
                                            style={{height: 26}}
                                            placeholder={Langs.signup.pwd_placeholder}
                                            keyboardType='default'
                                            secureTextEntry={true}
                                            onChangeText={text => {
                                                this.setState({
                                                    pwd_confirm: text,
                                                }, () => {this.onCheckPwdConfirm()});
                                            }}
                                            onSubmitEditing={() => {
                                                this.onCheckPwdConfirm();
                                            }}
                                            showErrFlag={true}
                                        />
                                    </ShakeAnimateView>
                                    <Text style={{color: 'red', fontSize: 11, marginTop: -40}}>
                                    {
                                        this.state.pwd_confirm_check == 0 ? Langs.signup.id_hint :   this.state.pwd_confirm_check == 1 ? Langs.signup.equ_password :   Langs.signup.not_equ_password
                                    }
                                    </Text>
                                </VerticalLayout>
                            </VerticalLayout>
                        </ScrollView>

                        <Button onPress=
                        {
                            this.state.id_type_check == 4 && this.state.pwd_type_check == 3 && this.state.pwd_confirm_check == 1 ?
                                () => {
                                this.myInfo.login_type = 0;
                                this.myInfo.email = this.state.id;
                                this.myInfo.password = this.state.pwd;

                                this.props.navigation.navigate('SignupSec');
                            } : () => {}
                        }
                            style={this.state.next_enable == 0 ? Styles.bottom_confirm_btn : Styles.bottom_confirm_enable_btn}
                        >
                            <Text style={{fontSize: 15, color: 'white'}}>{Langs.signup.next}</Text>
                        </Button>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    onGoSignupSec = (login_type) => {
        let sns_id = "";
        switch (login_type) {
            case 1: //Google
                sns_id = "test@google.com";
                break;
            case 2: //Line
                sns_id = "test@line.com";
                break;
            default:
                break;
        }

        //check login
        requestPost(
            API.Login.check_login,
            {
                user_id: sns_id,
                password: '',
                dev_type: Platform.OS == 'android' ? 0 : 1,
                fcm_token: this.myInfo.fcm_token,
                login_type: login_type,
            }
        ).then(async result => {
            if(result.code == API_RES_CODE.SUCCESS) {
                await PrefUtils.setString(PREF_PARAMS.EMAIL, sns_id);
                await PrefUtils.setString(PREF_PARAMS.PWD, '');
                await PrefUtils.setInt(PREF_PARAMS.LOGIN_TYPE, login_type);

                this.myInfo.uid = result.data.user_uid;
                this.myInfo.password = '';
                this.myInfo.login_type = login_type;

                this.props.navigation.navigate('Main');
            } else {
                this.myInfo.login_type = login_type;
                this.myInfo.email = sns_id;
                this.myInfo.password = '';

                this.props.navigation.navigate('SignupSec');
            }
        });
    };

    onDblCheck = () => {
        requestPost(
            API.Login.check_domain,
            {
                email: this.state.id,
            }
        ).then(result => {
            if(result.code == API_RES_CODE.SUCCESS) {
                this.setState({
                    id_type_check: 4
                }, () => {
                    this.checkNext();
                });
            } else {
                this.setState({
                    id_type_check: 3
                }, () => {
                    this.checkNext();
                });
            }
        });
    };

    onCheckIdFormat = () => {
        if(this.state.id !== '') {
            var ipt_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (ipt_pattern.test(this.state.id)) {
                this.setState({
                    id_type_check: 1
                }, () => {
                    this.checkNext();
                });
            } else {
                this.setState({
                    id_type_check: 2
                }, () => {
                    this.checkNext();
                });
            }
        } else {
            this.setState({
                id_type_check: 0
            }, () => {
                this.checkNext();
            })
        }
    };

    onCheckPwdFormat = () => {
        if(this.state.pwd !== '') {
            let userPwd = this.state.pwd;
            var ipt_pattern = /^(?=.*[0-9])(?=.*[A-Za-z])[0-9a-zA-Z]{8,40}$/;
            if(userPwd.length < 8){
                this.setState({
                    pwd_type_check: 1
                }, () => {
                    this.checkNext();
                });
            } else if (!ipt_pattern.test(userPwd)){
                this.setState({
                    pwd_type_check: 2
                }, () => {
                    this.checkNext();
                });
            } else {
                this.setState({
                    pwd_type_check: 3
                }, () => {
                    this.checkNext();
                });
            }

            if(this.state.pwd == this.state.pwd_confirm) {
                this.setState({
                    pwd_confirm_check: 1
                }, () => {
                    this.checkNext();
                });
            } else {
                this.setState({
                    pwd_confirm_check: 2
                }, () => {
                    this.checkNext();
                });
            }
        } else {
            this.setState({
                pwd_type_check: 0
            }, () => {
                this.checkNext();
            });
        }
    };

    onCheckPwdConfirm = () => {
        let pwd_con = this.state.pwd_confirm;
        if(pwd_con !== '') {
            if(this.state.pwd == pwd_con) {
                this.setState({
                    pwd_confirm_check: 1
                }, () => {
                    this.checkNext();
                });
            } else {
                this.setState({
                    pwd_confirm_check: 2
                }, () => {
                    this.checkNext();
                });
            }
        } else {
            this.setState({
                pwd_confirm_check: 0
            }, () => {
                this.checkNext();
            });
        }
    };

    checkNext = () => {
        if(this.state.id_type_check == 4 && this.state.pwd_type_check == 3 && this.state.pwd_confirm_check == 1) {
            this.setState({
                next_enable: 1
            })
        } else {
            this.setState({
                next_enable: 0
            })
        }
    }
}

const styles = StyleSheet.create({
    item_title: {
        fontSize: 14,
        flex: 1
    },

    img_circle: {
        width: SCREEN_WIDTH*0.12,
        height: SCREEN_WIDTH*0.12,
    },

    border_line: {
        height: 12,
        backgroundColor: '#e7e7ed',
    },

    double_check: {
        color: 'red',
        position: 'absolute',
        right: 14,
    }
});
