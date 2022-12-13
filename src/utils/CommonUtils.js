import { Langs } from '../constants';
import { API_RES_CODE, PREF_PARAMS } from '../constants/Constants';
import GlobalState from '../mobx/GlobalState';
import moment from 'moment';
import { PrefUtils } from './index';

export default {
  // Show Confirm Popup
  showConfirm(msg = '', ok = '', cancel = '', backDrop = true, onOk = null, onCancel = null) {
    GlobalState.setConfirm({
      visible: true,
      message: msg,
      ok: ok,
      cancel: cancel,
      onOk: onOk,
      onCancel: onCancel,
      backDrop: backDrop,
    });
  },

  // Show Alert Popup
  showAlert(msg, btnLabel = Langs.common.ok, onOk = null, backDrop = true) {
    this.showConfirm(msg, btnLabel, '', backDrop, onOk, null);
  },

  // Show Error Message of Sever API
  showServerErr(code, msg = '') {
    let message = '';
    let ok = '';
    let cancel = '';
    let onOk = null;
    let onCancel = null;

    if (msg === '') {
      switch (code) {
        case API_RES_CODE.ERR_API:
          message = Langs.error.network_error;
          ok = Langs.common.ok;
          break;
        default:
          message = msg;
          ok = Langs.common.ok;
      }
    } else {
      message = msg;
      ok = Langs.common.ok;
    }

    this.showConfirm(message, ok, cancel, onOk, onCancel);
  },

  // Show Image Detail Popup
  showImages(images = [], index = 0) {
    if (images.length < 1) {
      return;
    }

    GlobalState.imagePopup = {
      visible: true,
      index: index,
      images: images,
    };
  },

  // Show Lang popup
  showLangPopup(
    langStatus = 'en',
    ok = '',
    cancel = '',
    backDrop = true,
    onOk = null,
    onCancel = null,
  ) {
    GlobalState.setLangPopup({
      visible: true,
      langStatus: langStatus,
      ok: ok,
      cancel: cancel,
      onOk: onOk,
      onCancel: onCancel,
      backDrop: backDrop,
    });
  },

  isEmpty(value) {
    return typeof value === 'undefined' || value == null || value === '';
  },

  pad(value, count) {
    let string = value.toString();
    return '0'.repeat(Math.max(0, count - string.length)) + string;
  },

  currency(value) {
    if (value === null) {
      return 0;
    }
    return value
      .toString()
      .replace(/,/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  formatPhoneNumber(phone) {
    if (!phone) {
      return '';
    }

    let phoneNum = phone.replace(new RegExp('[^\\d-]', 'g'), '');
    if (phoneNum.length >= 4 && phoneNum[3] !== '-') {
      phoneNum = phoneNum.substr(0, 3) + '-' + phoneNum.substr(3);
    }
    if (phoneNum.length >= 9 && phoneNum[8] !== '-') {
      phoneNum = phoneNum.substr(0, 8) + '-' + phoneNum.substr(8);
    }
    return phoneNum;
  },

  validPwd(pwd) {
    var matchCnt = 0;
    if (pwd.length >= 8) {
      var re = /^(?=.*[a-zA-Z]).+$/; // Including english
      if (re.test(pwd)) {
        matchCnt += 1;
      }
      re = /^(?=.*[0-9]).+$/; // Including number
      if (re.test(pwd)) {
        matchCnt += 1;
      }
      re = /(?=.*[!@#$%^*+=-]).+$/; // Including special character
      if (re.test(pwd)) {
        matchCnt += 1;
      }

      return matchCnt >= 2;
    } else {
      return false;
    }
  },

  //16:00 -> PM 04:00
  timeConvert(time) {
    var hour = 0;
    var minute = 0;
    var tmp_hour = parseInt(time.substr(0, 2));
    var tmp_minute = parseInt(time.substr(3, 2));
    var time_type = '';

    time_type = tmp_hour < 12 ? 'AM' : 'PM';
    if (tmp_hour >= 12) {
      tmp_hour -= 12;
    }

    hour = tmp_hour < 10 ? '0' + tmp_hour : tmp_hour;
    minute = tmp_minute < 10 ? '0' + tmp_minute : tmp_minute;

    return time_type + ' ' + hour + ':' + minute;
  },

  changeLang(calback) {
    this.showLangPopup(
      GlobalState.langPopup.langStatus,
      Langs.common.confirm,
      Langs.common.cancel,
      true,
      async () => {
        Langs.setLanguage(GlobalState.langPopup.langStatus);
        await PrefUtils.setString(PREF_PARAMS.LANG, GlobalState.langPopup.langStatus);
        if (calback != undefined) {
          calback();
        }
      },
    );
  },

  getNextWeekNumFormatDate(weeknum, week_cnt) {
    let today = new Date();
    let curDayWeekNum = today.getDay();

    if (weeknum % 7 == 0) {
      weeknum = 7;
    } else {
      weeknum = weeknum % 7;
    }

    if (weeknum >= curDayWeekNum) {
      let targetDate = moment(today).add('days', week_cnt * 7 + weeknum - curDayWeekNum);
      return Langs.formatString(
        Langs.common.month_day_format,
        targetDate.format('MM'),
        targetDate.format('DD'),
        Langs.common.arr_week_num[weeknum - 1],
      );
    } else {
      let targetDate = moment(today).add('days', (week_cnt + 1) * 7 + weeknum - curDayWeekNum);
      return Langs.formatString(
        Langs.common.month_day_format,
        targetDate.format('MM'),
        targetDate.format('DD'),
        Langs.common.arr_week_num[weeknum - 1],
      );
    }
  },

  getNextWeekNumDate(weeknum, week_cnt) {
    let today = new Date();
    let curDayWeekNum = today.getDay();

    if (weeknum % 7 == 0) {
      weeknum = 7;
    } else {
      weeknum = weeknum % 7;
    }

    if (weeknum >= curDayWeekNum) {
      let targetDate = moment(today).add('days', week_cnt * 7 + weeknum - curDayWeekNum);
      return targetDate.format('YYYY-MM-DD');
    } else {
      let targetDate = moment(today).add('days', (week_cnt + 1) * 7 + weeknum - curDayWeekNum);
      return targetDate.format('YYYY-MM-DD');
    }
  },

  getFormatedDate(date, format) {
    return moment(date).format(format);
  },

  getDiffDate(diff_seconds) {
    let return_str = '';
    if (diff_seconds == '' || diff_seconds == undefined) {
      return '';
    }
    if (diff_seconds < 60) {
      return_str = Langs.extra.time_diff_format_0;
    } else if (diff_seconds < 3600) {
      let minute = Math.floor(diff_seconds / 60);
      return_str = Langs.formatString(Langs.extra.time_diff_format_minute, minute);
    } else if (diff_seconds < 86400) {
      let hours = Math.floor(diff_seconds / 3600);
      return_str = Langs.formatString(Langs.extra.time_diff_format_hour, hours);
    } else if (diff_seconds < 86400 * 7) {
      let days = Math.floor(diff_seconds / 86400);
      return_str = Langs.formatString(Langs.extra.time_diff_format_day, days);
    } else if (diff_seconds < 86400 * 7 * 52) {
      let weeks = Math.floor(diff_seconds / (86400 * 7));
      return_str = Langs.formatString(Langs.extra.time_diff_format_week, weeks);
    } else {
      let years = Math.floor(diff_seconds / (86400 * 365));
      return_str = Langs.formatString(Langs.extra.time_diff_format_year, years);
    }
    return return_str;
  },

  isBeforeToday(date) {
    let today = new Date();
    if (moment(today) >= moment(date)) {
      return true;
    }
    return false;
  },
};
