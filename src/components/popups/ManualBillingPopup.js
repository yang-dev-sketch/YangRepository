import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SetValueGroup } from '../common';
import CommonInput from '../common/CommonInput';
import { API, API_RES_CODE } from '../../constants/Constants';
import DropDownPicker from '../controls/DropDownPicker';

@observer
class ManualBillingPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: '',
      invoiceType: [],
      selectedDropdown: 'אימון אישי',
      total: null,
      mission: '',
    };
  }

  getInfo = () => {
    const invoiceType = [
      { id: 1, name: 'כללי' },
      { id: 2, name: 'כללי' },
      { id: 3, name: 'כללי' },
      { id: 4, name: 'כללי' },
      { id: 5, name: 'כללי' },
    ];
    this.setState({ invoiceType: invoiceType });
  };

  componentDidMount = () => {
    this.getInfo();
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
                  this.props.onCancel();
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 31, height: 31 }}
                />
              </Button>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>חיוב ידני</Text>
            </HorizontalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="חשבון"
              inputNode={
                <DropDownPicker
                  editIcon={false}
                  data={this.state.invoiceType}
                  onEdit={() => {
                    this.setState({ showEditTrainPopup: true });
                  }}
                  selectedValue={this.state.selectedDropdown}
                  onSelect={(value) => {
                    this.setState({ selectedDropdown: value.name });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="סך הכל"
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="white"
                  value={this.state.total}
                  onChangeText={(text) => {
                    this.setState({ total: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="תיאור המשימה"
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="white"
                  value={this.state.mission}
                  numberOfLines={4}
                  onChangeText={(text) => {
                    this.setState({ mission: text });
                  }}
                />
              }
            />
            <ActiveButton text="שמירה" style={{ marginBottom: 15 }} action={() => {}} />
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
  },
});

export default ManualBillingPopup;
