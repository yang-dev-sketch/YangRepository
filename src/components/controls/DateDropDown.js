import React from 'react';
import { Text, View } from 'react-native';
import { Button, HorizontalLayout, VerticalLayout } from '.';
import { CommonUtils } from '../../utils';
import DatePicker from 'rmc-date-picker';

export default class DateDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      modifyState: false,
    };
  }

  render() {
    return (
      <VerticalLayout style={{ width: '100%' }}>
        {(!this.state.modifyState && (
          <Button
            onPress={() => {
              this.setState({ modifyState: true });
            }}>
            <HorizontalLayout
              style={{
                width: '100%',
                paddingVertical: 11,
                borderRadius: 20,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                {CommonUtils.getFormatedDate(this.state.date, 'DD')}
              </Text>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>/</Text>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                {CommonUtils.getFormatedDate(this.state.date, 'MM')}
              </Text>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>/</Text>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                {CommonUtils.getFormatedDate(this.state.date, 'YYYY')}
              </Text>
            </HorizontalLayout>
          </Button>
        )) || (
          <View style={{ width: '100%', height: 80, overflow: 'hidden', marginTop: 20 }}>
            <DatePicker
              style={{
                width: '100%',
                overflow: 'hidden',
                marginTop: -60,
                flexDirection: 'row-reverse',
              }}
              date={new Date(this.state.date)}
              mode="date"
              minDate={new Date(2000, 1, 1, 0, 0, 0)}
              maxDate={new Date(2030, 1, 1, 23, 59, 59)}
              onDateChange={(date) => {
                this.setState({ modifyState: true });
                clearTimeout(this.timeOut);
                setTimeout(() => {
                  this.setState({ modifyState: false });
                }, 5000);
                this.setState({ date: date });
                this.props.changeDate(date);
              }}
            />
          </View>
        )}
      </VerticalLayout>
    );
  }
}
