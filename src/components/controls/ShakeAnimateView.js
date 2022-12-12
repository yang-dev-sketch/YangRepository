import React from 'react'
import {Animated} from 'react-native'

export default class ShakeAnimateView extends React.Component {
    constructor(props) {
        super(props);
        this.shakeAnimation = new Animated.Value(0);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    startShake = () => {
        Animated.sequence([
            Animated.timing(this.shakeAnimation, { toValue: 10, duration: 20, useNativeDriver: true }),
            Animated.timing(this.shakeAnimation, { toValue: -10, duration: 20, useNativeDriver: true }),
            Animated.timing(this.shakeAnimation, { toValue: 10, duration: 20, useNativeDriver: true }),
            Animated.timing(this.shakeAnimation, { toValue: -10, duration: 20, useNativeDriver: true }),
            Animated.timing(this.shakeAnimation, { toValue: 0, duration: 20, useNativeDriver: true })
        ]).start();
    }

    render() {
        return (
            <Animated.View style={{ transform: [{translateX: this.shakeAnimation}] }}>
                {this.props.children}
            </Animated.View>
        );
    }
}
