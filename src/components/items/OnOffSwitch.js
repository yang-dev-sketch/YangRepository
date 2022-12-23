import React from 'react';
import { View } from 'react-native';
import { LocalImage } from '../controls';

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
