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
import {
  ActiveButton,
  BottomMenu,
  CommonInput,
  DisactiveButton,
  SearchInput,
  SetValueGroup,
} from '../../components/common';
import ImageCropPicker from 'react-native-image-crop-picker';
import DropDownPicker from '../../components/controls/DropDownPicker';
import DateDropDown from '../../components/controls/DateDropDown';
import TimeDropDown from '../../components/controls/TimeDropDown';
import CheckBox from '@react-native-community/checkbox';
import EditTrainPopup from '../../components/popups/EditTrainPopup';
import ModalDropDown from '../../components/controls/ModalDropDown';
import EditTraineePopup from '../../components/popups/EditTraineePopup';

@observer
export default class CreateWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTrain: '',
      participant: 12,
      trainType: [],
      showEditTrainPopup: false,
      trainList: [],
      branchList: ['צעדים לפריז', 'צעדים ללונדון', 'צעדים לפריז'],
      selectedBranch: 'צעדים לפריז',
      payMethod: false,
      createSameWorkout: false,
      selectedTrainId: 0,
      selectedDropdownTrain: null,
      showEditTraineePopup: false,
      showAddTraineePopup: false,
    };
  }

  getInfo = () => {
    const trainType = [
      { id: 1, name: 'אימון אישי' },
      { id: 2, name: 'אימון קבוצתי' },
      { id: 3, name: 'פילאטיס' },
      { id: 4, name: 'יוגה' },
      { id: 5, name: 'קיקבוקס' },
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

  componentDidMount() {
    this.getTrain();
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
                    this.props.navigation.navigate('Shop');
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
                    this.setState({ selectedBranch: value.name });
                  }}
                />
              </HorizontalLayout>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
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
              inputNode={<TimeDropDown />}
            />
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginTop: 20, marginBottom: 10, backgroundColor: '#F5F5F5' },
              ]}
              title="שם המאמן"
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={<DropDownPicker data={this.state.trainType} />}
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 13, backgroundColor: '#F5F5F5' }]}
              title="כמות משתתפים"
              image={require('src/assets/image/ic_man_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="white"
                  value={this.state.participant}
                  onChangeText={(text) => {
                    this.setState({ participant: text });
                  }}
                />
              }
            />
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
              <Text>עריכת המשתתפים</Text>
            </HorizontalLayout>
            <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 16, lineHeight: 19 }}>יצירת אותו אימון</Text>
              <CheckBox
                style={{ marginRight: -8 }}
                onFillColor="#0D65D9"
                value={this.state.createSameWorkout}
                onChange={() => {
                  this.setState({ createSameWorkout: !this.state.createSameWorkout });
                }}
              />
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 45 }}>
              <Text style={{ fontSize: 16, lineHeight: 19 }}>אימון שקוף</Text>
              <CheckBox
                style={{ marginRight: -8 }}
                onFillColor="#0D65D9"
                value={this.state.payMethod}
                onChange={() => {
                  this.setState({ payMethod: !this.state.payMethod });
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
          visible={this.state.showEditTraineePopup}
          onCancel={() => {
            this.setState({ showEditTraineePopup: false });
          }}
          addTrainee={() => {
            this.setState({ showEditTraineePopup: false, showAddTraineePopup: true });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});