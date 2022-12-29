import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, HorizontalLayout, LocalImage } from '../controls';

class BranchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    return (
      <Button
        onPress={() => {
          if (this.props.selectBranch) this.props.selectBranch();
        }}>
        <HorizontalLayout
          style={[
            styles.branch_item,
            (data.id == this.props.selectBranchId && { borderColor: '#0D65D9' }) || {
              borderColor: '#D8D8D8',
            },
          ]}>
          {(data.id == this.props.selectBranchId && (
            <LocalImage
              source={require('src/assets/image/ic_check_on.png')}
              style={{ width: 22, height: 22 }}
            />
          )) || (
            <LocalImage
              source={require('src/assets/image/ic_bottom_setting_on.png')}
              style={{ width: 35, height: 35 }}
            />
          )}
          <HorizontalLayout style={{ alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ fontSize: 16, lineHeight: 19, color: '#000' }}>
              {data.name}
            </Text>
            {(data.id == this.props.selectBranchId && (
              <LocalImage
                source={require('src/assets/image/ic_man_round_on.png')}
                style={{ width: 45, height: 45, borderRadius: 22.5, marginLeft: 7 }}
              />
            )) || (
              <LocalImage
                source={require('src/assets/image/ic_man_round_off.png')}
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
