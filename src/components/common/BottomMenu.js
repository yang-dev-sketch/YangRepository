import {observer} from 'mobx-react';
import React from 'react';
import {BackHandler, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Langs, Styles} from '../../constants';
import {Button, HorizontalLayout, LocalImage, VerticalLayout} from '../controls';
import { CommonUtils } from '../../utils';
import MyInfo from '../../mobx/MyInfo';

export default class BottomMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HorizontalLayout style={[styles.menu_bar]}>
                <Button style={styles.menu}
                    onPress={() => {
                        this.props.navigation.navigate('Main')
                    }}>
                    <VerticalLayout style={Styles.center}>
                        <LocalImage source={
                            require('src/assets/image/ic_banner2.png')} style={{ width: 26, height: 27 }}
                        ></LocalImage>

                    </VerticalLayout>
                </Button>

                <Button style={styles.menu}
                    onPress={() => {
                        this.props.navigation.navigate('Main')
                    }}>
                    <VerticalLayout style={Styles.center}>
                        <LocalImage source={
                            require('src/assets/image/ic_banner2.png')} style={{ width: 26, height: 27 }}
                        ></LocalImage>

                    </VerticalLayout>
                </Button>

                <Button style={styles.menu}
                    onPress={() => {
                        this.props.navigation.navigate('Main')
                    }}>
                    <VerticalLayout style={Styles.center}>
                        <LocalImage source={
                            require('src/assets/image/ic_banner2.png')} style={{ width: 26, height: 27 }}
                        ></LocalImage>

                    </VerticalLayout>
                </Button>

                <Button style={styles.menu}
                    onPress={() => {
                        this.props.navigation.navigate('Main')
                        
                    }}>
                    <VerticalLayout style={Styles.center}>
                        <LocalImage source={
                            require('src/assets/image/ic_banner2.png')} style={{ width: 22, height: 22 }}
                        ></LocalImage>

                    </VerticalLayout>
                </Button>
            </HorizontalLayout>
        )
    }
}

const styles = StyleSheet.create({
    menu_bar: {
        height: 62,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: '#e1e1e1'
    },

    menu: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

   
});