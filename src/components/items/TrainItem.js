import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, HorizontalLayout, LocalImage } from '../controls';
import { CommonUtils } from '../../utils';

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
          <HorizontalLayout>
            {(data.id == this.props.selectTrainId && (
              <LocalImage
                source={require('src/assets/image/ic_check_on.png')}
                style={{ width: 22, height: 22 }}
              />
            )) || (
              <Text style={{ fontSize: 16, lineHeight: 22, color: '#979797', fontFamily: 'Danidin' }}>
                {data.leftText}
              </Text>
            )}
          </HorizontalLayout>
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
              {data.name}
            </Text>
            {(data.id == this.props.selectTrainId && (
              <LocalImage
                source={CommonUtils.getTrainImage(data.type)}
                style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
              />
            )) || (
              <LocalImage
                source={CommonUtils.getTrainImageOff(data.type)}
                style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
              />
            )}
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
