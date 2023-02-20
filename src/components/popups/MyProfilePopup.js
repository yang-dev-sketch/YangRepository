import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/Constants';
import DatePicker from 'react-native-date-picker';
import TimePicker from '../controls/TimePicker';
import FastImage from "react-native-fast-image";

@observer
class MyProfilePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'ג׳ון דו as',
      avatar: ''
    };
  }

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
                הפרופילים שלי
              </Text>
            </HorizontalLayout>
            <SearchInput
              setSearch={(search) => {
                this.props.setSearch(search);
              }}
            />
            <Text
              style={{
                fontSize: 18,
                lineHeight: 22,
                color: '#000',
                fontWeight: '600',
                textAlign: 'right',
                marginTop: 15,
              }}>
              STEPS
            </Text>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              style={{ marginVertical: 10 }}
              showsVerticalScrollIndicator={false}
              data={data}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <Button
                    onPress={() => {
                      this.props.selectAccount(item.id);
                    }}
                    style={[
                      (item.id === this.props.selectId && { borderColor: '#0D65D9' }) || {
                        borderColor: '#D8D8D8',
                      },
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 15,
                        borderWidth: 1,
                        borderRadius: 8,
                      },
                    ]}>
                    <HorizontalLayout>
                      {(item.id === this.props.selectId && (
                        <LocalImage
                          source={require('src/assets/image/ic_ring.png')}
                          style={{ width: 18, height: 18, marginRight: 11 }}
                        />
                      )) || <View></View>}
                      <Text
                        style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600' }}>
                        {item.name}
                      </Text>
                    </HorizontalLayout>
                    <HorizontalLayout style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontFamily: 'Danidin' }}>
                        {item.type}
                      </Text>
                      <LocalImage
                        source={require('src/assets/image/ic_step.png')}
                        style={{ width: 39, height: 39, marginLeft: 11 }}
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
            <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontWeight: '600', marginVertical: 10, fontFamily: 'Danidin' }}>
              חשבון אישי
            </Text>
            <HorizontalLayout
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#EFEFEF',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: 15,
                marginBottom: 22
              }}>
              <Text style={{ fontSize: 18, lineHeight: 22, color: '#000', fontFamily: 'Danidin' }}>{this.state.name}</Text>
              <FastImage
                source={{ uri: this.state.avatar ? this.state.avatar : IMAGE_FOO_URL }}
                resizeMode={FastImage.resizeMode.cover}
                style={{ width: 39, height: 39, marginLeft: 11 }}
              />
            </HorizontalLayout>
            <Button
              onPress={() => {}}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 30,
                flexDirection: 'row',
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>הוספת חשבון</Text>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 24, height: 24, marginLeft: 6 }}
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
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    width: '100%',
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
});

export default MyProfilePopup;
