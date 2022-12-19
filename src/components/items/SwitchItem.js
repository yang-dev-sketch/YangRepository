import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SCREEN_WIDTH } from '../../constants/Constants';
import { Button, LocalImage, HorizontalLayout, VerticalLayout } from '../controls';
import OnOffSwitch from './OnOffSwitch';

export default class SwitchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <Button
        onPress={() => {
          if (this.props.onSelect) this.props.onSelect();
        }}
        style={[this.props.style]}>
        <HorizontalLayout style={styles.switch_item}>
          <OnOffSwitch state={data.checked} />
          <Text>{data.name}</Text>
        </HorizontalLayout>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  switch_item: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
