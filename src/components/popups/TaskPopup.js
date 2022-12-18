import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Langs, Colors, Dimens, FontFamily, Styles } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, VerticalLayout, LocalImage } from '../controls';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import { ActiveButton, SearchInput } from '../common';
import { ScrollView } from 'react-navigation';
import { BranchItem } from '../items';
import { requestPost } from '../../utils/ApiUtils';
import { API } from '../../constants/Constants';
import TotalItem from '../items/TotalItem';
import Timeline from 'react-native-timeline-flatlist';
import LeadItem from '../items/LeadItem';
import TaskItem from '../items/TaskItem';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_WIDTH } from 'react-native-common-date-picker/src/contants';
// import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import CustomCalendar from "../controls/CustomCalendar";
// import Calendar from 'react-native-swipe-calendar';

LocaleConfig.locales['hebrew'] = {
  monthNames: [
    'יָנוּאָר',
    'פֶבּרוּאָר',
    'מַרס',
    'אַפּרִיל',
    'מַאִי',
    'יוּנִי',
    'יוּלִי',
    'אוֹגוּסט',
    'סֶפּטֶמבֶּר',
    'אוֹקְטוֹבֶּר',
    'נוֹבֶמבֶּר',
    'דֵצֶמבֶּר',
  ],
  monthNamesShort: [
    'יָנוּאָר',
    'פֶבּרוּאָר',
    'מַרס',
    'אַפּרִיל',
    'מַאִי',
    'יוּנִי',
    'יוּלִי',
    'אוֹגוּסט',
    'סֶפּטֶמבֶּר',
    'אוֹקְטוֹבֶּר',
    'נוֹבֶמבֶּר',
    'דֵצֶמבֶּר',
  ],
  dayNames: ['א', 'ש', 'ו', 'ה', 'ד', 'ג', 'ב'],
  dayNamesShort: ['א', 'ש', 'ו', 'ה', 'ד', 'ג', 'ב'],
  today: 'הַיוֹם',
};
LocaleConfig.defaultLocale = 'hebrew';

@observer
class TaskPopup extends React.Component {
  constructor(props) {
    super(props);
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.state = { selected: null, selectedDate: new Date() };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onSort = () => {};

  onEventPress(data) {
    this.setState({ selected: data });
    this.props.onSelect(data);
  }

  renderSelected() {
    if (this.state.selected) return <Text>{this.state.selected.id}</Text>;
  }

  renderDetail(rowData, sectionID, rowID) {
    return <TaskItem data={rowData} index={sectionID} />;
  }

  setSelectedDate = (value) => {
    this.setState({ selectedDate: value });
  };

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
                paddingHorizontal: 20,
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
              <Text style={{ fontSize: 18, lineHeight: 22 }}>משימות</Text>
            </HorizontalLayout>
            <ScrollView style={{ paddingHorizontal: 20 }}>
              <View
                style={{
                  borderRadius: 11,
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  elevation: 3,
                  marginBottom: 10,
                }}>
                {/* <Calendar
                  initialDate={this.state.selectedDate}
                  minDate={'2022-12-16'}
                  maxDate={'2023-05-30'}
                  dayComponent={({ date, state }) => {
                    return (
                      <Button
                        onPress={() => {
                          this.setSelectedDate(date);
                        }}
                        style={[
                          {
                            width: 26,
                            height: 26,
                          },
                          state === 'selected' && {
                            width: 26,
                            height: 26,
                            borderRadius: 13,
                            backgroundColor: '#5C9DF2',
                            justifyContent: 'center',
                          },
                        ]}>
                        <Text
                          style={[
                            { textAlign: 'center', fontSize: 16, color: '#1E6FD9' },
                            state === 'today' && { color: 'red' },
                            state === 'selected' && { color: 'white' },
                            state === 'disabled' && { color: '#6F6F6F' },
                            state === 'inactive' && { color: 'red' },
                          ]}>
                          {date.day}
                        </Text>
                      </Button>
                    );
                  }}
                  renderArrow={(direction) =>
                    direction === 'left' ? (
                      <LocalImage
                        source={require('src/assets/image/ic_left.png')}
                        style={{ width: 9.17, height: 17.41 }}
                      />
                    ) : (
                      <LocalImage
                        source={require('src/assets/image/ic_right.png')}
                        style={{ width: 9.17, height: 17.41 }}
                      />
                    )
                  }
                  firstDay={1}
                  headerStyle={{ width: '100%' }}
                  onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  onPressArrowRight={(addMonth) => addMonth()}
                  disableArrowLeft={false}
                  disableArrowRight={false}
                  customHeader={() => {
                    return (
                      <HorizontalLayout>
                        <Button
                          onPress={() => {

                          }}>
                          <LocalImage
                            source={require('src/assets/image/ic_left.png')}
                            style={{ width: 9.17, height: 17.41 }}
                          />
                        </Button>
                        <Text>2022</Text>
                        <LocalImage
                          source={require('src/assets/image/ic_right.png')}
                          style={{ width: 9.17, height: 17.41 }}
                        />
                      </HorizontalLayout>
                    );
                  }}
                  enableSwipeMonths={true}
                /> */}
                <CustomCalendar />
              </View>
              <SearchInput
                setSearch={(search) => {
                  this.props.setSearch(search);
                }}
              />
              <HorizontalLayout
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingHorizontal: 20,
                  marginTop: 15,
                  marginBottom: 16.25,
                }}>
                <Text style={{ fontSize: 18, lineHeight: 22 }}>{this.renderSelected()} | 01</Text>
              </HorizontalLayout>
              <Timeline
                data={data}
                innerCircle="dot"
                circleSize={20}
                dotSize={12}
                dotColor="#1E6FD9"
                circleColor="#E2E2E2"
                lineWidth={2}
                lineColor="#1E6FD9"
                listViewContainerStyle={{ paddingTop: 40 }}
                timeContainerStyle={{ marginLeft: -50 }}
                timeStyle={{
                  position: 'absolute',
                  top: -25,
                  left: 8,
                  zIndex: 999,
                  fontSize: 16,
                  lineHeight: 19,
                  color: '#6F6F6F',
                  backgroundColor: 'white',
                  height: 24.5,
                  textAlignVertical: 'center',
                }}
                eventDetailStyle={{
                  marginRight: 10,
                  marginTop: -40,
                  marginBottom: 40,
                }}
                columnFormat="single-column-right"
                onEventPress={this.onEventPress}
                renderDetail={this.renderDetail}
              />
            </ScrollView>
            <Button
              onPress={() => {}}
              style={{
                alignItems: 'center',
                position: 'absolute',
                bottom: 5,
                left: (SCREEN_WIDTH - 45) / 2,
              }}>
              <LocalImage
                source={require('src/assets/image/ic_plus_sign.png')}
                style={{ width: 45, height: 45 }}
              />
            </Button>
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
    height: '95%',
  },
});

export default TaskPopup;
