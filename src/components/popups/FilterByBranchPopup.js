import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import { API, MAIN_TAB, SCREEN_HEIGHT } from '../../constants/Constants';

@observer
class FilterByBranchPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onFilter = () => {
    this.props.onFilter();
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
              <HorizontalLayout>
                <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600' }}>סינון לפי: סניף</Text>
                <LocalImage
                  source={require('src/assets/image/ic_sort_black.png')}
                  style={{ width: 24, height: 24 }}
                />
              </HorizontalLayout>
            </HorizontalLayout>
            <SearchInput
              setSearch={(search) => {
                this.props.setSearch(search);
              }}
            />
            <ScrollView>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                style={{ marginVertical: 15 }}
                showsVerticalScrollIndicator={false}
                data={data}
                numColumns={1}
                renderItem={({ item, index }) => {
                  return (
                    <Button style={styles.branch_item}>
                      <Text>{item.name}</Text>
                      <LocalImage
                        source={require('src/assets/image/ic_location.png')}
                        style={{ width: 27, height: 27, marginLeft: 13.48 }}
                      />
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
              text="סנן"
              style={{ marginBottom: 15 }}
              action={() => {
                this.onFilter();
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
  branch_item: {
    width: '100%',
    padding: 19,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

export default FilterByBranchPopup;
