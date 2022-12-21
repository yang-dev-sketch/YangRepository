import { observer } from 'mobx-react';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SetValueGroup } from '../common';
import { ScrollView } from 'react-navigation';
import CommonInput from '../common/CommonInput';
import CheckBox from '@react-native-community/checkbox';
import { requestUpload } from '../../utils/ApiUtils';
import ImageCropPicker from 'react-native-image-crop-picker';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_HEIGHT } from '../../constants/Constants';
import DropDownPicker from '../controls/DropDownPicker';

@observer
class AddTraineeRolePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_email: '',
      firstName: '',
      lastName: '',
      branchType: [{ name: 'ענף' }, { name: 'ענף' }, { name: 'ענף' }],
      selectedBranch: 'ענף',
    };
  }

  assignRole = () => {
    // requestPost(API.Home.add_trainee, {
    //   phone_email: this.state.phone_email,
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
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
                marginBottom: 11.94,
              }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    this.props.onBack();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_left.png')}
                    style={{ width: 11.62, height: 20.73, marginRight: 20.93 }}
                  />
                </Button>
                <Button
                  onPress={() => {
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
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 5, backgroundColor: '#F5F5F5' }]}
                title="טלפון / אימייל"
                image={require('src/assets/image/ic_email.png')}
                inputNode={
                  <CommonInput
                    numberOfLines={1}
                    backgroundColor="white"
                    value={this.state.phone_email}
                    onChangeText={(text) => {
                      this.setState({ phone_email: text });
                    }}
                  />
                }
              />
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 5, backgroundColor: '#F5F5F5' }]}
                title="שם פרטי ושם משפחה"
                image={require('src/assets/image/ic_coach_on.png')}
                inputNode={
                  <HorizontalLayout
                    style={{
                      width: '100%',
                      height: 40,
                      borderRadius: 43,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                    }}>
                    <TextInput
                      style={{ width: '45%', textAlign: 'right' }}
                      value={this.state.lastName}
                      onChangeText={(text) => this.setState({ lastName: text })}
                    />
                    <Text>/</Text>
                    <TextInput
                      style={{ width: '45%', textAlign: 'right' }}
                      value={this.state.firstName}
                      onChangeText={(text) => this.setState({ firstName: text })}
                    />
                  </HorizontalLayout>
                }
              />
              <SetValueGroup
                style={[Styles.input_wrapper, { backgroundColor: '#F5F5F5' }]}
                title="שם פרטי ושם משפחה"
                image={require('src/assets/image/ic_coach_on.png')}
                inputNode={
                  <DropDownPicker
                    editIcon={false}
                    data={this.state.branchType}
                    selectedValue={this.state.selectedBranch}
                    onSelect={(value) => {
                      this.setState({ selectedBranch: value.name });
                    }}
                  />
                }
              />
              <Text style={{ fontSize: 16, lineHeight: 19, marginVertical: 15 }}>הקצה תפקיד</Text>
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

export default AddTraineeRolePopup;
