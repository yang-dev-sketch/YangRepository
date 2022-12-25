import React from 'react';
import { Component, View, StyleSheet, Text } from 'react-native';
import Button from './Button';
import { HorizontalLayout } from '.';
import { SCREEN_WIDTH } from '../../constants/Constants';
import ScrollPicker from "./ScrollPicker";

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      modifyState: false,
    };
  }

  componentDidMount = () => {
    const options = [];
    for (let i = 1; i < 25; i++) {
      options.push({ id: i, value: i < 10 ? '0' + i : i });
    }
    this.setState({ options: options });
  };

  onValueChange = (value) => {
    this.props.onValueChange(value);
  };

  handleClick = (index, options) => {
    this.sp.scrollToIndex(index);
    this.onValueChange(options[index].value);
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {(this.state.modifyState && (
          <>
            <ScrollPicker
              nestedScrollEnabled={true}
              ref={(sp) => {
                this.sp = sp;
              }}
              dataSource={this.state.options}
              selectedIndex={this.props.selectedValue - 1}
              itemHeight={40}
              wrapperHeight={120}
              wrapperStyle={{
                width: '100%',
                backgroundColor: 'transparent',
              }}
              renderItem={(data, index, isSelected) => {
                return (
                  <Button
                    onPress={() => {
                      this.handleClick(index, this.state.options);
                    }}
                    style={[
                      (isSelected && {
                        borderRadius: 20,
                        backgroundColor: 'white',
                      }) || { backgroundColor: '#F5F5F5' },
                      { width: '100%', height: 40, flexDirection: 'row' },
                    ]}>
                    <HorizontalLayout
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={{ fontSize: 16, lineHeight: 19 }}>{data.value}</Text>
                      {(isSelected && <Text style={{ fontSize: 16, lineHeight: 19 }}>:</Text>) || (
                        <Text></Text>
                      )}
                      <Text style={{ fontSize: 16, lineHeight: 19 }}>00</Text>
                    </HorizontalLayout>
                  </Button>
                );
              }}
              onValueChange={(data, selectedIndex) => {
                this.onValueChange(Number(this.state.options[selectedIndex].value));
              }}
            />
            <View
              style={{
                width: SCREEN_WIDTH - 100,
                height: 1,
                backgroundColor: '#5C9DF2',
                position: 'absolute',
                top: 40,
                zIndex: 9999,
              }}></View>
            <View
              style={{
                width: SCREEN_WIDTH - 100,
                height: 1,
                backgroundColor: '#5C9DF2',
                position: 'absolute',
                bottom: 40,
                zIndex: 9999,
              }}></View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderTopColor: '#5C9DF2',
                borderLeftColor: '#5C9DF2',
                borderBottomColor: 'transparent',
                borderRightColor: 'transparent',
                position: 'absolute',
                top: 40,
                left: 0,
                rotation: -45,
              }}></View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderTopColor: '#5C9DF2',
                borderLeftColor: '#5C9DF2',
                borderBottomColor: 'transparent',
                borderRightColor: 'transparent',
                position: 'absolute',
                top: 40,
                right: 0,
                rotation: 135,
              }}></View>
          </>
        )) || (
          <Button
            onPress={() => {
              this.setState({ modifyState: true });
            }}
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <Text style={{ fontSize: 16, lineHeight: 19 }}>
              {this.props.selectedValue < 10
                ? '0' + Number(this.props.selectedValue)
                : Number(this.props.selectedValue)}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 19 }}>:</Text>
            <Text style={{ fontSize: 16, lineHeight: 19 }}>00</Text>
          </Button>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
