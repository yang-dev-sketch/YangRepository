import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Langs, Styles } from '../../constants';
import { API, API_RES_CODE, SCREEN_WIDTH } from '../../constants/Constants';
import {
  AppScreen,
  Button,
  HorizontalLayout,
  LocalImage,
  VerticalLayout,
} from '../../components/controls';
import { requestPost } from '../../utils/ApiUtils';
import LinearGradient from 'react-native-linear-gradient';
import { ActiveButton, CommonInput, SetValueGroup } from '../../components/common';

export default class FaceApprovalScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      firstPhone: '1',
      secondPhone: '5555215554',
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['rgba(92,157,242,0.25)', 'rgba(92,157,242,0)']}
            style={{
              width: '100%',
              height: 355,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 7,
            }}>
            <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ alignSelf: 'center', position: 'absolute', top: 60, left: 21 }}>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 17,
                  textDecorationLine: 'underline',
                  color: '#000',
                  fontFamily: 'Danidin',
                }}>
                {Langs.common.previous}
              </Text>
            </Button>
            <LocalImage
              source={require('src/assets/image/ic_gyme.png')}
              style={{ width: 152.26, height: 152.26 }}
            />
            <Text
              style={{
                fontSize: 24,
                lineHeight: 32,
                position: 'absolute',
                bottom: 13,
                color: '#000',
                fontWeight: '700',
                fontFamily: 'Danidin',
              }}>
              {Langs.regist.approval_use_face}
            </Text>
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, alignItems: 'center' }}>
            <SetValueGroup
              style={[
                Styles.input_wrapper,
                { marginBottom: 20, backgroundColor: 'white', elevation: 1 },
              ]}
              title={Langs.common.phone_number}
              image={require('src/assets/image/ic_phone.png')}
              inputNode={
                <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <CommonInput
                    style={{ width: 70 }}
                    numberOfLines={1}
                    backgroundColor="#F5F5F5"
                    maxLength={3}
                    value={this.state.firstPhone}
                    onChangeText={(text) => {
                      this.setState({ firstPhone: text });
                    }}
                  />
                  <View
                    style={{ width: 12, height: 0, borderWidth: 1, borderColor: '#000' }}></View>
                  <CommonInput
                    style={{ width: 230 }}
                    numberOfLines={1}
                    backgroundColor="#F5F5F5"
                    maxLength={10}
                    value={this.state.secondPhone}
                    onChangeText={(text) => {
                      this.setState({ secondPhone: text });
                    }}
                  />
                </HorizontalLayout>
              }
            />
            <Button onPress={() => {}}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  textDecorationLine: 'underline',
                  color: '#000',
                  fontWeight: '600',
                  fontFamily: 'Danidin',
                }}>
                {Langs.regist.identi_by_email}
              </Text>
            </Button>
          </VerticalLayout>
        </ScrollView>
        <ActiveButton
          text={Langs.common.confirm}
          style={{ width: SCREEN_WIDTH - 40, marginBottom: 55, marginHorizontal: 20 }}
          action={() => {}}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
