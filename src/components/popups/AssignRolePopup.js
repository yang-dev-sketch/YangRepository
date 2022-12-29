import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton } from '../common';
import SwitchItem from '../items/SwitchItem';

@observer
class AssignRolePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleList: props.data,
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onSelect = (id) => {
    const roleList = this.state.roleList;
    roleList.map((item, index) => {
      if (id == item.id) item.checked = !item.checked;
    });
    this.setState({ roleList: roleList });
  };

  onKeep = () => {
    // requestPost(API.Home.set_role, {
    //   data: this.state.roleList,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.props.onSelect(this.state.roleList);
    //   } else {
    //   }
    // });
  };

  render() {
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
                marginBottom: 26.94,
              }}>
              <Button
                onPress={() => {
                  this.props.onCancel();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 31, height: 31 }}
                />
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600' }}>הקצה תפקיד</Text>
            </HorizontalLayout>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 30 }}
              data={this.state.roleList}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <SwitchItem
                    data={item}
                    key={index}
                    onSelect={() => {
                      this.onSelect(item.id);
                    }}
                  />
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#F2F2F2',
                      marginVertical: 10,
                    }}
                  />
                );
              }}
            />
            <ActiveButton
              text="שמירה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onKeep();
              }}
            />
          </VerticalLayout>
        }
        onClose={() => {
          this.props.onCancel();
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  Modal: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '95%',
  },
});

export default AssignRolePopup;
