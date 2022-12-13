import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Colors, Dimens, FontFamily, Langs } from '../../constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import Styles from '../../constants/Styles';
import { CommonUtils } from '../../utils';
import FastImage from 'react-native-fast-image';
import { IMAGE_FOO_URL } from '../../constants/Constants';

class NotiItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        {(CommonUtils.isBeforeToday(this.props.date) && (
          <VerticalLayout style={styles.active_item}>
            <View
              style={{
                width: '100%',
                height: 10,
                backgroundColor: '#43C7FF',
                borderTopLeftRadius: 11,
                borderTopRightRadius: 11,
              }}></View>
            <HorizontalLayout
              style={{
                paddingHorizontal: 15,
                paddingVertical: 18,
                borderBottomWidth: 1,
                borderBottomColor: '#f2f2f2',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontSize: 14, lineHeight: 22, color: '#1E6FD9' }}>
                {CommonUtils.getFormatedDate(this.props.date, 'hh:mm')}
              </Text>
              <HorizontalLayout>
                <VerticalLayout>
                  <Text style={{ fontSize: 16, lineHeight: 19 }}>{this.props.task}</Text>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 22,
                      letterSpacing: -0.17,
                      color: '#979797',
                    }}>
                    {CommonUtils.getFormatedDate(this.props.date, 'hh:mm, DD.MM.YYYY')}
                  </Text>
                </VerticalLayout>
                <FastImage
                  source={{ uri: this.props.avatar ? this.props.avatar : IMAGE_FOO_URL }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{ width: 34, height: 34, borderRadius: 17 }}
                />
              </HorizontalLayout>
            </HorizontalLayout>
            <VerticalLayout style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
              <Text style={{ fontSize: 14, lineHeight: 17, marginBottom: 8 }}>
                זוהי עובדה מבוססת שדעתו של ...
              </Text>
              <Text
                style={{ fontSize: 14, lineHeight: 17, letterSpacing: -0.17, color: '#5C9DF2' }}>
                להזכיר במועד מאוחר יותר
              </Text>
            </VerticalLayout>
          </VerticalLayout>
        )) || (
          <HorizontalLayout style={styles.noti_item}>
            <VerticalLayout style={{ alignItems: 'space-between', justifyContent: 'flex-end' }}>
              <Text
                numberOfLines={2}
                style={{ fontSize: 16, lineHeight: 22, letterSpacing: -0.17, width: '70%' }}>
                {this.props.title}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 14, lineHeight: 22, color: '#979797' }}>
                {CommonUtils.getFormatedDate(this.props.date, 'hh:mm, DD.MM.YYYY')}
              </Text>
            </VerticalLayout>
            <LocalImage
              source={require('src/assets/image/ic_noti.png')}
              style={{ width: 45, height: 45, borderRadius: 17, marginLeft: 10 }}
            />
          </HorizontalLayout>
        )}
      </View>
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
  active_item: {
    width: '100%',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
});
