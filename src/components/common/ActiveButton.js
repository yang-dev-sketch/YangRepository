import React from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '../controls';

export default class ActiveButton extends React.Component {
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
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#0D65D9', '#5C9DF2']}
          style={styles.button}>
          <Text style={styles.text}>{this.props.text}</Text>
        </LinearGradient>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Danidin'
  },
});
