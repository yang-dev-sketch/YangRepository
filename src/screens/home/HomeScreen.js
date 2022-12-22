import React from 'react';
import { observer } from 'mobx-react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  RefreshControl,
  Touchable,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { CommonUtils } from '../../utils';
import { Langs, Styles } from '../../constants';
import {
  API,
  API_RES_CODE,
  IMAGE_FOO_URL,
  MAIN_TAB,
  SCREEN_WIDTH,
} from '../../constants/Constants';
import {
  Button,
  HorizontalLayout,
  LocalImage,
  ScaledFastImage,
  VerticalLayout,
} from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import MyInfo from '../../mobx/MyInfo';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import Toast from 'react-native-root-toast';
import EventBus from 'react-native-event-bus';
import TotalItem from '../../components/items/TotalItem';
import LinearGradient from 'react-native-linear-gradient';
import NumberFormat from 'react-number-format';
import NotiPopup from '../../components/popups/NotiPopup';
import TrainTimePopup from '../../components/popups/TrainTimePopup';
import { AddBranchPopup, BranchPopup, DatePickerPopup, LeadPopup } from '../../components/popups';
import TimePickerPopup from '../../components/popups/TimePickerPopup';
import CloseTrainPopup from '../../components/popups/CloseTrainPopup';
import TrainOrganizationPopup from '../../components/popups/TrainOrganizationPopup';
import InvitateTraineePopup from '../../components/popups/InvitateTraineePopup';
import TrainerOrganizationPopup from '../../components/popups/TrainerOrganizationPopup';
import PieChart from 'react-native-pie-chart';

