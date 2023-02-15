import React from 'react';
import { Text, View } from 'react-native';
import { Button, HorizontalLayout, LocalImage, VerticalLayout } from '../controls';
import GlobalState from '../../mobx/GlobalState';

export default class SetValueGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <VerticalLayout
        style={[
          { alignItems: 'flex-end', width: '100%', borderWidth: 1, borderColor: '#D8D8D8' },
          this.props.style,
        ]}>
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
                flexDirection: 'row-reverse',
              },
              this.props.numberLine !== 1 && { marginBottom: 8.5 },
            ]}
            reverse={true}>
            {this.props.expandable
              ? (this.props.numberLine === 1 && (
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
              : (this.props.leftTitle && (
                  <HorizontalLayout
                    style={{ width: '50%', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, lineHeight: 19, color: '#6F6F6F' }}>
                      {this.props.leftTitle}
                    </Text>
                    {this.props.leftImage && (
                      <LocalImage
                        source={this.props.leftImage}
                        style={{ width: 16, height: 16, marginLeft: 5.5 }}
                      />
                    )}
                  </HorizontalLayout>
                )) || <View></View>}
            <HorizontalLayout style={{ alignItems: 'center' }} reverse={true}>
              <Text
                style={[{ fontSize: 16, lineHeight: 19, color: '#6F6F6F' }, this.props.textStyle]}>
                {this.props.title}
              </Text>
              {this.props.image && (
                <LocalImage
                  source={this.props.image}
                  style={[
                    (GlobalState.langPopup.langStatus === 'en' && { marginRight: 5.5 }) || {
                      marginLeft: 5.5,
                    },
                    { width: 16, height: 16 },
                  ]}
                />
              )}
            </HorizontalLayout>
          </HorizontalLayout>
        </Button>
        <View style={{ width: '100%' }}>{this.props.inputNode}</View>
      </VerticalLayout>
    );
  }
}
