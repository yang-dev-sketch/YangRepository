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
              GlobalState.setTabIndex(MAIN_TAB.SETTING);
            }
          }}>
          <VerticalLayout style={Styles.center}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.SETTING || GlobalState.getTabIndex == MAIN_TAB.BUSINESS
                  ? require('src/assets/image/ic_bottom_setting_on.png')
                  : require('src/assets/image/ic_bottom_setting_off.png')
              }
              style={[
                GlobalState.getTabIndex == MAIN_TAB.SETTING || GlobalState.getTabIndex == MAIN_TAB.BUSINESS
                  ? { width: 41, height: 41 }
                  : { width: 26, height: 26 },
              ]}
            />
          </VerticalLayout>
        </Button>

        <Button
          style={styles.menu}
          onPress={() => {
            if (GlobalState.getTabIndex != MAIN_TAB.CHART) {
              GlobalState.setTabIndex(MAIN_TAB.CHART);
            }
          }}>
          <VerticalLayout style={Styles.center}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.CHART
                  ? require('src/assets/image/ic_bottom_chart_on.png')
                  : require('src/assets/image/ic_bottom_chart_off.png')
              }
              style={[
                GlobalState.getTabIndex == MAIN_TAB.CHART
                  ? { width: 41, height: 41 }
                  : { width: 26, height: 26 },
              ]}
            />
          </VerticalLayout>
        </Button>

        {((GlobalState.getTabIndex == MAIN_TAB.GYME ||
          GlobalState.getTabIndex == MAIN_TAB.TRAIN ||
          GlobalState.getTabIndex == MAIN_TAB.PROFILE ||
          GlobalState.getTabIndex == MAIN_TAB.SHOP ||
          GlobalState.getTabIndex == MAIN_TAB.PRODUCT ||
          GlobalState.getTabIndex == MAIN_TAB.PAYMENT ||
          GlobalState.getTabIndex == MAIN_TAB.BUSINESS) && (
          <>
            <Button
              style={styles.menu}
              onPress={() => {
                if (GlobalState.getTabIndex != MAIN_TAB.REPORT) {
                  GlobalState.setTabIndex(MAIN_TAB.REPORT);
                }
              }}>
              <VerticalLayout style={Styles.center}>
                <LocalImage
                  source={
                    GlobalState.getTabIndex == MAIN_TAB.REPORT
                      ? require('src/assets/image/ic_bottom_report.png')
                      : require('src/assets/image/ic_bottom_report.png')
                  }
                  style={[
                    GlobalState.getTabIndex == MAIN_TAB.REPORT
                      ? { width: 41, height: 41 }
                      : { width: 26, height: 26 },
                  ]}
                />
              </VerticalLayout>
            </Button>

            <Button
              style={styles.menu}
              onPress={() => {
                if (GlobalState.getTabIndex != MAIN_TAB.TRAIN) {
                  GlobalState.setTabIndex(MAIN_TAB.TRAIN);
                }
              }}>
              <VerticalLayout style={Styles.center}>
                <LocalImage
                  source={
                    GlobalState.getTabIndex == MAIN_TAB.TRAIN
                      ? require('src/assets/image/ic_bottom_train_on.png')
                      : require('src/assets/image/ic_bottom_train_off.png')
                  }
                  style={[
                    GlobalState.getTabIndex == MAIN_TAB.TRAIN
                      ? { width: 41, height: 41 }
                      : { width: 26, height: 26 },
                  ]}
                />
              </VerticalLayout>
            </Button>
          </>
        )) || (
          <Button
            style={styles.home}
            onPress={() => {
              if (GlobalState.getTabIndex != MAIN_TAB.HOME) {
                GlobalState.setTabIndex(MAIN_TAB.HOME);
              }
            }}>
            <VerticalLayout style={Styles.center}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 45, height: 45 }}
              />
            </VerticalLayout>
          </Button>
        )}

        <Button
          style={styles.menu}
          onPress={() => {
            if (GlobalState.getTabIndex != MAIN_TAB.CHAT) {
              GlobalState.setTabIndex(MAIN_TAB.CHAT);
            }
          }}>
          <VerticalLayout style={Styles.center}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.CHAT
                  ? require('src/assets/image/ic_bottom_chat.png')
                  : require('src/assets/image/ic_bottom_chat.png')
              }
              style={[
                GlobalState.getTabIndex == MAIN_TAB.CHAT
                  ? { width: 41, height: 41 }
                  : { width: 26, height: 26 },
              ]}
            />
          </VerticalLayout>
        </Button>

        {(GlobalState.getTabIndex == MAIN_TAB.MORE && (
          <Button
            style={styles.menu}
            onPress={() => {
              if (GlobalState.getTabIndex != MAIN_TAB.MORE) {
                GlobalState.setTabIndex(MAIN_TAB.MORE);
              }
            }}>
            <LocalImage
              source={
                GlobalState.getTabIndex == MAIN_TAB.MORE
                  ? require('src/assets/image/ic_bottom_more_on.png')
                  : require('src/assets/image/ic_bottom_more_off.png')
              }
              style={[
                GlobalState.getTabIndex == MAIN_TAB.MORE
                  ? { width: 41, height: 41 }
                  : { width: 26, height: 26 },
              ]}
            />
          </Button>
        )) ||
          ((GlobalState.getTabIndex == MAIN_TAB.GYME ||
            GlobalState.getTabIndex == MAIN_TAB.TRAIN ||
            GlobalState.getTabIndex == MAIN_TAB.PROFILE ||
            GlobalState.getTabIndex == MAIN_TAB.SHOP ||
            GlobalState.getTabIndex == MAIN_TAB.PRODUCT ||
            GlobalState.getTabIndex == MAIN_TAB.PAYMENT ||
            GlobalState.getTabIndex == MAIN_TAB.BUSINESS) && (
            <Button onPress={() => {}} style={styles.menu}>
              <LocalImage
                source={require('src/assets/image/ic_bottom_gyme_on.png')}
                style={{ width: 41, height: 41 }}
              />
            </Button>
          )) || (
            <Button onPress={() => {}} style={styles.menu}>
              <LocalImage
                source={require('src/assets/image/ic_bottom_gyme_off.png')}
                style={{ width: 26, height: 26 }}
              />
            </Button>
          )}
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
  home: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#0d65d9',
    bottom: 30,
  },
});
