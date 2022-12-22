import { observer } from 'mobx-react';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput, SetValueGroup } from '../common';
import { ScrollView } from 'react-navigation';
import CommonInput from '../common/CommonInput';
import CheckBox from '@react-native-community/checkbox';
import { requestUpload } from '../../utils/ApiUtils';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  API,
  API_RES_CODE,
  IMAGE_FOO_URL,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/Constants';
import { FlatList } from 'react-native-gesture-handler';
import CommonItem from '../items/CommonItem';
import DropDownPicker from '../controls/DropDownPicker';

@observer
class FilterMemberPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sexType: [{ name: 'איש', name: 'אִשָׁה' }],
      selectedSex: 'איש',
      kind: [{ name: '', name: '' }],
      selectedKind: '',
      routeType: [{ name: '', name: '' }],
      selectedRoute: '',
      date: '',
      borth: '',
    };
  }

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
                  this.props.onCancel();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 31, height: 31 }}
                />
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>מסנן</Text>
            </HorizontalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="מִין"
              image={require('src/assets/image/ic_gender.png')}
              inputNode={
                <DropDownPicker
                  editIcon={false}
                  data={this.state.sexType}
                  selectedValue={this.state.selectedSex}
                  onSelect={(value) => {
                    this.setState({ selectedSex: value.name });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="סוּג"
              image={require('src/assets/image/ic_credit.png')}
              inputNode={
                <DropDownPicker
                  editIcon={false}
                  data={this.state.kindType}
                  selectedValue={this.state.selectedKind}
                  onSelect={(value) => {
                    this.setState({ selectedKind: value.name });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="סוג מסלול"
              image={require('src/assets/image/ic_credit.png')}
              inputNode={
                <DropDownPicker
                  editIcon={false}
                  data={this.state.routeType}
                  selectedValue={this.state.selectedRoute}
                  onSelect={(value) => {
                    this.setState({ selectedRoute: value.name });
                  }}
                />
              }
            />
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 45 }}>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
                  title="התאריך"
                  image={require('src/assets/image/ic_date.png')}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={20}
                      lineHeight={24}
                      numberOfLines={1}
                      backgroundColor="white"
                      value={this.state.date}
                      onChangeText={(text) => {
                        this.setState({ date: text });
                      }}
                    />
                  }
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
                  title="תאריך לידה"
                  image={require('src/assets/image/ic_birthday.png')}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={20}
                      lineHeight={24}
                      numberOfLines={1}
                      backgroundColor="white"
                      value={this.state.birth}
                      onChangeText={(text) => {
                        this.setState({ birth: text });
                      }}
                    />
                  }
                />
              </View>
            </HorizontalLayout>
            <ActiveButton
              text="שמירה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onKeep();
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 20,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  input_wrapper: {
    width: '100%',
    borderRadius: 11,
    padding: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input_wrapper_right: {
    width: '100%',
    borderRadius: 11,
    padding: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  input_label: {
    fontSize: 16,
    lineHeight: 19,
    color: '#5C9DF2',
    width: '50%',
  },
});

export default FilterMemberPopup;
