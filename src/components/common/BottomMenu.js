import { observer } from 'mobx-react';
import React from 'react';
import { BackHandler, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Langs, Styles } from '../../constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import { CommonUtils } from '../../utils';
import MyInfo from '../../mobx/MyInfo';
import GlobalState from '../../mobx/GlobalState';
import { MAIN_TAB, SCREEN_WIDTH } from '../../constants/Constants';

export default class BottomMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HorizontalLayout style={styles.menu_bar}>
        <Button
          style={styles.menu}
          onPress={() => {
            if (GlobalState.getTabIndex != MAIN_TAB.SETTING) {
              GlobalState.setTabIndex(MAIN_TAB.HOME);
            }
          }}>
          <VerticalLayout style={Styles.center}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.HOME
                  ? require('src/assets/image/ic_setting.png')
                  : require('src/assets/image/ic_setting.png')
              }
              style={{ width: 24, height: 24 }}
            />
          </VerticalLayout>
        </Button>

        <Button
          style={styles.menu}
          onPress={() => {
            if (GlobalState.getTabIndex != MAIN_TAB.CHALLENGE) {
              GlobalState.setTabIndex(MAIN_TAB.CHALLENGE);
            }
          }}>
          <VerticalLayout style={Styles.center}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.CHALLENGE
                  ? require('src/assets/image/ic_bar_chat.png')
                  : require('src/assets/image/ic_bar_chat.png')
              }
              style={{ width: 26, height: 26 }}
            />
          </VerticalLayout>
        </Button>

        <Button
          style={styles.main_menu}
          onPress={() => {
            console.log('sdfsdfsd');
          }}>
          <VerticalLayout style={Styles.center}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.OPEN
                  ? require('src/assets/image/ic_plus_sign.png')
                  : require('src/assets/image/ic_plus_sign.png')
              }
              style={{ width: 45, height: 45 }}
            />
          </VerticalLayout>
        </Button>

        <Button
          style={styles.menu}
          onPress={() => {
            if (GlobalState.getTabIndex != MAIN_TAB.OPEN) {
              GlobalState.setTabIndex(MAIN_TAB.OPEN);
            }
          }}>
          <VerticalLayout style={Styles.center}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.OPEN
                  ? require('src/assets/image/ic_chat.png')
                  : require('src/assets/image/ic_chat.png')
              }
              style={{ width: 27, height: 27 }}
            />
          </VerticalLayout>
        </Button>

        <Button
          style={styles.menu}
          onPress={() => {
            if (GlobalState.getTabIndex != MAIN_TAB.MYPAGE) {
              GlobalState.setTabIndex(MAIN_TAB.MYPAGE);
            }
          }}>
          <VerticalLayout style={Styles.center}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.MYPAGE
                  ? require('src/assets/image/ic_more.png')
                  : require('src/assets/image/ic_more.png')
              }
              style={{ width: 24, height: 24 }}
            />
          </VerticalLayout>
        </Button>
      </HorizontalLayout>
    );
  }
}

const styles = StyleSheet.create({
  menu_bar: {
    height: 61,
    width: SCREEN_WIDTH - 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowColor: '#ccc',
    elevation: 24,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_menu: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#0d65d9',
    bottom: 30,
  },
});
