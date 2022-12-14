import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Colors, Dimens, FontFamily, Langs } from '../../constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import Styles from '../../constants/Styles';
import { CommonUtils } from '../../utils';
import FastImage from 'react-native-fast-image';
import { IMAGE_FOO_URL } from '../../constants/Constants';

class BranchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <Button
        onPress={() => {
          this.props.selectBranch();
        }}>
        <HorizontalLayout
          style={[
            styles.branch_item,
            (data.id == this.props.selectBranchId && { borderColor: '#0D65D9' }) || { borderColor: '#D8D8D8' },
          ]}>
          {(data.id == this.props.selectBranchId && (
            <LocalImage
              source={require('src/assets/image/ic_check_on.png')}
              style={{ width: 22, height: 22 }}
            />
          )) || <View></View>}
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ fontSize: 16, lineHeight: 19 }}>
              {data.name}
            </Text>
            {(data.id == this.props.selectBranchId && (
              <LocalImage
                source={require('src/assets/image/ic_man_on.png')}
                style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
              />
            )) || (
              <LocalImage
                source={require('src/assets/image/ic_man_off.png')}
                style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
              />
            )}
          </HorizontalLayout>
        </HorizontalLayout>
      </Button>
    );
  }
}

export default BranchItem;

const styles = StyleSheet.create({
  branch_item: {
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