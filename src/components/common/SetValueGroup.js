import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';

export default class SetValueGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <VerticalLayout style={{ alignItems: 'flex-end', width: '100%' }}>
        <HorizontalLayout
          style={{ marginBottom: 8.5, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, lineHeight: 19, color: '#6F6F6F' }}>{this.props.title}</Text>
          <LocalImage
            source={this.props.image}
            style={{ width: 16, height: 16, marginLeft: 5.5 }}
          />
        </HorizontalLayout>
        <View>{this.props.inputNode}</View>
      </VerticalLayout>
    );
  }
}

const styles = StyleSheet.create({});
