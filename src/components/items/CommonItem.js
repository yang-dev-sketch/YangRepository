import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Colors, Dimens, FontFamily, Langs } from '../../constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import Styles from '../../constants/Styles';
import { CommonUtils } from '../../utils';
import FastImage from 'react-native-fast-image';
import { IMAGE_FOO_URL } from '../../constants/Constants';

class CommonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <Button
        onPress={() => {
          if (this.props.select) this.props.select();
        }}>
        <HorizontalLayout
          style={[
            styles.common_item,
            (data.id == this.props.selectId && { borderColor: '#0D65D9' }) || {
              borderColor: '#D8D8D8',
            },
          ]}>
          <HorizontalLayout style={{ width: '54%' }}>
            {(data.id == this.props.selectId && (
              <LocalImage
                source={require('src/assets/image/ic_check_on.png')}
                style={{ width: 22, height: 22 }}
              />
            )) || (
              <LocalImage
                source={require('src/assets/image/ic_check_off.png')}
                style={{ width: 22, height: 22 }}
              />
            )}
            {this.props.leftText != '' && (
              <Text numberOfLines={2} style={{ fontSize: 16, lineHeight: 22, color: '#979797' }}>
                {this.props.leftText}
              </Text>
            )}
          </HorizontalLayout>
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text numberOfLines={this.props.numberOfLines} style={{ fontSize: 16, lineHeight: 19 }}>
              {this.props.text}
            </Text>
            {(data.id == this.props.selectId &&
              ((this.props.fastImage &&
                ((this.props.imageCut &&
                  ((this.props.imageCutDisable && (
                    <FastImage
                      source={{ uri: data.avatar ? data.avatar : IMAGE_FOO_URL }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{ width: 45, height: 45, marginLeft: 6 }}
                    />
                  )) || (
                    <View style={{ width: 45, height: 30, overflow: 'hidden' }}>
                      <FastImage
                        source={{ uri: data.avatar ? data.avatar : IMAGE_FOO_URL }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{ width: 45, height: 45, marginTop: -7.5, marginLeft: 6 }}
                      />
                    </View>
                  ))) || (
                  <FastImage
                    source={{
                      uri: this.props.activeImage ? this.props.activeImage : IMAGE_FOO_URL,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                  />
                ))) || (
                <LocalImage
                  source={this.props.activeImage}
                  style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                />
              ))) ||
              (this.props.fastImage &&
                ((this.props.imageCut && (
                  <View style={{ width: 45, height: 30, overflow: 'hidden', marginLeft: 6 }}>
                    <FastImage
                      source={{ uri: data.avatar ? data.avatar : IMAGE_FOO_URL }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{ width: 45, height: 45, marginTop: -7.5 }}
                    />
                  </View>
                )) || (
                  <FastImage
                    source={{
                      uri: this.props.disActiveImage ? this.props.disActiveImage : IMAGE_FOO_URL,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                  />
                ))) || (
                <LocalImage
                  source={this.props.disActiveImage}
                  style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
                />
              )}
          </HorizontalLayout>
        </HorizontalLayout>
      </Button>
    );
  }
}

export default CommonItem;

const styles = StyleSheet.create({
  common_item: {
    width: '100%',
    height: 65,
    paddingHorizontal: 15,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 11,
  },
});
