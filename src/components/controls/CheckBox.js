// common
import React from 'react';
import { Image, View } from 'react-native';
import LocalImage from './LocalImage';
import Button from './Button';

// default resize mode changed from "cover" to "contain"
export default class CheckBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        style={this.props.style}
        onPress={() => {
          this.props.onChange(!this.props.value);
        }}>
        {(this.props.value && (
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: '#1269DB',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LocalImage
              source={require('src/assets/image/ic_check.png')}
              style={{ width: 9.3, height: 6.83 }}
            />
          </View>
        )) || (
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.6)',
            }}></View>
        )}
      </Button>
    );
  }
}
