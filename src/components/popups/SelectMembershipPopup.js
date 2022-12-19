import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Langs, Colors, Dimens, FontFamily, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage, CheckBox } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import NotiItem from '../items/NotiItem';
import TrackItem from '../items/TrackItem';

@observer
class SelectMembershipPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                marginBottom: 11.94,
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>סוג מסלול:</Text>
            </HorizontalLayout>
            <Text style={{ fontSize: 16, lineHeight: 19, marginBottom: 15 }}>בחר סוג חברות</Text>
            <ScrollView>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                data={this.props.data}
                style={{ marginBottom: 45 }}
                numColumns={1}
                renderItem={({ item, index }) => {
                  return (
                    <Button
                      onPress={() => {
                        this.props.selectMembership(item.id);
                      }}>
                      <HorizontalLayout
                        style={[
                          styles.membership_item,
                          this.props.selectedMembershipId === item.id && { borderColor: '#0D65D9' },
                        ]}>
                        {(this.props.selectedMembershipId === item.id && (
                          <LocalImage
                            source={require('src/assets/image/ic_check_on.png')}
                            style={{ width: 22, height: 22, marginRight: 21 }}
                          />
                        )) || (
                          <LocalImage
                            source={require('src/assets/image/ic_check_off.png')}
                            style={{ width: 22, height: 22 }}
                          />
                        )}
                        <HorizontalLayout
                          style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '80%',
                          }}>
                          <Text
                            numberOfLines={2}
                            style={{ fontSize: 16, lineHeight: 22, marginRight: 7 }}>
                            {item.name}
                          </Text>
                          {(this.props.selectedMembershipId === item.id && (
                            <LocalImage
                              source={require('src/assets/image/ic_track_round_on.png')}
                              style={{ width: 45, height: 45 }}
                            />
                          )) || (
                            <LocalImage
                              source={require('src/assets/image/ic_track_round_off.png')}
                              style={{ width: 45, height: 45 }}
                            />
                          )}
                        </HorizontalLayout>
                      </HorizontalLayout>
                    </Button>
                  );
                }}
                keyExtractor={(item, idx) => idx.toString()}
                ItemSeparatorComponent={() => {
                  return <View style={{ height: 15 }} />;
                }}
              />
            </ScrollView>
            <ActiveButton
              text="הבא"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onNext();
              }}
            />
            <DisactiveButton
              text="לבטל"
              style={{ marginBottom: 40 }}
              action={() => {
                this.onCancel();
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
  },
  membership_item: {
    width: '100%',
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
});

export default SelectMembershipPopup;
