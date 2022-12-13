import { observer } from 'mobx-react';
import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
      animationModal: false,
      showComment: false,
      notiList: [
        {
          id: 1,
          title: 'וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני',
          date: '22:45, 10.06.2022',
        },
        {
          id: 2,
          title: 'וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני',
          date: '22:45, 10.06.2022',
        },
        {
          id: 3,
          title: 'וחלקים מתוך הספרות הלטינית הקלאסית מאז 45 לפני',
          date: '22:45, 10.06.2022',
        },
      ],
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  componentDidMount(): void {
    EventBus.getInstance().addListener('changeLang', this.changeLang);
  }

  componentWillUnmount(): void {
    EventBus.getInstance().removeListener(this.changeLang);
  }

  render() {
    return (
      <SwipeUpDownModal
        ContentModalStyle={styles.Modal}
        modalVisible={this.props.visible}
        PressToanimate={this.state.animationModal}
        ContentModal={
          <VerticalLayout>
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
              <LocalImage
                source={require('src/assets/image/ic_close.png')}
                style={{ width: 31, height: 31 }}
              />
              <Text style={{ fontSize: 18, lineHeight: 22 }}>התראות</Text>
            </HorizontalLayout>
            <SearchInput style={{ paddingHorizontal: 20 }} />
            <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
              {this.state.notiList.map((item, index) => {
                return (
                  <NotiItem title={item.title} date={item.date} style={{ marginBottom: 15 }} />
                );
              })}
            </ScrollView>
          </VerticalLayout>
        }
        onClose={() => {
          this.setState({ animationModal: false, showComment: false });
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
