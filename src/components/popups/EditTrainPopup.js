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
import { requestPost } from '../../utils/ApiUtils';
import { API } from '../../constants/Constants';
import TrainItem from '../items/TrainItem';

@observer
class EditTrainPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onRemove = () => {};

  onKeep = () => {};

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
                paddingHorizontal: 20,
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>עריכת סוגי אימון</Text>
            </HorizontalLayout>
            <View style={{ paddingHorizontal: 20 }}>
              <SearchInput
                setSearch={(search) => {
                  this.props.setSearch(search);
                }}
              />
            </View>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              style={{ paddingHorizontal: 20, marginTop: 20 }}
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
            <Button
              onPress={() => {
                this.props.addTrainType();
              }}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{
                  width: 45,
                  height: 45,
                  marginBottom: 20,
                  marginTop: 15,
                  alignSelf: 'center',
                }}
              />
            </Button>
            <VerticalLayout style={{ paddingHorizontal: 20 }}>
              <DisactiveButton
                text="הסרה"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.onRemove();
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
    height: '90%',
  },
});

export default EditTrainPopup;
