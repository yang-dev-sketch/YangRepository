import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Styles } from '../../constants';
import { API, API_RES_CODE, MAIN_TAB } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import { requestGet, requestPost, requestUpload } from '../../utils/ApiUtils';
import { ActiveButton, DisactiveButton } from '../../components/common';
import LegalDocumentPopup from '../../components/popups/LegalDocumentPopup';
import { AddBranchPopup, BranchPopup } from '../../components/popups';
import moment from 'moment/moment';

@observer
export default class SubscriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageType: 'טקסט טקסט טקסט',
      nextBilling: '19 באוקטובר 2022',
      packageSum: 100,
      paymentList: [],
      showLegalDocmentPopup: false,
      branchList: [],
      showBranchPopup: false,
      showAddBranchPopup: false,
      selectedBranchId: 0,
    };
  }

  getInfo = () => {
    const paymentList = [
      { id: 1, name: 'אמצעי תשלום', date: '2022-06-10 22:45:00', income: 29.9, type: 'נכשל' },
      { id: 2, name: 'אמצעי תשלום', date: '2022-06-10 22:45:00', income: 29.9, type: 'שולם' },
    ];
    this.setState({ paymentList: paymentList });
    this.getBranch();
  };

  componentDidMount() {
    this.getInfo();
  }

  onUpgrade = () => {};

  onPrevious = () => {
    GlobalState.setTabIndex(MAIN_TAB.SETTING);
  };

  getBranch = () => {
    // requestGet(API.Home.get_branch, {
    //   search: this.state.branchSearch,
    // }).then(async (result) => {
    //   if (result.code == API_RES_CODE.SUCCESS) {
    //   } else {
    //   }
    // });
    const branchList = [
      { id: 1, name: 'צעדים לונדון', checked: false },
      { id: 2, name: 'צעדים פריז', checked: false },
      { id: 3, name: 'צעדים קייב', checked: false },
      { id: 4, name: 'צעדים קייב', checked: false },
    ];
    this.setState({ branchList: branchList });
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29, paddingBottom: 90 }}>
            <HorizontalLayout
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22.25,
              }}>
              <Button
                onPress={() => {
                  GlobalState.setTabIndex(MAIN_TAB.BUSINESS);
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_close.png')}
                  style={{ width: 19.87, height: 19.44 }}
                />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  letterSpacing: 1,
                  color: '#000',
                  fontWeight: '700',
                  fontFamily: 'Danidin',
                }}>
                הגדרות
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
                marginBottom: 20,
                color: '#000',
                fontWeight: '600',
                fontFamily: 'Danidin',
              }}>
              המנוי שלי
            </Text>
            <VerticalLayout style={styles.package_type}>
              <Text
                style={{ fontSize: 16, lineHeight: 19, marginBottom: 5, fontFamily: 'Danidin' }}>
                סוג החבילה
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#0D65D9',
                  marginBottom: 10,
                  fontWeight: '600',
                  fontFamily: 'Danidin',
                }}>
                {this.state.packageType}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#0D65D9',
                  textDecorationLine: 'underline',
                  marginBottom: 15,
                  fontFamily: 'Danidin',
                }}>
                סוג החבילה
              </Text>
              <Text
                style={{ fontSize: 16, lineHeight: 19, marginBottom: 5, fontFamily: 'Danidin' }}>
                סוג החבילה
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#0D65D9',
                  marginBottom: 15,
                  fontWeight: '600',
                  fontFamily: 'Danidin',
                }}>
                {this.state.nextBilling}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 0,
                  borderWidth: 1,
                  borderColor: '#F2F2F2',
                  marginBottom: 21,
                }}></View>
              <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  style={{
                    width: 75,
                    height: 33,
                    borderRadius: 16.5,
                    backgroundColor: '#0D65D9',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_income_white.png')}
                    style={{ width: 12, height: 10, marginRight: 4 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 19,
                      color: 'white',
                      fontWeight: '600',
                      fontFamily: 'Danidin',
                    }}>
                    {this.state.packageSum}
                  </Text>
                </Button>
                <Text
                  style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                  סכום:
                </Text>
              </HorizontalLayout>
            </VerticalLayout>
            <Button
              onPress={() => {}}
              style={{ width: '100%', alignItems: 'center', marginTop: 9, marginBottom: 25 }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#0D65D9',
                  fontFamily: 'Danidin',
                }}>
                רוצים לבטל את המנוי? לחצו כאן
              </Text>
            </Button>
            <VerticalLayout style={styles.payment_method}>
              <HorizontalLayout
                style={{
                  width: '100%',
                  height: 49,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  backgroundColor: '#5C9DF2',
                  borderTopLeftRadius: 11,
                  borderTopRightRadius: 11,
                  paddingRight: 15,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 16,
                    color: 'white',
                    fontWeight: '600',
                    fontFamily: 'Danidin',
                  }}>
                  תשלומים
                </Text>
              </HorizontalLayout>
              <FlatList
                ref={(ref) => {
                  this._flContent = ref;
                }}
                showsVerticalScrollIndicator={false}
                style={{ padding: 15 }}
                data={this.state.paymentList}
                numRows={1}
                renderItem={({ item, index }) => {
                  return (
                    <HorizontalLayout
                      style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                      <HorizontalLayout style={{ alignItems: 'center' }}>
                        <View
                          style={[
                            item.type === 'נכשל' && { backgroundColor: '#FFF2F2' },
                            item.type === 'שולם' && { backgroundColor: '#F0F8DE' },
                            {
                              width: 69,
                              height: 27,
                              borderRadius: 13.5,
                              marginRight: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                          ]}>
                          <Text
                            style={[
                              item.type === 'נכשל' && { color: '#FF7F7F' },
                              item.type === 'שולם' && { color: '#75A700' },
                              { fontSize: 14, lineHeight: 22, fontFamily: 'Danidin' },
                            ]}>
                            {item.type}
                          </Text>
                        </View>
                        <Button onPress={() => {}}>
                          <LocalImage
                            source={require('src/assets/image/ic_download.png')}
                            style={{ width: 27, height: 27, marginRight: 10 }}
                          />
                        </Button>
                        <LocalImage
                          source={require('src/assets/image/ic_income.png')}
                          style={{ width: 8, height: 7, marginRight: 2 }}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 19,
                            fontWeight: '600',
                            color: '#000',
                            fontFamily: 'Danidin',
                          }}>
                          {item.income}
                        </Text>
                      </HorizontalLayout>
                      <VerticalLayout>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 19,
                            color: '#000',
                            fontWeight: '600',
                            fontFamily: 'Danidin',
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            lineHeight: 22,
                            color: '#979797',
                            fontFamily: 'Danidin',
                          }}>
                          {moment(item.date).format('hh:mm, DD.MM.YYYY')}
                        </Text>
                      </VerticalLayout>
                    </HorizontalLayout>
                  );
                }}
                keyExtractor={(item, idx) => idx.toString()}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        width: '100%',
                        height: 0,
                        borderWidth: 1,
                        borderColor: '#F2F2F2',
                        marginVertical: 15,
                      }}
                    />
                  );
                }}
              />
              <Button onPress={() => {}}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#5C9DF2',
                    marginRight: 17,
                    marginBottom: 15,
                    textDecorationLine: 'underline',
                    fontFamily: 'Danidin',
                  }}>
                  ראו עוד
                </Text>
              </Button>
            </VerticalLayout>
            <HorizontalLayout
              style={{ justifyContent: 'space-around', marginTop: 25, marginBottom: 30 }}>
              <Button
                onPress={() => {
                  this.setState({ showLegalDocmentPopup: true });
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#0D65D9',
                    textDecorationLine: 'underline',
                    fontFamily: 'Danidin',
                  }}>
                  מסמכים משפטים
                </Text>
              </Button>
              <Button
                onPress={() => {
                  this.setState({ showBranchPopup: true });
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#0D65D9',
                    textDecorationLine: 'underline',
                    fontFamily: 'Danidin',
                  }}>
                  הסניפים שלנו
                </Text>
              </Button>
            </HorizontalLayout>
            <ActiveButton
              style={{ marginBottom: 15 }}
              text="שדרגו את המנוי"
              action={() => {
                this.onUpgrade();
              }}
            />
            <DisactiveButton
              text="הקודם"
              action={() => {
                this.onPrevious();
              }}
            />
          </VerticalLayout>
        </ScrollView>
        <LegalDocumentPopup
          visible={this.state.showLegalDocmentPopup}
          onCancel={() => {
            this.setState({ showLegalDocmentPopup: false });
          }}
        />
        <BranchPopup
          visible={this.state.showBranchPopup}
          data={this.state.branchList}
          selectable={true}
          selectBranchId={this.state.selectedBranchId}
          selectBranch={(index) => {
            this.setState({ selectedBranchId: index });
          }}
          setSearch={(search) => {
            this.getBranch();
          }}
          addBranch={() => {
            this.setState({ showBranchPopup: false, showAddBranchPopup: true });
          }}
          deleteBranch={() => {
            this.deleteBranch();
          }}
          onCancel={() => {
            this.setState({ showBranchPopup: false });
          }}
        />
        <AddBranchPopup
          visible={this.state.showAddBranchPopup}
          onBack={() => {
            this.setState({
              showAddBranchPopup: false,
              showBranchPopup: true,
            });
          }}
          onCancel={() => {
            this.setState({ showAddBranchPopup: false });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  package_type: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 17,
    elevation: 3,
  },
  payment_method: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 11,
    elevation: 3,
  },
});
