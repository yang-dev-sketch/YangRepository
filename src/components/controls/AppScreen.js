import React from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import MyInfo from '../../mobx/MyInfo';
import {Langs} from '../../constants';

export default class AppScreen extends React.Component {
    constructor(props) {
        super(props);
        this.myInfo = MyInfo;
    }

    exitApp = () => {
        BackHandler.exitApp();
    };

    isEmptyOrNull(str) {
        return str == null || str == '' || str == undefined;
    };

    emptyListView(hint = Langs.common.empty_hint) {
        return (
            <View style={styles.emptyWrap}>
                <View style={styles.emptyLabelWrap}>
                    <Text style={styles.emptyLabel}>{hint}</Text>
                </View>
            </View>
        );
    };
}

/* eslint-disable */
const styles = StyleSheet.create({
    //Empty List View
    emptyWrap: {height: 100, flex: 1, justifyContent: 'center', alignItems: 'center'},
    emptyLabelWrap: {alignSelf: 'stretch', marginHorizontal: 10, marginTop: 10},
    emptyLabel: {color: '#989898', textAlign: 'center'},
});
