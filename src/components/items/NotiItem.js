import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Dimens, FontFamily, Langs } from '../../constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import Styles from '../../constants/Styles';

class NotiItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Button
        onPress={() => {
          this.props.onMention();
        }}>
        <HorizontalLayout style={[styles.noti_item, this.props.style]}>
          <VerticalLayout style={{ alignItems: 'space-between', justifyContent: 'flex-end' }}>
            <Text
              numberOfLines={2}
              style={{ fontSize: 16, lineHeight: 22, letterSpacing: -0.17, width: '70%' }}>
              {this.props.title}
            </Text>
            <Text numberOfLines={1} style={{ fontSize: 14, lineHeight: 22, color: '#979797' }}>
              {this.props.date}
            </Text>
          </VerticalLayout>
          <LocalImage
            source={require('src/assets/image/ic_noti.png')}
            style={{ width: 45, height: 45, marginLeft: 7 }}
          />
        </HorizontalLayout>
      </Button>
    );
  }
}

export default NotiItem;

const styles = StyleSheet.create({
  noti_item: {
    width: '100%',
    height: 86,
    borderRadius: 11,
    paddingRight: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
