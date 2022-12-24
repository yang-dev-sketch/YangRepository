import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Styles } from '../../constants';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, DisactiveButton, SetValueGroup } from '../common';
import { ScrollView } from 'react-navigation';
import CommonInput from '../common/CommonInput';
import CheckBox from '@react-native-community/checkbox';
import { API, API_RES_CODE, SCREEN_HEIGHT } from '../../constants/Constants';
import DropDownPicker from '../controls/DropDownPicker';

@observer
class AllowPenaltyPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyNumber: 2,
      punishmentType: [{ name: 'צמצום תוכנית' }, { name: 'הגבלת אפליקציה' }],
      selectedPunishment: 'צמצום תוכנית',
      reduction: 1,
      daysApply: 2,
      blockApp: 1,
      daysAbsence: 2,
      absenceType: [{ name: 'חודשים' }, { name: 'שבועות' }, { name: 'יום' }],
      selectedAbsence: 'חודשים',
      countAbsence: false,
      absenceCancel: false,
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
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    this.props.onBack();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_left.png')}
                    style={{ width: 11.62, height: 20.73, marginRight: 20.93 }}
                  />
                </Button>
                <Button
                  onPress={() => {
                    this.props.onCancel();
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_close.png')}
                    style={{ width: 31, height: 31 }}
                  />
                </Button>
              </HorizontalLayout>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>סוג מסלול:</Text>
            </HorizontalLayout>
            <View
              style={{
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#F2F2F2',
                marginBottom: 20,
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19.2 }}>הזמנה על בסיס מקום פנוי</Text>
            </View>
            <ScrollView>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19.2,
                  marginBottom: 20,
                  width: '70%',
                  alignSelf: 'flex-end',
                }}>
                לאפשר עונשים או הגבלות עקב מספר גבוה של היעדרויות
              </Text>
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
                title="עוֹנֶשׁ"
                inputNode={
                  <DropDownPicker
                    editIcon={false}
                    data={this.state.punishmentType}
                    selectedValue={this.state.selectedPunishment}
                    onSelect={(value) => {
                      this.setState({ selectedPunishment: value.name });
                    }}
                  />
                }
              />
              {this.state.selectedPunishment === 'צמצום תוכנית' ? (
                <VerticalLayout>
                  <HorizontalLayout style={styles.input_wrapper}>
                    <CommonInput
                      style={{ width: 135 }}
                      numberOfLines={1}
                      backgroundColor="white"
                      textAlign="center"
                      value={this.state.reduction}
                      onChangeText={(text) => {
                        this.setState({ reduction: text });
                      }}
                    />
                    <Text style={styles.input_label}>הפחתה של</Text>
                  </HorizontalLayout>
                  <HorizontalLayout style={styles.input_wrapper}>
                    <CommonInput
                      style={{ width: 135 }}
                      numberOfLines={1}
                      backgroundColor="white"
                      textAlign="center"
                      value={this.state.daysApply}
                      onChangeText={(text) => {
                        this.setState({ daysApply: text });
                      }}
                    />
                    <Text numberOfLines={2} style={styles.input_label}>
                      ימים יחולו על התוכנית של הלקוח עבור כל
                    </Text>
                  </HorizontalLayout>
                </VerticalLayout>
              ) : (
                <VerticalLayout>
                  <HorizontalLayout style={styles.input_wrapper_right}>
                    <Text numberOfLines={2} style={styles.input_label}>
                      חסום רישום אפליקציה עבור
                    </Text>
                    <CommonInput
                      style={{ width: 135, marginLeft: 15 }}
                      numberOfLines={1}
                      backgroundColor="white"
                      textAlign="center"
                      value={this.state.blockApp}
                      onChangeText={(text) => {
                        this.setState({ blockApp: text });
                      }}
                    />
                  </HorizontalLayout>
                  <HorizontalLayout style={styles.input_wrapper_right}>
                    <Text numberOfLines={2} style={styles.input_label}>
                      ימים עקב היעדרויות מרובות החל מ{' '}
                    </Text>
                    <CommonInput
                      style={{ width: 135, marginLeft: 15 }}
                      numberOfLines={1}
                      backgroundColor="white"
                      textAlign="center"
                      value={this.state.daysAbsence}
                      onChangeText={(text) => {
                        this.setState({ daysAbsence: text });
                      }}
                    />
                  </HorizontalLayout>
                </VerticalLayout>
              )}
              <SetValueGroup
                style={[Styles.input_wrapper, { marginBottom: 15, backgroundColor: '#F5F5F5' }]}
                title="היעדרויות לכל"
                inputNode={
                  <DropDownPicker
                    editIcon={false}
                    data={this.state.absenceType}
                    selectedValue={this.state.selectedAbsence}
                    onSelect={(value) => {
                      this.setState({ selectedAbsence: value.name });
                    }}
                  />
                }
              />
              <Text style={{ width: '100%', color: '#0D65D9', marginBottom: 15 }}>
                שימו לב! צמצום התוכנית של הלקוח שלך עשוי לגרום לביטול הרשמות עתידיות
              </Text>
              <Text style={{ marginBottom: 15 }}>ספור היעדרות לקוחות לפי</Text>
              <HorizontalLayout style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 16, lineHeight: 19 }}>אישורי הגעה</Text>
                <CheckBox
                  onFillColor="#0D65D9"
                  value={this.state.countAbsence}
                  onChange={() => {
                    this.setState({ countAbsence: !this.state.countAbsence });
                  }}
                />
              </HorizontalLayout>
              <HorizontalLayout
                style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom: 30 }}>
                <Text style={{ fontSize: 16, lineHeight: 19 }}>היעדרות/ביטול מאוחר</Text>
                <CheckBox
                  onFillColor="#0D65D9"
                  value={this.state.absenceCancel}
                  onChange={() => {
                    this.setState({ absenceCancel: !this.state.absenceCancel });
                  }}
                />
              </HorizontalLayout>
            </ScrollView>
            <ActiveButton
              text="הבא"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onNext();
              }}
            />
            <DisactiveButton
              text="לבטל"
              style={{ marginBottom: 15 }}
              action={() => {
                this.props.onCancel();
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
    paddingHorizontal: 20,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  input_wrapper: {
    width: '100%',
    borderRadius: 11,
    padding: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input_wrapper_right: {
    width: '100%',
    borderRadius: 11,
    padding: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  input_label: {
    fontSize: 16,
    lineHeight: 19,
    color: '#5C9DF2',
    width: '50%',
  },
});

export default AllowPenaltyPopup;
