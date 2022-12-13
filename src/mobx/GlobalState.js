import {action, computed, observable} from 'mobx';
import {MAIN_TAB} from '../constants/Constants';

const GlobalState = observable(
  {
    applicationCreated: false,

    isLoading: false,

    setLoading(loading) {
      GlobalState.isLoading = loading;
    },

    langPopup: {
      visible: false,
      langStatus: 'en',
      ok: '',
      cancel: '',
      onOk: null,
      onCancel: null,
      backDrop: true,
    },

    setLangPopup(langInfo) {
      GlobalState.langPopup = langInfo;
    },

    tabIndex: MAIN_TAB.HOME,
    lastTabIndex: MAIN_TAB.HOME,

    imagePopup: {
      visible: false,
      index: 0,
      images: []
    },

    get getTabIndex() {
        return GlobalState.tabIndex
    },

    get getLastTabIndex() {
        return GlobalState.lastTabIndex
    },

    setTabIndex(idx) {
      console.log('sdfsdfds')
        GlobalState.lastTabIndex = GlobalState.tabIndex;
        GlobalState.tabIndex = idx;
    }
  },

  {
    setLoading: action,
    setConfirm: action,
    setLangPopup: action,
    setTabIndex: action,
    getTabIndex: computed,
    getLastTabIndex: computed,
  }
);

export default GlobalState;
