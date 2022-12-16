import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '.';
import ModalDropdown from 'react-native-modal-dropdown';

export default class ModalDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <ModalDropdown
        options={data}
        dropdownStyle={{
          width: 238,
          height: 'auto',
          borderRadius: 11,
          elevation: 1,
          paddingHorizontal: 15,
        }}
        dropdownTextStyle={{ fontSize: 16, lineHeight: 19, paddingVertical: 15 }}
        dropdownTextHighlightStyle={{ backgroundColor: '#eee' }}
        renderSeparator={() => {
          return (
            <View
              style={{
                width: '100%',
                height: 0,
                borderWidth: 1,
                borderColor: '#F5F5F5',
              }}></View>
          );
        }}
        onSelect={(index, value) => {
          this.props.onSelect(value);
        }}>
        {this.props.button}
      </ModalDropdown>
    );
  }
}
