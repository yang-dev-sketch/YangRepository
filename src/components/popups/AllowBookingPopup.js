import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton } from '../common';
import { API, API_RES_CODE } from '../../constants/Constants';
import { SCREEN_WIDTH } from 'react-native-common-date-picker/src/contants';

@observer
class AllowBookingPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekList: [
        { id: 1, name: 'יום ראשון' },
        { id: 2, name: 'יום שני' },
        { id: 3, name: 'יום שלישי' },
        { id: 4, name: 'יום חמישי' },
        { id: 5, name: 'יום שישי' },
        { id: 6, name: 'יום שבת' },
        { id: 7, name: 'יום רביעי' },
      ],
    };
  }

  onCheck = (id) => {
    const weekList = this.state.weekList;
    weekList.map((item, index) => {
      if (id === item.id) item.checked = !item.checked;
    });
    this.setState({ weekList: weekList });
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
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600' }}>סוג מסלול:</Text>
            </HorizontalLayout>
            <View
              style={{
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#F2F2F2',
                marginBottom: 20,
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19.2 }}>תכונות ייחודיות</Text>
            </View>
            <Text style={{ fontSize: 16, lineHeight: 19.2, marginBottom: 15 }}>
              לאפשר הזמנה רק בימים ספציפיים
            </Text>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 15, width: '100%' }}
              data={this.state.weekList}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <Button
                    onPress={() => {
                      this.onCheck(item.id);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: (SCREEN_WIDTH - 63) / 2,
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: '#D8D8D8',
                      borderRadius: 11,
                      paddingHorizontal: 15,
                      paddingVertical: 11,
                      marginRight: index % 2 !== 0 ? 0 : 23,
                    }}>
                    {(item.checked && (
                      <LocalImage
                        source={require('src/assets/image/ic_check_on.png')}
                        style={{ width: 23, height: 23 }}
                      />
                    )) || (
                      <LocalImage
                        source={require('src/assets/image/ic_check_off.png')}
                        style={{ width: 23, height: 23 }}
                      />
                    )}
                    <Text style={{ fontSize: 16, lineHeight: 19.2 }}>{item.name}</Text>
                  </Button>
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
              }}
            />
            <ActiveButton
              text="הבא"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onNext();
              }}
            />
            <DisactiveButton
              text="לבטל"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onCancel();
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
});

export default AllowBookingPopup;
