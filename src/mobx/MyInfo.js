import {action, computed, observable} from 'mobx';
import PrefUtils from '../utils/PrefUtils';

const MyInfo = observable(
    {
        uid: 0,
        email: '',
        password: '',
        name: '',
        nickname: '',
        phone: '',
        sex: 0,
        profile: '',
        profile_url: '',
        birth: '',
        intro: '',
        recom_nickname: '',
        status: 0,
        alarm_relation: 0,
        alarm_challenge: 0,
        alarm_advertise: 0,
        private_name: 0,
        private_activity: 0,
        bank: '',
        acc_num: '',
        acc_holder: '',
        address: '',
        address_detail: '',
        report_result_type: 0,
        cash: 0,
        dev_type: 0,
        login_type: 1,
        fcm_token: '',

        get isValid() {
            return MyInfo.uid > 0;
        },

        clear() {
            MyInfo.uid = 0;
        },

        transformData(result) {
            MyInfo.uid = result.uid;
            MyInfo.phone = result.phone;
            MyInfo.email = result.email;
            MyInfo.nickname = result.nickname;
            MyInfo.fcm_token = result.fcm_token;
            MyInfo.login_type = result.login_type;
        },

        async loadInfo() {
            MyInfo.uid = await PrefUtils.getInt('uid');
            MyInfo.email = await PrefUtils.getString('email');
            MyInfo.phone = await PrefUtils.getString('phone');
            MyInfo.password = await PrefUtils.getString('pwd');
            MyInfo.fcm_token = await PrefUtils.getString('fcmToken');
            MyInfo.login_type = await PrefUtils.getInt('login_type');
        },

        async saveInfo() {
            await PrefUtils.setInt('uid', MyInfo.uid);
            await PrefUtils.setString('email', MyInfo.email);
            await PrefUtils.setString('phone', MyInfo.phone);
            await PrefUtils.setString('pwd', MyInfo.password);
            await PrefUtils.setString('fcmToken', MyInfo.fcm_token);
            await PrefUtils.setString('login_type', MyInfo.login_type);
        },

        saveSetting(data) {

        },
    },
    {
        isValid: computed,
        loadInfo: action,
        saveInfo: action,
        transformData: action,
        saveSetting: action,
    },
);

export default MyInfo;
