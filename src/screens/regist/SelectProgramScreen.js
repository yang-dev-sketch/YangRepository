import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Langs, Styles } from '../../constants';
import { API, API_RES_CODE } from '../../constants/Constants';
import {
  AppScreen,
  Button,
  HorizontalLayout,
  LocalImage,
  VerticalLayout,
} from '../../components/controls';
import { requestPost } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton } from '../../components/common';

export default class SelectProgramScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      type: 'monthly',
      monthlyPrice: 29.9,
      profitablePrice: 199,
    };
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(92,157,242,0.25)', 'rgba(92,157,242,0)']}
            style={{
              width: '100%',
              height: 350,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ alignSelf: 'center', position: 'absolute', top: 60, left: 21 }}>
              <Text style={{ fontSize: 14, lineHeight: 17, textDecorationLine: 'underline' }}>
                הקודם
              </Text>
            </Button> */}
            <LocalImage
              source={require('src/assets/image/ic_gyme.png')}
              style={{ width: 152.26, height: 152.26, position: 'absolute', top: 60.36 }}
            />
            <LocalImage
              source={require('src/assets/image/ic_gyme_blue.png')}
              style={{ width: 48, height: 48, position: 'absolute', top: 226 }}
            />
            <Text style={{ fontSize: 18, lineHeight: 22, position: 'absolute', top: 284 }}>
              בחרו את התכנית המתאימה לכם
            </Text>
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -34 }}>
            <Button
              onPress={() => {
                this.setState({ type: 'monthly' });
              }}
              style={[
                (this.state.type === 'monthly' && { borderWidth: 2, borderColor: '#0D65D9' }) || {
                  borderWidth: 1,
                  borderColor: '#D7D7D7',
                },
                { width: '100%', borderRadius: 11, marginBottom: 15 },
              ]}>
              <LocalImage
                source={require('src/assets/image/ic_rectangle.png')}
                style={{ width: '100%', height: 70, position: 'absolute', top: 0 }}
                resizeMode="stretch"
              />
              <VerticalLayout
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 70,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: 'white', marginTop: 6 }}>
                  מנוי חודשי
                </Text>
                <HorizontalLayout style={{ alignItems: 'center' }}>
                  <LocalImage
                    source={require('src/assets/image/ic_income_white.png')}
                    style={{ width: 18, height: 15, marginRight: 5 }}
                    resizeMode="stretch"
                  />
                  <Text style={{ fontSize: 40, lineHeight: 48, color: 'white' }}>
                    {this.state.monthlyPrice}
                  </Text>
                </HorizontalLayout>
              </VerticalLayout>
              <HorizontalLayout
                style={{
                  marginTop: 70,
                  paddingTop: 11,
                  paddingHorizontal: 38,
                  paddingBottom: 20,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <VerticalLayout style={{ width: '30%' }}>
                  <HorizontalLayout style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Text numberOfLines={2}>טקסט טקסט טקסט טקסט</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_on.png')}
                      style={{ width: 22, height: 22, marginLeft: 6 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }}>
                    <Text numberOfLines={2}>טקסט טקסט טקסט טקסט</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_on.png')}
                      style={{ width: 22, height: 22, marginLeft: 6 }}
                    />
                  </HorizontalLayout>
                </VerticalLayout>
                <View
                  style={{
                    width: 0,
                    height: 59,
                    borderWidth: 1,
                    borderColor: 'rgba(92,157,242,0.25)',
                  }}></View>
                <VerticalLayout style={{ width: '30%' }}>
                  <HorizontalLayout style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Text numberOfLines={2}>טקסט טקסט טקסט טקסט</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_on.png')}
                      style={{ width: 22, height: 22, marginLeft: 6 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }}>
                    <Text numberOfLines={2}>טקסט טקסט טקסט טקסט</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_on.png')}
                      style={{ width: 22, height: 22, marginLeft: 6 }}
                    />
                  </HorizontalLayout>
                </VerticalLayout>
              </HorizontalLayout>
            </Button>
            <View
              style={{
                width: 141,
                height: 27,
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#94BDF2',
                alignSelf: 'center',
              }}>
              <Text style={{ fontSize: 14, lineHeight: 17, color: 'white' }}>המשתלם ביותר</Text>
            </View>
            <Button
              onPress={() => {
                this.setState({ type: 'profitable' });
              }}
              style={[
                (this.state.type === 'profitable' && {
                  borderWidth: 2,
                  borderColor: '#0D65D9',
                }) || { borderWidth: 1, borderColor: '#D7D7D7' },
                { width: '100%', borderRadius: 11, marginBottom: 17 },
              ]}>
              <LocalImage
                source={require('src/assets/image/ic_rectangle.png')}
                style={{ width: '100%', height: 70, position: 'absolute', top: 0 }}
                resizeMode="stretch"
              />
              <VerticalLayout
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 70,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text style={{ fontSize: 16, lineHeight: 19, color: 'white', marginTop: 6 }}>
                  מנוי חודשי
                </Text>
                <HorizontalLayout style={{ alignItems: 'center' }}>
                  <LocalImage
                    source={require('src/assets/image/ic_income_white.png')}
                    style={{ width: 18, height: 15, marginRight: 5 }}
                    resizeMode="stretch"
                  />
                  <Text style={{ fontSize: 40, lineHeight: 48, color: 'white' }}>
                    {this.state.profitablePrice}
                  </Text>
                </HorizontalLayout>
              </VerticalLayout>
              <HorizontalLayout
                style={{
                  marginTop: 70,
                  paddingTop: 11,
                  paddingHorizontal: 38,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <VerticalLayout style={{ width: '30%' }}>
                  <HorizontalLayout style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Text numberOfLines={2}>טקסט טקסט טקסט טקסט</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_on.png')}
                      style={{ width: 22, height: 22, marginLeft: 6 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }}>
                    <Text numberOfLines={2}>טקסט טקסט טקסט טקסט</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_on.png')}
                      style={{ width: 22, height: 22, marginLeft: 6 }}
                    />
                  </HorizontalLayout>
                </VerticalLayout>
                <View
                  style={{
                    width: 0,
                    height: 59,
                    borderWidth: 1,
                    borderColor: 'rgba(92,157,242,0.25)',
                  }}></View>
                <VerticalLayout style={{ width: '30%' }}>
                  <HorizontalLayout style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Text numberOfLines={2}>טקסט טקסט טקסט טקסט</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_on.png')}
                      style={{ width: 22, height: 22, marginLeft: 6 }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={{ alignItems: 'center' }}>
                    <Text numberOfLines={2}>טקסט טקסט טקסט טקסט</Text>
                    <LocalImage
                      source={require('src/assets/image/ic_check_on.png')}
                      style={{ width: 22, height: 22, marginLeft: 6 }}
                    />
                  </HorizontalLayout>
                </VerticalLayout>
              </HorizontalLayout>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#1E6FD9',
                  alignSelf: 'center',
                  marginBottom: 15,
                }}>
                שבוע נסיון חינם
              </Text>
            </Button>
            <ActiveButton
              text="התחילו עכשיו"
              style={{ width: '100%', marginBottom: 45 }}
              action={() => {
                this.props.navigation.navigate({
                  routeName: 'PaymentDetail',
                  params: {
                    type: this.state.type,
                  },
                  key: 'paymentType',
                });
              }}
            />
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 30 }}>
              <Button>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 17,
                    textDecorationLine: 'underline',
                    opacity: 0.7,
                  }}>
                  מדיניות פרטיות
                </Text>
              </Button>
              <Button>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 17,
                    textDecorationLine: 'underline',
                    opacity: 0.7,
                  }}>
                  תנאי שימוש
                </Text>
              </Button>
            </HorizontalLayout>
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
