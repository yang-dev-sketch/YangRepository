import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput } from '../common';
import { API, API_RES_CODE, IMAGE_FOO_URL } from '../../constants/Constants';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

@observer
class TrainerOrganizationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyState: false,
    };
  }

  addTrainee = () => {
    const data = this.props.data.filter((item) => {
      return item.checked;
    });
    if(data.length > 0) {
      this.setState({ modifyState: false }, () => {
        this.props.addTrainer(data);
      });
    }
  };

  removeTrainee = () => {
    // requestPost(API.Home.delete_trainee, {
    //   id: this.props.selectId,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.props.removeTrainee();
    //   } else {
    //   }
    // });
  };

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
                alignItem: 'center',
                justifyContent: 'space-between',
                marginBottom: 16.94,
              }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                {this.state.modifyState && (
                  <Button
                    onPress={() => {
                      this.setState({ modifyState: false });
                      this.props.unSelectAll();
                    }}>
                    <LocalImage
                      source={require('src/assets/image/ic_left.png')}
                      style={{ width: 11.62, height: 20.73, marginRight: 20.93 }}
                    />
                  </Button>
                )}
                <Button
                  onPress={() => {
                    this.setState({ modifyState: false });
                    this.props.onCancel();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_close.png')}
                    style={{ width: 31, height: 31 }}
                  />
                </Button>
              </HorizontalLayout>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>הסניפים שלנו</Text>
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
              data={data}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <Button
                    onPress={() => {
                      this.state.modifyState && this.props.selectTrainer(item.id);
                    }}
                    style={[
                      (this.state.modifyState && { paddingVertical: 10 }) || {
                        paddingVertical: 17.5,
                      },
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                        borderWidth: 1,
                        borderColor: item.checked ? '#0D65D9' : '#D8D8D8',
                        borderRadius: 11,
                        paddingLeft: 21,
                        paddingRight: 10,
                      },
                    ]}>
                    {(item.checked && (
                      <LocalImage
                        source={require('src/assets/image/ic_check_on.png')}
                        style={{ width: 23, height: 23 }}
                      />
                    )) || <View></View>}
                    <HorizontalLayout style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, lineHeight: 19.2 }}>{item.name}</Text>
                      {(this.state.modifyState && (
                        <FastImage
                          source={{ uri: data.avatar ? data.avatar : IMAGE_FOO_URL }}
                          resizeMode={FastImage.resizeMode.cover}
                          style={{ width: 45, height: 45, marginLeft: 7 }}
                        />
                      )) || (
                        <View style={{ width: 45, height: 30, overflow: 'hidden', marginLeft: 7 }}>
                          <FastImage
                            source={{ uri: data.avatar ? data.avatar : IMAGE_FOO_URL }}
                            resizeMode={FastImage.resizeMode.cover}
                            style={{ width: 45, height: 45, marginTop: -7.5 }}
                          />
                        </View>
                      )}
                    </HorizontalLayout>
                  </Button>
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
              }}
            />
            {(!this.state.modifyState && (
              <>
                <Button
                  onPress={() => {
                    this.setState({ modifyState: true });
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_plus_sign.png')}
                    style={{
                      width: 39,
                      height: 39,
                      marginBottom: 25,
                      alignSelf: 'center',
                    }}
                  />
                </Button>
                <ActiveButton
                  text="שמירה"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.onKeep();
                  }}
                />
              </>
            )) || (
              <>
                <ActiveButton
                  text="הוספה"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.addTrainee();
                  }}
                />
                <DisactiveButton
                  text="מחק את המאמן"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.removeTrainee();
                  }}
                />
              </>
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
    height: '95%',
    paddingHorizontal: 20,
  },
});

export default TrainerOrganizationPopup;
