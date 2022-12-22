import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Main from '../screens/MainScreen'
import Login from '../screens/regist/LoginScreen';
import Splash from '../screens/regist/SplashScreen';
import Signup from '../screens/regist/SignupScreen';
import Coach from '../screens/regist/RegisterCoachScreen';

import Home from '../screens/home/HomeScreen';
import ShopScreen from '../screens/home/ShopScreen';
import AddProduct from '../screens/home/AddProduct';
import CreateWorkout from '../screens/home/CreateWorkout';
import ProfileScreen from '../screens/home/ProfileScreen';
import PaymentScreen from '../screens/home/PaymentScreen';

import TrainScreen from '../screens/workout/TrainScreen';

import SettingScreen from '../screens/setting/SettingScreen';
import BusinessScreen from '../screens/setting/BusinessScreen';
import AddBusinessScreen from '../screens/setting/AddBusinessScreen';
import PaymentMethodScreen from '../screens/setting/PaymentMethodScreen';

const MainStackNavigator = createStackNavigator({
    Splash,
    Main,
    Login,
    Signup,
    Coach,

    Home,
    ShopScreen,
    AddProduct,
    CreateWorkout,
    ProfileScreen,
    PaymentScreen,

    TrainScreen,

    SettingScreen,
    BusinessScreen,
    AddBusinessScreen,
    PaymentMethodScreen,
},
{
    headerMode: 'screen ',
    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
    },
});

export default MainStackNavigator;
