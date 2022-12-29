import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LocalImage, HorizontalLayout, VerticalLayout } from '../controls';

export default class TrainingItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <HorizontalLayout
        style={[
          styles.train_item,
          (this.props.even && { backgroundColor: '#1E6FD9' }) || { backgroundColor: '#43C7FF' },
        ]}>
        <VerticalLayout style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <View
            style={{
              width: 22.5,
              height: 22.5,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              borderBottomRightRadius: 7,
            }}>
            <LocalImage
              source={require('src/assets/image/ic_user.png')}
              style={{ width: 11.68, height: 14 }}
            />
          </View>
          <Text style={{ fontSize: 14, lineHeight: 17, color: 'white' }}>אישורי הגעה</Text>
          <LocalImage
            source={require('src/assets/image/ic_editing.png')}
            style={{ width: 22.5, height: 22.5 }}
          />
          <Text style={{ fontSize: 14, lineHeight: 17, color: 'white' }}>עריכה</Text>
        </VerticalLayout>
        <VerticalLayout style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, lineHeight: 19, color: 'white', fontWeight: '600' }}>
            {data.type} | {data.min} דק’
          </Text>
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>{data.timeArea}</Text>
            <LocalImage
              source={require('src/assets/image/ic_clock_off.png')}
              style={{ width: 19.68, height: 19.68, marginLeft: 5 }}
            />
          </HorizontalLayout>
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>{data.name}</Text>
            <LocalImage
              source={require('src/assets/image/ic_coach_off.png')}
              style={{ width: 19.68, height: 19.68, marginLeft: 5 }}
            />
          </HorizontalLayout>
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, lineHeight: 19, color: 'white' }}>
              {data.participants} משתתפים
            </Text>
            <LocalImage
              source={require('src/assets/image/ic_group.png')}
              style={{ width: 19.68, height: 19.68, marginLeft: 5 }}
            />
          </HorizontalLayout>
        </VerticalLayout>
      </HorizontalLayout>
    );
  }
}

const styles = StyleSheet.create({
  train_item: {
    width: '100%',
    height: 120,
    borderRadius: 11,
    paddingVertical: 13,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: '#1E6FD9',
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
