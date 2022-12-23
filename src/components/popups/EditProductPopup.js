import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Langs, Colors, Dimens, FontFamily, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage, CheckBox } from '../controls';
import EventBus from 'react-native-event-bus';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, CommonInput, SearchInput, SetValueGroup } from '../common';
import { ScrollView } from 'react-navigation';
import NotiItem from '../items/NotiItem';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_WIDTH } from '../../constants/Constants';
import DisactiveButton from '../common/DisactiveButton';
import DatePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import { requestUpload } from '../../utils/ApiUtils';

@observer
class EditProductPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  onCancel = () => {
    this.props.onCancel();
  };

  uploadLogo = (filepath) => {
    // requestUpload(API.Upload.upload, filepath, '').then((result) => {
    // if (result.code == API_RES_CODE.SUCCESS) {
    this.props.setLogo(filepath);
    // } else {
    //   Toast.show(result.msg);
    // }
    // });
  };

  onGallery = () => {
    // ImageCropPicker.openPicker({
    //   cropping: true,
    // }).then((image) => {
    //   this.uploadLogo(image.path);
    // });
  };

  updateProduct = () => {
    // requestPost(API.Home.update_product, {
    //   id: this.props.selectedId,
    //   logo: this.props.logo,
    //   name: this.props.name,
    //   description: this.props.description,
    //   stock: this.props.stock,
    //   price: this.props.price
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.props.updateProduct();
    //   } else {
    //   }
    // });
  };

  render() {
    return (
      <SwipeUpDownModal
        ContentModalStyle={styles.Modal}
        modalVisible={this.props.visible}
        onClose={() => {
          this.onCancel();
        }}
        ContentModal={
          <VerticalLayout style={{ paddingHorizontal: 20 }}>
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>עריכה</Text>
            </HorizontalLayout>
            <VerticalLayout
              style={{
                width: 155,
                alignSelf: 'center',
                borderRadius: 11,
                backgroundColor: '#F5F5F5',
                paddingVertical: 18,
                paddingHorizontal: 29,
                marginBottom: 15,
                alignItems: 'center',
              }}>
              <Button
                onPress={() => {
                  this.onGallery();
                }}>
                {(this.props.logo === '' && (
                  <LocalImage
                    source={require('src/assets/image/ic_add_image.png')}
                    style={{ width: 70, height: 70, marginBottom: 10 }}
                  />
                )) || (
                  <FastImage
                    source={{ uri: this.props.logo ? this.props.logo : IMAGE_FOO_URL }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 35 }}
                  />
                )}
              </Button>
              <Text numberOfLines={2} style={{ fontSize: 16, lineHeight: 19 }}>
                לוגו של העסק
              </Text>
            </VerticalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="שם מוצר"
              image={require('src/assets/image/ic_branch.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="white"
                  value={this.props.name}
                  onChangeText={(text) => {
                    this.props.setName(text);
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
              title="תיאור"
              image={require('src/assets/image/ic_info.png')}
              numberLine={1}
              inputNode={
                <CommonInput
                  numberOfLines={4}
                  backgroundColor="white"
                  value={this.props.description}
                  onChangeText={(text) => {
                    this.props.setDescription(text);
                  }}
                />
              }
            />
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 15 }}>
              <View style={{ width: (SCREEN_WIDTH - 64) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: '#F5F5F5' }]}
                  title="מְלַאי"
                  image={require('src/assets/image/ic_stock.png')}
                  inputNode={
                    <CommonInput
                      numberOfLines={1}
                      keyboardType="numeric"
                      backgroundColor="white"
                      value={this.props.stock}
                      onChangeText={(text) => {
                        this.props.setStock(text);
                      }}
                    />
                  }
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - 64) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { marginBottom: 0, backgroundColor: '#F5F5F5' }]}
                  title="מחיר"
                  image={require('src/assets/image/ic_price.png')}
                  inputNode={
                    <CommonInput
                      numberOfLines={1}
                      keyboardType="numeric"
                      backgroundColor="white"
                      value={this.props.price}
                      onChangeText={(text) => {
                        this.props.setPrice(text);
                      }}
                    />
                  }
                />
              </View>
            </HorizontalLayout>
            <ActiveButton
              text="שמור שינויים"
              style={{ marginBottom: 15 }}
              action={() => {
                this.updateProduct();
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
    elevation: 3,
  },
});

export default EditProductPopup;
