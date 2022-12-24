import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Styles } from '../../constants';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_WIDTH } from '../../constants/Constants';
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
import DropDownPicker from '../../components/controls/DropDownPicker';

export default class RegistBusinessThreeScreen extends AppScreen {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      birth: '',
      sexType: [{ name: 'איש' }, { name: 'אִשָׁה' }],
      selectedSex: 'המגדר שלך',
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
            <LocalImage
              source={require('src/assets/image/ic_step_three.png')}
              style={{ width: 172, height: 206 }}
            />
            {/* <Button
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ alignSelf: 'center', position: 'absolute', top: 60, left: 21 }}>
              <Text style={{ fontSize: 14, lineHeight: 17, textDecorationLine: 'underline' }}>
                הקודם
              </Text>
            </Button> */}
          </LinearGradient>
          <VerticalLayout style={{ paddingHorizontal: 20, marginTop: -4 }}>
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="שם פרטי"
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.firstName}
                  onChangeText={(text) => {
                    this.setState({ firstName: text });
                  }}
                />
              }
            />
            <SetValueGroup
              style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#FFF' }]}
              title="שם משפחה"
              image={require('src/assets/image/ic_coach_on.png')}
              inputNode={
                <CommonInput
                  numberOfLines={1}
                  backgroundColor="#F5F5F5"
                  value={this.state.lastName}
                  onChangeText={(text) => {
                    this.setState({ lastName: text });
                  }}
                />
              }
            />
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 45 }}>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: '#FFF' }]}
                  title="תאריך לידה"
                  image={require('src/assets/image/ic_birthday.png')}
                  inputNode={
                    <CommonInput
                      inputStyle={{ height: 40 }}
                      fontSize={20}
                      lineHeight={24}
                      numberOfLines={1}
                      backgroundColor="#F5F5F5"
                      value={this.state.birth}
                      onChangeText={(text) => {
                        this.setState({ birth: text });
                      }}
                    />
                  }
                />
              </View>
              <View style={{ width: (SCREEN_WIDTH - 63) / 2 }}>
                <SetValueGroup
                  style={[Styles.input_wrapper, { backgroundColor: '#FFF' }]}
                  title="מִין"
                  image={require('src/assets/image/ic_gender.png')}
                  inputNode={
                    <DropDownPicker
                      editIcon={false}
                      data={this.state.sexType}
                      backgroundColor="#F5F5F5"
                      selectedValue={this.state.selectedSex}
                      onSelect={(value) => {
                        this.setState({ selectedSex: value.name });
                      }}
                    />
                  }
                />
              </View>
            </HorizontalLayout>
            <ActiveButton
              text="הבא"
              style={{ width: '100%', marginBottom: 15 }}
              action={() => {
                this.props.navigation.navigate('SelectProgram');
              }}
            />
          </VerticalLayout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
