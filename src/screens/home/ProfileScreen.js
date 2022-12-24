import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Styles } from '../../constants';
import { API, API_RES_CODE, IMAGE_FOO_URL, MAIN_TAB } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import { ActiveButton, CommonInput, DisactiveButton } from '../../components/common';
import TaskPopup from '../../components/popups/TaskPopup';
import { LeadPopup } from '../../components/popups';
import AssignRolePopup from '../../components/popups/AssignRolePopup';
import FutureTrainPopup from '../../components/popups/FutureTrainPopup';
import TrackTypePopup from '../../components/popups/TrackTypePopup';
import SelectMembershipPopup from '../../components/popups/SelectMembershipPopup';
import SubscriptionPopup from '../../components/popups/SubscriptionPopup';
import DisplayPurchasePopup from '../../components/popups/DisplayPurchasePopup';
import SelectTrainPopup from '../../components/popups/SelectTrainPopup';
import AdvancedSettingPopup from '../../components/popups/AdvancedSettingPopup';
import AvailableStorePopup from '../../components/popups/AvailableStorePopup';
import RecurringStorePopup from '../../components/popups/RecurringstandingPopup';
import LimitTrainingTypePopup from '../../components/popups/LimitTrainingTypePopup';
import AllowTrainPopup from '../../components/popups/AllowTrainPopup';
import AllowBookingPopup from '../../components/popups/AllowBookingPopup';
import HoursLimitPopup from '../../components/popups/HoursLimitPopup';
import ReservationAvailabilityPopup from '../../components/popups/ReservationAvailabilityPopup';
import AllowPenaltyPopup from '../../components/popups/AllowPenaltyPopup';
import AdditionalSettingPopup from '../../components/popups/AdditionalSettingPopup';

