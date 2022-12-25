import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SetValueGroup } from '../common';
import { API, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';
import PaymentMethodCard from '../common/PaymentMethodCard';
import DropDownPicker from '../controls/DropDownPicker';

@observer
class BranchDetailPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billingType: [
        { id: 1, name: 'שיטת חיוב' },
        { id: 1, name: 'שיטת חיוב' },
      ],
      type: 'שיטת חיוב',
    };
  }

  onCancel = () => {
    this.props.onCancel();
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>הסניפים שלנו</Text>
            </HorizontalLayout>
            <PaymentMethodCard />
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginTop: 15, marginBottom: 45, backgroundColor: '#F5F5F5' },
              ]}
              title="שיטת חיוב"
              image={require('src/assets/image/ic_branch.png')}
              inputNode={
                <DropDownPicker
                  backgroundColor="white"
                  data={this.state.billingType}
                  selectedValue={this.state.type}
                  onSelect={(value) => {
                    this.setState({ type: value.name });
                  }}
                />
              }
            />
            <ActiveButton
              text="שמירת פרטים"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onSave();
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
    maxHeight: SCREEN_HEIGHT * 0.9,
    paddingHorizontal: 20,
  },
});

export default BranchDetailPopup;
