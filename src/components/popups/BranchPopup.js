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
import { API } from '../../constants/Constants';

@observer
class BranchPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  onCancel = () => {
    this.props.onCancel();
  };

  deleteBranch = () => {
    this.props.deleteBranch();
  };

  showDetail = () => {
    this.onCancel();
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>הסניפים שלנו</Text>
            </HorizontalLayout>
            <SearchInput
              style={{ paddingHorizontal: 20 }}
              setSearch={(search) => {
                this.props.setSearch(search);
              }}
            />
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
                  <BranchItem
                    data={item}
                    selectBranchId={this.props.selectBranchId}
                    selectBranch={() => {
                      this.props.selectBranch(item.id);
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
                this.props.addBranch();
              }}>
              <HorizontalLayout
                style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
                <Text style={{ fontSize: 16, lineHeight: 19 }}>הוספת סניף חדש</Text>
                <LocalImage
                  source={require('src/assets/image/ic_plus_sign.png')}
                  style={{ width: 24, height: 24, marginLeft: 6 }}
                />
              </HorizontalLayout>
            </Button>
            {this.props.selectBranchId != 0 && (
              <VerticalLayout style={{ paddingHorizontal: 20 }}>
                <ActiveButton
                  text="הראה פרטים"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.showDetail();
                  }}
                />
                <DisactiveButton
                  text="למחוק סניף"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.deleteBranch();
                  }}
                />
              </VerticalLayout>
            )}
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

export default BranchPopup;