import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Langs, Colors, Dimens, FontFamily, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage, CheckBox } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SearchInput, DisactiveButton } from '../common';
import { ScrollView } from 'react-navigation';
import NotiItem from '../items/NotiItem';
import { BranchItem } from '../items';
import { requestPost } from '../../utils/ApiUtils';
import { API, MAIN_TAB, SCREEN_HEIGHT } from '../../constants/Constants';
import { SCREEN_WIDTH } from 'react-native-common-date-picker/src/contants';
import CommonItem from '../items/CommonItem';

@observer
class EditUserPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 'all',
      search: '',
    };
  }

  onCancel = () => {
    this.props.selectAddUser(0);
    this.props.onCancel();
  };

  onKeep = () => {
    this.props.selectAddUser(0);
  };

  addTrainee = () => {
    this.props.selectAddUser(0);
    this.addTrainee();
  };

  render() {
    const data = this.props.data;
    return (
      <SwipeUpDownModal
        ContentModalStyle={styles.Modal}
        modalVisible={this.props.visible}
        onClose={() => {
          this.props.onCancel();
        }}
        ContentModal={
          <VerticalLayout style={{ height: '100%' }}>
            <View
              style={{ width: '100%', height: 23, alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: 47,
                  height: 3,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  opacity: 0.2,
                }}></View>
            </View>
            <HorizontalLayout
              style={{
                alignItem: 'center',
                justifyContent: 'space-between',
                marginBottom: 16.94,
              }}>
              <Button
                onPress={() => {
                  this.props.selectAddUser(0);
                  this.props.onCancel();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 31, height: 31 }}
                />
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>עריכת משתמשים</Text>
            </HorizontalLayout>
            <HorizontalLayout
              style={{ width: '100%', justifyContent: 'space-between', marginBottom: 15 }}>
              <Button
                onPress={() => {
                  this.setState({ userType: 'waiting' }, () => {
                    this.props.setSearch(this.state.search, this.state.userType);
                  });
                }}
                style={[
                  this.state.userType === 'waiting' && {
                    borderWidth: 1,
                    borderColor: '#94BDF2',
                  },
                  {
                    width: (SCREEN_WIDTH - 63) / 2,
                    height: 37,
                    borderRadius: 11,
                    backgroundColor: '#F5F5F5',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#1E6FD9' }}>מחכים לאישור</Text>
              </Button>
              <Button
                onPress={() => {
                  this.setState({ userType: 'all' }, () => {
                    this.props.setSearch();
                  });
                }}
                style={[
                  this.state.userType === 'all' && {
                    borderWidth: 1,
                    borderColor: '#94BDF2',
                  },
                  {
                    width: (SCREEN_WIDTH - 63) / 2,
                    height: 37,
                    borderRadius: 11,
                    backgroundColor: '#F5F5F5',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#1E6FD9' }}>כל המשתמשים</Text>
              </Button>
            </HorizontalLayout>
            <SearchInput
              setSearch={(search) => {
                this.setState({ search: search });
                this.props.setSearch(search, this.state.userType);
              }}
            />
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              style={{ marginVertical: 15 }}
              showsVerticalScrollIndicator={false}
              data={data}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <CommonItem
                    data={item}
                    text={item.name}
                    activeImage={item.avatar}
                    fastImage={true}
                    imageCut={true}
                    imageCutDisable={true}
                    selectId={this.props.selectedAddUser}
                    select={() => {
                      this.props.selectAddUser(item.id);
                    }}
                  />
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
              }}
            />
            <Button
              onPress={() => {
                this.props.addTrainee();
              }}
              style={{ alignSelf: 'center', marginBottom: 25 }}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 45, height: 45 }}
              />
            </Button>
            {(this.props.selectedAddUser === 0 && (
              <ActiveButton
                text="שמירה"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.onKeep();
                }}
              />
            )) || (
              <>
                <ActiveButton
                  text="להקצות תפקיד"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.props.assignRole();
                  }}
                />
                <DisactiveButton
                  text="לבטל"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.props.selectAddUser(0);
                    this.onCancel();
                  }}
                />
              </>
            )}
          </VerticalLayout>
        }
        onClose={() => {
          this.props.selectAddUser(0);
          this.props.onCancel();
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  Modal: {
    position: 'absolute',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.9,
    paddingHorizontal: 20,
  },
});

export default EditUserPopup;
