import React from 'react';
import { TouchableOpacity } from 'react-native';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const opacity = 0.8; // default is 0.2
    return <TouchableOpacity {...props} activeOpacity={props.opacity ? props.opacity : opacity} />;
  }
}