@observer
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainType: [],
      income: 0,
      upcoming: 0,
      detailList: [
        { title: 'חנות', image: require('src/assets/image/ic_store.png') },
        { title: 'יצירת אימון', image: require('src/assets/image/ic_work.png') },
        { title: 'מתאמנים באירגון', image: require('src/assets/image/ic_training.png') },
        { title: 'מאמנים באירגון', image: require('src/assets/image/ic_trainer.png') },
      ],
      showNotiPopup: false,
      trainId: 0,
      showTrainTimePopup: false,
      showDatePickerPopup: false,
      showTimePickerPopup: false,
      trainDateTime: new Date(),
      showBranchPopup: false,
      branchList: [],
      selectedBranchId: 0,
      branchSearch: '',
      showAddBranchPopup: false,
      showLeadPopup: false,
      showCloseTrainPopup: false,
      showTrainOrganizationPopup: false,
      traineeList: [],
      showInvitateTraineePopup: false,
      showTrainerOrganizationPopup: false,
    };
  }

  getBranch = () => {
    // requestGet(API.Home.get_branch, {
    //   search: this.state.branchSearch,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
    const branchList = [
      { id: 1, name: 'צעדים לונדון', checked: false },
      { id: 2, name: 'צעדים פריז', checked: false },
      { id: 3, name: 'צעדים קייב', checked: false },
      { id: 4, name: 'צעדים קייב', checked: false },
    ];
    this.setState({ branchList: branchList });
  };

  deleteBranch = () => {
    // requestPost(API.Home.delete_branch, {}).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({
      branchList: this.state.branchList.filter((item) => {
        return item.id != this.state.selectedBranchId;
      }),
    });
    //   } else {
    //   }
    // });
  };

  getInfo = () => {
    this.getBranch();
    const trainType = [
      { id: 1, title: 'אימון אישי', color: '#43C7FF', amount: 20 },
      { id: 2, title: 'אימון קבוצות', color: '#1E6FD9', amount: 30 },
      { id: 3, title: 'קיקבוקס', color: '#0019FF', amount: 15 },
      { id: 4, title: 'פילאטיס', color: '#5C9DF2', amount: 10 },
      { id: 5, title: 'יוגה', color: '#004765', amount: 40 },
      { id: 6, title: 'פונקציונאלי', color: '#000E88', amount: 20 },
    ];
    const income = 12875;
    const upcoming = 34;

    this.setState({
      trainType: trainType,
      income: income,
      upcoming: upcoming,
    });
  };

  componentDidMount() {
    this.getInfo();
  }

  changeTrainDateTime = () => {
    // requestPost(API.Home.update_train_time, {
    //   id: this.state.trainId,
    //   time: this.state.trainDateTime,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
  };

  getLead = () => {
    // requestPost(API.Home.get_lead, {
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
  };

  getTrainee = () => {
    // requestGet(API.Home.get_trainee, {
    // search: this.state.search,
    // traineeType: this.state.traineeType
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    const traineeList = [
      { id: 1, name: 'שם המתאמן.ת', avatar: '' },
      { id: 2, name: 'שם המתאמן.ת', avatar: '' },
      { id: 3, name: 'שם המתאמן.ת', avatar: '' },
      { id: 4, name: 'שם המתאמן.ת', avatar: '' },
      { id: 5, name: 'שם המתאמן.ת', avatar: '' },
    ];
    this.setState({ traineeList: traineeList });
    //   } else {
    //   }
    // });
  };

  selectTrainer = (id) => {
    const traineeList = this.state.traineeList;
    traineeList.map((item, index) => {
      if (id === item.id) item.checked = !item.checked;
    });
    this.setState({ traineeList: traineeList });
  };

  render() {
    const widthAndHeight = 100;
    const series = [20, 30, 15, 10, 40, 20];
    const sliceColor = ['#43C7FF', '#1E6FD9', '#0019FF', '#5C9DF2', '#004765', '000E88'];

    return (
      <SafeAreaView>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29 }}>
            <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
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
                פרופיל
              </Text>
              <Button onPress={() => {}}>
                <LocalImage
                  source={require('src/assets/image/ic_bottom_gyme_off.png')}
                  style={{ width: 39, height: 39 }}
                />
              </Button>
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <Button
                onPress={() => {
                  this.setState({ showBranchPopup: true });
                }}
                style={{
                  width: 49,
                  height: 43,
                  borderRadius: 11,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_home.png')}
                  style={{ width: 29, height: 27.7 }}
                />
              </Button>
              <VerticalLayout style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, lineHeight: 22, letterSpacing: 1 }}>שלום STEPS,</Text>
                <Text style={{ fontSize: 14, lineHeight: 17, letterSpacing: 1, color: '#6F6F6F' }}>
                  נתונים ליום חמישי 01.09.2022
                </Text>
              </VerticalLayout>
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <HorizontalLayout
                style={{
                  width: 227,
                  height: 144,
                  borderRadius: 11,
                  backgroundColor: 'white',
                  paddingLeft: 20,
                  paddingVertical: 20,
                  justifyContent: 'space-between',
                }}>
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  doughnut={true}
                  coverRadius={0.8}
                  coverFill={'#FFF'}
                />
                <VerticalLayout style={{ alignItems: 'flex-end' }}>
                  {this.state.trainType.map((item, index) => {
                    return (
                      <HorizontalLayout style={{ alignItems: 'center' }}>
                        <Text
                          style={{
                            fontSize: 10,
                            lineHeight: 12,
                            letterSpacing: 1,
                            color: '#6F6F6F',
                          }}>
                          {item.title}
                        </Text>
                        <View
                          style={[
                            { backgroundColor: item.color, height: 17, width: 8, marginLeft: 10 },
                            index === 0 && { borderTopLeftRadius: 2 },
                            index === 5 && { borderBottomLeftRadius: 2 },
                          ]}></View>
                      </HorizontalLayout>
                    );
                  })}
                </VerticalLayout>
              </HorizontalLayout>
              <VerticalLayout style={{ alignItems: 'center', width: SCREEN_WIDTH - 260 }}>
                <Text style={{ fontSize: 14, lineHeight: 17, letterSpacing: 1 }}>סה”כ אימונים</Text>
                <Text
                  style={{ fontSize: 70, lineHeight: 84, color: '#0D65D9', fontFamily: 'Danidin' }}>
                  70
                </Text>
              </VerticalLayout>
            </HorizontalLayout>
            <HorizontalLayout style={{ marginTop: 15, justifyContent: 'space-between' }}>
              <TotalItem amount={94} text="סה”כ מתאמנים" color="#43C7FF"></TotalItem>
              <TotalItem amount={5} text="סה”כ מאמנים" color="#0D65D9"></TotalItem>
            </HorizontalLayout>
            <HorizontalLayout style={{ marginTop: 15, justifyContent: 'space-between' }}>
              <TotalItem amount={12} text="סה״כ הגיעו" color="#4399FF"></TotalItem>
              <TotalItem
                event={() => {
                  this.setState({ showLeadPopup: true });
                }}
                amount={4}
                text="סה״כ נרשמו היום"
                color="#4E0DD9"></TotalItem>
            </HorizontalLayout>
            <HorizontalLayout
              style={{
                width: '100%',
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: 'white',
                borderRadius: 11,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#59E967', '#A8EDAF']}
                  style={{
                    width: 31,
                    height: 31,
                    borderRadius: 15.5,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_arrow_up.png')}
                    style={{ width: 13, height: 15 }}
                  />
                </LinearGradient>
                <LocalImage
                  source={require('src/assets/image/ic_income.png')}
                  style={{ width: 12, height: 10, marginRight: 2 }}
                />
                <NumberFormat
                  value={this.state.income}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(formattedValue) => (
                    <Text style={{ fontSize: 24, lineHeight: 29 }}>{formattedValue}</Text>
                  )}
                />
              </HorizontalLayout>
              <Text style={{ fontSize: 14, lineHeight: 17 }}>ההכנסה היומית שלי</Text>
            </HorizontalLayout>
            <Button
              onPress={() => {
                this.setState({ showCloseTrainPopup: true });
              }}>
              <HorizontalLayout
                style={{
                  width: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: 'white',
                  borderRadius: 11,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_round_left.png')}
                  style={{ width: 27, height: 27, marginRight: 2 }}
                />
                <HorizontalLayout>
                  <NumberFormat
                    value={this.state.upcoming}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={(formattedValue) => (
                      <Text style={{ fontSize: 16, lineHeight: 19, color: 'red' }}>
                        ({formattedValue})
                      </Text>
                    )}
                  />
                  <Text style={{ fontSize: 16, lineHeight: 19 }}>אימונים קרובים</Text>
                </HorizontalLayout>
              </HorizontalLayout>
            </Button>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 15 }}
              data={this.state.detailList}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <Button
                    key={index}
                    onPress={() => {
                      index === 0 && GlobalState.setTabIndex(MAIN_TAB.GYME);
                      index === 1 && this.props.navigation.navigate('CreateWorkout');
                      index === 2 &&
                        this.setState({ showTrainOrganizationPopup: true }, () => {
                          this.getTrainee();
                        });
                      index === 3 &&
                        this.setState({ showTrainerOrganizationPopup: true }, () => {
                          this.getTrainee();
                        });
                    }}
                    style={[
                      { width: (SCREEN_WIDTH - 64) / 2, height: 115, alignItems: 'center' },
                      index % 2 === 0 && { marginRight: 24 },
                    ]}>
                    <LocalImage source={item.image} style={{ width: 73, height: 73 }} />
                    <View
                      style={{
                        width: '100%',
                        height: 84,
                        borderRadius: 11,
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: 0,
                        zIndex: -1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 13,
                      }}>
                      <Text style={{ fontSize: 16, lineHeight: 19 }}>{item.title}</Text>
                    </View>
                  </Button>
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
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
          selectable={true}
          selectBranchId={this.state.selectedBranchId}
          selectBranch={(index) => {
            this.setState({ selectedBranchId: index });
          }}
          setSearch={() => {
            this.getBranch();
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
        <LeadPopup
          visible={this.state.showLeadPopup}
          setSearch={() => {
            this.getLead();
          }}
          onCancel={() => {
            this.setState({ showLeadPopup: false });
          }}
        />
        <CloseTrainPopup
          visible={this.state.showCloseTrainPopup}
          setSearch={() => {
            this.getLead();
          }}
          onCancel={() => {
            this.setState({ showCloseTrainPopup: false });
          }}
        />
        <TrainOrganizationPopup
          visible={this.state.showTrainOrganizationPopup}
          data={this.state.traineeList}
          setSearch={() => {
            this.getTrainee(search, traineeType);
          }}
          onCancel={() => {
            this.setState({ showTrainOrganizationPopup: false });
          }}
          addTrainee={() => {
            this.setState({ showTrainOrganizationPopup: false, showInvitateTraineePopup: true });
          }}
          onKeep={() => {}}
        />
        <InvitateTraineePopup
          visible={this.state.showInvitateTraineePopup}
          onBack={() => {
            this.setState({ showInvitateTraineePopup: false, showTrainOrganizationPopup: true });
          }}
          onCancel={() => {
            this.setState({ showInvitateTraineePopup: false });
          }}
        />
        <TrainerOrganizationPopup
          visible={this.state.showTrainerOrganizationPopup}
          data={this.state.traineeList}
          setSearch={() => {
            this.getTrainee(search, traineeType);
          }}
          selectTrainer={(id) => {
            this.selectTrainer(id);
          }}
          onCancel={() => {
            this.setState({ showTrainerOrganizationPopup: false });
          }}
          removeTrainee={() => {
            this.setState({
              traineeList: this.state.traineeList.filter((item) => {
                return item.checked !== true;
              }),
            });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
