import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import { CommonUtils } from '../../utils';
import moment from "moment";

class PaymentItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <HorizontalLayout style={[styles.payment_item]}>
        <HorizontalLayout style={{ alignItems: 'center' }}>
          <View
            style={[
              data.state === 'נכשל' && { backgroundColor: '#E81C00' },
              data.state === 'שולם' && { backgroundColor: '#00AF3C' },
              {
                width: 69,
                height: 27,
                borderRadius: 13.5,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              },
            ]}>
            <Text style={{ fontSize: 14, lineHeight: 22, color: 'white', fontFamily: 'Danidin' }}>{data.state}</Text>
          </View>
          <LocalImage
            source={require('src/assets/image/ic_download.png')}
            style={{ width: 27, height: 27, marginRight: 10 }}
          />
          <LocalImage
            source={require('src/assets/image/ic_send.png')}
            style={{ width: 27, height: 27 }}
          />
        </HorizontalLayout>
        <VerticalLayout>
          <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontWeight: '600', fontFamily: 'Danidin' }}>{data.method}</Text>
          <Text style={{ fontSize: 14, lineHeight: 22, color: '#979797', fontFamily: 'Danidin' }}>
            {moment(data.date).format('hh:mm, DD.MM.YYYY')}
          </Text>
        </VerticalLayout>
      </HorizontalLayout>
    );
  }
}

export default PaymentItem;

const styles = StyleSheet.create({
  payment_item: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 11,
    elevation: 1,
    borderWidth: 0,
  },
});
