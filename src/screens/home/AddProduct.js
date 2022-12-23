import React from 'react';
import { observer } from 'mobx-react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  RefreshControl,
  Touchable,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { CommonUtils } from '../../utils';
import { Langs, Styles } from '../../constants';
import {
  API,
  API_RES_CODE,
  IMAGE_FOO_URL,
  MAIN_TAB,
  SCREEN_WIDTH,
} from '../../constants/Constants';
import {
  Button,
  HorizontalLayout,
  LocalImage,
  ScaledFastImage,
  VerticalLayout,
} from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import MyInfo from '../../mobx/MyInfo';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import Toast from 'react-native-root-toast';
import EventBus from 'react-native-event-bus';
import TotalItem from '../../components/items/TotalItem';
import LinearGradient from 'react-native-linear-gradient';
import NumberFormat from 'react-number-format';
import {
  ActiveButton,
  BottomMenu,
  CommonInput,
  DisactiveButton,
  SearchInput,
  SetValueGroup,
} from '../../components/common';
import ProductItem from '../../components/items/ProductItem';
import { RESULTS } from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';

@observer
export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logo: '',
      name: '',
      description: '',
      numberLine: 1,
      stock: null,
      price: null,
    };
  }

  getInfo = () => {
    // requestGet(API.Home.get_product, {
    //   search: this.state.search,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    // this.setState({
    //   productList: result.data
    // });
    //   } else {
    //   }
    // });
  };

  componentDidMount() {
    this.getInfo();
  }

  addSKU = () => {};

  onGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then((image) => {
      this.uploadLogo(image.path);
    });
  };

  uploadLogo = (filepath) => {
    requestUpload(API.Upload.upload, filePath, '').then((result) => {
      console.log(result);
      if (result.code == API_RES_CODE.SUCCESS) {
        this.setState({
          logo: result.data.file_path,
        });
      } else {
        Toast.show(result.msg);
      }
    });
  };

  addProduct = () => {
    // requestPost(API.Home.add_product, {
    //   logo: this.state.logo,
    //   name: this.state.name,
    //   name: this.state.name,
    //   stock: this.state.stock,
    //   price: this.state.price,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    GlobalState.setTabIndex(MAIN_TAB.SHOP);
    //   } else {
    //   }
    // });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29, paddingBottom: 90 }}>
            <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Button
                onPress={() => {
                  GlobalState.setTabIndex(MAIN_TAB.SHOP);
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 17.5, height: 17.5 }}
                />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  letterSpacing: 1,
                  color: '#000',
                }}>
                חנות
              </Text>
              <Button onPress={() => {}}>
                <LocalImage
                  source={require('src/assets/image/ic_bottom_gyme_off.png')}
                  style={{ width: 39, height: 39 }}
                />
              </Button>
            </HorizontalLayout>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 22,
                textAlign: 'right',
                marginBottom: 15,
                marginTop: 20,
              }}>
              להוסיף מוצר
            </Text>
            <VerticalLayout
              style={{
                width: 155,
                alignSelf: 'center',
                borderRadius: 11,
                backgroundColor: '#FFF',
                paddingVertical: 18,
                paddingHorizontal: 29,
                marginBottom: 15,
                alignItems: 'center',
              }}>
              <Button
                onPress={() => {
                  this.onGallery();
                }}>
                {(this.state.logo === '' && (
                  <LocalImage
                    source={require('src/assets/image/ic_add_image.png')}
                    style={{ width: 70, height: 70, marginBottom: 10 }}
                  />
                )) || (
                  <FastImage
                    source={{ uri: this.state.logo ? this.state.logo : IMAGE_FOO_URL }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 70, height: 70, marginBottom: 10, borderRadius: 35 }}
                  />
                )}
              </Button>
              <Text numberOfLines={2} style={{ fontSize: 16, lineHeight: 19 }}>
                העלאת תמונה ראשית למוצר
              </Text>
            </VerticalLayout>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: 'white' }]}
              title="שם מוצר"
              image={require('src/assets/image/ic_branch.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  value={this.state.name}
                  backgroundColor="#F5F5F5"
                  onChangeText={(text) => {
                    this.setState({ name: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: 'white' }]}
              title="תיאור"
              image={require('src/assets/image/ic_info.png')}
              expandable
              numberLine={this.state.numberLine}
              setExpand={() => {
                this.setState({ numberLine: this.state.numberLine === 1 ? 5 : 1 });
              }}
              inputNode={
                (this.state.numberLine !== 1 && (
                  <CommonInput
                    numberOfLines={this.state.numberLine}
                    backgroundColor="#F5F5F5"
                    value={this.state.description}
                    onChangeText={(text) => {
                      this.setState({ description: text });
                    }}
                  />
                )) || <></>
              }
            />
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 15 }}>
              <View style={{ width: (SCREEN_WIDTH - 64) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: 'white' }]}
                  title="מְלַאי"
                  image={require('src/assets/image/ic_stock.png')}
                  inputNode={
                    <CommonInput
                      numberOfLines={1}
                      keyboardType="numeric"
                      backgroundColor="#F5F5F5"
                      value={this.state.stock}
                      onChangeText={(text) => {
                        this.setState({ stock: text });
                      }}
                    />
                  }
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - 64) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { marginBottom: 0, backgroundColor: 'white' }]}
                  title="מחיר"
                  image={require('src/assets/image/ic_price.png')}
                  inputNode={
                    <CommonInput
                      numberOfLines={1}
                      keyboardType="numeric"
                      backgroundColor="#F5F5F5"
                      value={this.state.price}
                      onChangeText={(text) => {
                        this.setState({ price: text });
                      }}
                    />
                  }
                />
              </View>
            </HorizontalLayout>
            <Button
              onPress={() => {
                this.addSKU();
              }}>
              <HorizontalLayout
                style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 35 }}>
                <Text style={{ fontSize: 16, lineHeight: 19.2 }}>הוסף מק"ט</Text>
                <LocalImage
                  source={require('src/assets/image/ic_plus_sign.png')}
                  style={{ width: 24, height: 24, marginLeft: 6 }}
                />
              </HorizontalLayout>
            </Button>
            <ActiveButton
              text="יצירת מוצר"
              style={{ marginBottom: 15 }}
              action={() => {
                this.addProduct();
              }}
            />
          </VerticalLayout>
        </ScrollView>
        {/* <BottomMenu /> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
});
