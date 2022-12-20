import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Main from '../screens/MainScreen'
import Login from '../screens/auth/LoginScreen';
import Splash from '../screens/auth/SplashScreen';
import Signup from '../screens/auth/SignupScreen';

import Home from '../screens/home/HomeScreen';
import ShopScreen from '../screens/home/ShopScreen';
import AddProduct from '../screens/home/AddProduct';
import CreateWorkout from '../screens/home/CreateWorkout';
import ProfileScreen from '../screens/home/ProfileScreen';
import PaymentScreen from '../screens/home/PaymentScreen';

import TrainScreen from '../screens/workout/TrainScreen';

import SettingScreen from '../screens/setting/SettingScreen';

const MainStackNavigator = createStackNavigator({
    Splash,
    Main,
    Login,
    Signup,
    Home,
    ShopScreen,
    AddProduct,
    CreateWorkout,
    ProfileScreen,
    PaymentScreen,

    TrainScreen,

    SettingScreen,
},
{
    headerMode: 'screen ',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    },
});

export default MainStackNavigator;
