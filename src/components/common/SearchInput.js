import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button, LocalImage } from '../controls';

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  updateSearch = (search) => {
    this.setState({ search: search });
    this.props.setSearch(search);
  };

  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          numberOfLines={1}
          keyboardType="default"
          value={this.state.search}
          placeholder="חיפוש"
          style={styles.search}
          onChangeText={(text) => this.updateSearch(text)}
        />
        <LocalImage
          source={require('src/assets/image/ic_search.png')}
          style={{ width: 13, height: 13, position: 'absolute', right: 15, top: 17.5 }}
        />
        {this.state.search !== '' && (
          <Button
            onPress={() => {
              this.updateSearch('');
            }}
            style={{ position: 'absolute', left: 15, top: 20 }}>
            <LocalImage
              source={require('src/assets/image/ic_delete.png')}
              style={{ width: 10, height: 10 }}
            />
          </Button>
        )}
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
    paddingRight: 32,
    textAlign: 'right',
  },
});
