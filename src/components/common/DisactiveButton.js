import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, LocalImage } from '../controls';

export default class DisactiveButton extends React.Component {
  constructor(props) {
    super(props);
  }

  action = () => {
    this.props.action();
  };

  render() {
    return (
      <Button
        style={[styles.button, this.props.style]}
        onPress={() => {
          this.action();
        }}>
        <Text style={styles.text}>{this.props.text}</Text>
        {this.props.image && (
          <LocalImage
            source={require('src/assets/image/ic_mark_small.png')}
            style={[{ width: 20, height: 20, marginLeft: 10 }]}
            resizeMode="cover"
          />
        )}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#1e6fd9',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  text: {
    fontSize: 16,
    lineHeight: 19,
    color: '#1E6FD9',
  },
});
