import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { HorizontalLayout, LocalImage } from '.';

export default class TimeDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const data = this.props.data;
    return (
      <Text>timepicker</Text>
    );
  }
}
