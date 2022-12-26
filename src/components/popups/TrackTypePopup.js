import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import { SCREEN_HEIGHT } from '../../constants/Constants';
import TrackItem from "../items/TrackItem";

@observer
class TrackTypePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: false,
    };
  }

  onCancel = () => {
    this.setState({ sortType: false });
    this.props.onCancel();
  };

  onRemove = () => {
    // requestPost(API.Home.delete_track, {
    //   id: this.props.selectedTrackId,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({ sortType: true });
    this.props.deleteTrack();
    this.props.selectTrack(0);
    //   } else {
    //   }
    // });
  };

  onSort = () => {};

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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>סוג מסלול:</Text>
            </HorizontalLayout>
            {(this.state.sortType && (
              <VerticalLayout style={{ marginBottom: 20 }}>
                <SearchInput
                  setSearch={(search) => {
                    this.props.searchTrack(search);
                  }}
                />
                <Button
                  onPress={() => {
                    this.onSort();
                  }}
                  style={{ marginTop: 15 }}>
                  <HorizontalLayout>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 19,
                        color: '#5C9DF2',
                        textDecorationLine: 'underline',
                      }}>
                      סינון
                    </Text>
                    <LocalImage
                      source={require('src/assets/image/ic_sort.png')}
                      style={{ width: 21, height: 21 }}
                    />
                  </HorizontalLayout>
                </Button>
              </VerticalLayout>
            )) ||
              null}
            <ScrollView>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                data={this.props.data}
                numColumns={1}
                renderItem={({ item, index }) => {
                  return (
                    <TrackItem
                      data={item}
                      selectTrack={() => {
                        this.props.selectTrack(item.id);
                      }}
                      selectedTrackId={this.props.selectedTrackId}
                    />
                  );
                }}
                keyExtractor={(item, idx) => idx.toString()}
                ItemSeparatorComponent={() => {
                  return <View style={{ height: 15 }} />;
                }}
              />
            </ScrollView>
            <Button
              onPress={() => {
                this.props.addTrack();
              }}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{
                  width: 45,
                  height: 45,
                  marginBottom: 25,
                  marginTop: 20,
                  alignSelf: 'center',
                }}
              />
            </Button>
            {this.props.selectedTrackId != 0 && !this.state.sortType && (
              <DisactiveButton
                text="הסרה"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.onRemove();
                }}
              />
            )}
            <ActiveButton text="סגירה" style={{ marginBottom: 15 }} action={() => {}} />
            {this.state.sortType && (
              <DisactiveButton
                text="לבטל"
                style={{ marginBottom: 15 }}
                action={() => {
                  this.onCancel();
                }}
              />
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
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
});

export default TrackTypePopup;
