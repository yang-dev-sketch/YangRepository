import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { LocalImage } from '../controls';
import GlobalState from '../../mobx/GlobalState';

export default class CommonInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[this.props.style]}>
        <TextInput
          style={this.props.inputStyle}
          backgroundColor={this.props.backgroundColor}
          borderRadius={this.props.numberOfLines === 1 ? 43 : 8}
          textAlign={GlobalState.langPopup.langStatus === 'en' ? 'left' : 'right'}
          textAlignVertical="top"
          paddingHorizontal={10}
          paddingBottom={this.props.numberOfLines === 1 ? 0 : 30}
          fontSize={(this.props.fontSize && this.props.fontSize) || 16}
          lineHeight={(this.props.lineHeight && this.props.lineHeight) || 19}
          maxLength={this.props.numberOfLines === 1 ? this.props.maxLength || 40 : 250}
          multiline={this.props.numberOfLines === 1 ? false : true}
          numberOfLines={this.props.numberOfLines}
          value={`${this.props.value}`}
          placeholder={this.props.placeholder}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
          onChangeText={(text) => this.props.onChangeText(text)}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        {this.props.numberOfLines !== 1 && (
          <Text
            style={[
              styles.count,
              (GlobalState.langPopup.langStatus === 'en' && { right: 10 }) || { left: 10 },
            ]}>
            {this.props.value.length}/250
          </Text>
        )}
        {this.props.icon && (
          <LocalImage
            source={this.props.icon}
            style={[
              { width: 14.4, height: 16, position: 'absolute', top: 12 },
              (GlobalState.langPopup.langStatus === 'en' && { right: 15.8 }) || { left: 15.8 },
            ]}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  count: {
    fontSize: 14,
    lineHeight: 17,
    color: '#1E6FD9',
    position: 'absolute',
    bottom: 10,
  },
});
