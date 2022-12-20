import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Langs, Colors, Dimens, FontFamily, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage, CheckBox } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ScrollView } from 'react-navigation';
import { SCREEN_HEIGHT } from 'react-native-common-date-picker/src/contants';
import { DisactiveButton } from '../common';

@observer
class LegalDocumentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentList: [
        { id: 1, title: 'תקנון החברה', link: '' },
        { id: 2, title: 'תקנון החברה', link: '' },
        { id: 3, title: 'תקנון החברה', link: '' },
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
                alignItem: 'center',
                justifyContent: 'space-between',
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>מסמכים משפטיים</Text>
            </HorizontalLayout>
            <ScrollView style={{ marginTop: 20 }}>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 15 }}
                data={this.state.documentList}
                numColumns={1}
                renderItem={({ item, index }) => {
                  return (
                    <Button onPress={() => {}} style={styles.document_item}>
                      <LocalImage
                        source={require('src/assets/image/ic_download.png')}
                        style={{ width: 45, height: 45 }}
                      />
                      <Text>{item.title}</Text>
                    </Button>
                  );
                }}
                keyExtractor={(item, idx) => idx.toString()}
                ItemSeparatorComponent={() => {
                  return <View style={{ height: 15 }} />;
                }}
              />
            </ScrollView>
            <DisactiveButton
              style={{ marginBottom: 15 }}
              text="הקודם"
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
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  document_item: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default LegalDocumentPopup;
