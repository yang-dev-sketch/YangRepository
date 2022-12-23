import React from 'react';
import { Text, TextInput } from 'react-native';
import { Colors, Dimens, FontFamily, Langs } from '../../constants';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';

class CommonInputItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusFlag: 0,
      errMsg: '',
      errType: 0, //:normal, 1:err, 2:success
      pwdEncryptType: props.secureTextEntry,
    };
  }

  componentDidMount() {}

  setErrMsg = (msg) => {
    this.setState({
      errMsg: msg,
      errType: 1,
    });
  };

  setSuccessMsg = (msg) => {
    this.setState({
      errMsg: msg,
      errType: 2,
    });
  };

  setEmptyMsg = () => {
    this.setState({
      errMsg: '',
      errType: 0,
    });
  };

  focus = () => {
    this._input.focus();
  };

  render() {
    const {
      value,
      style,
      placeholder,
      returnKeyType,
      maxLength,
      editable,
      keyboardType,
      secureTextEntry,
      leftImg,
      onChangeText,
      onSubmitEditing,
      showErrFlag,
      onBlur,
    } = this.props;

    return (
      <VerticalLayout>
        <HorizontalLayout>
          <TextInput
            ref={(ref) => (this._input = ref)}
            value={value}
            placeholderTextColor={Colors.c_b5b5b5}
            numberOfLines={1}
            style={[
              style,
              this.state.errType === 1
                ? styles.border_bottom_normal
                : this.state.focusFlag === 1
                ? styles.border_bottom_focus
                : styles.border_bottom_normal,
              { paddingTop: 0, paddingBottom: 0 },
            ]}
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            maxLength={maxLength}
            editable={editable}
            secureTextEntry={this.state.pwdEncryptType}
            onSubmitEditing={() => onSubmitEditing()}
            onChangeText={(text) => onChangeText(text)}
            onFocus={() => {
              this.setState({
                focusFlag: 1,
              });
            }}
            onBlur={() => {
              this.setState({
                focusFlag: 0,
              });

              onBlur();
            }}
            isFocused={this.state.focusFlag > 0 ? true : false}
          />
          {leftImg !== '' && <LocalImage source={leftImg} style={styles.ic_input_header} />}
        </HorizontalLayout>
        {showErrFlag && (
          <Text style={this.state.errType === 1 ? styles.err_text : styles.success_text}>
            {this.state.errMsg}
          </Text>
        )}
      </VerticalLayout>
    );
  }
}

CommonInputItem.defaultProps = {
  ref: () => {},
  style: {},
  value: '',
  placeholder: '',
  returnKeyType: 'done',
  keyboardType: 'default',
  maxLength: 500,
  secureTextEntry: false,
  leftImg: '',
  showErrFlag: false,
  editable: true,
  onChangeText: () => {},
  onSubmitEditing: () => {},

  onBlur: () => {},
};

export default CommonInputItem;

const styles = {
  border_bottom_err: {
    borderBottomWidth: 1,
    borderBottomColor: '#ff3636',
    color: Colors.text,
    fontSize: Dimens.fs_16,
    fontFamily: FontFamily.nanum_gothic,
    includeFontPadding: false,
    flex: 1,
  },

  border_bottom_focus: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: Colors.text,
    fontSize: Dimens.fs_16,
    fontFamily: FontFamily.nanum_gothic,
    includeFontPadding: false,
    flex: 1,
  },

  border_bottom_normal: {
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    color: Colors.text,
    fontSize: Dimens.fs_16,
    fontFamily: FontFamily.nanum_gothic,
    includeFontPadding: false,
    flex: 1,
  },

  success_text: {
    fontSize: 11,
    color: '#00790b',
    marginTop: 3,
    width: '100%',
    minHeight: 40,
    paddingBottom: 4,
  },

  err_text: {
    fontSize: 11,
    color: '#ff3636',
    marginTop: 3,
    width: '100%',
    minHeight: 40,
    paddingBottom: 4,
  },
  div_input_body: { alignItems: 'center', position: 'relative' },
  ic_input_header: {
    position: 'absolute',
    left: 0,
    height: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  ic_input_footer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    alignItems: 'center',
    zIndex: 1,
    paddingLeft: 10,
  },
};
