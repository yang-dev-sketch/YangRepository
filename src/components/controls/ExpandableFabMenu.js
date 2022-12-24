import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import LocalImage from "./LocalImage";
import GlobalState from "../../mobx/GlobalState";
import { MAIN_TAB } from "../../constants/Constants";

let { width } = Dimensions.get('window');

export class ExpandableFabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      offsetY: new Animated.Value(100),
      fadeIn: new Animated.Value(0),
      leftOffsetX: new Animated.Value(-40),
      rightOffsetX: new Animated.Value(40),
      leftFarOffsetX: new Animated.Value(-80),
      rightFarOffsetX: new Animated.Value(80),
    };
    openFab = openFab.bind(this);
    closeFab = closeFab.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.open && (
          <Animated.View
            style={{
              opacity: this.state.fadeIn,
              transform: [{ translateX: this.state.leftOffsetX }],
              width: 36,
              height: 36,
              position: 'absolute',
              bottom: 30,
              left: 10,
            }}>
            <TouchableOpacity
              onPress={() => this.props.menuItemClicked(0)}
              style={[styles.mediumButton]}>
              <View style={styles.payment_item}>
                <Image
                  style={{ alignSelf: 'center', width: 14.32, height: 9.15 }}
                  source={require('src/assets/image/ic_payment_white.png')}
                /> 
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        {this.state.open && (
          <Animated.View
            style={{
              opacity: this.state.fadeIn,
              transform: [{ translateX: this.state.leftOffsetX }],
              width: 36,
              height: 36,
              position: 'absolute',
              bottom: 65,
              left: 55,
            }}>
            <TouchableOpacity
              onPress={() => this.props.menuItemClicked(0)}
              style={[styles.mediumButton]}>
              <View style={styles.payment_item}>
                <Image
                  style={{ alignSelf: 'center', width: 14.32, height: 9.15 }}
                  source={require('src/assets/image/ic_payment_white.png')}
                /> 
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        <TouchableOpacity
          onPress={() => {
            if (GlobalState.getTabIndex != MAIN_TAB.HOME) {
              GlobalState.setTabIndex(MAIN_TAB.HOME);
            }
            if (this.state.open) {
              closeFab();
            } else {
              openFab();
            }
          }}
          style={styles.mainButton}>
          <LocalImage
            source={require('src/assets/image/ic_plus_sign.png')}
            style={{ width: 45, height: 45 }}
          />
        </TouchableOpacity>
        {this.state.open && (
          <Animated.View
            style={{
              opacity: this.state.fadeIn,
              transform: [{ translateX: this.state.leftOffsetX }],
              width: 36,
              height: 36,
              position: 'absolute',
              bottom: 30,
              left: 100,
            }}>
            <TouchableOpacity
              onPress={() => this.props.menuItemClicked(0)}
              style={[styles.mediumButton]}>
              <View style={styles.payment_item}>
                <Image
                  style={{ alignSelf: 'center', width: 14.32, height: 9.15 }}
                  source={require('src/assets/image/ic_payment_white.png')}
                /> 
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 45,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
  },
  mainButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediumButton: {
    width: 14.32,
    height: 9.15,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payment_item: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D65D9',
  },
});

export function openFab() {
  this.setState({ open: true }, () => {
    Animated.parallel([
      Animated.timing(this.state.fadeIn, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }) 
    ]).start();
  });
}

export function closeFab() {
  Animated.parallel([
    Animated.timing(this.state.fadeIn, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    })
  ]).start(() => this.setState({ open: false }));
}
