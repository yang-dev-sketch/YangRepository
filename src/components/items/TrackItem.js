import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Colors, Dimens, FontFamily, Langs } from '../../constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import Styles from '../../constants/Styles';
import { CommonUtils } from '../../utils';
import FastImage from 'react-native-fast-image';
import { IMAGE_FOO_URL } from '../../constants/Constants';

class TrackItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const data = this.props.data;
    return (
      <Button
        onPress={() => {
          this.props.selectTrack();
        }}>
        <HorizontalLayout
          style={[
            styles.track_item,
            this.props.selectedTrackId === data.id && { borderColor: '#0D65D9' },
          ]}>
          {(this.props.selectedTrackId === data.id && (
            <LocalImage
              source={require('src/assets/image/ic_check_on.png')}
              style={{ width: 22, height: 22, marginRight: 21 }}
            />
          )) || (
            <LocalImage
              source={require('src/assets/image/ic_edit_round.png')}
              style={{ width: 28, height: 28 }}
            />
          )}
          <HorizontalLayout
            style={{ alignItems: 'center', justifyContent: 'flex-end', width: '80%' }}>
            <Text numberOfLines={2} style={{ fontSize: 16, lineHeight: 22, marginRight: 7 }}>
              {data.description}
            </Text>
            {this.props.selectedTrackId !== data.id && (
              <LocalImage
                source={require('src/assets/image/ic_subs.png')}
                style={{ width: 45, height: 45 }}
              />
            )}
          </HorizontalLayout>
        </HorizontalLayout>
      </Button>
    );
  }
}

export default TrackItem;

const styles = StyleSheet.create({
  track_item: {
    width: '100%',
    borderRadius: 11,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
});
