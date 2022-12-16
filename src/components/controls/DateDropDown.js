import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '.';
// import DatePicker from 'react-native-date-picker';
import { CommonUtils } from '../../utils';
import { SCREEN_WIDTH } from '../../constants/Constants';
import { DatePicker, CalendarList } from 'react-native-common-date-picker';
import { ScrollView } from 'react-native-gesture-handler';

export default class DateDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  render() {
    const data = this.props.data;
    return (
      <VerticalLayout style={{ width: '100%' }}>
        <Button>
          <HorizontalLayout
            style={{
              width: '100%',
              paddingVertical: 11,
              borderRadius: 20,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text style={{ fontSize: 16, lineHeight: 19 }}>
              {CommonUtils.getFormatedDate(this.state.time, 'DD')}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 19 }}>/</Text>
            <Text style={{ fontSize: 16, lineHeight: 19 }}>
              {CommonUtils.getFormatedDate(this.state.time, 'MM')}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 19 }}>/</Text>
            <Text style={{ fontSize: 16, lineHeight: 19 }}>
              {CommonUtils.getFormatedDate(this.state.time, 'YYYY')}
            </Text>
          </HorizontalLayout>
        </Button>
        {/* <DatePicker
          confirm={(date) => {
            console.warn(date);
          }}
          type="DD-MM-YYYY"
          minDate="2000-01-01"
          maxDate="2022-01-01"
          defaultDate="2005-01-01"
          showToolBar={true}
          rows={5}
          rowHeight={40}
          titleText="title"
          toolBarPosition="bottom"
          backgroundColor="#F5F5F5s"
          selectedRowBackgroundColor="white"
          selectedBorderLineMarginHorizontal={30}
          unselectedRowBackgroundColor="#F5F5F5"
          selectedBorderLineColor="#1E6FD9"
          monthDisplayMode="digit"
          textMarginHorizontal={45}
          onValueChange={(selectedDate) => {
            console.log(selectedDate);
          }}
        /> */}
        {/* <CalendarList
          containerStyle={{ flex: 1 }}
          rows={3}
          rowHeight={40}
          selectedRowBackgroundColor="white"
          unselectedRowBackgroundColor="#F5F5F5"
          selectedBorderLineColor="#1E6FD9"
          monthDisplayMode="digit"
          cancel={() => this.setState({ visible: false })}
          confirm={(data) => {
            this.setState({
              selectedDate1: data[0],
              selectedDate2: data[1],
              visible: false,
            });
          }}
        /> */}
        {/* <DatePicker
          androidVariant="iosClone"
          fadeToColor="none"
          textColor="#000"
          dividerHeight={1}
          minuteInterval={60}
          rows={3}
          rowHeight={40}
          selectedRowBackgroundColor="white"
          unselectedRowBackgroundColor="#F5F5F5"
          selectedBorderLineColor="#1E6FD9"
          monthDisplayMode="digit"
          style={{
            backgroundColor: '#F5F5F5',
            width: SCREEN_WIDTH - 60,
          }}
          date={this.state.time}
          mode="date"
          onDateChange={(time) => {
            this.setState({ time: time });
          }}
        /> */}
      </VerticalLayout>
    );
  }
}
