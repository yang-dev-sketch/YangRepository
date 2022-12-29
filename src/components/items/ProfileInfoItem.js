import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import { SCREEN_WIDTH } from '../../constants/Constants';

class ProfileInfoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const data = this.props.data;
    return (
      <Button
        onPress={() => {
          if (this.props.action) this.props.action();
        }}>
        <HorizontalLayout
          style={[
            styles.profile_item,
            this.props.border && { borderColor: '#D8D8D8', borderWidth: 1 },
            this.props.elevation && { elevation: 1 },
            this.props.height && { height: this.props.height },
          ]}>
          {this.props.leftIcon && (
            <LocalImage source={this.props.leftIcon} style={this.props.leftIconStyle} />
          )}
          {(this.props.complex && (
            <VerticalLayout
              style={{ alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontWeight: '600' }}>
                {this.props.firstLineText}
              </Text>
              <HorizontalLayout style={{ alignItems: 'center' }}>
                {this.props.secondLineImage && (
                  <LocalImage
                    source={this.props.secondLineImage}
                    style={{ width: 12, height: 10, marginRight: 5 }}
                  />
                )}
                <Text style={this.props.secondLineTextStyle}>{this.props.secondLineText}</Text>
              </HorizontalLayout>
            </VerticalLayout>
          )) || (
            <Text
              style={{
                width: '60%',
                fontSize: 16,
                lineHeight: 19,
                color: '#000',
                fontWeight: '400',
              }}
              numberOfLines={this.props.numberOfLines}>
              {this.props.text}
            </Text>
          )}
          {this.props.rightIcon && (
            <LocalImage source={this.props.rightIcon} style={this.props.rightIconStyle} />
          )}
          {this.props.rightContent}
        </HorizontalLayout>
      </Button>
    );
  }
}

export default ProfileInfoItem;

const styles = StyleSheet.create({
  profile_item: {
    width: (SCREEN_WIDTH - 64) / 2,
    borderRadius: 11,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
