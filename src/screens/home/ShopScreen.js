import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Styles } from '../../constants';
import { API, API_RES_CODE, MAIN_TAB, SCREEN_WIDTH } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import TotalItem from '../../components/items/TotalItem';
import { ActiveButton, DisactiveButton, SearchInput } from '../../components/common';
import ProductItem from '../../components/items/ProductItem';
import EditProductPopup from '../../components/popups/EditProductPopup';

@observer
export default class ShopScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      selectedId: 0,
      selectedIndex: 0,
      productList: [
        {
          id: 1,
          logo: '',
          name: 'אבזר',
          description: 'description',
          stock: 99,
          price: 100,
        },
        {
          id: 2,
          logo: '',
          name: 'אבזר',
          description: 'description',
          stock: 99,
          price: 100,
        },
        {
          id: 3,
          logo: '',
          name: 'אבזר',
          description: 'description',
          stock: 99,
          price: 100,
        },
        {
          id: 4,
          logo: '',
          name: 'אבזר',
          description: 'description',
          stock: 99,
          price: 100,
        },
      ],
      showEditProductPopup: false,
      logo: '',
      name: '',
      description: '',
      stock: null,
      price: null,
      toastState: false,
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
    GlobalState.setTabIndex(MAIN_TAB.GYME);
    this.getInfo();
  }

  setSearch = (search) => {
    this.setState({ search: search }, () => {
      this.getInfo();
    });
  };

  onSort = () => {};

  addProduct = () => {
    GlobalState.setTabIndex(MAIN_TAB.PRODUCT);
  };

  editProduct = () => {
    this.setState({
      showEditProductPopup: true,
      logo: this.state.productList[this.state.selectedIndex].logo,
      name: this.state.productList[this.state.selectedIndex].name,
      description: this.state.productList[this.state.selectedIndex].description,
      stock: this.state.productList[this.state.selectedIndex].stock,
      price: this.state.productList[this.state.selectedIndex].price,
    });
  };

  deleteProduct = () => {
    // requestPost(API.Home.delete_product, {
    //   id: this.state.trainId,
    //   time: this.state.trainDateTime,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    this.setState({
      productList: this.state.productList.filter((item) => {
        return item.id != this.state.selectedId;
      }),
      selectedId: 0,
    });

    //   } else {
    //   }
    // });
  };
  updateProduct = () => {
    // requestPost(API.Home.update_product, {
    //   id: this.state.selectedId,
    //   logo: this.state.logo,
    //   name: this.state.name,
    //   description: this.state.description,
    //   stock: this.state.stock,
    //   price: this.state.price,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    const productList = this.state.productList;
    productList[this.state.selectedIndex].logo = this.state.logo;
    productList[this.state.selectedIndex].name = this.state.name;
    productList[this.state.selectedIndex].description = this.state.description;
    productList[this.state.selectedIndex].stock = this.state.stock;
    productList[this.state.selectedIndex].price = this.state.price;
    this.setState({ productList: productList, showEditProductPopup: false, toastState: true });
    setTimeout(() => {
      this.setState({ toastState: false });
    }, 3000);
    //   } else {
    //   }
    // });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29, paddingBottom: 90 }}>
            <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Button
                onPress={() => {
                  this.setState({ showNotiPopup: true });
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_nofitication.png')}
                  style={{ width: 19.87, height: 19.44 }}
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
            <HorizontalLayout style={{ marginTop: 22.25, justifyContent: 'space-between' }}>
              <TotalItem amount={12} text="סך ההזמנות" color="#4399FF"></TotalItem>
              <TotalItem amount={4} text="פריטים במלאי" color="#4E0DD9"></TotalItem>
            </HorizontalLayout>
            <HorizontalLayout style={{ marginVertical: 15, justifyContent: 'space-between' }}>
              <HorizontalLayout style={styles.total_item}>
                <View
                  style={{
                    backgroundColor: '#59E967',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 31,
                    height: 31,
                    borderRadius: 15.5,
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_arrow_up.png')}
                    style={{ width: 11.67, height: 13.33 }}
                  />
                </View>
                <Text style={{ fontSize: 24, lineHeight: 29 }}>5</Text>
                <Text numberOfLines={2} style={{ width: '50%' }}>
                  נמכר בחודש
                </Text>
              </HorizontalLayout>
              <HorizontalLayout style={styles.total_item}>
                <Text style={{ fontSize: 24, lineHeight: 29, color: '#688EF8' }}>100K</Text>
                <Text numberOfLines={2} style={{ width: '50%' }}>
                  נמכר
                </Text>
              </HorizontalLayout>
            </HorizontalLayout>
            <SearchInput
              setSearch={(search) => {
                this.setSearch(search);
              }}
            />
            <Button
              onPress={() => {
                this.onSort();
              }}>
              <HorizontalLayout
                style={{ alignItems: 'center', justifyContent: 'flex-start', marginVertical: 15 }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19.2,
                    color: '#5C9DF2',
                    textDecorationLine: 'underline',
                  }}>
                  סינון
                </Text>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_up.png')}
                  style={{ width: 13.06, height: 6.88, marginLeft: 4.47 }}
                />
              </HorizontalLayout>
            </Button>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsVerticalScrollIndicator={false}
              data={this.state.productList}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (
                  <ProductItem
                    data={item}
                    key={index}
                    selectedId={this.state.selectedId}
                    selectProduct={() => {
                      this.setState({
                        selectedId: item.id,
                        selectedIndex: index,
                        logo: item.logo,
                        name: item.name,
                        description: item.description,
                        stock: item.stock,
                        price: item.price,
                      });
                    }}
                  />
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 10 }} />;
              }}
            />
            <Button
              onPress={() => {
                this.addProduct();
              }}>
              <HorizontalLayout
                style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
                <Text style={{ fontSize: 16, lineHeight: 19.2 }}>להוסיף מוצר</Text>
                <LocalImage
                  source={require('src/assets/image/ic_plus_sign.png')}
                  style={{ width: 24, height: 24, marginLeft: 6 }}
                />
              </HorizontalLayout>
            </Button>
            {this.state.selectedId !== 0 && (
              <VerticalLayout style={{ paddingHorizontal: 20 }}>
                <ActiveButton
                  text="עריכה"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.editProduct();
                  }}
                />
                <DisactiveButton
                  text="למחוק מוצר"
                  style={{ marginBottom: 15 }}
                  action={() => {
                    this.deleteProduct();
                  }}
                />
              </VerticalLayout>
            )}
          </VerticalLayout>
        </ScrollView>
        {this.state.toastState && (
          <HorizontalLayout
            style={{
              marginHorizontal: 20,
              width: SCREEN_WIDTH - 40,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'blue',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'absolute',
              top: 30,
              paddingHorizontal: 20,
            }}>
            <LocalImage
              source={require('src/assets/image/ic_close.png')}
              style={[{ width: 20, height: 20 }]}
              resizeMode="cover"
            />
            <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>this is the toast.</Text>
          </HorizontalLayout>
        )}
        <EditProductPopup
          visible={this.state.showEditProductPopup}
          logo={this.state.logo}
          name={this.state.name}
          description={this.state.description}
          stock={this.state.stock}
          price={this.state.price}
          setLogo={(text) => {
            this.setState({ logo: text });
          }}
          setName={(text) => {
            this.setState({ name: text });
          }}
          setDescription={(text) => {
            this.setState({ description: text });
          }}
          setStock={(text) => {
            this.setState({ stock: text });
          }}
          setPrice={(text) => {
            this.setState({ price: text });
          }}
          updateProduct={() => {
            this.updateProduct();
          }}
          onCancel={() => {
            this.setState({ showEditProductPopup: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  total_item: {
    width: (SCREEN_WIDTH - 64) / 2,
    height: 59,
    backgroundColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
