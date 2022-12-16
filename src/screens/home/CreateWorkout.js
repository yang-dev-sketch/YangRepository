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
    };
  }

  getInfo = () => {
    const trainType = ['בחרו סוג', 'אימון אישי', 'אימון קבוצתי', 'פילאטיס', 'יוגה', 'קיקבוקס'];
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

  getBranch = () => {
    // requestGet(API.Home.get_branch, {
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
    this.getBranch();
    this.getInfo();
  }

  delete = () => {
    // requestPost(API.Home.delete_workout, {
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
                    this.setState({ selectedBranch: value });
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
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
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
            <HorizontalLayout>
              <Button onPress={() => {}}>
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
                onFillColor="#0D65D9"
                value={this.state.pay_method}
                onChange={() => {
                  this.setState({ pay_method: !this.state.pay_method });
                }}
              />
            </HorizontalLayout>
            <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 16, lineHeight: 19 }}>אימון שקוף</Text>
              <CheckBox
                onFillColor="#0D65D9"
                value={this.state.pay_method}
                onChange={() => {
                  this.setState({ pay_method: !this.state.pay_method });
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
          data={this.state.trainList}
          selectBranchId={this.state.selectedBranchId}
          selectBranch={(index) => {
            this.setState({ selectedBranchId: index });
          }}
          setSearch={() => {
            this.getBranch();
          }}
          addBranch={() => {
            this.setState({ showEditTrainPopup: false, showAddBranchPopup: true });
          }}
          deleteBranch={() => {
            this.deleteBranch();
          }}
          onCancel={() => {
            this.setState({ showEditTrainPopup: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
