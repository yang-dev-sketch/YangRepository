import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SearchInput, DisactiveButton } from '../common';
import { BranchItem } from '../items';
import { API, SCREEN_HEIGHT } from '../../constants/Constants';

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
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600' }}>
                הסניפים שלנו
              </Text>
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
              style={{ marginTop: 20 }}
              showsVerticalScrollIndicator={false}
              data={data}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <BranchItem
                    data={item}
                    settingIcon={true}
                    selectable={this.props.selectable}
                    key={index}
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
            {(this.props.selectable && (
              <Button
                onPress={() => {
                  this.props.addBranch();
                }}>
                <HorizontalLayout
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                    marginBottom: 15,
                  }}>
                  <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>
                    הוספת סניף חדש
                  </Text>
                  <LocalImage
                    source={require('src/assets/image/ic_plus_sign.png')}
                    style={{ width: 24, height: 24, marginLeft: 6 }}
                  />
                </HorizontalLayout>
              </Button>
            )) || (
              <>
                <Button
                  onPress={() => {
                    this.props.addBranch();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_plus_sign.png')}
                    style={{ width: 39, height: 39, alignSelf: 'center', marginVertical: 20 }}
                  />
                </Button>
                <DisactiveButton
                  text="הקודם"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.deleteBranch();
                  }}
                />
              </>
            )}
            {this.props.selectable && this.props.selectBranchId != 0 && (
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
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
});

export default BranchPopup;
