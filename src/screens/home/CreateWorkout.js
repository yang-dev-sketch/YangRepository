import React from 'react';
import { observer } from 'mobx-react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Styles } from '../../constants';
import { API, API_RES_CODE, MAIN_TAB } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import { ActiveButton, CommonInput, DisactiveButton, SetValueGroup } from '../../components/common';
import CheckBox from './../../components/controls/CheckBox';
import EditTrainPopup from '../../components/popups/EditTrainPopup';
import ModalDropDown from '../../components/controls/ModalDropDown';
import EditTraineePopup from '../../components/popups/EditTraineePopup';
import AddTraineePopup from '../../components/popups/AddTraineePopup';
import DropDownPicker from '../../components/controls/DropDownPicker';
import DateDropDown from '../../components/controls/DateDropDown';
import TimePicker from '../../components/controls/TimePicker';
import GlobalState from '../../mobx/GlobalState';

@observer
export default class CreateWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTrain: '',
      participant: 12,
      trainType: [],
      trainingTime: 3,
      showEditTrainPopup: false,
      trainList: [],
      traineeList: [],
      branchList: ['צעדים לפריז', 'צעדים ללונדון', 'צעדים לפריז'],
      coachName: [],
      selectedBranch: 'צעדים לפריז',
      payMethod: false,
      createSameWorkout: false,
      selectedTrainId: 0,
      selectedDropdownTrain: null,
      selectedCoachName: null,
      showEditTraineePopup: false,
      showAddTraineePopup: false,
      participantList: [],
    };
  }

  getInfo = () => {
    this.getTrain();
    this.getTrainee();
    this.getCoach();
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

  getTrain = () => {
    // requestGet(API.Home.get_train, {
    //   search: this.state.branchSearch,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
    const trainList = [
      { id: 1, name: 'צעדים לונדון', checked: false, image: '' },
      { id: 2, name: 'צעדים פריז', checked: false, image: '' },
      { id: 3, name: 'צעדים קייב', checked: false, image: '' },
      { id: 4, name: 'צעדים קייב', checked: false, image: '' },
    ];
    this.setState({ trainList: trainList });
  };
  getTrainee = () => {
    // requestGet(API.Home.get_trainee, {
    //   search: this.state.branchSearch,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
    const traineeList = [
      { id: 1, name: 'שם המתאמן.ת', image: '' },
      { id: 2, name: 'שם המתאמן.ת', image: '' },
      { id: 3, name: 'שם המתאמן.ת', image: '' },
      { id: 4, name: 'שם המתאמן.ת', image: '' },
      { id: 5, name: 'שם המתאמן.ת', image: '' },
      { id: 6, name: 'שם המתאמן.ת', image: '' },
    ];
    this.setState({ traineeList: traineeList });
  };

  getCoach = () => {
    const coachName = [
      { id: 1, name: 'שם המאמן' },
      { id: 2, name: 'שם המאמן' },
      { id: 3, name: 'שם המאמן' },
    ];
    this.setState({ coachName: coachName });
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
                <ModalDropDown
                  data={this.state.branchList}
                  button={
                    <HorizontalLayout style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 18,
                          lineHeight: 22,
                          color: '#5C9DF2',
                          textDecorationLine: 'underline',
                          fontWeight: '600',
                        }}>
                        סניף:{this.state.selectedBranch}
                      </Text>
                      <LocalImage
                        source={require('src/assets/image/ic_sort.png')}
                        style={{ width: 15, height: 20 }}
                      />
                    </HorizontalLayout>
                  }
                  onSelect={(value) => {
                    this.setState({ selectedBranch: value });
                  }}
                />
              </HorizontalLayout>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  color: '#000',
                  fontWeight: '600',
                }}>
                יצירת אימון
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
                  editIcon={true}
                  onEdit={() => {
                    this.setState({ showEditTrainPopup: true });
                  }}
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
              inputNode={<DateDropDown />}
            />
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginTop: 20, marginBottom: 10, backgroundColor: '#F5F5F5' },
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
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginTop: 20, marginBottom: 10, backgroundColor: '#F5F5F5' },
              ]}
              title="שם המאמן"
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <DropDownPicker
                  data={this.state.coachName}
                  editIcon={true}
                  placeholder="עריכת המאמנים"
                  onEdit={() => {}}
                  selectedValue={this.state.selectedCoachName}
                  onSelect={(value) => {
                    this.setState({ selectedCoachName: value.name });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 13, backgroundColor: '#F5F5F5' }]}
              title="כמות משתתפים"
              image={require('src/assets/image/ic_man_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="white"
                  keyboardType="numeric"
                  value={this.state.participant}
                  onChangeText={(text) => {
                    this.setState({ participant: text });
                  }}
                />
              }
            />
            {this.state.participantList.length == 0 && (
              <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  onPress={() => {
                    this.setState({ showEditTraineePopup: true });
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_edit.png')}
                    style={{ width: 15.93, height: 15.93 }}
                  />
                </Button>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>עריכת המשתתפים</Text>
              </HorizontalLayout>
            )}
            <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>יצירת אותו אימון</Text>
              <CheckBox
                style={{ marginRight: -8 }}
                value={this.state.createSameWorkout}
                onChange={(value) => {
                  this.setState({ createSameWorkout: value });
                }}
              />
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 45 }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>אימון שקוף</Text>
              <CheckBox
                style={{ marginRight: -8 }}
                value={this.state.payMethod}
                onChange={(value) => {
                  this.setState({ payMethod: value });
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
        <EditTrainPopup
          visible={this.state.showEditTrainPopup}
          data={this.state.trainType}
          selectTrainId={this.state.selectedTrainId}
          selectTrain={(index) => {
            this.setState({ selectedTrainId: index });
          }}
          setSearch={() => {
            this.getTrain();
          }}
          onCancel={() => {
            this.setState({ showEditTrainPopup: false });
          }}
          addTrainType={() => {}}
        />
        <EditTraineePopup
          data={this.state.participantList}
          visible={this.state.showEditTraineePopup}
          onCancel={() => {
            this.setState({ showEditTraineePopup: false });
          }}
          addTrainee={() => {
            this.setState({ showEditTraineePopup: false, showAddTraineePopup: true });
          }}
        />
        <AddTraineePopup
          visible={this.state.showAddTraineePopup}
          data={this.state.traineeList}
          onBack={() => {
            this.setState({
              showAddTraineePopup: false,
              showEditTraineePopup: true,
            });
          }}
          removeTrainee={() => {
            this.setState({
              traineeList: this.state.traineeList.filter((item) => {
                return item.id != this.state.selectTrainee;
              }),
              selectTrainee: 0,
            });
          }}
          onCancel={() => {
            this.setState({ showAddTraineePopup: false });
          }}
          setSearch={() => {
            this.getTrainee();
          }}
          select={(value) => {
            this.setState({ selectTrainee: value });
          }}
          selectId={this.state.selectTrainee}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
