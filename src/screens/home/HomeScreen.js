import React from 'react';
import {observer} from 'mobx-react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    RefreshControl
} from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import {CommonUtils} from '../../utils';
import {Langs, Styles} from '../../constants';
import {API, API_RES_CODE, IMAGE_FOO_URL, SCREEN_WIDTH} from '../../constants/Constants';
import {Button, HorizontalLayout, LocalImage, ScaledFastImage, VerticalLayout} from '../../components/controls';
import GlobalState from '../../mobx/GlobalState';
import MyInfo from '../../mobx/MyInfo';
import {requestPost} from '../../utils/ApiUtils';
import Toast from 'react-native-root-toast';
import EventBus from 'react-native-event-bus';

@observer
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <SafeAreaView>
                <VerticalLayout style={Styles.full}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                        <Text>Hello world</Text>
                    </View>
                </VerticalLayout>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    
});
