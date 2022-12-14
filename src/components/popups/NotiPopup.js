import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Langs, Colors, Dimens, FontFamily, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage, CheckBox } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import NotiItem from '../items/NotiItem';

@observer
class NotiPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notiList: [
        {
          id: 1,
          title: 'וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני',
          date: '2022-12-14 08:50:10',
          task: 'שם המשימה',
          avatar: '',
        },
        {
          id: 2,
          title: 'וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני',
          date: '2022-12-13 01:28:14',
          task: 'שם המשימה',
          avatar: '',
        },
        {
          id: 3,
          title: 'וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני',
          date: '2022-12-13 01:28:14',
          task: 'שם המשימה',
          avatar: '',
        },
        {
          id: 4,
          title: 'וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני',
          date: '2022-12-13 01:28:14',
          task: 'שם המשימה',
          avatar: '',
        },
        {
          id: 5,
          title: 'וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני',
          date: '2022-12-13 01:28:14',
          task: 'שם המשימה',
          avatar: '',
        },
      ],
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>התראות</Text>
            </HorizontalLayout>
            <SearchInput
              style={{ paddingHorizontal: 20 }}
              setSearch={(search) => {
                this.props.setSearch(search);
              }}
            />
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15 }}
                data={this.state.notiList}
                numColumns={1}
                renderItem={({ item, index }) => {
                  return (
                    <NotiItem
                      data={item}
                      setTrainingTime={() => {
                        this.props.setTrainingTime(item.id, item.date);
                      }}
                    />
                  );
                }}
                keyExtractor={(item, idx) => idx.toString()}
                ItemSeparatorComponent={() => {
                  return <View style={{ height: 15 }} />;
                }}
              />
            </ScrollView>
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
  },
});

export default NotiPopup;
