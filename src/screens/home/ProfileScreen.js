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
import ProductItem from '../../components/items/ProductItem';
import { RESULTS } from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import ProfileInfoItem from '../../components/items/ProfileInfoItem';
import TaskPopup from '../../components/popups/TaskPopup';
import { LeadPopup } from '../../components/popups';
import AssignRolePopup from "../../components/popups/AssignRolePopup";

@observer
export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      showTaskPopup: false,
      taskList: [],
      showAssignRolePopup: false,
      roleList: []
    };
  }

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
    //   search: this.state.search,
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
      {id: 1, name: 'מנהל מערכת'},
      {id: 2, name: 'להפוך משתמש'},
      {id: 3, name: 'להפוך משתמש'},
      {id: 4, name: 'להפוך משתמש'},
    ]
    // requestGet(API.Home.get_role, {
    //   search: this.state.search,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({
      roleList: roleList
    });
    //   } else {
    //   }
    // });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29 }}>
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
                  source={require('src/assets/image/ic_male.png')}
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
                leftIcon={require('src/assets/image/ic_arrow_left.png')}
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
                leftIcon={require('src/assets/image/ic_arrow_left.png')}
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
                action={() => {}}
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
                  this.getRole();
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
              <HorizontalLayout
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F3F3F3',
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_track.png')}
                  style={{ width: 46, height: 46, marginRight: 15 }}
                />
                <VerticalLayout style={{ width: '70%' }}>
                  <Text>סוג מסלול:</Text>
                  <Text numberOfLines={2}>
                    כרטיס ניקוב 10 מתוך 12, המנוי מופעל ב-X, מתחדש בעוד Y פעמים
                  </Text>
                </VerticalLayout>
              </HorizontalLayout>
              <HorizontalLayout style={{ width: '100%', justifyContent: 'flex-end' }}>
                <VerticalLayout style={{ width: '70%', marginTop: 15, justifyContent: 'flex-end' }}>
                  <Text>סוג מסלול:</Text>
                  <Text numberOfLines={2}>
                    כרטיס ניקוב 10 מתוך 12, המנוי מופעל ב-X, מתחדש בעוד Y פעמים
                  </Text>
                </VerticalLayout>
              </HorizontalLayout>
            </VerticalLayout>
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 10 }}>
              <ProfileInfoItem
                border={true}
                leftIcon={require('src/assets/image/ic_arrow_left.png')}
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
                leftIcon={require('src/assets/image/ic_arrow_left.png')}
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
                leftIcon={require('src/assets/image/ic_message.png')}
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
            this.selectTask(data);
          }}
          onCancel={() => {
            this.setState({ showAssignRolePopup: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});