import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from "react-native-fast-image";
import { IMAGE_FOO_URL, SCREEN_WIDTH } from '../../constants/Constants';
import { Button, LocalImage, HorizontalLayout, VerticalLayout } from '../controls';

export default class LeadItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <HorizontalLayout style={styles.lead_item}>
        <VerticalLayout style={{ justifyContent: 'space-between', height: '100%' }}>
          {data.type === 'fail' && (
            <Button
              style={{
                width: 67,
                height: 25,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00AF3C',
              }}>
              <Text style={{ fontSize: 14, lineHeight: 17, color: 'white' }}>פָּעִיל</Text>
            </Button>
          )}
          {data.type === 'treatment' && (
            <Button
              style={{
                width: 67,
                height: 25,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FCD400',
              }}>
              <Text style={{ fontSize: 14, lineHeight: 17, color: 'white' }}>בטיפול</Text>
            </Button>
          )}
          {data.type === 'noreply' && (
            <Button
              style={{
                width: 67,
                height: 25,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#E81C00',
              }}>
              <Text style={{ fontSize: 14, lineHeight: 17, color: 'white' }}>אין מענה</Text>
            </Button>
          )}
          <LocalImage
            source={require('src/assets/image/ic_edit_round.png')}
            style={{ width: 28, height: 28 }}
          />
        </VerticalLayout>
        <HorizontalLayout>
          <VerticalLayout style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Text>{data.name}</Text>
            <Text>{data.phone}</Text>
            <Text>{data.gmail}</Text>
            <Text>{data.createdAt}נוצר:</Text>
            <Text>{data.updatedAt}עדכון אחרון:</Text>
          </VerticalLayout>
          <View style={{ width: 29, height: 20, overflow: 'hidden', marginLeft: 6 }}>
            <FastImage
              source={{ uri: data.avatar ? data.avatar : IMAGE_FOO_URL }}
              resizeMode={FastImage.resizeMode.cover}
              style={{ width: 29, height: 29, marginTop: -4.5 }}
            />
          </View>
        </HorizontalLayout>
      </HorizontalLayout>
    );
  }
}

const styles = StyleSheet.create({
  lead_item: {
    width: '100%',
    height: 123,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 8,
    padding: 10,
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
