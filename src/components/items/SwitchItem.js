import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, HorizontalLayout } from '../controls';
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
          <Text style={{ fontSize: 16, lineHeight: 19 }}>{data.name}</Text>
        </HorizontalLayout>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  switch_item: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
