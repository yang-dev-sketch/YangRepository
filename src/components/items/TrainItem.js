import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Colors, Dimens, FontFamily, Langs } from '../../constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import Styles from '../../constants/Styles';
import { CommonUtils } from '../../utils';
import FastImage from 'react-native-fast-image';
import { IMAGE_FOO_URL } from '../../constants/Constants';

class TrainItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <Button
        onPress={() => {
          this.props.selectTrain();
        }}>
        <HorizontalLayout
          style={[
            styles.train_item,
            (data.id == this.props.selectTrainId && { borderColor: '#0D65D9' }) || {
              borderColor: '#D8D8D8',
            },
          ]}>
          {(data.id == this.props.selectTrainId && (
            <LocalImage
              source={require('src/assets/image/ic_check_on.png')}
              style={{ width: 22, height: 22 }}
            />
          )) || <View></View>}
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ fontSize: 16, lineHeight: 19 }}>
              {data.name}
            </Text>
            {(data.id == this.props.selectTrainId &&
              this.props.index === 0 && (
                <LocalImage
                  source={require('src/assets/image/ic_train_round_on.png')}
                  style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                />
              ) ||
              this.props.index === 1 && (
                <LocalImage
                  source={require('src/assets/image/ic_man_round_off.png')}
                  style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                />
              ) ||
              this.props.index === 2 && (
                <LocalImage
                  source={require('src/assets/image/ic_boxing_round_off.png')}
                  style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                />
              ) ||
              this.props.index === 3 && (
                <LocalImage
                  source={require('src/assets/image/ic_zumba_round_off.png')}
                  style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                />
              ) ||
              this.props.index === 4 && (
                <LocalImage
                  source={require('src/assets/image/ic_yoga_round_off.png')}
                  style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                />
              )) ||
              (this.props.index === 0 && (
                  <LocalImage
                    source={require('src/assets/image/ic_train_round_on.png')}
                    style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                  />
                ) ||
                this.props.index === 1 && (
                  <LocalImage
                    source={require('src/assets/image/ic_man_round_off.png')}
                    style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                  />
                ) ||
                this.props.index === 2 && (
                  <LocalImage
                    source={require('src/assets/image/ic_boxing_round_off.png')}
                    style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                  />
                ) ||
                this.props.index === 3 && (
                  <LocalImage
                    source={require('src/assets/image/ic_zumba_round_off.png')}
                    style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                  />
                ) ||
                this.props.index === 4 && (
                  <LocalImage
                    source={require('src/assets/image/ic_yoga_round_off.png')}
                    style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                  />
                ))}
          </HorizontalLayout>
        </HorizontalLayout>
      </Button>
    );
  }
}

export default TrainItem;

const styles = StyleSheet.create({
  train_item: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 11,
  },
});