@observer
export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      showTaskPopup: false,
      taskList: [],
      showAssignRolePopup: false,
      roleList: [
        { id: 1, name: 'מנהל מערכת' },
        { id: 2, name: 'להפוך משתמש' },
        { id: 3, name: 'להפוך משתמש' },
        { id: 4, name: 'להפוך משתמש' },
      ],
      sex: 1,
      search_task: '',
      search_future: '',
      showFutureTrainPopup: false,
      showTrackTypePopup: false,
      trackList: [
        { id: 1, description: 'כרטיס ניקוב 10 מתוך 12, המנוי  מתחדש בעוד Y פעמים' },
        { id: 2, description: 'כרטיס ניקוב 10 מתוך 12, המנוי  מתחדש בעוד Y פעמים' },
        { id: 3, description: 'כרטיס ניקוב 10 מתוך 12, המנוי  מתחדש בעוד Y פעמים' },
        { id: 4, description: 'כרטיס ניקוב 10 מתוך 12, המנוי  מתחדש בעוד Y פעמים' },
      ],
      selectedTrackId: 0,
      trackSearch: '',
      showSelectMembershipPopup: false,
      membershipList: [
        { id: 1, name: 'מִנוּי' },
        { id: 2, name: 'כרטיסי ניקוב' },
      ],
      selectedMembershipId: 1,
      showSubscriptionPopup: false,
      showDisplayPurchasePopup: false,
      showSelectTrainPopup: false,
      selectedTrainId: 0,
      searchTrain: '',
      showAdvancedSettingPopup: false,
      showAvailableStorePopup: false,
      showRecurringStorePopup: false,
      showLimitTrainingTypePopup: false,
      trainType: [],
      selectedLimitTrainId: 0,
      showAllowTrainPopup: false,
      showAllowBookingPopup: false,
      showHoursLimitPopup: false,
      showReservationAvailabilityPopup: false,
      showAllowPenaltyPopup: false,
      showAdditionalSettingPopup: false,
    };
  }

  getTrackList = () => {
    const trackList = [
      { id: 1, description: 'כרטיס ניקוב 10 מתוך 12, המנוי  מתחדש בעוד Y פעמים' },
      { id: 2, description: 'כרטיס ניקוב 10 מתוך 12, המנוי  מתחדש בעוד Y פעמים' },
      { id: 3, description: 'כרטיס ניקוב 10 מתוך 12, המנוי  מתחדש בעוד Y פעמים' },
      { id: 4, description: 'כרטיס ניקוב 10 מתוך 12, המנוי  מתחדש בעוד Y פעמים' },
    ];
    // requestPost(API.Home.get_track, {
    //   search: this.state.trackSearch,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({ trackList: trackList });
    //   } else {
    //   }
    // });
  };

  getTaskList = () => {
    const taskList = [
      {
        id: 1,
        name: 'שם המשימה',
        date: '20222-10-06 22:45:00',
        content: 'זוהי עובדה מבוססת שדעתו של',
        time: '08:00',
        avatar: '',
      },
      {
        id: 2,
        name: 'שם המשימה',
        date: '20222-10-06 22:45:00',
        content: 'זוהי עובדה מבוססת שדעתו של',
        time: '09:00',
        avatar: '',
      },
      {
        id: 3,
        name: 'שם המשימה',
        date: '20222-10-06 22:45:00',
        content: 'זוהי עובדה מבוססת שדעתו של',
        time: '10:00',
        avatar: '',
      },
      {
        id: 4,
        name: 'שם המשימה',
        date: '20222-10-06 22:45:00',
        content: 'זוהי עובדה מבוססת שדעתו של',
        time: '11:00',
        avatar: '',
      },
    ];
    // requestGet(API.Home.get_task, {
    //   search: this.state.search_task,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({
      taskList: taskList,
    });
    //   } else {
    //   }
    // });
  };

  getInfo = () => {
    this.getTaskList();
    this.getTrackList();
    this.getTrain();
  };

  componentDidMount() {
    this.getInfo();
  }

  selectTask = (data) => {
    const taskList = this.state.taskList;
    taskList.map((item, index) => {
      if (data.id == item.id) item.checked = !item.checked;
    });
    this.setState({ taskList: taskList });
  };

  getRole = () => {
    const roleList = [
      { id: 1, name: 'מנהל מערכת' },
      { id: 2, name: 'להפוך משתמש' },
      { id: 3, name: 'להפוך משתמש' },
      { id: 4, name: 'להפוך משתמש' },
    ];
    // requestGet(API.Home.get_role, {
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState(
      {
        roleList: roleList,
      },
      () => {
        this.setState({ showAssignRolePopup: true });
      },
    );
    //   } else {
    //   }
    // });
  };

  setRole = () => {
    // requesPost(API.Home.set_role, {
    //   data: this.state.roleList,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({ showAssignRolePopup: false });
    //   } else {
    //   }
    // });
  };

  getFutureTrain = () => {
    const futureList = [
      {
        id: 1,
        name: 'הכל',
        image: require('src/assets/image/ic_train_round_on.png'),
        startDate: '2022-10-06 09:00:00',
        endDate: '2022-10-07 10:00:00',
      },
      {
        id: 2,
        name: 'אימון קבוצתי',
        image: require('src/assets/image/ic_man_round_off.png'),
        startDate: '2022-10-06 09:00:00',
        endDate: '2022-10-06 10:00:00',
      },
      {
        id: 3,
        name: 'איגרוף',
        image: require('src/assets/image/ic_boxing_round_off.png'),
        startDate: '2022-10-06 09:00:00',
      },
      {
        id: 4,
        name: 'איגרוף',
        image: require('src/assets/image/ic_boxing_round_off.png'),
        startDate: '2022-10-06 09:00:00',
        endDate: '2022-10-06 10:00:00',
      },
    ];
    // requestGet(API.Home.get_future_train, {
    //   search: this.state.search_future,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState(
      {
        futureList: futureList,
      },
      () => {
        this.setState({ showFutureTrainPopup: true });
      },
    );
    //   } else {
    //   }
    // });
  };

  getTrain = (search) => {
    // requestGet(API.Home.get_train, {
    //   search: this.state.branchSearch,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    const trainType = [
      { id: 1, name: 'שם הסוג', image: require('src/assets/image/ic_boxing_round_fill.png') },
      { id: 2, name: 'שם הסוג', image: require('src/assets/image/ic_boxing_round_fill.png') },
      { id: 3, name: 'שם מוצר', image: require('src/assets/image/ic_bottom_gyme_on.png') },
      { id: 4, name: 'שם הסוג', image: require('src/assets/image/ic_bottom_gyme_on.png') },
    ];
    this.setState({ trainType: trainType });
    //   } else {
    //   }
    // });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29, paddingBottom: 90 }}>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <Button
                onPress={() => {
                  GlobalState.setTabIndex(MAIN_TAB.HOME);
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 17.5, height: 17.5 }}
                />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  letterSpacing: 1,
                  color: '#000',
                }}>
                הפרופיל של X
              </Text>
            </HorizontalLayout>
            <HorizontalLayout
              style={{
                width: '100%',
                padding: 15,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 11,
                backgroundColor: 'white',
                marginBottom: 10,
              }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <LocalImage
                  source={
                    this.state.sex === 1
                      ? require('src/assets/image/ic_male.png')
                      : require('src/assets/image/ic_female.png')
                  }
                  style={{ width: 46, height: 46, marginRight: 15 }}
                />
                <View
                  style={{
                    width: 46,
                    height: 46,
                    borderWidth: 1,
                    borderColor: '#D8D8D8',
                    borderRadius: 23,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={{ width: 46, height: 30, overflow: 'hidden' }}>
                    <FastImage
                      source={{ uri: this.state.avatar ? this.state.avatar : IMAGE_FOO_URL }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{ width: 46, height: 46, marginTop: -8 }}
                    />
                  </View>
                </View>
              </HorizontalLayout>
              <VerticalLayout>
                <Text style={{ fontSize: 14, lineHeight: 17, marginBottom: 5 }}>
                  052 - 000000000
                </Text>
                <Text style={{ fontSize: 14, lineHeight: 17, marginBottom: 10 }}>
                  nastya1106@gmail.com
                </Text>
                <HorizontalLayout>
                  <Text>11.06.1998 ,24 שנים</Text>
                  <LocalImage
                    source={require('src/assets/image/ic_birthday.png')}
                    style={{ width: 16, height: 16, marginLeft: 5 }}
                  />
                </HorizontalLayout>
              </VerticalLayout>
            </HorizontalLayout>
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 10 }}>
              <ProfileInfoItem
                elevation={true}
                firstLineText="שולם"
                secondLineText="549.9"
                secondLineTextStyle={{ fontSize: 20, lineHeight: 24, color: '#0D65D9' }}
                secondLineImage={require('src/assets/image/ic_income_blue.png')}
                complex={true}
                height={66}
                rightContent={
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      borderWidth: 1,
                      borderColor: '#D8D8D8',
                      borderRadius: 22.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <LocalImage
                      source={require('src/assets/image/ic_money.png')}
                      style={{ width: 22, height: 22 }}
                    />
                  </View>
                }
              />
              <ProfileInfoItem
                elevation={true}
                firstLineText="פעיל מאז"
                secondLineText="21.09.2021"
                complex={true}
                height={66}
                secondLineTextStyle={{ fontSize: 16, lineHeight: 19, color: '#000' }}
                rightContent={
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      backgroundColor: '#white',
                      borderWidth: 1,
                      borderColor: '#D8D8D8',
                      borderRadius: 22.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <LocalImage
                      source={require('src/assets/image/ic_active_calendar.png')}
                      style={{ width: 21.91, height: 18.07 }}
                    />
                  </View>
                }
              />
            </HorizontalLayout>
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 10 }}>
              <ProfileInfoItem
                border={true}
                leftIcon={require('src/assets/image/ic_round_left.png')}
                leftIconStyle={{ width: 27, height: 27 }}
                text="אימונים קודמים"
                numberOfLines={2}
                height={58}
                rightContent={
                  <View
                    style={{
                      width: 33,
                      height: 33,
                      backgroundColor: '#4399FF',
                      borderWidth: 1,
                      borderColor: '#D8D8D8',
                      borderRadius: 16.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>21</Text>
                  </View>
                }
              />
              <ProfileInfoItem
                border={true}
                leftIcon={require('src/assets/image/ic_round_left.png')}
                leftIconStyle={{ width: 27, height: 27 }}
                text="אימונים עתידיים"
                numberOfLines={2}
                height={58}
                rightContent={
                  <View
                    style={{
                      width: 33,
                      height: 33,
                      backgroundColor: '#0D65D9',
                      borderWidth: 1,
                      borderColor: '#D8D8D8',
                      borderRadius: 16.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>21</Text>
                  </View>
                }
                action={() => {
                  this.getFutureTrain();
                }}
              />
            </HorizontalLayout>
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 10 }}>
              <ProfileInfoItem
                elevation={true}
                leftIcon={require('src/assets/image/ic_check_green.png')}
                leftIconStyle={{ width: 22, height: 22 }}
                text="הצהרת בריאות"
                height={58}
                numberOfLines={2}
              />
              <ProfileInfoItem
                elevation={true}
                leftIcon={require('src/assets/image/ic_bottom_setting_on.png')}
                leftIconStyle={{ width: 35, height: 35 }}
                text="תפקיד: לא נבחר"
                height={58}
                numberOfLines={2}
                action={() => {
                  this.setState({ showAssignRolePopup: true });
                }}
              />
            </HorizontalLayout>
            <VerticalLayout
              style={{
                width: '100%',
                padding: 15,
                backgroundColor: 'white',
                borderRadius: 11,
                marginBottom: 10,
              }}>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15 }}
                data={this.state.trackList}
                numColumns={1}
                renderItem={({ item, index }) => {
                  return (
                    <HorizontalLayout
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      {(index === 0 && (
                        <Button
                          onPress={() => {
                            this.setState({ showTrackTypePopup: true });
                          }}>
                          <LocalImage
                            source={require('src/assets/image/ic_track.png')}
                            style={{ width: 46, height: 46, marginRight: 15 }}
                          />
                        </Button>
                      )) || <View></View>}
                      <VerticalLayout style={{ width: '70%' }}>
                        <Text>סוג מסלול:</Text>
                        <Text numberOfLines={2}>
                          כרטיס ניקוב 10 מתוך 12, המנוי מופעל ב-X, מתחדש בעוד Y פעמים
                        </Text>
                      </VerticalLayout>
                    </HorizontalLayout>
                  );
                }}
                keyExtractor={(item, idx) => idx.toString()}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        width: '100%',
                        height: 0,
                        borderWidth: 1,
                        borderColor: '#F3F3F3',
                        marginVertical: 15,
                      }}
                    />
                  );
                }}
              />
            </VerticalLayout>
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 10 }}>
              <ProfileInfoItem
                border={true}
                leftIcon={require('src/assets/image/ic_round_left.png')}
                rightIcon={require('src/assets/image/ic_alarm.png')}
                rightIconStyle={{ width: 16, height: 16 }}
                text="משימות(34)"
                height={47}
                numberOfLines={1}
                action={() => {
                  this.setState({ showTaskPopup: true });
                }}
              />
              <ProfileInfoItem
                border={true}
                leftIcon={require('src/assets/image/ic_round_left.png')}
                rightIcon={require('src/assets/image/ic_alarm.png')}
                rightIconStyle={{ width: 16, height: 16 }}
                text="יומן פעילות"
                height={47}
                numberOfLines={1}
              />
            </HorizontalLayout>
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 45 }}>
              <ProfileInfoItem
                border={true}
                leftIcon={require('src/assets/image/ic_chat.png')}
                text="שלח הודעה"
                height={57}
                numberOfLines={1}
              />
              <ProfileInfoItem
                border={true}
                leftIcon={require('src/assets/image/ic_payment.png')}
                text="היסטוריית תשלומים"
                height={57}
                numberOfLines={2}
                action={() => {
                  GlobalState.setTabIndex(MAIN_TAB.PAYMENT);
                }}
              />
            </HorizontalLayout>
            <DisactiveButton
              text="מחק משתמש"
              style={{ marginBottom: 15 }}
              action={() => {
                this.addProduct();
              }}
            />
            <ActiveButton
              text="ערוך משתמש"
              style={{ marginBottom: 15 }}
              action={() => {
                this.addProduct();
              }}
            />
          </VerticalLayout>
        </ScrollView>
        <TaskPopup
          data={this.state.taskList}
          visible={this.state.showTaskPopup}
          onSelect={(data) => {
            this.selectTask(data);
          }}
          setSearch={() => {
            this.getLead();
          }}
          onCancel={() => {
            this.setState({ showTaskPopup: false });
          }}
        />
        <AssignRolePopup
          data={this.state.roleList}
          visible={this.state.showAssignRolePopup}
          onSelect={(data) => {
            this.setRole(data);
          }}
          onCancel={() => {
            this.setState({ showAssignRolePopup: false });
          }}
        />
        <FutureTrainPopup
          data={this.state.futureList}
          visible={this.state.showFutureTrainPopup}
          onCancel={() => {
            this.setState({ showFutureTrainPopup: false });
          }}
        />
        <TrackTypePopup
          visible={this.state.showTrackTypePopup}
          data={this.state.trackList}
          onCancel={() => {
            this.setState({ showTrackTypePopup: false });
          }}
          selectTrack={(id) => {
            this.setState({ selectedTrackId: id });
          }}
          selectedTrackId={this.state.selectedTrackId}
          deleteTrack={() => {
            this.setState({
              trackList: this.state.trackList.filter((item) => {
                return item.id != this.state.selectedTrackId;
              }),
            });
          }}
          searchTrack={(search) => {
            this.setState({ trackSearch: search }, () => {
              this.getTrackList();
            });
          }}
          addTrack={() => {
            this.setState({ showTrackTypePopup: false, showSelectMembershipPopup: true });
          }}
        />
        <SelectMembershipPopup
          visible={this.state.showSelectMembershipPopup}
          data={this.state.membershipList}
          onBack={() => {
            this.setState({ showTrackTypePopup: true, showSelectMembershipPopup: false });
          }}
          onCancel={() => {
            this.setState({ showSelectMembershipPopup: false });
          }}
          selectedMembershipId={this.state.selectedMembershipId}
          selectMembership={(id) => {
            this.setState({ selectedMembershipId: id });
          }}
          onNext={() => {
            this.setState({ showSubscriptionPopup: true, showSelectMembershipPopup: false });
          }}
        />
        <SubscriptionPopup
          visible={this.state.showSubscriptionPopup}
          selectedMembershipId={this.state.selectedMembershipId}
          onBack={() => {
            this.setState({
              showSubscriptionPopup: false,
              showSelectMembershipPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showSubscriptionPopup: false });
          }}
          displayInPurchase={() => {
            this.setState({ showSubscriptionPopup: false, showDisplayPurchasePopup: true });
          }}
          setTrain={() => {
            this.setState({ showSubscriptionPopup: false, showSelectTrainPopup: true });
          }}
          setSetting={() => {
            this.setState({ showSubscriptionPopup: false, showAdvancedSettingPopup: true });
          }}
        />
        <DisplayPurchasePopup
          visible={this.state.showDisplayPurchasePopup}
          onBack={() => {
            this.setState({
              showDisplayPurchasePopup: false,
              showSubscriptionPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showDisplayPurchasePopup: false });
          }}
        />
        <SelectTrainPopup
          visible={this.state.showSelectTrainPopup}
          onBack={() => {
            this.setState({
              showSelectTrainPopup: false,
              showSubscriptionPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showSelectTrainPopup: false });
          }}
          setSearch={(search) => {
            this.setState({ searchTrain: search });
          }}
          selectTrain={(id) => {
            this.setState({ selectedTrainId: id });
          }}
          selectedTrainId={this.state.selectedTrainId}
        />
        <AdvancedSettingPopup
          visible={this.state.showAdvancedSettingPopup}
          onBack={() => {
            this.setState({
              showAdvancedSettingPopup: false,
              showSubscriptionPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showAdvancedSettingPopup: false });
          }}
          setAvailableStore={() => {
            this.setState({ showAvailableStorePopup: true, showAdvancedSettingPopup: false });
          }}
          setRecurringStore={() => {
            this.setState({ showRecurringStorePopup: true, showAdvancedSettingPopup: false });
          }}
          setLimitTrainingType={() => {
            this.setState({ showLimitTrainingTypePopup: true, showAdvancedSettingPopup: false });
          }}
          setAllowTrain={() => {
            this.setState({ showAllowTrainPopup: true, showAdvancedSettingPopup: false });
          }}
          setAllowBooking={() => {
            this.setState({ showAllowBookingPopup: true, showAdvancedSettingPopup: false });
          }}
          setHourLimit={() => {
            this.setState({ showHoursLimitPopup: true, showAdvancedSettingPopup: false });
          }}
          setReservationAvailability={() => {
            this.setState({
              showReservationAvailabilityPopup: true,
              showAdvancedSettingPopup: false,
            });
          }}
          setAllowPenalty={() => {
            this.setState({ showAllowPenaltyPopup: true, showAdvancedSettingPopup: false });
          }}
          setAdditionalSetting={() => {
            this.setState({ showAdditionalSettingPopup: true, showAdvancedSettingPopup: false });
          }}
        />
        <AvailableStorePopup
          visible={this.state.showAvailableStorePopup}
          onBack={() => {
            this.setState({
              showAvailableStorePopup: false,
              showAdvancedSettingPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showAvailableStorePopup: false });
          }}
          onNext={() => {
            this.setState({ showAvailableStorePopup: false, showRecurringStorePopup: true });
          }}
        />
        <RecurringStorePopup
          visible={this.state.showRecurringStorePopup}
          onBack={() => {
            this.setState({
              showRecurringStorePopup: false,
              showAvailableStorePopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showRecurringStorePopup: false });
          }}
          onNext={() => {
            this.setState({ showRecurringStorePopup: false, showLimitTrainingTypePopup: true });
          }}
        />
        <LimitTrainingTypePopup
          visible={this.state.showLimitTrainingTypePopup}
          data={this.state.trainType}
          onBack={() => {
            this.setState({
              showLimitTrainingTypePopup: false,
              showRecurringStorePopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showLimitTrainingTypePopup: false });
          }}
          onNext={() => {
            this.setState({ showLimitTrainingTypePopup: false, showAllowTrainPopup: true });
          }}
          setSearch={(search) => {
            this.getTrain(search);
          }}
          selectedLimitTrainId={this.state.selectedLimitTrainId}
          selectTrain={(id) => {
            this.setState({ selectedLimitTrainId: id });
          }}
        />
        <AllowTrainPopup
          visible={this.state.showAllowTrainPopup}
          onBack={() => {
            this.setState({
              showAllowTrainPopup: false,
              showLimitTrainingTypePopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showAllowTrainPopup: false });
          }}
          onNext={() => {
            this.setState({ showAllowTrainPopup: false, showAllowBookingPopup: true });
          }}
        />
        <AllowBookingPopup
          visible={this.state.showAllowBookingPopup}
          onBack={() => {
            this.setState({
              showAllowBookingPopup: false,
              showAllowTrainPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showAllowBookingPopup: false });
          }}
          onNext={() => {
            this.setState({ showAllowBookingPopup: false, showHoursLimitPopup: true });
          }}
        />
        <HoursLimitPopup
          visible={this.state.showHoursLimitPopup}
          onBack={() => {
            this.setState({
              showHoursLimitPopup: false,
              showAllowBookingPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showHoursLimitPopup: false });
          }}
          onNext={() => {
            this.setState({ showHoursLimitPopup: false, showReservationAvailabilityPopup: true });
          }}
        />
        <ReservationAvailabilityPopup
          visible={this.state.showReservationAvailabilityPopup}
          onBack={() => {
            this.setState({
              showReservationAvailabilityPopup: false,
              showHoursLimitPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showReservationAvailabilityPopup: false });
          }}
          onNext={() => {
            this.setState({ showReservationAvailabilityPopup: false, showAllowPenaltyPopup: true });
          }}
        />
        <AllowPenaltyPopup
          visible={this.state.showAllowPenaltyPopup}
          onBack={() => {
            this.setState({
              showAllowPenaltyPopup: false,
              showReservationAvailabilityPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showAllowPenaltyPopup: false });
          }}
          onNext={() => {
            this.setState({ showAllowPenaltyPopup: false, showAdditionalSettingPopup: true });
          }}
        />
        <AdditionalSettingPopup
          visible={this.state.showAdditionalSettingPopup}
          onBack={() => {
            this.setState({
              showAdditionalSettingPopup: false,
              showAllowPenaltyPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showAdditionalSettingPopup: false });
          }}
          onNext={() => {
            this.setState({ showAdditionalSettingPopup: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
