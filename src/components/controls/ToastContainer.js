import React from 'react';
import { Text, View } from 'react-native';
import LocalImage from './LocalImage';
import Button from './Button';
import { HorizontalLayout } from '.';
import { SCREEN_WIDTH } from '../../constants/Constants';

export default class ToastContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HorizontalLayout
        style={{
          marginHorizontal: 20,
          width: SCREEN_WIDTH - 40,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#0D65D9',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 30,
          paddingLeft: 17,
          paddingRight: 15,
          overScreen: true,
        }}>
        <LocalImage
          source={require('src/assets/image/ic_close_toast.png')}
          style={[{ width: 20, height: 20 }]}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 16, lineHeight: 19, color: 'white', fontWeight: '600', fontFamily: 'Danidin' }}>{this.props.title}</Text>
      </HorizontalLayout>
    );
  }
}
