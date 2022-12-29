import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, HorizontalLayout, LocalImage } from '../controls';
import FastImage from 'react-native-fast-image';
import { IMAGE_FOO_URL } from '../../constants/Constants';

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const data = this.props.data;
    return (
      <Button
        onPress={() => {
          this.props.selectProduct();
        }}>
        <HorizontalLayout
          style={[
            styles.product_item,
            this.props.selectedId === data.id && { borderWidth: 1, borderColor: '#0D65D9' },
          ]}>
          <HorizontalLayout style={{ alignItems: 'center' }}>
            {this.props.selectedId === data.id && (
              <LocalImage
                source={require('src/assets/image/ic_check_on.png')}
                style={{ width: 22, height: 22, marginRight: 21 }}
              />
            )}
            <LocalImage
              source={require('src/assets/image/ic_income_blue.png')}
              style={{ width: 16, height: 13, marginRight: 5 }}
            />
            <Text style={{ fontSize: 20, lineHeight: 24, color: '#0D65D9' }}>{data.stock}</Text>
          </HorizontalLayout>
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, lineHeight: 22, marginRight: 7, color: '#000' }}>{data.name}</Text>
            <FastImage
              source={{ uri: data.image ? data.image : IMAGE_FOO_URL }}
              resizeMode={FastImage.resizeMode.cover}
              style={{
                width: 45,
                height: 45,
                borderRadius: 22.5,
                borderWidth: 1,
                borderColor: '#D8D8D8',
              }}
            />
          </HorizontalLayout>
        </HorizontalLayout>
      </Button>
    );
  }
}

export default ProductItem;

const styles = StyleSheet.create({
  product_item: {
    width: '100%',
    borderRadius: 11,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
});
