import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { CommonUtils } from '../../utils';
import { Styles } from '../../constants';
import { API, API_RES_CODE, MAIN_TAB } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import {
  AddBranchPopup,
  BranchPopup,
  DatePickerPopup,
  NotiPopup,
  TrainTimePopup,
} from '../../components/popups';
import TimePickerPopup from '../../components/popups/TimePickerPopup';
import { SearchInput } from '../../components/common';

@observer
export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotiPopup: false,
      showTrainTimePopup: false,
      showDatePickerPopup: false,
      showTimePickerPopup: false,
      trainDateTime: new Date(),
      trainId: 0,
      settingList: [
        { id: 1, name: 'עריכת אזור עסקי', image: require('src/assets/image/ic_edit.png') },
        { id: 2, name: 'המנוי שלי', image: require('src/assets/image/ic_subscription.png') },
        { id: 3, name: 'הסניפים שלנו', image: require('src/assets/image/ic_home.png') },
        { id: 4, name: 'מרכז ההודעות', image: require('src/assets/image/ic_message.png') },
        {
          id: 5,
          name: 'הגדרות הודעות פוש',
          image: require('src/assets/image/ic_nofitication.png'),
        },
        { id: 6, name: 'ניהול הרשאות', image: require('src/assets/image/ic_permission.png') },
        { id: 7, name: 'הגדרות אימון', image: require('src/assets/image/ic_setting.png') },
      ],
      showBranchPopup: false,
      showAddBranchPopup: false,
      pushState: true,
      selectedBranchId: 0,
      search_branch: '',
    };
  }

  getInfo = () => {
    this.getBranch();
  };

  componentDidMount() {
    this.getInfo();
  }

  getBranch = () => {
    // requestGet(API.Home.get_branch, {
    //   search: this.state.search_branch,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
    const branchList = [
      { id: 1, name: 'צעדים לונדון' },
      { id: 2, name: 'צעדים פריז' },
      { id: 3, name: 'צעדים קייב' },
      { id: 4, name: 'צעדים קייב' },
    ];
    this.setState({ branchList: branchList });
  };

  deleteBranch = () => {}

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29, paddingBottom: 90 }}>
            <HorizontalLayout
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22.25,
              }}>
              <Button
                onPress={() => {
                  this.setState({ showNotiPopup: true });
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_nofitication.png')}
                  style={{ width: 24, height: 24 }}
                />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  letterSpacing: 1,
                  color: '#000',
                  fontWeight: '700',
                }}>
                הגדרות
              </Text>
              <Button onPress={() => {}}>
                <LocalImage
                  source={require('src/assets/image/ic_bottom_gyme_off.png')}
                  style={{ width: 39, height: 39 }}
                />
              </Button>
            </HorizontalLayout>
            <SearchInput setSearch={(search) => {}} />
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsVerticalScrollIndicator={false}
              style={{ marginVertical: 15 }}
              data={this.state.settingList}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <Button
                    key={index}
                    onPress={() => {
                      item.id == 1 && GlobalState.setTabIndex(MAIN_TAB.BUSINESS);
                      item.id == 2 && GlobalState.setTabIndex(MAIN_TAB.SUBSCRIPTION);
                      item.id == 3 && this.setState({ showBranchPopup: true });
                      item.id == 4 && console.log('no design');
                      item.id == 5 && this.setState({ pushState: !this.state.pushState });
                      item.id == 6 && GlobalState.setTabIndex(MAIN_TAB.PERMISSION);
                      item.id == 7 && console.log('no design');
                    }}
                    style={styles.setting_item}>
                    {(item.id === 5 &&
                      ((this.state.pushState && (
                        <LocalImage
                          source={require('src/assets/image/ic_switch_on.png')}
                          style={{ width: 68, height: 34 }}
                        />
                      )) || (
                        <LocalImage
                          source={require('src/assets/image/ic_switch_off.png')}
                          style={{ width: 68, height: 34 }}
                        />
                      ))) || (
                      <LocalImage
                        source={require('src/assets/image/ic_round_left.png')}
                        style={{ width: 27, height: 27 }}
                      />
                    )}
                    <HorizontalLayout style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, lineHeight: 19, marginRight: 7, color: '#000' }}>
                        {item.name}
                      </Text>
                      {item.id !== 5 && (
                        <LocalImage source={item.image} style={{ width: 24, height: 24 }} />
                      )}
                    </HorizontalLayout>
                  </Button>
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{ width: '100%', height: 0, borderWidth: 1, borderColor: '#F2F2F2' }}
                  />
                );
              }}
            />
          </VerticalLayout>
        </ScrollView>
        <NotiPopup
          visible={this.state.showNotiPopup}
          onCancel={() => {
            this.setState({ showNotiPopup: false });
          }}
          setTrainingTime={(id, date) => {
            this.setState({
              trainId: id,
              showNotiPopup: false,
              trainDateTime: date,
              showTrainTimePopup: true,
            });
          }}
          setSearch={() => {}}
        />
        <TrainTimePopup
          visible={this.state.showTrainTimePopup}
          onCancel={() => {
            this.setState({ showTrainTimePopup: false });
          }}
          onBack={() => {
            this.setState({
              showTrainTimePopup: false,
              showNotiPopup: true,
            });
          }}
          trainDate={CommonUtils.getFormatedDate(this.state.trainDateTime, 'DD/MM/YYYY')}
          trainTime={CommonUtils.getFormatedDate(this.state.trainDateTime, 'HH:mm')}
          onConfirm={() => {
            this.setState({ showTrainTimePopup: false });
            this.changeTrainDateTime();
          }}
          setDatePicker={() => {
            this.setState({ showDatePickerPopup: true });
          }}
          setTimePicker={() => {
            this.setState({ showTimePickerPopup: true });
          }}
        />
        <DatePickerPopup
          visible={this.state.showDatePickerPopup}
          date={new Date(moment(this.state.trainDateTime))}
          setTrainDate={(date) => {
            this.setState({ trainDateTime: date });
          }}
          onCancel={() => {
            this.setState({ showDatePickerPopup: false });
          }}
        />
        <TimePickerPopup
          visible={this.state.showTimePickerPopup}
          time={new Date(moment(this.state.trainDateTime))}
          setTrainTime={(time) => {
            this.setState({ trainDateTime: time });
          }}
          onCancel={() => {
            this.setState({ showTimePickerPopup: false });
          }}
        />
        <BranchPopup
          visible={this.state.showBranchPopup}
          data={this.state.branchList}
          selectable={false}
          selectBranch={(id) => {
            this.setState({ selectedBranchId: id });
          }}
          selectBranchId={this.state.selectedBranchId}
          setSearch={(search) => {
            this.setState({ search_branch: search }, () => {
              this.getBranch();
            });
          }}
          addBranch={() => {
            this.setState({ showBranchPopup: false, showAddBranchPopup: true });
          }}
          deleteBranch={() => {
            this.deleteBranch();
          }}
          onCancel={() => {
            this.setState({ showBranchPopup: false });
          }}
        />
        <AddBranchPopup
          visible={this.state.showAddBranchPopup}
          onBack={() => {
            this.setState({
              showAddBranchPopup: false,
              showBranchPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showAddBranchPopup: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  setting_item: {
    width: '100%',
    paddingVertical: 26,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
