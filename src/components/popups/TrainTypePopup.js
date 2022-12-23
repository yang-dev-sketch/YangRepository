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
import TrainItem from '../items/TrainItem';

@observer
class TrainTypePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCancel = () => {
    this.props.onCancel();
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
                <Text style={{ fontSize: 18, lineHeight: 22 }}>סינון לפי: סוג אימון</Text>
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
              style={{ marginVertical: 15 }}
              showsVerticalScrollIndicator={false}
              data={data}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <TrainItem
                    data={item}
                    index={index}
                    key={index}
                    selectTrainId={this.props.selectTrainId}
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
              text="סנן"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onFilter();
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

export default TrainTypePopup;
