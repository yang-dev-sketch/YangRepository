import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Main from '../screens/MainScreen'
import Login from '../screens/auth/LoginScreen';
import Splash from '../screens/auth/SplashScreen';
import Signup from '../screens/auth/SignupScreen';

import Home from '../screens/home/HomeScreen';

const MainStackNavigator = createStackNavigator({
    Splash,
    Main,
    Home,
    Login,
    Signup,
},
{
    headerMode: 'screen ',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    },
});

export default MainStackNavigator;
