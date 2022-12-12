import { Langs } from '../constants';
import {API_RES_CODE, PREF_PARAMS} from '../constants/Constants';
import GlobalState from '../mobx/GlobalState';
import moment from 'moment';
import {PrefUtils} from './index';

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
      backDrop: backDrop
    });
  },

  // Show Alert Popup
  showAlert(msg, btnLabel = Langs.common.ok, onOk = null, backDrop=true) {
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
      images: images
    };
  },

  // Show Lang popup
  showLangPopup(langStatus = 'en', ok = '', cancel = '', backDrop = true, onOk = null, onCancel = null) {
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
    if(value === null) {
      return 0;
    }
    return value.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    if(pwd.length >= 8) {
      var re = /^(?=.*[a-zA-Z]).+$/;  // Including english
      if(re.test(pwd)) {
        matchCnt += 1;
      }
      re = /^(?=.*[0-9]).+$/; // Including number
      if(re.test(pwd)) {
        matchCnt += 1;
      }
      re = /(?=.*[!@#$%^*+=-]).+$/; // Including special character
      if(re.test(pwd)) {
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

    hour = tmp_hour < 10 ? "0" + tmp_hour : tmp_hour;
    minute = tmp_minute < 10 ? ('0' + tmp_minute) : tmp_minute;

    return (time_type+' '+hour+':'+minute)
  },

  changeLang(calback) {
    this.showLangPopup(GlobalState.langPopup.langStatus, Langs.common.confirm, Langs.common.cancel, true, async () => {
      Langs.setLanguage(GlobalState.langPopup.langStatus);
      await PrefUtils.setString(PREF_PARAMS.LANG, GlobalState.langPopup.langStatus);
      if(calback != undefined) {
        calback();
      }
    });
  },

  getChallengeDateType(wait_day, start_day, end_dt) {
    let return_str = '';
    if(parseInt(wait_day) < 0) {
      return_str = Langs.formatString(Langs.cert.started_ch_format, this.getChallengeDateFormat(start_day), this.getChallengeDateFormat(end_dt));
    } else {
      switch (parseInt(wait_day)) {
        case 0:
          return_str = Langs.cert.from_today;
          break;
        case 1:
          return_str = Langs.cert.from_oneday;
          break;
        case 2:
          return_str = Langs.cert.from_twoday;
          break;
        default:
          return_str = Langs.formatString(Langs.cert.from_nday, wait_day);
          break;
      }
    }

    return return_str;
  },

  getNextWeekNumFormatDate(weeknum, week_cnt) {
    let today = new Date();
    let curDayWeekNum = today.getDay();

    if(weeknum % 7 == 0) {
      weeknum = 7;
    } else {
      weeknum = weeknum % 7;
    }

    if(weeknum >= curDayWeekNum) {
      let targetDate = moment(today).add('days', week_cnt * 7 + weeknum - curDayWeekNum);
      return Langs.formatString(Langs.common.month_day_format, targetDate.format("MM"), targetDate.format("DD"), Langs.common.arr_week_num[weeknum - 1]);
    } else {
      let targetDate = moment(today).add('days', (week_cnt + 1) * 7 + weeknum - curDayWeekNum);
      return Langs.formatString(Langs.common.month_day_format, targetDate.format("MM"), targetDate.format("DD"), Langs.common.arr_week_num[weeknum - 1]);
    }
  },

  getNextWeekNumDate(weeknum, week_cnt) {
    let today = new Date();
    let curDayWeekNum = today.getDay();

    if(weeknum % 7 == 0) {
      weeknum = 7;
    } else {
      weeknum = weeknum % 7;
    }

    if(weeknum >= curDayWeekNum) {
      let targetDate = moment(today).add('days', week_cnt * 7 + weeknum - curDayWeekNum);
      return targetDate.format("YYYY-MM-DD");
    } else {
      let targetDate = moment(today).add('days', (week_cnt + 1) * 7 + weeknum - curDayWeekNum);
      return targetDate.format("YYYY-MM-DD");
    }
  },

  getChallengeDateFormat(date) {
    let targetDate = moment(new Date(date));
    let weeknum = targetDate.format("d");
    if(parseInt(weeknum) == 0) {
      weeknum = 7;
    }
    return Langs.formatString(Langs.cert.challenge_day_format, targetDate.format("MM"), targetDate.format("DD"), Langs.common.arr_week_num[parseInt(weeknum) - 1]);
  },

  getChallengeDuringCertBindo(days, weeks, perdaycnt) {// Challenge 기간,인증빈도, 하루 인증 회수 출력령역
    let format = Langs.cert.challenge_during_cert_bindo_format;
    return Langs.formatString(format, days, weeks, perdaycnt);
  },

  getCertPossibleDay(arrWeekNum) {
    let arrWeek = arrWeekNum.split(",");
    let strWeek = Array();
    arrWeek.map(item => {
      if(item !== '') {
        strWeek.push(Langs.common.arr_week_num[parseInt(item)]);
      }
    });
    return strWeek.join(", ");
  },

  getCertFrequencyStr(val) {
    let cert_frequency = [
        '',
      Langs.cert.week1,
      Langs.cert.week2,
      Langs.cert.week3,
      Langs.cert.week4,
      Langs.cert.week5,
      Langs.cert.week6,
      Langs.cert.mon_sun,
    ];

    return cert_frequency[val];
  },

  getFormatedDate(date, format) {
    return moment(date).format(format);
  },

  getChallengeStatusStr(status) {
    if(status == 0) {
      return Langs.detail.status_recruiting;
    } else if(status == 1) {
      return Langs.detail.satus_progress;
    } else {
      return Langs.detail.status_complete;
    }
  },

  getInquireTypeStr(type) {
    let return_str = '';
    switch (parseInt(type)) {
      case 0:
        return_str = Langs.question.faq_type_0;
        break;
      case 1:
        return_str = Langs.question.faq_type_1;
        break;
      case 2:
        return_str = Langs.question.faq_type_2;
        break;
      case 3:
        return_str = Langs.question.faq_type_3;
        break;
      case 4:
        return_str = Langs.question.faq_type_4;
        break;
      default:
        break;
    }

    return return_str;
  },

  getAlarmDays(str_days) {
    let arrDays = str_days.split(",");
    let return_str = '';
    arrDays.forEach(item => {
      if(item !== '') {
        return_str += return_str == '' ? Langs.common.arr_week_num[parseInt(item)] : (" " + Langs.common.arr_week_num[parseInt(item)]);
      }
    });

    return return_str;
  },

  getCashHisNameByType(type) {
    let return_str = '';
    switch (parseInt(type)) {
      case 0:
        return_str = Langs.cash.cash_type_0;
        break;
      case 1:
        return_str = Langs.cash.cash_type_1;
        break;
      case 2:
        return_str = Langs.cash.cash_type_2;
        break;
      case 3:
        return_str = Langs.cash.cash_type_3;
        break;
      case 4:
        return_str = Langs.cash.cash_type_4;
        break;
      default:
        break;
    }

    return return_str;
  },

  getDiffDate(diff_seconds) {
    let return_str = '';
    if(diff_seconds == '' || diff_seconds == undefined) {
      return '';
    }
    if(diff_seconds < 60) {
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

  getNotiContent(type, content, act_user_nickname, rcv_user_nickname, challenge_title) {
    let str = content;
    switch (parseInt(type)) {
      case 0:
        str = Langs.formatString(Langs.extra.noti_format_type_0, challenge_title, rcv_user_nickname, rcv_user_nickname);
        break;
      case 1:
        str = Langs.formatString(Langs.extra.noti_format_type_1, challenge_title, rcv_user_nickname, rcv_user_nickname);
        break;
      case 2:
        str = Langs.formatString(Langs.extra.noti_format_type_2, challenge_title);
        break;
      case 3:
        break;
      case 4:
        str = Langs.formatString(Langs.extra.noti_format_type_4, act_user_nickname);
        break;
      case 5:
        break;
      case 6:
        str = Langs.formatString(Langs.extra.noti_format_type_6, act_user_nickname);
        break;
      case 7:
        str = Langs.formatString(Langs.extra.noti_format_type_7, act_user_nickname);
        break;
      case 8:
        str = Langs.formatString(Langs.extra.noti_format_type_8, challenge_title);
        break;
      default:
        break;
    }

    return str;
  }
};
