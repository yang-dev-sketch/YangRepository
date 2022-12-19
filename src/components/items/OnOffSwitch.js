import React from 'react';
import { StyleSheet, Text, Touchable, View } from 'react-native';
import { Button, LocalImage, HorizontalLayout, VerticalLayout } from '../controls';

export default class OnOffSwitch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {(this.props.state && (
          <LocalImage
            source={require('src/assets/image/ic_switch_on.png')}
            style={{ width: 68, height: 34 }}
          />
        )) || (
          <LocalImage
            source={require('src/assets/image/ic_switch_off.png')}
            style={{ width: 68, height: 34 }}
          />
        )}
      </View>
    );
  }
}
