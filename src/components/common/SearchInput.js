import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { HorizontalLayout, LocalImage, VerticalLayout } from '../controls';

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    return (
      <View style={this.props.style}>
        <TextInput style={styles.search} />
        <LocalImage
          source={require('src/assets/image/ic_close.png')}
          style={{ width: 31, height: 31, position: 'absolute' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    width: '100%',
    height: 48,
    borderRadius: 43,
    borderWidth: 0.5,
    borderColor: '#D8D8D8',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 17.5,
    fontSize: 16,
    lineHeight: 19,
    color: '#6F6F6F',
  },
});
