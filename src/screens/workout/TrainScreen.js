import React from 'react';
import { observer } from 'mobx-react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { CommonUtils } from '../../utils';
import { Styles } from '../../constants';
import { API, API_RES_CODE } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import { DatePickerPopup, NotiPopup, TrainTimePopup } from '../../components/popups';
import TimePickerPopup from '../../components/popups/TimePickerPopup';
import { SearchInput } from '../../components/common';
import Timeline from 'react-native-timeline-flatlist';
import TaskItem from '../../components/items/TaskItem';
import TrainingItem from '../../components/items/TrainingItem';
import FilterByPopup from '../../components/popups/FilterByPopup';
import TrainTypePopup from '../../components/popups/TrainTypePopup';
import FilterByCoachPopup from '../../components/popups/FilterByCoachPopup';
import FilterByHourPopup from '../../components/popups/FilterByHourPopup';
import FilterByTrainingPopup from '../../components/popups/FilterByTrainingPopup';
import FilterByBranchPopup from '../../components/popups/FilterByBranchPopup';

@observer
export default class TrainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.state = {
      showNotiPopup: false,
      showTrainTimePopup: false,
      showDatePickerPopup: false,
      showTimePickerPopup: false,
      trainDateTime: new Date(),
      trainId: 0,
      taskList: [
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
      ],
      selected: [],
      showFilterByPopup: false,
      filterList: [
        { id: 1, name: 'שם המתאמן.ת' },
        { id: 2, name: 'מאמן' },
        { id: 3, name: 'מתאמן' },
        { id: 4, name: 'שעה' },
        { id: 5, name: 'סניף' },
      ],
      showTrainTypePopup: false,
      trainType: [
        { id: 1, name: 'הכל' },
        { id: 2, name: 'אימון קבוצתי' },
        { id: 3, name: 'איגרוף' },
        { id: 4, name: 'זומבה' },
        { id: 5, name: 'יוגה' },
        { id: 6, name: 'פונקציונאלי' },
        { id: 7, name: 'כדורגל' },
      ],
      selectedTrainId: 0,
      showFilterByCoachPopup: false,
      coachList: [
        { id: 1, name: 'שם המתאמן.ת', avatar: '' },
        { id: 2, name: 'שם המתאמן.ת', avatar: '' },
        { id: 3, name: 'שם המתאמן.ת', avatar: '' },
        { id: 4, name: 'שם המתאמן.ת', avatar: '' },
        { id: 5, name: 'שם המתאמן.ת', avatar: '' },
      ],
      showFilterByTrainingPopup: false,
      showFilterByHourPopup: false,
      showFilterByBranchPopup: false,
      branchList: [
        { id: 1, name: 'שם הסניף' },
        { id: 2, name: 'שם הסניף' },
        { id: 3, name: 'שם הסניף' },
        { id: 4, name: 'שם הסניף' },
      ],
    };
  }

  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderSelected() {
    if (this.state.selected) return <Text>{this.state.selected.id}</Text>;
  }

  renderDetail(rowData, sectionID, rowID) {
    return <TrainingItem data={rowData} even={sectionID % 2 === 0} />;
  }

  getTaskList = () => {
    const taskList = [
      {
        id: 1,
        type: 'אימון אישי ',
        time: '08:00',
        min: '45',
        timeArea: '08:00 - 08:45',
        name: 'שם הליד',
        participants: '10/12',
      },
      {
        id: 2,
        type: 'אימון אישי ',
        time: '09:00',
        min: '45',
        timeArea: '08:00 - 08:45',
        name: 'שם הליד',
        participants: '10/12',
      },
      {
        id: 3,
        type: 'אימון אישי ',
        time: '10:00',
        min: '45',
        timeArea: '08:00 - 08:45',
        name: 'שם הליד',
        participants: '10/12',
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
  };

  componentDidMount() {
    this.getInfo();
  }

  onFilter = () => {};

  coachSelect = (id) => {
    const coachList = this.state.coachList;
    coachList.map((item, index) => {
      if (id == item.id) item.checked = !item.checked;
    });
    this.setState({ coachList: coachList });
  };

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
                  style={{ width: 19.87, height: 19.44 }}
                />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  letterSpacing: 1,
                  color: '#000',
                }}>
                אימונים
              </Text>
              <Button onPress={() => {}}>
                <LocalImage
                  source={require('src/assets/image/ic_bottom_gyme_off.png')}
                  style={{ width: 39, height: 39 }}
                />
              </Button>
            </HorizontalLayout>
            <View
              style={{
                width: '100%',
                height: 242,
                backgroundColor: '#FFF',
                borderRadius: 11,
                padding: 15,
              }}>
              <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  onPress={() => {
                    this.setState({ showFilterByPopup: true });
                  }}
                  style={{ alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, lineHeight: 19 }}>סינון לפי</Text>
                  <LocalImage
                    source={require('src/assets/image/ic_sort_black.png')}
                    style={{ width: 24, height: 24 }}
                  />
                </Button>
                <HorizontalLayout>
                  <Button style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <LocalImage
                      source={require('src/assets/image/ic_left.png')}
                      style={{ width: 9.17, height: 17.41, marginRight: 21.53 }}
                    />
                  </Button>
                  <Text style={{ fontSize: 18, lineHeight: 22 }}>ספטמבר 2022</Text>
                  <Button style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <LocalImage
                      source={require('src/assets/image/ic_right.png')}
                      style={{ width: 9.17, height: 17.41, marginLeft: 21.53 }}
                    />
                  </Button>
                </HorizontalLayout>
              </HorizontalLayout>
            </View>
            <HorizontalLayout style={{ justifyContent: 'space-between', marginVertical: 15 }}>
              <Button
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 9,
                  borderRadius: 11,
                  backgroundColor: 'white',
                }}>
                <Text style={{ fontSize: 18, lineHeight: 22, color: '#1E6FD9' }}>יוגה</Text>
              </Button>
              <Button
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 9,
                  borderRadius: 11,
                  backgroundColor: 'white',
                }}>
                <Text style={{ fontSize: 18, lineHeight: 22, color: '#43C7FF' }}>פילאטיס</Text>
              </Button>
              <Button
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 9,
                  borderRadius: 11,
                  backgroundColor: 'white',
                }}>
                <Text style={{ fontSize: 18, lineHeight: 22, color: '#5C9DF2' }}>קבוצתי</Text>
              </Button>
              <Button
                style={{
                  paddingHorizontal: 22,
                  paddingVertical: 9,
                  borderRadius: 11,
                  backgroundColor: 'white',
                }}>
                <Text style={{ fontSize: 18, lineHeight: 22, color: '#94BDF2' }}>הכל</Text>
              </Button>
            </HorizontalLayout>
            <SearchInput
              setSearch={(search) => {
                this.props.setSearch(search);
              }}
            />
            <HorizontalLayout
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingHorizontal: 20,
                marginTop: 15,
                marginBottom: 16.25,
              }}>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>{this.renderSelected()} | 01</Text>
            </HorizontalLayout>
            <Timeline
              data={this.state.taskList}
              innerCircle="dot"
              circleSize={20}
              dotSize={12}
              dotColor="#1E6FD9"
              circleColor="#E2E2E2"
              lineWidth={2}
              lineColor="#1E6FD9"
              listViewContainerStyle={{ paddingTop: 40 }}
              timeContainerStyle={{ marginLeft: -50 }}
              timeStyle={{
                position: 'absolute',
                top: -25,
                left: 8,
                zIndex: 999,
                fontSize: 16,
                lineHeight: 19,
                color: '#6F6F6F',
                backgroundColor: '#F5F5F5',
                height: 24.5,
                textAlignVertical: 'center',
              }}
              eventDetailStyle={{
                marginRight: 10,
                marginTop: -40,
                marginBottom: 40,
              }}
              columnFormat="single-column-right"
              onEventPress={this.onEventPress}
              renderDetail={this.renderDetail}
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
        <FilterByPopup
          visible={this.state.showFilterByPopup}
          onCancel={() => {
            this.setState({ showFilterByPopup: false });
          }}
          data={this.state.filterList}
          setTrainTypePopup={() => {
            this.setState({ showTrainTypePopup: true, showFilterByPopup: false });
          }}
          setFilterByCoach={() => {
            this.setState({ showFilterByCoachPopup: true, showFilterByPopup: false });
          }}
          setFilterByTraining={() => {
            this.setState({ showFilterByTrainingPopup: true, showFilterByPopup: false });
          }}
          setFilterByHour={() => {
            this.setState({ showFilterByHourPopup: true, showFilterByPopup: false });
          }}
          setFilterBranch={() => {
            this.setState({ showFilterByBranchPopup: true, showFilterByPopup: false });
          }}
        />
        <TrainTypePopup
          visible={this.state.showTrainTypePopup}
          data={this.state.trainType}
          onCancel={() => {
            this.setState({ showTrainTypePopup: false });
          }}
          onBack={() => {
            this.setState({
              showTrainTypePopup: false,
              showFilterByPopup: true,
            });
          }}
          selectTrainId={this.state.selectedTrainId}
          selectTrain={(id) => {
            console.log(id);
            this.setState({ selectedTrainId: id });
          }}
          onFilter={() => {
            this.onFilter();
          }}
        />
        <FilterByCoachPopup
          visible={this.state.showFilterByCoachPopup}
          data={this.state.coachList}
          onCancel={() => {
            this.setState({ showFilterByCoachPopup: false });
          }}
          onBack={() => {
            this.setState({
              showFilterByCoachPopup: false,
              showFilterByPopup: true,
            });
          }}
          onFilter={() => {
            this.onFilter();
          }}
          onSelect={(id) => {
            this.coachSelect(id);
          }}
        />
        <FilterByTrainingPopup
          visible={this.state.showFilterByTrainingPopup}
          onCancel={() => {
            this.setState({ showFilterByTrainingPopup: false });
          }}
          onBack={() => {
            this.setState({
              showFilterByTrainingPopup: false,
              showFilterByPopup: true,
            });
          }}
          onFilter={() => {
            this.onFilter();
          }}
        />
        <FilterByHourPopup
          visible={this.state.showFilterByHourPopup}
          onCancel={() => {
            this.setState({ showFilterByHourPopup: false });
          }}
          onBack={() => {
            this.setState({
              showFilterByHourPopup: false,
              showFilterByPopup: true,
            });
          }}
          onFilter={() => {
            this.onFilter();
          }}
        />
        <FilterByBranchPopup
          visible={this.state.showFilterByBranchPopup}
          data={this.state.branchList}
          onCancel={() => {
            this.setState({ showFilterByBranchPopup: false });
          }}
          onBack={() => {
            this.setState({
              showFilterByBranchPopup: false,
              showFilterByPopup: true,
            });
          }}
          onFilter={() => {
            this.onFilter();
          }}
          setSearch={() => {}}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
