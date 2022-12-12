import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Dimens from './Dimens';
import FontFamily from './FontFamily';

export default StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: Colors.white
    },
    full: {
      width: '100%',
      height: '100%'
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row'
    },
    vertical: {
      flexDirection: 'column'
    },
    h_center: {
      justifyContent: 'center'
    },
    v_center: {
      alignItems: 'center'
    },
    v_align_right: {
      alignItems: 'flex-end'
    },
    v_align_left: {
      alignItems: 'flex-start'
    },
    space_between: {
      justifyContent: 'space-between'
    },
    width_100: {
      width: '100%'
    },
    flex_1: {
      flex: 1
    },
    text_bold: {
      fontWeight: 'bold'
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
      justifyContent: 'center'
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
    popup_title: {color: Colors.text, fontSize: Dimens.fs_16, fontFamily: FontFamily.korean_gd_13_r},
    popup_close_btn: {
      width: 48,
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tab_bar: {height: 52, borderBottomWidth: 0.5, borderBottomColor: '#f6f4f4'},
    tab: {
      flex: 1,
      borderBottomWidth: 2.5,
      borderBottomColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tab_active: {borderBottomColor: Colors.primary},
    tab_text: {color: Colors.black, fontSize: Dimens.fs_14, fontFamily: FontFamily.korean_gd_15_r},
    tab_active_text: {color: Colors.primary},
    filter: {height: 31, alignItems: 'center', marginHorizontal: 18},
    filter_input: {borderWidth: 0.5, borderColor: '#bebdbd', borderRadius: 3, paddingHorizontal: 10, overflow: 'hidden'},
    search_wrapper: {flex: 1, marginLeft: 5, borderTopRightRadius: 0, borderBottomRightRadius: 0},
    search_input: {fontSize: Dimens.fs_12, color: Colors.black, flex: 1, padding: 0},
    select_text: {color: '#7d7d7d', fontSize: Dimens.fs_12},
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
      height: 57,
      backgroundColor: '#cacaca',
      justifyContent: 'center',
      alignItems: 'center',
    },

    bottom_confirm_enable_btn: {
        width: '100%',
        height: 57,
        backgroundColor: '#00d563',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textarea_108: {
      backgroundColor: '#f1f1f4',
      height: 108,
      borderRadius: 10,
      textAlignVertical: 'top',
      marginTop:5,
      flex:1,
      padding:10,
    },
    textarea_40: {
      backgroundColor: '#f1f1f4',
      height: 40,
      borderRadius: 4,
      textAlignVertical: 'top',
      marginTop:5,
      flex:1,
      paddingLeft:10,
    },
    count_times: {
      width: '90%',
      height:41,
      textAlign:'right',
      borderWidth: 1,
      borderColor: '#00d463',
      borderStyle: 'solid',
      borderRadius: 5,
      paddingRight:10,
    },
    price_fee: {
      width: '90%',
      height:41,
      textAlign:'right',
      borderWidth: 1,
      borderColor: '#00d463',
      borderStyle: 'solid',
      borderRadius: 5,
      paddingRight:10,
    },
    min_fee: {
      width:'80%',
      height:41,
      textAlign:'right',
      borderWidth: 1,
      borderColor: '#707070',
      borderStyle: 'solid',
      borderRadius: 5,
      paddingRight:10,
    },
    week: {
      width:'30%',
      height:41,
      textAlign:'right',
      borderWidth: 1,
      borderColor: '#707070',
      borderStyle: 'solid',
      borderRadius: 5,
      paddingRight:10,
    },
    max_fee: {
      width:'80%',
      height:41,
      textAlign:'right',
      borderWidth: 1,
      borderColor: '#707070',
      borderStyle: 'solid',
      borderRadius: 5,
      paddingRight:10,
    },
    usage_disable_btn: {
      width: '100%',
      height: 56,
      backgroundColor: '#f4f4f4',
      alignItems: 'flex-end',
      borderTopWidth: 1,
      borderTopColor: '#e5e5e5'
    },

    bottom_confirm_text: {
      color: 'white',
      fontSize: 18
    },

    check_icon : {

    },
    bottom_confirm_text_disabled: {
      color: 'white',
      fontSize: 18,
      opacity: 0.4
    },

    usage_skip_text: {
      color: '#aeaeae',
      fontSize: 16
    },

    top_navbar: {
      width: '100%',
      height: 55,
      backgroundColor: 'white',
    },

    btn_back_topbar: {
      width: 22,
      height: 22,
      marginLeft: 15,
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
      lineHeight: 80,
      display: 'flex',
      fontSize: 17,
      color: 'black',
      paddingHorizontal: 40,
      overflow: 'hidden',
      borderBottomWidth: 2,
      borderBottomColor: '#ebebee',
    },

    modal_bg: {
      backgroundColor: "rgba(0,0,0,0.6)",
      width: "100%",
      justifyContent: "center",
      height: "100%",
    },
  });

