import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton } from '../common';
import { ScrollView } from 'react-navigation';
import { API, API_RES_CODE, SCREEN_HEIGHT } from '../../constants/Constants';

@observer
class SelectRolePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  assignRole = () => {
    // requestPost(API.Home.add_trainee, {
    //   phone_email: this.state.phone_email,
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.props.selectAddRole(0);
    this.props.onBack();
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
                marginBottom: 5.94,
              }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    this.props.selectAddRole(0);
                    this.props.onBack();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_left.png')}
                    style={{ width: 11.62, height: 20.73, marginRight: 20.93 }}
                  />
                </Button>
                <Button
                  onPress={() => {
                    this.props.selectAddRole(0);
                    this.props.onCancel();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_close.png')}
                    style={{ width: 31, height: 31 }}
                  />
                </Button>
              </HorizontalLayout>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>להזמין חדש</Text>
            </HorizontalLayout>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ fontSize: 16, lineHeight: 19, marginBottom: 15 }}>הקצה תפקיד</Text>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 45 }}
                data={this.props.data}
                numRows={1}
                renderItem={({ item, index }) => {
                  return (
                    <Button
                      key={index}
                      onPress={() => {
                        this.props.selectAddRole(item.id);
                      }}
                      style={[
                        (this.props.selectedAddRole === item.id && {
                          borderColor: '#0D65D9',
                        }) || { borderColor: '#D8D8D8' },
                        styles.role_item,
                      ]}>
                      {(this.props.selectedAddRole === item.id && (
                        <LocalImage
                          source={require('src/assets/image/ic_check_on.png')}
                          style={{ width: 22, height: 22 }}
                        />
                      )) || (
                        <LocalImage
                          source={require('src/assets/image/ic_check_off.png')}
                          style={{ width: 22, height: 22 }}
                        />
                      )}
                      <Text style={{ fontSize: 16, lineHeight: 19 }}>{item.name}</Text>
                    </Button>
                  );
                }}
                keyExtractor={(item, idx) => idx.toString()}
                ItemSeparatorComponent={() => {
                  return <View style={{ height: 10 }} />;
                }}
              />
            </ScrollView>
            <ActiveButton
              text="להקצות תפקיד"
              style={{ marginBottom: 15 }}
              action={() => {
                this.assignRole();
              }}
            />
          </VerticalLayout>
        }
        onClose={() => {
          this.props.selectAddRole(0);
          this.props.onCancel();
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  Modal: {
    position: 'absolute',
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  role_item: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 11,
  },
});

export default SelectRolePopup;
