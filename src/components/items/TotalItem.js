import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SCREEN_WIDTH } from '../../constants/Constants';
import { Button, HorizontalLayout } from '../controls';

export default class TotalItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { amount, text, color } = this.props;
    return (
      <Button
        onPress={() => {
          if (this.props.event) this.props.event();
        }}>
        <HorizontalLayout style={styles.total_item}>
          <View
            style={[
              styles.amount_box,
              { backgroundColor: color, alignItems: 'center', justifyContent: 'center' },
            ]}>
            <Text style={styles.amount}>{amount.toLocaleString()}</Text>
          </View>
          <Text numberOfLines={2} style={styles.text}>
            {text}
          </Text>
        </HorizontalLayout>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  total_item: {
    width: (SCREEN_WIDTH - 64) / 2,
    height: 59,
    backgroundColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount_box: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
  },
  amount: {
    color: 'white',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 1,
    fontWeight: '700',
    fontFamily: 'Danidin',
  },
  text: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 1,
    width: '53%',
    color: '#000',
    fontFamily: 'Danidin',
  },
});
