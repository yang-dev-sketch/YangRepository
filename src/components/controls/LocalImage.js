// common
import React from 'react';
import { Image } from 'react-native';

// default resize mode changed from "cover" to "contain"
export default class LocalImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image
        resizeMode={this.props.resizeMode ? this.props.resizeMode : "contain"}
        source={this.props.source}
        style={this.props.style}
        onPress={() => {
          console.log('dsfdsf')
          if (this.props.onPress) {
              this.props.onPress();
          }
        }}
      />
    )
  }
}