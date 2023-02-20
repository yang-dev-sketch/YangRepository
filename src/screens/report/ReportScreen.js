import React from 'react';
import { observer } from 'mobx-react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { CommonUtils } from '../../utils';
import { Styles } from '../../constants';
import { API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_WIDTH } from '../../constants/Constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../../components/controls';
import { requestGet, requestPost } from '../../utils/ApiUtils';
import { DatePickerPopup, NotiPopup, TrainTimePopup } from '../../components/popups';
import TimePickerPopup from '../../components/popups/TimePickerPopup';
import { SearchInput } from '../../components/common';
import SelectDropdown from 'react-native-select-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import FilterMemberPopup from '../../components/popups/FilterMemberPopup';
import CustomCalendar from '../../components/controls/CustomCalendar';

@observer
export default class ReportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotiPopup: false,
      showTrainTimePopup: false,
      showDatePickerPopup: false,
      showTimePickerPopup: false,
      trainDateTime: new Date(),
      trainId: 0,
      active_subscribers: 21,
      active_punchCard: 54,
      inactive_punchCard: 94,
      inactive_subscriber: 5,
      tabIndex: 0,
      trainerList: [
        { id: 1, name: 'שם: שם פרטי שם משפחה', avatar: '' },
        { id: 2, name: 'שם: שם פרטי שם משפחה', avatar: '' },
        { id: 3, name: 'שם: שם פרטי שם משפחה', avatar: '' },
        { id: 4, name: 'שם: שם פרטי שם משפחה', avatar: '' },
      ],
      sortType: [
        { name: 'סטטיסטיקה ליום אחד' },
        { name: 'סטטיסטיקה למשך שבוע' },
        { name: 'סטטיסטיקה לחודש אחד' },
        { name: 'תאריך מותאם אישית' },
      ],
      selectedSortType: 'סטטיסטיקה ליום אחד',
      customDate: false,
      sortOpen: false,
      showFilterMemberPopup: false,
    };
  }

  getInfo = () => {};

  componentDidMount() {
    this.getInfo();
  }

  onSelect = () => {};

  render() {
    return (
      <SafeAreaView>
        <ScrollView style={Styles.wrapper}>
          <VerticalLayout style={{ paddingVertical: 29, paddingBottom: 90 }}>
            <HorizontalLayout
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Button
                onPress={() => {
                  this.setState({ showNotiPopup: true });
                }}>
                <LocalImage
                  source={require('src/assets/image/ic_nofitication.png')}
                  style={{ width: 24, height: 24 }}
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
                דוחות
              </Text>
              <Button onPress={() => {}}>
                <LocalImage
                  source={require('src/assets/image/ic_bottom_gyme_off.png')}
                  style={{ width: 39, height: 39 }}
                />
              </Button>
            </HorizontalLayout>
            <HorizontalLayout
              style={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
              <SelectDropdown
                searchInputStyle={{ padding: 0, margin: 0 }}
                data={this.state.sortType}
                buttonStyle={{
                  backgroundColor: 'transprent',
                  height: 20,
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
                renderCustomizedButtonChild={(selectedItem: any, index: number) => {
                  return (
                    <HorizontalLayout style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          color: '#5C9DF2',
                          textDecorationLine: 'underline',
                          fontWeight: '600',
                          fontFamily: 'Danidin',
                        }}>
                        למין
                      </Text>
                      <LocalImage
                        source={require('src/assets/image/ic_sort.png')}
                        style={{ width: 21, height: 21 }}
                      />
                    </HorizontalLayout>
                  );
                }}
                dropdownOverlayColor="transparent"
                dropdownStyle={{
                  height: 'auto',
                  borderRadius: 11,
                  backgroundColor: 'white',
                  elevation: 3,
                }}
                selectedRowStyle={{
                  height: 48,
                  paddingVertical: 15,
                  borderBottomColor: '#F5F5F5',
                  backgroundColor: 'rgba(148, 189, 242, .2)',
                }}
                rowStyle={{ height: 48, paddingVertical: 15, borderBottomColor: '#F5F5F5' }}
                rowTextStyle={{ fontSize: 16, lineHeight: 19, textAlign: 'right', color: '#000' }}
                onSelect={(selectedItem, index) => {
                  this.setState({ selectedSortType: selectedItem.name });
                  selectedItem.name === 'תאריך מותאם אישית' && this.setState({ customDate: true });
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#000',
                  fontWeight: '600',
                  fontFamily: 'Danidin',
                }}>
                חברות פעילה
              </Text>
            </HorizontalLayout>
            {this.state.customDate && (
              <CustomCalendar style={{ marginBottom: 10 }} selectedType="single-range" />
            )}
            <HorizontalLayout style={styles.info_item}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={['#59E967', '#A8EDAF']}
                  style={{
                    width: 31,
                    height: 31,
                    borderRadius: 15.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_arrow_up.png')}
                    style={{ width: 11.67, height: 13.33 }}
                  />
                </LinearGradient>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#94CF0A',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Danidin',
                  }}>
                  21
                </Text>
              </HorizontalLayout>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    marginRight: 7,
                    color: '#000',
                    fontFamily: 'Danidin',
                  }}>
                  מנויים
                </Text>
                <View style={[styles.info_num, { backgroundColor: '#95B7EA' }]}>
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 22,
                      color: 'white',
                      fontWeight: '600',
                      fontFamily: 'Danidin',
                    }}>
                    {this.state.active_subscribers}
                  </Text>
                </View>
              </HorizontalLayout>
            </HorizontalLayout>
            <HorizontalLayout style={styles.info_item}>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={['#FC2121', '#FFC6C6']}
                  style={{
                    width: 31,
                    height: 31,
                    borderRadius: 15.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <LocalImage
                    source={require('src/assets/image/ic_arrow_down.png')}
                    style={{ width: 11.67, height: 13.33 }}
                  />
                </LinearGradient>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#FF9797',
                    marginLeft: 10,
                    fontWeight: '600',
                    fontFamily: 'Danidin',
                  }}>
                  21
                </Text>
              </HorizontalLayout>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    marginRight: 7,
                    color: '#000',
                    fontFamily: 'Danidin',
                  }}>
                  כרטיסי ניקוב
                </Text>
                <View style={[styles.info_num, { backgroundColor: '#0D65D9' }]}>
                  <Text
                    style={{
                      fontSize: 18,
                      lineHeight: 22,
                      color: 'white',
                      fontWeight: '600',
                      fontFamily: 'Danidin',
                    }}>
                    {this.state.active_punchCard}
                  </Text>
                </View>
              </HorizontalLayout>
            </HorizontalLayout>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 19,
                marginBottom: 15,
                color: '#000',
                fontWeight: '600',
                fontFamily: 'Danidin',
              }}>
              חברות לא פעילה
            </Text>
            <HorizontalLayout style={{ justifyContent: 'space-between' }}>
              <View style={{ width: (SCREEN_WIDTH - 64) / 2 }}>
                <HorizontalLayout style={styles.info_item}>
                  <View style={[styles.info_num, { backgroundColor: '#4399FF' }]}>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 22,
                        color: 'white',
                        fontWeight: '600',
                        fontFamily: 'Danidin',
                      }}>
                      {this.state.inactive_punchCard}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 16,
                      lineHeight: 19,
                      width: '50%',
                      color: '#000',
                      fontFamily: 'Danidin',
                    }}>
                    כרטיסי ניקוב
                  </Text>
                </HorizontalLayout>
              </View>
              <View style={{ width: (SCREEN_WIDTH - 64) / 2 }}>
                <HorizontalLayout style={styles.info_item}>
                  <View style={[styles.info_num, { backgroundColor: '#43C7FF' }]}>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 22,
                        color: 'white',
                        fontWeight: '600',
                        fontFamily: 'Danidin',
                      }}>
                      {this.state.inactive_subscriber}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                    מנויים
                  </Text>
                </HorizontalLayout>
              </View>
            </HorizontalLayout>
            <SearchInput setSearch={(search) => {}} />
            <HorizontalLayout
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}>
              <Button
                onPress={() => {
                  this.setState({ showFilterMemberPopup: true });
                }}
                style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#5C9DF2',
                    textDecorationLine: 'underline',
                    fontWeight: '600',
                    fontFamily: 'Danidin',
                  }}>
                  סינון
                </Text>
                <LocalImage
                  source={require('src/assets/image/ic_sort.png')}
                  style={{ width: 21, height: 21 }}
                />
              </Button>
              <HorizontalLayout>
                <Button onPress={() => {}}>
                  <LocalImage
                    source={require('src/assets/image/ic_print.png')}
                    style={{ width: 35, height: 35, marginRight: 10 }}
                  />
                </Button>
                <Button onPress={() => {}}>
                  <LocalImage
                    source={require('src/assets/image/ic_download.png')}
                    style={{ width: 35, height: 35 }}
                  />
                </Button>
              </HorizontalLayout>
            </HorizontalLayout>
            <HorizontalLayout style={{ justifyContent: 'space-between', marginBottom: 24 }}>
              <Button
                style={[
                  this.state.tabIndex === 0 && { borderWidth: 1, borderColor: '#94BDF2' },
                  styles.tab_item,
                ]}
                onPress={() => {
                  this.setState({ tabIndex: 0 });
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#1E6FD9',
                    fontWeight: '600',
                    fontFamily: 'Danidin',
                  }}>
                  כרטיסי ניקוב
                </Text>
              </Button>
              <Button
                style={[
                  this.state.tabIndex === 1 && { borderWidth: 1, borderColor: '#94BDF2' },
                  styles.tab_item,
                ]}
                onPress={() => {
                  this.setState({ tabIndex: 1 });
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 19,
                    color: '#1E6FD9',
                    fontWeight: '600',
                    fontFamily: 'Danidin',
                  }}>
                  מִנוּי
                </Text>
              </Button>
            </HorizontalLayout>
            <FlatList
              ref={(ref) => {
                this._flContent = ref;
              }}
              showsVerticalScrollIndicator={false}
              data={this.state.trainerList}
              numRows={1}
              renderItem={({ item, index }) => {
                return (
                  <HorizontalLayout style={styles.trainer_item}>
                    <LocalImage
                      source={require('src/assets/image/ic_round_down.png')}
                      style={{ width: 27, height: 27 }}
                    />
                    <HorizontalLayout style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 19,
                          marginRight: 5,
                          fontWeight: '600',
                          color: '#000',
                          fontFamily: 'Danidin',
                        }}>
                        {item.name}
                      </Text>
                      <FastImage
                        source={{ uri: item.avatar ? item.avatar : IMAGE_FOO_URL }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{ width: 28, height: 28 }}
                      />
                    </HorizontalLayout>
                  </HorizontalLayout>
                );
              }}
              keyExtractor={(item, idx) => idx.toString()}
              ItemSeparatorComponent={() => {
                return <View style={{ height: 10 }} />;
              }}
            />
          </VerticalLayout>
        </ScrollView>
        <NotiPopup
          visible={this.state.showNotiPopup}
          onCancel={() => {
            this.setState({ showNotiPopup: false });
          }}
          setTrainingTime={(id, date) => {
            this.setState({
              trainId: id,
              showNotiPopup: false,
              trainDateTime: date,
              showTrainTimePopup: true,
            });
          }}
          setSearch={() => {}}
        />
        <TrainTimePopup
          visible={this.state.showTrainTimePopup}
          onCancel={() => {
            this.setState({ showTrainTimePopup: false });
          }}
          onBack={() => {
            this.setState({
              showTrainTimePopup: false,
              showNotiPopup: true,
            });
          }}
          trainDate={CommonUtils.getFormatedDate(this.state.trainDateTime, 'DD/MM/YYYY')}
          trainTime={CommonUtils.getFormatedDate(this.state.trainDateTime, 'HH:mm')}
          onConfirm={() => {
            this.setState({ showTrainTimePopup: false });
            this.changeTrainDateTime();
          }}
          setDatePicker={() => {
            this.setState({ showDatePickerPopup: true });
          }}
          setTimePicker={() => {
            this.setState({ showTimePickerPopup: true });
          }}
        />
        <DatePickerPopup
          visible={this.state.showDatePickerPopup}
          date={new Date(moment(this.state.trainDateTime))}
          setTrainDate={(date) => {
            this.setState({ trainDateTime: date });
          }}
          onCancel={() => {
            this.setState({ showDatePickerPopup: false });
          }}
        />
        <TimePickerPopup
          visible={this.state.showTimePickerPopup}
          time={new Date(moment(this.state.trainDateTime))}
          setTrainTime={(time) => {
            this.setState({ trainDateTime: time });
          }}
          onCancel={() => {
            this.setState({ showTimePickerPopup: false });
          }}
        />
        <FilterMemberPopup
          visible={this.state.showFilterMemberPopup}
          onCancel={() => {
            this.setState({ showFilterMemberPopup: false });
          }}
          onKeep={() => {}}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  info_item: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 11,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  info_num: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab_item: {
    width: (SCREEN_WIDTH - 63) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: '#F5F5F5',
    paddingVertical: 9,
  },
  trainer_item: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 15.5,
    paddingHorizontal: 15,
    borderRadius: 11,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
