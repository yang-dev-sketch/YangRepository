import React from 'react';
import { observer } from 'mobx-react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Styles } from '../../constants';
import { API, API_RES_CODE, MAIN_TAB, SCREEN_WIDTH } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';
import CheckBox from './../../components/controls/CheckBox';
import DropDownPicker from '../../components/controls/DropDownPicker';
import DateDropDown from '../../components/controls/DateDropDown';
import TimePicker from '../../components/controls/TimePicker';
import GlobalState from '../../mobx/GlobalState';
import EditCoachPopup from '../../components/popups/EditCoachPopup';
import SelectCoachPopup from '../../components/popups/SelectCoachPopup';
import CreateSameWorkoutpopup from '../../components/popups/CreateSameWorkoutPopup';
import Toast from 'react-native-root-toast';
import ToastContainer from '../../components/controls/ToastContainer';
import EditParticipantPopup from '../../components/popups/EditParticipantPopup';
import SelectTraineePopup from '../../components/popups/SelectTraineePopup';

@observer
export default class ConductTrain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainInfo: {},
      participant: 12,
      trainType: [],
      trainingTime: 3,
      participantList: [],
      coachList: [],
      trainDate: null,
      createSameWorkout: false,
      addSaved: false,
      transparent: false,
      selectedDropdownTrain: null,
      selectedCoachName: null,
      participantList: [],
      participant_num: 0,
      participant: 0,
      showEditCoachPopup: false,
      showSelectCoachPopup: false,
      coachAvatar: '',
      selectedCoachId: 0,
      showCreateSameWorkoutPopup: false,
      showEditParticipantPopup: false,
      userList: [],
      showSelectTraineePopup: false,
    };
  }

  getInfo = () => {
    const trainId = this.props.navigation.getParam('id');
    this.getTrainInfo(trainId);
    this.getTrainType();
    this.getParticipant();
    this.getCoach();
    this.getUser();
  };

  getTrainInfo = (id) => {
    // requestGet(API.Train.get_train, {
    //   id: id,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    const trainInfo = {
      id: 1,
      name: 'אימון אישי',
      date: '2022-10-06',
      start_time: 8,
      participant_num: 12,
      participant: 12,
      create_same: 0,
      addSaved: 0,
      transparent: 0,
      coach_id: 1,
      coach_name: 'שם המאמן',
      coach_avatar: '',
    };
    this.setState({
      trainInfo: trainInfo,
      selectedDropdownTrain: trainInfo.name,
      trainingTime: trainInfo.start_time,
      createSameWorkout: trainInfo.create_same === 1 ? true : false,
      addSaved: trainInfo.addSaved === 1 ? true : false,
      transparent: trainInfo.transparent === 1 ? true : false,
      selectedCoachId: trainInfo.coach_id,
      selectedCoachName: trainInfo.coach_name,
      trainDate: trainInfo.date,
      participant_num: trainInfo.participant_num,
      participant: trainInfo.participant,
      coachAvatar: trainInfo.coach_avatar,
    });
    //   } else {
    //   }
    // });
  };

  getTrainType = () => {
    const trainType = [
      { id: 1, name: 'הכל' },
      { id: 2, name: 'אימון קבוצתי' },
      { id: 3, name: 'איגרוף' },
      { id: 4, name: 'זומבה' },
      { id: 5, name: 'יוגה' },
      { id: 6, name: 'פונקציונאלי' },
    ];
    this.setState({ trainType: trainType });
    // requestGet(API.Home.get_product, {
    //   search: this.state.search,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    // this.setState({
    //   productList: result.data
    // });
    //   } else {
    //   }
    // });
  };
  getParticipant = () => {
    // requestGet(API.Home.get_participant, {
    //   id: this.props.navigation.getParam('id'),
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
    const participantList = [
      { id: 1, name: 'שם המתאמן.ת', avatar: '' },
      { id: 2, name: 'שם המתאמן.ת', avatar: '' },
      { id: 3, name: 'שם המתאמן.ת', avatar: '' },
      { id: 4, name: 'שם המתאמן.ת', avatar: '' },
      { id: 5, name: 'שם המתאמן.ת', avatar: '' },
      { id: 6, name: 'שם המתאמן.ת', avatar: '' },
    ];
    this.setState({ participantList: participantList });
  };

  getCoach = () => {
    const coachList = [
      { id: 1, name: 'שם המאמן', avatar: '' },
      { id: 2, name: 'שם המאמן', avatar: '' },
      { id: 3, name: 'שם המאמן', avatar: '' },
    ];
    this.setState({ coachList: coachList });
  };

  componentDidMount() {
    this.getInfo();
  }

  delete = () => {
    // requestPost(API.Home.delete_train, {
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
  };

  save = () => {
    // requestPost(API.Home.add_workout, {
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    Toast.show(<ToastContainer title={'אימון עודכן בהצלחה'} />, {
      duration: 3000,
      position: 20,
      opacity: 1,
      containerStyle: { backgroundColor: 'transparent' },
    });
    GlobalState.setTabIndex(MAIN_TAB.TRAIN);
    this.props.navigation.navigate({
      routeName: 'TrainScreen',
      params: {
        create: true,
      },
      key: 'TrainScreen',
    });
    //   } else {
    //   }
    // });
  };

  createSame = (trainingTime, selectedDate) => {
    // requestPost(API.Home.create_train, {
    //   date: selectedDate,
    //   time: trainingTime,
    //   type: this.state.selectedDropdownTrain,
    //   coach: this.state.selectedCoachId,
    //   participant_num: this.state.participant_num,
    //   participant: this.state.participant,
    //   addSaved: this.state.addSaved,
    //   transparent: this.state.transparent,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({ showCreateSameWorkoutPopup: false });
    Toast.show(<ToastContainer title="האימון שוכפל בהצלחה!" />, {
      duration: 3000,
      position: 20,
      opacity: 1,
      containerStyle: { backgroundColor: 'transparent' },
    });
    //   } else {
    //   }
    // });
  };

  selectParticipant = (id) => {
    const participantList = this.state.participantList;
    participantList.map((item, index) => {
      if (item.id === id) item.checked = !item.checked;
    });
    this.setState({ participantList: participantList });
  };

  getUser = (search) => {
    // requestPost(API.Train.get_user, {
    //   search: search,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    const userList = [
      { id: 1, name: 'שם המתאמן.ת', avatar: '' },
      { id: 2, name: 'שם המתאמן.ת', avatar: '' },
      { id: 3, name: 'שם המתאמן.ת', avatar: '' },
      { id: 4, name: 'שם המתאמן.ת', avatar: '' },
    ];
    this.setState({ userList: userList });
    //   } else {
    //   }
    // });
  };

  selectUser = (id) => {
    const userList = this.state.userList;
    userList.map((item, index) => {
      if (item.id === id) item.checked = !item.checked;
    });
    this.setState({ userList: userList });
  };

  addParticipant = () => {
    const participantList = this.state.participantList;
    this.state.userList.map((item, index) => {
      if (item.checked) participantList.push(item);
    });
    this.setState({ participantList: participantList });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={[Styles.wrapper, { backgroundColor: 'white' }]}>
          <VerticalLayout style={{ paddingVertical: 29 }}>
            <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('Main');
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_close.png')}
                    style={{ width: 17.5, height: 17.5, marginRight: 16.25 }}
                  />
                </Button>
              </HorizontalLayout>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  color: '#000',
                  fontWeight: '600',
                  fontFamily: 'Danidin',
                }}>
                עריכת אימון
              </Text>
            </HorizontalLayout>
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginTop: 20, marginBottom: 10, backgroundColor: '#F5F5F5' },
              ]}
              title="סוג האימון"
              image={require('src/assets/image/ic_train.png')}
              inputNode={
                <DropDownPicker
                  data={this.state.trainType}
                  selectedValue={this.state.selectedDropdownTrain}
                  onSelect={(value) => {
                    this.setState({ selectedDropdownTrain: value.name });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginTop: 20, marginBottom: 10, backgroundColor: '#F5F5F5' },
              ]}
              title="תאריך האימון"
              image={require('src/assets/image/ic_calendar.png')}
              inputNode={
                <DateDropDown
                  date={new Date(this.state.trainDate)}
                  changeDate={(date) => {
                    this.setState({ trainDate: date });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginTop: 20, marginBottom: 22, backgroundColor: '#F5F5F5' },
              ]}
              title="שעת האימון"
              image={require('src/assets/image/ic_clock.png')}
              inputNode={
                <TimePicker
                  selectedValue={this.state.trainingTime}
                  onValueChange={(value) => {
                    this.setState({ trainingTime: value });
                  }}
                />
              }
            />
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Text
                style={{ fontSize: 16, lineHeight: 19, color: '#6F6F6F', fontFamily: 'Danidin' }}>
                {this.state.selectedCoachName}
              </Text>
              <LocalImage
                source={require('src/assets/image/ic_coach_on.png')}
                style={[{ width: 16, height: 17, marginLeft: 2.5 }]}
              />
            </HorizontalLayout>
            <Button
              onPress={() => {
                this.setState({ showEditCoachPopup: true });
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
                flexDirection: 'row',
              }}>
              <LocalImage
                source={require('src/assets/image/ic_edit_black.png')}
                style={[{ width: 15.93, height: 15.93, marginLeft: 2.5 }]}
              />
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                עריכת המאמנים
              </Text>
            </Button>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 13, backgroundColor: '#F5F5F5' }]}
              title="כמות משתתפים"
              image={require('src/assets/image/ic_man_on.png')}
              inputNode={
                <HorizontalLayout style={{ justifyContent: 'space-between' }}>
                  <CommonInput
                    style={{ width: (SCREEN_WIDTH - 67) / 2 }}
                    numberOfLines={1}
                    textAlign="center"
                    backgroundColor="white"
                    keyboardType="numeric"
                    value={this.state.participant_num}
                    onChangeText={(text) => {
                      this.setState({ participant_num: text });
                    }}
                  />
                  <CommonInput
                    style={{ width: (SCREEN_WIDTH - 67) / 2 }}
                    numberOfLines={1}
                    textAlign="center"
                    backgroundColor="white"
                    keyboardType="numeric"
                    value={this.state.participant}
                    onChangeText={(text) => {
                      this.setState({ participant: text });
                    }}
                  />
                </HorizontalLayout>
              }
            />
            <Button
              onPress={() => {
                this.setState({ showEditParticipantPopup: true });
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
                flexDirection: 'row',
              }}>
              <LocalImage
                source={require('src/assets/image/ic_edit.png')}
                style={[{ width: 15.93, height: 15.93, marginLeft: 2.5 }]}
              />
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                עריכת המשתתפים
              </Text>
            </Button>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Text
                style={[
                  (this.state.createSameWorkout && { color: '#0D65D9' }) || { color: '#000' },
                  { fontSize: 16, lineHeight: 19, fontFamily: 'Danidin' },
                ]}>
                יצירת אותו אימון
              </Text>
              <CheckBox
                style={{ marginLeft: 4 }}
                value={this.state.createSameWorkout}
                onChange={(value) => {
                  this.setState({ showCreateSameWorkoutPopup: true });
                  this.setState({ createSameWorkout: value });
                }}
              />
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                יצירת אותו אימון
              </Text>
              <CheckBox
                style={{ marginLeft: 4 }}
                value={this.state.addSaved}
                onChange={(value) => {
                  this.setState({ addSaved: value });
                }}
              />
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                אימון שקוף
              </Text>
              <CheckBox
                style={{ marginLeft: 4 }}
                value={this.state.trasparent}
                onChange={(value) => {
                  this.setState({ trasparent: value });
                }}
              />
            </HorizontalLayout>
            <DisactiveButton
              text="מחיקת אימון"
              style={{ marginBottom: 15 }}
              action={() => {
                this.delete();
              }}
            />
            <ActiveButton
              text="שמירת פרטים"
              style={{ marginBottom: 15 }}
              action={() => {
                this.save();
              }}
            />
          </VerticalLayout>
        </ScrollView>
        <EditCoachPopup
          visible={this.state.showEditCoachPopup}
          onCancel={() => {
            this.setState({ showEditCoachPopup: false });
          }}
          selectId={this.state.selectedCoachId}
          coachName={this.state.selectedCoachName}
          avatar={this.state.coachAvatar}
          onExchange={() => {
            this.setState({ showEditCoachPopup: false, showSelectCoachPopup: true });
          }}
        />
        <SelectCoachPopup
          visible={this.state.showSelectCoachPopup}
          data={this.state.coachList}
          selectId={this.state.selectedCoachId}
          onCancel={() => {
            this.setState({ showSelectCoachPopup: false });
          }}
          onBack={() => {
            this.setState({ showEditCoachPopup: true, showSelectCoachPopup: false });
          }}
          select={(data) => {
            this.setState({ selectedCoachId: data.id, selectedCoachName: data.name });
          }}
        />
        <CreateSameWorkoutpopup
          visible={this.state.showCreateSameWorkoutPopup}
          onCancel={() => {
            this.setState({ showCreateSameWorkoutPopup: false });
          }}
          onConfirm={(trainingTime, selectedDate) => {
            this.createSame(trainingTime, selectedDate);
          }}
          setTimePicker={() => {}}
        />
        <EditParticipantPopup
          data={this.state.participantList}
          visible={this.state.showEditParticipantPopup}
          onCancel={() => {
            this.setState({ showEditParticipantPopup: false });
          }}
          onSelect={(id) => {
            this.selectParticipant(id);
          }}
          addParticipant={() => {
            this.setState({ showEditParticipantPopup: false, showSelectTraineePopup: true });
          }}
          onRemove={(id) => {}}
          onKeep={() => {
            // requestPost(API.Home.add_participant, {
            //   id: this.props.selectId,
            // }).then(async (result) => {
            //   if (result.code == API_RES_CODE.SUCCESS) {
            Toast.show(<ToastContainer title="רשימת המשתתפים עודכנה" />, {
              duration: 3000,
              position: 20,
              opacity: 1,
              containerStyle: { backgroundColor: 'transparent' },
            });
            this.setState({ showEditParticipantPopup: false });
            //   } else {
            //   }
            // });
          }}
        />
        <SelectTraineePopup
          visible={this.state.showSelectTraineePopup}
          data={this.state.userList}
          onBack={() => {
            this.setState({
              showSelectTraineePopup: false,
              showEditParticipantPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showSelectTraineePopup: false });
          }}
          setSearch={(search) => {
            this.getUser(search);
          }}
          select={(id) => {
            this.selectUser(id);
          }}
          addParticipant={() => {
            this.addParticipant();
            this.setState({
              showSelectTraineePopup: false,
              showEditParticipantPopup: true,
            });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
