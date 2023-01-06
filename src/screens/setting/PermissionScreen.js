import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Styles } from '../../constants';
import { API, API_RES_CODE, IMAGE_FOO_URL, MAIN_TAB } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import { ActiveButton, DisactiveButton, SearchInput } from '../../components/common';
import AddRolePopup from '../../components/popups/AddRolePopup';
import EditUserPopup from '../../components/popups/EditUserPopup';
import AddTraineeRolePopup from '../../components/popups/AddTraineeRolePopup';
import SelectRolePopup from '../../components/popups/SelectRolePopup';
import SwitchItem from '../../components/items/SwitchItem';
import Toast from 'react-native-root-toast';
import ToastContainer from '../../components/controls/ToastContainer';

@observer
export default class PermissionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      manageList: [],
      descList: [],
      showAddRolePopup: false,
      selectedUser: 0,
      showEditUserPopup: false,
      userType: 'all',
      showAddTraineeRolePopup: false,
      selectedAddRole: 0,
      selectedAddUser: 0,
      showSelectRolePopup: false,
    };
  }

  getRoles = () => {
    const roleList = [
      {
        id: 1,
        name: 'Admin',
        member: [
          { id: 1, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
          { id: 2, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
          { id: 3, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
        ],
        report: true,
        training: false,
        payment: false,
        task: false,
        lead: false,
      },
      {
        id: 2,
        name: 'Coach',
        member: [
          { id: 1, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
          { id: 2, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
          { id: 3, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
        ],
        report: true,
        training: false,
        payment: false,
        task: false,
        lead: false,
      },
      {
        id: 3,
        name: 'Office Manager',
        member: [
          { id: 1, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
          { id: 2, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
          { id: 3, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
        ],
        report: true,
        training: false,
        payment: false,
        task: false,
        lead: false,
      },
      {
        id: 4,
        name: 'Custom Service Agent',
        member: [
          { id: 1, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
          { id: 2, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
          { id: 3, name: 'שם המתאמן.ת', train: 'Steps-London', avatar: '' },
        ],
        report: true,
        training: false,
        payment: false,
        task: false,
        lead: false,
      },
    ];
    this.setState({ manageList: roleList, descList: roleList });
  };

  getUser = () => {
    // requestGet(API.Home.get_user, {
    //   search: this.state.searchUser,
    //   type: this.state.userType,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    const userList = [
      { id: 1, name: 'שם המתאמן.ת', avatar: '' },
      { id: 2, name: 'שם המתאמן.ת', avatar: '' },
      { id: 3, name: 'שם המתאמן.ת', avatar: '' },
      { id: 4, name: 'שם המתאמן.ת', avatar: '' },
      { id: 5, name: 'שם המתאמן.ת', avatar: '' },
    ];
    this.setState({ userList: userList });
    //   } else {
    //   }
    // });
  };

  getInfo = () => {
    this.getUser();
    this.getRoles();
  };

  componentDidMount() {
    this.getInfo();
  }

  deleteUser = () => {
    // requestPost(API.Home.delete_user_role, {
    //   userId: this.state.selectedUser,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({ selectedUser: 0 });
    //   } else {
    //   }
    // });
  };

  selectManage = (id) => {
    const manageList = this.state.manageList;
    manageList.map((item, index) => {
      if (id === item.id) item.checked = !item.checked;
    });
    this.setState({ manageList: manageList });
  };

  selectDesc = (id) => {
    const descList = this.state.descList;
    descList.map((item, index) => {
      if (id === item.id) item.checked = !item.checked;
    });
    this.setState({ descList: descList });
  };

  changeJob = (id, type) => {
    // requestPost(API.Setting.change_role, {
    //   type: type,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    const descList = this.state.descList;
    descList.map((item, index) => {
      if (item.id === id) {
        if (type === 'report') item.report = !item.report;
        if (type === 'training') item.training = !item.training;
        if (type === 'payment') item.payment = !item.payment;
        if (type === 'task') item.task = !item.report;
        if (type === 'lead') item.lead = !item.lead;
      }
    });
    this.setState({ descList: descList });
    //   } else {
    //   }
    // });
  };

  addRole = () => {
    this.setState({ showAddRolePopup: false });
    Toast.show(<ToastContainer title="תפקיד חדש נוסף" />, {
      duration: 3000,
      position: 20,
      opacity: 1,
      containerStyle: { backgroundColor: 'transparent' },
    });
  };

  render() {
    return (
      <SafeAreaView style={Styles.full}>
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
                  GlobalState.setTabIndex(MAIN_TAB.SETTING);
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
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
                הגדרות
              </Text>
              <Button onPress={() => {}}>
                <LocalImage
                  source={require('src/assets/image/ic_bottom_gyme_off.png')}
                  style={{ width: 39, height: 39 }}
                />
              </Button>
            </HorizontalLayout>
            <HorizontalLayout style={[styles.main_menu_bar]}>
              <Button
                style={styles.tab_item}
                onPress={() => {
                  this.setState({ tabIndex: 0 });
                }}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontWeight: '600' }}>
                  ניהול משתמשים
                </Text>
                {this.state.tabIndex === 0 && <View style={styles.tab_active}></View>}
              </Button>
              <Button
                style={styles.tab_item}
                onPress={() => {
                  this.setState({ tabIndex: 1 });
                }}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontWeight: '600' }}>
                  הגדרות תפקיד
                </Text>
                {this.state.tabIndex === 1 && <View style={styles.tab_active}></View>}
              </Button>
            </HorizontalLayout>
            {this.state.tabIndex === 0 && (
              <ScrollView>
                <VerticalLayout>
                  <Button onPress={() => {}}>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        color: '#0D65D9',
                        textDecorationLine: 'underline',
                        marginVertical: 20,
                        alignSelf: 'center',
                      }}>
                      עריכת משתמשים
                    </Text>
                  </Button>
                  <FlatList
                    ref={(ref) => {
                      this._flContent = ref;
                    }}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 15 }}
                    data={this.state.manageList}
                    numRows={1}
                    renderItem={({ item, index }) => {
                      return (
                        <VerticalLayout>
                          <Button
                            key={index}
                            onPress={() => {
                              this.selectManage(item.id);
                            }}
                            style={[
                              (item.checked && { borderColor: '#0D65D9' }) || {
                                borderColor: '#D8D8D8',
                              },
                              styles.user_item,
                            ]}>
                            {(item.checked && (
                              <LocalImage
                                source={require('src/assets/image/ic_round_up_on.png')}
                                style={{ width: 27, height: 27 }}
                              />
                            )) || (
                              <LocalImage
                                source={require('src/assets/image/ic_round_down.png')}
                                style={{ width: 27, height: 27 }}
                              />
                            )}
                            <HorizontalLayout style={{ alignItems: 'center' }}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  lineHeight: 19,
                                  color: '#000',
                                  fontWeight: '600',
                                }}>
                                {item.name}
                              </Text>
                              <View
                                style={[
                                  index === 0 && { backgroundColor: '#75A6E4' },
                                  index === 1 && { backgroundColor: '#0D65D9' },
                                  index === 2 && { backgroundColor: '#43C7FF' },
                                  index === 3 && { backgroundColor: '#688EF8' },
                                  {
                                    width: 45,
                                    height: 45,
                                    borderRadius: 22.5,
                                    marginLeft: 7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  },
                                ]}>
                                <Text style={{ fontSize: 18, lineHeight: 22, color: 'white' }}>
                                  {item.member.length}
                                </Text>
                              </View>
                            </HorizontalLayout>
                          </Button>
                          {item.checked && (
                            <VerticalLayout>
                              {item.member.length > 0 && (
                                <SearchInput style={{ marginTop: 10, marginBottom: 5 }} />
                              )}
                              {item.member.map((sub_item, sub_index) => {
                                return (
                                  <Button
                                    onPress={() => {
                                      this.setState({ selectedUser: sub_item.id });
                                    }}
                                    style={[
                                      (this.state.selectedUser === sub_item.id && {
                                        borderColor: '#0D65D9',
                                        paddingVertical: 10,
                                      }) || { borderColor: '#D8D8D8', paddingVertical: 17.5 },
                                      styles.member_item,
                                    ]}>
                                    <HorizontalLayout style={{ alignItems: 'center' }}>
                                      {this.state.selectedUser === sub_item.id && (
                                        <LocalImage
                                          source={require('src/assets/image/ic_check_on.png')}
                                          style={{ width: 22, height: 22, marginRight: 11 }}
                                        />
                                      )}
                                      <Text style={{ fontSize: 18, lineHeight: 22, color: '#000' }}>
                                        {sub_item.train}
                                      </Text>
                                    </HorizontalLayout>
                                    <HorizontalLayout style={{ alignItems: 'center' }}>
                                      <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>
                                        {sub_item.name}
                                      </Text>
                                      {(this.state.selectedUser === sub_item.id && (
                                        <FastImage
                                          source={{
                                            uri: sub_item.avatar ? sub_item.avatar : IMAGE_FOO_URL,
                                          }}
                                          resizeMode={FastImage.resizeMode.cover}
                                          style={{ width: 45, height: 45 }}
                                        />
                                      )) || (
                                        <View
                                          style={{
                                            width: 45,
                                            height: 30,
                                            overflow: 'hidden',
                                            marginLeft: 6,
                                          }}>
                                          <FastImage
                                            source={{
                                              uri: sub_item.avatar
                                                ? sub_item.avatar
                                                : IMAGE_FOO_URL,
                                            }}
                                            resizeMode={FastImage.resizeMode.cover}
                                            style={{ width: 45, height: 45, marginTop: -7.5 }}
                                          />
                                        </View>
                                      )}
                                    </HorizontalLayout>
                                  </Button>
                                );
                              })}
                              <Button
                                onPress={() => {
                                  this.setState({ showEditUserPopup: true });
                                }}
                                style={{ marginTop: 15, alignSelf: 'center' }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    lineHeight: 19,
                                    color: '#0D65D9',
                                    textDecorationLine: 'underline',
                                  }}>
                                  הוספת משתמש לתפקיד
                                </Text>
                              </Button>
                            </VerticalLayout>
                          )}
                        </VerticalLayout>
                      );
                    }}
                    keyExtractor={(item, idx) => idx.toString()}
                    ItemSeparatorComponent={() => {
                      return <View style={{ height: 15 }} />;
                    }}
                  />
                </VerticalLayout>
              </ScrollView>
            )}
            {this.state.tabIndex === 1 && (
              <ScrollView>
                <VerticalLayout>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 15, marginTop: 20 }}
                    data={this.state.descList}
                    numRows={1}
                    renderItem={({ item, index }) => {
                      return (
                        <>
                          <Button
                            onPress={() => {
                              this.setState({ selectedDesc: item.id });
                              this.selectDesc(item.id);
                            }}
                            key={index}
                            style={[
                              (item.checked && { borderColor: '#0D65D9' }) || {
                                borderColor: '#D8D8D8',
                              },
                              styles.user_item,
                            ]}>
                            {(item.checked && (
                              <LocalImage
                                source={require('src/assets/image/ic_round_up_on.png')}
                                style={{ width: 27, height: 27 }}
                              />
                            )) || (
                              <LocalImage
                                source={require('src/assets/image/ic_round_down.png')}
                                style={{ width: 27, height: 27 }}
                              />
                            )}
                            <HorizontalLayout style={{ alignItems: 'center' }}>
                              <Text style={{ fontSize: 16, lineHeight: 19 }}>{item.name}</Text>
                              <View
                                style={[
                                  index === 0 && { backgroundColor: '#75A6E4' },
                                  index === 1 && { backgroundColor: '#0D65D9' },
                                  index === 2 && { backgroundColor: '#43C7FF' },
                                  index === 3 && { backgroundColor: '#688EF8' },
                                  {
                                    width: 45,
                                    height: 45,
                                    borderRadius: 22.5,
                                    marginLeft: 7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  },
                                ]}>
                                <Text style={{ fontSize: 18, lineHeight: 22, color: 'white' }}>
                                  {item.member.length}
                                </Text>
                              </View>
                            </HorizontalLayout>
                          </Button>
                          {item.checked && (
                            <VerticalLayout>
                              {item.member.length > 0 && <SearchInput style={{ marginTop: 10 }} />}
                              <SwitchItem
                                style={styles.switch_item}
                                data={{
                                  name: 'דיווחים',
                                  checked: item.report,
                                }}
                                onSelect={() => {
                                  this.changeJob(item.id, 'report');
                                }}
                              />
                              <SwitchItem
                                style={styles.switch_item}
                                data={{
                                  name: 'אימונים',
                                  checked: item.training,
                                }}
                                onSelect={() => {
                                  this.changeJob(item.id, 'training');
                                }}
                              />
                              <SwitchItem
                                style={styles.switch_item}
                                data={{
                                  name: 'תשלומים',
                                  checked: item.payment,
                                }}
                                onSelect={() => {
                                  this.changeJob(item.id, 'payment');
                                }}
                              />
                              <SwitchItem
                                style={styles.switch_item}
                                data={{
                                  name: 'משימות',
                                  checked: item.task,
                                }}
                                onSelect={() => {
                                  this.changeJob(item.id, 'task');
                                }}
                              />
                              <SwitchItem
                                style={styles.switch_item}
                                data={{
                                  name: 'לידים',
                                  checked: item.lead,
                                }}
                                onSelect={() => {
                                  this.changeJob(item.id, 'lead');
                                }}
                              />
                            </VerticalLayout>
                          )}
                        </>
                      );
                    }}
                    keyExtractor={(item, idx) => idx.toString()}
                    ItemSeparatorComponent={() => {
                      return <View style={{ height: 15 }} />;
                    }}
                  />
                </VerticalLayout>
              </ScrollView>
            )}
            <Button
              onPress={() => {
                this.setState({ showAddRolePopup: true });
              }}
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>הוסף תפקיד חדש</Text>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 27, height: 27, marginLeft: 6 }}
              />
            </Button>
          </VerticalLayout>
          {this.state.selectedUser !== 0 && (
            <>
              <DisactiveButton
                text="מחק משתמש"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.deleteUser();
                }}
              />
              <ActiveButton
                text="ביטול"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.setState({ selectedUser: 0 });
                }}
              />
            </>
          )}
        </ScrollView>
        <AddRolePopup
          visible={this.state.showAddRolePopup}
          onCancel={() => {
            this.setState({ showAddRolePopup: false });
          }}
          onKeep={() => {
            this.addRole();
          }}
        />
        <EditUserPopup
          visible={this.state.showEditUserPopup}
          data={this.state.userList}
          selectedAddUser={this.state.selectedAddUser}
          selectAddUser={(id) => {
            this.setState({ selectedAddUser: id });
          }}
          onCancel={() => {
            this.setState({ showEditUserPopup: false });
          }}
          setSearch={(search, type) => {
            this.setState({ searchUser: search, userType: type }, () => {
              this.getUser();
            });
          }}
          addTrainee={() => {
            this.setState({ showEditUserPopup: false, showAddTraineeRolePopup: true });
          }}
          assignRole={() => {
            this.setState({ showEditUserPopup: false, showSelectRolePopup: true });
          }}
        />
        <AddTraineeRolePopup
          visible={this.state.showAddTraineeRolePopup}
          data={this.state.manageList}
          selectedAddRole={this.state.selectedAddRole}
          selectAddRole={(id) => {
            this.setState({ selectedAddRole: id });
          }}
          onCancel={() => {
            this.setState({ showAddTraineeRolePopup: false });
          }}
          onBack={() => {
            this.setState({ showAddTraineeRolePopup: false, showEditUserPopup: true });
          }}
        />
        <SelectRolePopup
          visible={this.state.showSelectRolePopup}
          data={this.state.manageList}
          selectedAddRole={this.state.selectedAddRole}
          selectAddRole={(id) => {
            this.setState({ selectedAddRole: id });
          }}
          onCancel={() => {
            this.setState({ showSelectRolePopup: false });
          }}
          onBack={() => {
            this.setState({ showSelectRolePopup: false, showEditUserPopup: true });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tab_item: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
  },
  tab_active: {
    width: '100%',
    height: 3,
    borderRadius: 5,
    backgroundColor: '#5C9DF2',
    position: 'absolute',
    bottom: -1,
  },
  user_item: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  member_item: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 11,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
    borderWidth: 1,
  },
  switch_item: {
    width: '100%',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    marginTop: 15,
    backgroundColor: '#F5F5F5',
  },
});
