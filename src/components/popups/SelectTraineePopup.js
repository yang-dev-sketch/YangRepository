import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput } from '../common';
import { FlatList } from 'react-native-gesture-handler';
import CommonItem from '../items/CommonItem';
import Toast from 'react-native-root-toast';
import ToastContainer from '../controls/ToastContainer';
import { IMAGE_FOO_URL, SCREEN_HEIGHT } from '../../constants/Constants';
import FastImage from 'react-native-fast-image';

@observer
class SelectTraineePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNum: 0,
    };
  }

  addParticipant = () => {
    Toast.show(<ToastContainer title={this.state.selectedNum + " מתאמנים נוספו בהצלחה! "} />, {
      duration: 3000,
      position: 20,
      opacity: 1,
      containerStyle: { backgroundColor: 'transparent' },
    });
    this.props.addParticipant();
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
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600' }}>
                עריכת מתאמנים: הוספה
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
              style={{ marginVertical: 20 }}
              showsVerticalScrollIndicator={false}
              data={data}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <Button
                    onPress={() => {
                      if (item.checked) {
                        this.setState({ selectedNum: this.state.selectedNum - 1 });
                      } else {
                        this.setState({ selectedNum: this.state.selectedNum + 1 });
                      }
                      this.props.select(item.id);
                    }}
                    style={[
                      (item.checked && { borderColor: '#0D65D9' }) || { borderColor: '#D8D8D8' },
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        paddingLeft: 21,
                        paddingRight: 15,
                        borderWidth: 1,
                        borderRadius: 8,
                      },
                    ]}>
                    {(item.checked && (
                      <LocalImage
                        source={require('src/assets/image/ic_check_on.png')}
                        style={{ width: 22, height: 22 }}
                      />
                    )) || <View></View>}
                    <HorizontalLayout style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>
                        {item.name}
                      </Text>
                      <FastImage
                        source={{ uri: item.avatar ? item.avatar : IMAGE_FOO_URL }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{ width: 45, height: 45, marginLeft: 7 }}
                      />
                    </HorizontalLayout>
                  </Button>
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
              }}
            />
            <ActiveButton
              text="הוספה"
              style={{ marginBottom: 15 }}
              action={() => {
                this.addParticipant();
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
    maxHeight: SCREEN_HEIGHT,
    paddingHorizontal: 20,
  },
});

export default SelectTraineePopup;
