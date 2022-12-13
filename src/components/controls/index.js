import React from 'react';
import { View } from 'react-native';

import LocalImage from './LocalImage';
import Button from './Button';
import AppScreen from './AppScreen';
import ShakeAnimateView from './ShakeAnimateView';

class HorizontalLayout extends React.Component {
  render() {
    return (
      <View {...this.props} style={[this.props.style, { flexDirection: 'row', display: 'flex' }]} />
    );
  }
}

class VerticalLayout extends React.Component {
  render() {
    return (
      <View
        {...this.props}
        style={[this.props.style, { flexDirection: 'column', display: 'flex' }]}
      />
    );
  }
}

export { LocalImage, Button, HorizontalLayout, VerticalLayout, AppScreen, ShakeAnimateView };
