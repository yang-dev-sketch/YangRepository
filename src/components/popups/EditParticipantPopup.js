import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput } from '../common';
import { API, IMAGE_FOO_URL, SCREEN_HEIGHT } from '../../constants/Constants';
import FastImage from 'react-native-fast-image';

@observer
class EditParticipantPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onRemove = () => {
    this.props.onRemove();
  };

  onKeep = () => {
    this.props.onKeep();
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
                marginBottom: 11.94,
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
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>
                עריכת מתאמנים
              </Text>
            </HorizontalLayout>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <Button
                    onPress={() => {
                      // this.props.onSelect(item.id);
                    }}
                    style={[
                      // (item.checked && { borderColor: '#0D65D9' }) ||
                      { borderColor: '#D8D8D8' },
                      styles.trainee_item,
                    ]}>
                    {(item.checked && (
                      // <LocalImage
                      //   source={require('src/assets/image/ic_check_on.png')}
                      //   style={{ width: 22, height: 22 }}
                      // />
                      <View></View>
                    )) || <View></View>}
                    <HorizontalLayout
                      style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                        {item.name}
                      </Text>
                      <View style={{ width: 45, height: 30, overflow: 'hidden', marginLeft: 6 }}>
                        <FastImage
                          source={{ uri: item.avatar ? item.avatar : IMAGE_FOO_URL }}
                          resizeMode={FastImage.resizeMode.cover}
                          style={{ width: 45, height: 45, marginTop: -7.5 }}
                        />
                      </View>
                    </HorizontalLayout>
                  </Button>
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
              }}
            />
            <Button
              onPress={() => {
                this.props.addParticipant();
              }}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 45, height: 45, alignSelf: 'center', marginVertical: 20 }}
              />
            </Button>
            {/* <DisactiveButton
              text="הסרה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onRemove();
              }}
            /> */}
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.9,
    paddingHorizontal: 20,
  },
  trainee_item: {
    width: '100%',
    paddingLeft: 21,
    paddingRight: 15,
    paddingVertical: 17.5,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default EditParticipantPopup;
