import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Dimens from './Dimens';
import FontFamily from './FontFamily';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    fontFamily: FontFamily.danidin,
    direction: 'rtl',
  },
  full: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  h_center: {
    justifyContent: 'center',
  },
  v_center: {
    alignItems: 'center',
  },
  v_align_right: {
    alignItems: 'flex-end',
  },
  v_align_left: {
    alignItems: 'flex-start',
  },
  space_between: {
    justifyContent: 'space-between',
  },
  width_100: {
    width: '100%',
  },
  flex_1: {
    flex: 1,
  },
  text_bold: {
    fontWeight: 'bold',
  },
  dlg_bg: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.dim_bg,
  },
  dlg_content: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginHorizontal: 37,
  },
  dlg_title: {
    color: Colors.black,
    fontSize: Dimens.fs_16,
    fontFamily: FontFamily.korean_gd_15_r,
    textAlign: 'center',
  },
  dlg_title1: {
    color: Colors.black,
    fontSize: Dimens.fs_16,
    fontFamily: FontFamily.korean_gd_15_r,
    paddingStart: 10,
  },
  dlg_close_btn: {
    width: 37,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup_left_header: {
    height: 48,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeded',
  },
  popup_header: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeded',
  },
  popup_header1: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeded',
  },
  popup_title: {
    color: Colors.text,
    fontSize: Dimens.fs_16,
    fontFamily: FontFamily.korean_gd_13_r,
  },
  popup_close_btn: {
    width: 48,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab_bar: { height: 52, borderBottomWidth: 0.5, borderBottomColor: '#f6f4f4' },
  tab: {
    flex: 1,
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab_active: { borderBottomColor: Colors.primary },
  tab_text: { color: Colors.black, fontSize: Dimens.fs_14, fontFamily: FontFamily.korean_gd_15_r },
  tab_active_text: { color: Colors.primary },
  filter: { height: 31, alignItems: 'center', marginHorizontal: 18 },
  filter_input: {
    borderWidth: 0.5,
    borderColor: '#bebdbd',
    borderRadius: 3,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  search_wrapper: { flex: 1, marginLeft: 5, borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  search_input: { fontSize: Dimens.fs_12, color: Colors.black, flex: 1, padding: 0 },
  select_text: { color: '#7d7d7d', fontSize: Dimens.fs_12 },
  search_btn: {
    width: 33,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.c_457fff,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },

  bottom_confirm_btn: {
    width: '100%',
    height: 48,
    backgroundColor: '#818181',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },

  bottom_confirm_enable_btn: {
    width: '100%',
    height: 48,
    backgroundColor: '#00d563',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },

  common_confirm_btn: {
    backgroundColor: '#00d563',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  usage_disable_btn: {
    width: '100%',
    height: 56,
    backgroundColor: '#f4f4f4',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },

  bottom_confirm_text: {
    color: 'white',
    fontSize: 15,
  },

  bottom_confirm_text_disabled: {
    color: 'white',
    fontSize: 18,
    opacity: 0.4,
  },

  usage_skip_text: {
    color: '#aeaeae',
    fontSize: 16,
  },

  top_navbar: {
    width: '100%',
    height: 55,
    backgroundColor: 'white',
  },

  btn_back_topbar: {
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
    zIndex: 1,
  },

  top_navbar_title: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 55,
    display: 'flex',
    fontSize: 17,
    color: 'black',
    paddingHorizontal: 80,
  },

  top_navbar_title_border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 55,
    display: 'flex',
    fontSize: 17,
    color: 'black',
    paddingHorizontal: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebee',
  },

  border_bottom_topbar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebee',
  },

  modal_bg: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    justifyContent: 'center',
    height: '100%',
  },

  // glory begin-------
  koeyou_img: {
    marginLeft: 13,
    height: 20,
    width: 93,
  },

  top_menu_bar: {
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  top_sub_menu_bar: {
    marginRight: 26,
    alignItems: 'center',
  },
  top_sub_img: {
    height: 17,
    width: 17,
    marginLeft: 10,
  },
  menu_sep: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ebebee',
  },
  sub_menu_bar: {
    overflow: 'scroll',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  sub_menu_link: {
    fontWeight: '500',
    fontSize: 11,
    color: '#3f3f4e',
    borderRadius: 8,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  sub_link_active: {
    color: '#ffffff',
    backgroundColor: '#00d562',
  },
  signup_block: {
    marginHorizontal: 32,
    backgroundColor: '#ebebf3',
    borderRadius: 15,
    height: 55,
    marginTop: 14,
  },
  signup_wrapper: {
    height: '100%',
    alignItems: 'center',
  },
  five_sec: {
    textAlign: 'right',
    width: '60%',
    paddingRight: 10,
  },
  btn_sign: {
    width: '38%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#00d562',
    color: '#ffffff',
    borderRadius: 14,
    textAlign: 'center',
  },
  default_btn: {
    backgroundColor: '#00d562',
    color: '#ffffff',
    fontSize: Dimens.fs_14,
    borderRadius: 5,
    height: 36,
    lineHeight: 36,
    width: '100%',
    textAlign: 'center',
  },
  // glory end------
  dateTouch: {
    width: 142,
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: '#333',
  },
  placeholderText: {
    color: '#c9c9c9',
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077',
  },
  datePickerCon: {
    backgroundColor: '#fff',
    height: 0,
    overflow: 'hidden',
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98',
  },
  btnTextCancel: {
    color: '#666',
  },
  btnCancel: {
    left: 0,
  },
  btnConfirm: {
    right: 0,
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  disabled: {
    backgroundColor: '#eee',
  },

  lblCertTime: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: 7,
    alignSelf: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5,
  },

  lblChTopStartTime: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: 12,
    left: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
});
