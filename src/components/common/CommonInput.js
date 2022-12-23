import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

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
          textAlign={this.props.textAlign == 'center' ? 'center' : 'right'}
          textAlignVertical="top"
          paddingHorizontal={10}
          paddingBottom={this.props.numberOfLines === 1 ? 0 : 30}
          fontSize={(this.props.fontSize && this.props.fontSize) || 16}
          lineHeight={(this.props.lineHeight && this.props.lineHeight) || 19}
          maxLength={this.props.numberOfLines === 1 ? this.props.maxLength || 40 : 250}
          multiline={this.props.numberOfLines === 1 ? false : true}
          numberOfLines={this.props.numberOfLines}
          value={this.props.value}
          placeholder={this.props.placeholder}
          returnKeyType={this.props.returnKeyType}
          keyboardType={this.props.keyboardType}
          onChangeText={(text) => this.props.onChangeText(text)}
        />
        {this.props.numberOfLines !== 1 && (
          <Text style={styles.count}>{this.props.value.length}/250</Text>
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
    left: 10,
    bottom: 10,
  },
});
