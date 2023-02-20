import React from 'react';
import { Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Button, HorizontalLayout, LocalImage } from '.';
import GlobalState from '../../mobx/GlobalState';
import { SCREEN_WIDTH } from '../../constants/Constants';

export default class DropDownPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOpen: false,
    };
  }

  render() {
    const data = this.props.data;
    return (
      <View style={this.props.style}>
        <SelectDropdown
          onFocus={() => {
            this.setState({ typeOpen: true });
          }}
          onBlur={() => {
            this.setState({ typeOpen: false });
          }}
          search={this.props.search}
          searchInputStyle={{
            width: SCREEN_WIDTH - 90,
            height: 40,
            borderRadius: 43,
            borderWidth: 0.5,
            borderColor: '#D8D8D8',
            backgroundColor: '#F5F5F5',
            fontSize: 16,
            lineHeight: 19,
            color: '#6F6F6F',
            marginTop: 10,
            flexDirection: GlobalState.langPopup.langStatus === 'en' ? 'row' : 'row-reverse',
          }}
          searchPlaceHolder={this.props.searchPlaceHolder}
          renderSearchInputLeftIcon={() => {
            return (
              GlobalState.langPopup.langStatus === 'en' && (
                <LocalImage
                  source={require('src/assets/image/ic_search.png')}
                  style={{ width: 13, height: 13 }}
                />
              )
            );
          }}
          renderSearchInputRightIcon={() => {
            return (
              GlobalState.langPopup.langStatus === 'hb' && (
                <LocalImage
                  source={require('src/assets/image/ic_search.png')}
                  style={{
                    width: 13,
                    height: 13,
                    position: 'absolute',
                    left: SCREEN_WIDTH - 140,
                    top: 15,
                  }}
                />
              )
            );
          }}
          searchInputTxtStyle={{
            textAlign: GlobalState.langPopup.langStatus === 'en' ? 'left' : 'right',
          }}
          data={data}
          defaultValue="בחרו סוג"
          buttonStyle={{
            width: '100%',
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'white',
            borderWidth: 1,
            borderColor: '#F3F3F3',
            borderRadius: 50,
            height: 40, //?????
          }}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
          renderCustomizedButtonChild={(selectedItem: any, index: number) => {
            return (
              <HorizontalLayout
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  borderRadius: 50,
                }}
                reverse={true}>
                <HorizontalLayout style={{ alignItems: 'center' }}>
                  {this.props.editIcon && (
                    <Button
                      onPress={() => {
                        if (this.props.onEdit) this.props.onEdit();
                      }}>
                      <LocalImage
                        source={require('src/assets/image/ic_edit_round.png')}
                        style={{ width: 28, height: 28 }}
                      />
                    </Button>
                  )}
                  {(this.state.typeOpen && (
                    <LocalImage
                      source={require('src/assets/image/ic_up.png')}
                      style={{ width: 17.41, height: 9.17, marginLeft: 13.29 }}
                    />
                  )) || (
                    <LocalImage
                      source={require('src/assets/image/ic_down.png')}
                      style={{ width: 17.41, height: 9.17, marginLeft: 13.29 }}
                    />
                  )}
                </HorizontalLayout>
                <Text style={{ fontSize: 16, lineHeight: 19, color: '#000', fontFamily: 'Danidin' }}>
                  {this.props.selectedValue || this.props.placeholder || 'בחרו סוג'}
                </Text>
              </HorizontalLayout>
            );
          }}
          dropdownOverlayColor="transparent"
          dropdownStyle={{
            height: 'auto',
            borderRadius: 21,
            backgroundColor: 'white',
            paddingHorizontal: 15,
            marginTop: -1,
          }}
          rowStyle={{ height: 48, paddingVertical: 15, borderBottomColor: '#F5F5F5' }}
          rowTextStyle={{ fontSize: 16, lineHeight: 19, textAlign: 'right' }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem);
            this.props.onSelect(selectedItem);
          }}
        />
      </View>
    );
  }
}
