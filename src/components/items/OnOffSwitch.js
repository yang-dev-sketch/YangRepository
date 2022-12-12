import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, LocalImage, HorizontalLayout, VerticalLayout} from '../controls';

export default class OnOffSwitch extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <HorizontalLayout style={styles.setting_list}>
                <VerticalLayout style={{flex: 1, marginRight: 10}}>
                    <Button onPress={() => {this.props.onPress1();  }} >
                        <Text numberOfLines={1} style={{fontSize: 15, color: 'black'}}>{this.props.title}</Text>
                        {
                            this.props.content ?
                            <Text style={{fontSize: 12, color: '#818181', marginTop: 8}}>{this.props.content}</Text>
                            : (this.props.status && this.props.time) ?
                            <HorizontalLayout>
                                <Text style={{fontSize: 12, color: '#818181', marginTop: 8}}>{this.props.time + '  ' + this.props.day}</Text>
                            </HorizontalLayout>
                            :
                            <View></View>
                        }
                    </Button>
                </VerticalLayout>
                <Button onPress={() => {this.props.onPress(); }} >
                    <LocalImage style={styles.switch} source={this.props.source}/>
                </Button>
            </HorizontalLayout>
        );
    }
}

const styles = StyleSheet.create({
    setting_list: {
        paddingRight: 22,
        // height: 75,
        borderBottomWidth: 1,
        borderBottomColor: '#e4e0e054',
        paddingVertical: 10,
        alignItems: 'center',
    },

    switch: {
        width: 40,
        height: 25,
        textAlign: 'right',
    }

});
