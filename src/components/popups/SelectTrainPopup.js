import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage, CheckBox } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SearchInput } from '../common';
import { API } from '../../constants/Constants';
import TrainItem from '../items/TrainItem';

@observer
class SelectTrainPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainType: [
        { id: 1, name: 'הכל', type: 'personal' },
        { id: 2, name: 'אימון קבוצתי', type: 'group' },
        { id: 3, name: 'איגרוף', type: 'boxing' },
        { id: 4, name: 'זומבה', type: 'zumba' },
        { id: 5, name: 'יוגה', type: 'yoga' },
        { id: 6, name: 'פונקציונאלי', type: 'functional' },
      ],
      selectedTrainId: this.props.selectedTrainId,
    };
  }

  onCancel = () => {
    this.props.onCancel();
    this.setState({ selectedTrainId: this.props.selectedTrainId });
  };

  onKeep = () => {
    this.props.selectTrain(this.state.selectedTrainId);
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
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    this.setState({ selectedTrainId: this.props.selectedTrainId });
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
              <HorizontalLayout>
                <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>סוג אימון</Text>
                <LocalImage
                  source={require('src/assets/image/ic_sort_black.png')}
                  style={{ width: 24, height: 24 }}
                />
              </HorizontalLayout>
            </HorizontalLayout>
            <SearchInput
              setSearch={(search) => {
                this.props.setSearch(search);
              }}
            />
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              style={{ marginVertical: 20 }}
              showsVerticalScrollIndicator={false}
              data={this.state.trainType}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <TrainItem
                    data={item}
                    index={index}
                    key={index}
                    selectTrainId={this.props.selectedTrainId}
                    selectTrain={() => {
                      this.props.selectTrain(item.id);
                    }}
                  />
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
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
    position: 'absolute',
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '90%',
  },
});

export default SelectTrainPopup;
