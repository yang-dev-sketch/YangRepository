import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Dimens, FontFamily } from '../../constants';
import GlobalState from '../../mobx/GlobalState';
import { Button, HorizontalLayout, CheckBox } from '../controls';

@observer
class LangPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang_val: GlobalState.langPopup.langStatus,
    };
  }

  onCancel = () => {
    GlobalState.langPopup.visible = false;
    this.setState({ lang_val: GlobalState.langPopup.langStatus });
    if (GlobalState.langPopup.onCancel) {
      GlobalState.langPopup.onCancel();
    }
  };

  componentDidMount(): void {
    EventBus.getInstance().addListener('changeLang', this.changeLang);
  }

  componentWillUnmount(): void {
    EventBus.getInstance().removeListener(this.changeLang);
  }

  changeLang = ({ lang }) => {
    this.setState({
      lang_val: lang,
    });
  };

  render() {
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={10}
        backdropTransitionOutTiming={0}
        transparent={true}
        backdropOpacity={0.5}
        style={{ margin: 0 }}
        coverScreen={true}
        onBackButtonPress={() => {
          this.onCancel();
        }}
        onBackdropPress={() => {
          if (GlobalState.langPopup.backDrop) {
            this.onCancel();
          }
        }}
        isVisible={GlobalState.langPopup.visible}>
        <View
          style={[Styles.dlg_content, { width: 350, alignItems: 'center', alignSelf: 'center' }]}>
          <Pressable>
            <HorizontalLayout
              style={{
                marginHorizontal: 60,
                marginTop: 50,
                marginBottom: 20,
                justifyContent: 'space-between',
              }}>
              <CheckBox
                label={Langs.my_page.en}
                checked={this.state.lang_val == 'en' ? true : false}
                onPress={() => {
                  this.setState({ lang_val: 'en' });
                }}
                style={{ width: '50%' }}
              />
              <CheckBox
                label={Langs.my_page.hb}
                checked={this.state.lang_val == 'hb' ? true : false}
                onPress={() => {
                  this.setState({ lang_val: 'hb' });
                }}
                style={{ width: '50%' }}
              />
            </HorizontalLayout>

            <HorizontalLayout style={styles.control}>
              {GlobalState.langPopup.cancel !== '' && (
                <Button style={[styles.btn, { flex: 1 }]} onPress={() => this.onCancel()}>
                  <Text style={styles.labelCancel}>{GlobalState.langPopup.cancel}</Text>
                </Button>
              )}
              {GlobalState.langPopup.ok !== '' && (
                <Button
                  style={[styles.btn, { flex: 1 }]}
                  onPress={() => {
                    GlobalState.langPopup.visible = false;
                    GlobalState.langPopup.langStatus = this.state.lang_val;
                    if (GlobalState.langPopup.onOk) {
                      GlobalState.langPopup.onOk();
                    }
                  }}>
                  <Text style={styles.labelConfirm}>{GlobalState.langPopup.ok}</Text>
                </Button>
              )}
            </HorizontalLayout>
          </Pressable>
        </View>
      </Modal>
    );
  }
}

/* eslint-disable */
const styles = StyleSheet.create({
  contentLabel: {
    fontSize: Dimens.fs_14,
    color: 'black',
    textAlign: 'center',
    lineHeight: 22,
    paddingVertical: 36,
    fontFamily: FontFamily.danidin,
    includeFontPadding: false,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  control: { alignSelf: 'center' },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  labelCancel: {
    color: '#666666',
    fontSize: Dimens.fs_18,
    includeFontPadding: false,
    fontFamily: 'Danidin'
  },
  labelConfirm: {
    color: 'black',
    fontSize: Dimens.fs_18,
    includeFontPadding: false,
    fontFamily: 'Danidin'
  },
});

export default LangPopup;
