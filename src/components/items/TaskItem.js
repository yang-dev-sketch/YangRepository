import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMAGE_FOO_URL } from '../../constants/Constants';
import { LocalImage, HorizontalLayout, VerticalLayout } from '../controls';

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <VerticalLayout style={styles.task_item}>
        <View
          style={[
            this.props.index % 3 === 0 && { backgroundColor: '#43C7FF' },
            this.props.index % 3 === 1 && { backgroundColor: '#4399FF' },
            this.props.index % 3 === 2 && { backgroundColor: '#4333FF' },
            {
              width: '100%',
              height: 10,
              borderTopLeftRadius: 11,
              borderTopRightRadius: 11,
            },
          ]}></View>
        <HorizontalLayout
          style={{
            width: '100%',
            paddingHorizontal: 16,
            paddingVertical: 18,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#F2F2F2',
          }}>
          <LocalImage
            source={
              (data.checked && require('src/assets/image/ic_check_on.png')) ||
              require('src/assets/image/ic_check_off.png')
            }
            style={{ width: 22.92, height: 22.92 }}
          />
          <HorizontalLayout>
            <VerticalLayout>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>{data.name}</Text>
              <Text style={{ fontSize: 14, lineHeight: 22, letterSpacing: -0.17, color: '#000' }}>
                {data.date}
              </Text>
            </VerticalLayout>
            <FastImage
              source={{ uri: data.avatar ? data.avatar : IMAGE_FOO_URL }}
              resizeMode={FastImage.resizeMode.cover}
              style={{ width: 34, height: 34, borderRadius: 17 }}
            />
          </HorizontalLayout>
        </HorizontalLayout>
        <Text
          numberOfLines={1}
          style={{
            textAlign: 'right',
            width: '90%',
            marginVertical: 15,
            paddingHorizontal: 15,
            fontSize: 14,
            lineHeight: 16.8,
            color: '#000',
          }}>
          {data.content}
        </Text>
      </VerticalLayout>
    );
  }
}

const styles = StyleSheet.create({
  task_item: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 11,
    alignItems: 'flex-start',
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
  },
  text: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 1,
    width: '53%',
  },
});
