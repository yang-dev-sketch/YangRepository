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

import { CommonUtils } from '../../utils';
import { Langs, Styles } from '../../constants';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_WIDTH } from '../../constants/Constants';
import {
  Button,
  HorizontalLayout,
  LocalImage,
  ScaledFastImage,
  VerticalLayout,
} from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import MyInfo from '../../mobx/MyInfo';
import { requestPost } from '../../utils/ApiUtils';
import Toast from 'react-native-root-toast';
import EventBus from 'react-native-event-bus';
import TotalItem from '../../components/items/TotalItem';
import LinearGradient from 'react-native-linear-gradient';
import NumberFormat from 'react-number-format';
import NotiPopup from '../../components/popups/NotiPopup';

@observer
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainType: [
        { id: 1, title: 'אימון אישי', color: '#43C7FF', amount: 20 },
        { id: 2, title: 'אימון קבוצות', color: '#1E6FD9', amount: 30 },
        { id: 3, title: 'קיקבוקס', color: '#0019FF', amount: 15 },
        { id: 4, title: 'פילאטיס', color: '#5C9DF2', amount: 10 },
        { id: 5, title: 'יוגה', color: '#004765', amount: 40 },
        { id: 6, title: 'פונקציונאלי', color: '#000E88', amount: 20 },
      ],
      income: 12875,
      upcoming: 34,
      detailList: [
        { title: 'חנות', image: require('src/assets/image/ic_store.png'), url: '' },
        { title: 'יצירת אימון', image: require('src/assets/image/ic_work.png'), url: '' },
        { title: 'מתאמנים באירגון', image: require('src/assets/image/ic_train.png'), url: '' },
        { title: 'מאמנים באירגון', image: require('src/assets/image/ic_trainer.png'), url: '' },
      ],
      showNotiPopup: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29 }}>
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
                פרופיל
              </Text>
              <View
                style={{
                  width: 39,
                  height: 39,
                  borderRadius: 37,
                  borderWidth: 1,
                  borderColor: '#0D65D9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 33.75,
                    height: 33.75,
                    backgroundColor: '#0D65D9',
                    borderRadius: 53,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Button>
                    <Text style={{ color: 'white', fontSize: 10 }}>GYME</Text>
                  </Button>
                </View>
              </View>
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <Button
                style={{
                  width: 49,
                  height: 43,
                  borderRadius: 11,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_home.png')}
                  style={{ width: 29, height: 27.7 }}
                />
              </Button>
              <VerticalLayout style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, lineHeight: 22, letterSpacing: 1 }}>שלום STEPS,</Text>
                <Text style={{ fontSize: 14, lineHeight: 17, letterSpacing: 1 }}>
                  נתונים ליום חמישי 01.09.2022
                </Text>
              </VerticalLayout>
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
              <HorizontalLayout
                style={{
                  width: 227,
                  height: 144,
                  borderRadius: 11,
                  backgroundColor: 'white',
                  paddingLeft: 20,
                  paddingVertical: 20,
                  justifyContent: 'space-between',
                }}>
                <VerticalLayout style={{ alignItems: 'flex-end' }}>
                  {this.state.trainType.map((item, index) => {
                    return (
                      <HorizontalLayout style={{ alignItems: 'center' }}>
                        <Text
                          style={{
                            fontSize: 10,
                            lineHeight: 12,
                            letterSpacing: 1,
                            color: '#6F6F6F',
                          }}>
                          {item.title}
                        </Text>
                        <View
                          style={[
                            { backgroundColor: item.color, height: 17, width: 8, marginLeft: 10 },
                            index === 0 && { borderTopLeftRadius: 2 },
                            index === 5 && { borderBottomLeftRadius: 2 },
                          ]}></View>
                      </HorizontalLayout>
                    );
                  })}
                </VerticalLayout>
              </HorizontalLayout>
              <VerticalLayout>
                <Text style={{ fontSize: 14, lineHeight: 17, letterSpacing: 1 }}>סה”כ אימונים</Text>
                <Text
                  style={{ fontSize: 70, lineHeight: 84, color: '#0D65D9', fontFamily: 'Danidin' }}>
                  70
                </Text>
              </VerticalLayout>
            </HorizontalLayout>
            <HorizontalLayout style={{ marginTop: 15, justifyContent: 'space-between' }}>
              <TotalItem event={{}} amount={94} text="סה”כ מתאמנים" color="#43C7FF"></TotalItem>
              <TotalItem event={{}} amount={5} text="סה”כ מאמנים" color="#0D65D9"></TotalItem>
            </HorizontalLayout>
            <HorizontalLayout style={{ marginTop: 15, justifyContent: 'space-between' }}>
              <TotalItem event={{}} amount={12} text="סה״כ הגיעו" color="#4399FF"></TotalItem>
              <TotalItem event={{}} amount={4} text="סה״כ נרשמו היום" color="#4E0DD9"></TotalItem>
            </HorizontalLayout>
            <HorizontalLayout
              style={{
                width: '100%',
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: 'white',
                borderRadius: 11,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#59E967', '#A8EDAF']}
                  style={{
                    width: 31,
                    height: 31,
                    borderRadius: 15.5,
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_arrow_up.png')}
                    style={{ width: 13, height: 15 }}
                  />
                </LinearGradient>
                <LocalImage
                  source={require('src/assets/image/ic_income.png')}
                  style={{ width: 12, height: 10, marginRight: 2 }}
                />
                <NumberFormat
                  value={this.state.income}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(formattedValue) => (
                    <Text style={{ fontSize: 24, lineHeight: 29 }}>{formattedValue}</Text>
                  )}
                />
              </HorizontalLayout>
              <Text style={{ fontSize: 14, lineHeight: 17 }}>ההכנסה היומית שלי</Text>
            </HorizontalLayout>
            <Button>
              <HorizontalLayout
                style={{
                  width: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: 'white',
                  borderRadius: 11,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_arrow_left.png')}
                  style={{ width: 27, height: 27, marginRight: 2 }}
                />
                <HorizontalLayout>
                  <NumberFormat
                    value={this.state.upcoming}
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={(formattedValue) => (
                      <Text style={{ fontSize: 16, lineHeight: 19, color: 'red' }}>
                        ({formattedValue})
                      </Text>
                    )}
                  />
                  <Text style={{ fontSize: 16, lineHeight: 19 }}>אימונים קרובים</Text>
                </HorizontalLayout>
              </HorizontalLayout>
            </Button>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 15 }}
              data={this.state.detailList}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <Button
                    onPress={() => {
                      this.props.navigation.navigate(item.url);
                    }}
                    style={[
                      { width: (SCREEN_WIDTH - 64) / 2, height: 115, alignItems: 'center' },
                      index % 2 === 0 && { marginRight: 24 },
                    ]}>
                    <LocalImage source={item.image} style={{ width: 73, height: 73 }} />
                    <View
                      style={{
                        width: '100%',
                        height: 84,
                        borderRadius: 11,
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: 0,
                        zIndex: -1,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 13,
                      }}>
                      <Text style={{ fontSize: 16, lineHeight: 19 }}>{item.title}</Text>
                    </View>
                  </Button>
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 15 }} />;
              }}
            />
          </VerticalLayout>
        </ScrollView>
        <NotiPopup
          visible={this.state.showNotiPopup}
          onCancel={() => {
            this.setState({
              showNotiPopup: false,
            });
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
