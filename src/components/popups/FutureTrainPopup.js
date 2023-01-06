import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import CommonItem from '../items/CommonItem';
import { CommonUtils } from '../../utils';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';

@observer
class FutureTrainPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onSort = () => {}

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
                alignItems: 'center',
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>אימונים עתידיים</Text>
            </HorizontalLayout>
            <View style={{ paddingHorizontal: 20 }}>
              <SearchInput
                setSearch={(search) => {
                  this.props.setSearch(search);
                }}
              />
            </View>
            <Button
              onPress={() => {
                this.onSort();
              }}>
              <HorizontalLayout style={{ paddingHorizontal: 20, marginVertical: 15 }}>
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
            <ScrollView style={{ paddingHorizontal: 20, paddingBottom: 60 }}>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                data={this.props.data}
                numColumns={1}
                renderItem={({ item, index }) => {
                  return (
                    <CommonItem
                      data={item}
                      select={() => {}}
                      text={item.name}
                      disActiveImage={CommonUtils.getTrainImage(item.type)}
                      fastImage={false}
                      numberOfLines={2}
                      leftText={CommonUtils.getTrainTypeDate(item.date, item.startTime, item.endTime)}
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
              onPress={() => {}}
              style={{
                alignItems: 'center',
                position: 'absolute',
                bottom: 34,
                left: (SCREEN_WIDTH - 45) / 2,
              }}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 45, height: 45 }}
              />
            </Button>
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
    maxHeight: SCREEN_HEIGHT * 0.8
  },
});

export default FutureTrainPopup;
