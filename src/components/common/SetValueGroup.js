import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';

export default class SetValueGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <VerticalLayout style={[{ alignItems: 'flex-end', width: '100%' }, this.props.style]}>
        <Button
          style={{ width: '100%', alignItems: 'center' }}
          onPress={() => {
            if (this.props.setExpand) this.props.setExpand();
          }}>
          <HorizontalLayout
            style={[
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              },
              this.props.numberLine !== 1 && { marginBottom: 8.5 },
            ]}>
            {this.props.expandable ? (
              (this.props.numberLine === 1 && (
                <LocalImage
                  source={require('src/assets/image/ic_down.png')}
                  style={{ width: 17.41, height: 9.17, marginLeft: 23.29 }}
                />
              )) || (
                <LocalImage
                  source={require('src/assets/image/ic_up.png')}
                  style={{ width: 17.41, height: 9.17, marginLeft: 23.29 }}
                />
              )
            ) : (
              <View></View>
            )}
            <HorizontalLayout>
              <Text style={{ fontSize: 16, lineHeight: 19, color: '#6F6F6F' }}>
                {this.props.title}
              </Text>
              <LocalImage
                source={this.props.image}
                style={{ width: 16, height: 16, marginLeft: 5.5 }}
              />
            </HorizontalLayout>
          </HorizontalLayout>
        </Button>
        <View style={{ width: '100%' }}>{this.props.inputNode}</View>
      </VerticalLayout>
    );
  }
}

const styles = StyleSheet.create({});
