import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Main from '../screens/MainScreen'
import Login from '../screens/regist/LoginScreen';
import Splash from '../screens/regist/SplashScreen';
import Facial from '../screens/regist/FacialRecogScreen';
import RegistCoach from '../screens/regist/RegistCoachScreen';
import RegistBusinessOne from '../screens/regist/RegistBusinessOneScreen';
import RegistBusinessTwo from '../screens/regist/RegistBusinessTwoScreen';
import RegistBusinessThree from '../screens/regist/RegistBusinessThreeScreen';
import FaceApproval from '../screens/regist/FaceApprovalScreen';
import SelectProgram from '../screens/regist/SelectProgramScreen';
import PaymentDetail from '../screens/regist/PaymentDetailScreen';
import BankDetail from '../screens/regist/BankDetailScreen';
import SuccessRegist from '../screens/regist/SuccessRegistScreen';

import Home from '../screens/home/HomeScreen';
import ShopScreen from '../screens/home/ShopScreen';
import AddProduct from '../screens/home/AddProduct';
import CreateWorkout from '../screens/home/CreateWorkout';
import ProfileScreen from '../screens/home/ProfileScreen';
import PaymentScreen from '../screens/home/PaymentScreen';

import TrainScreen from '../screens/workout/TrainScreen';
import ConductTrain from '../screens/workout/ConductTrain';

import SettingScreen from '../screens/setting/SettingScreen';
import BusinessScreen from '../screens/setting/BusinessScreen';
import AddBusinessScreen from '../screens/setting/AddBusinessScreen';
import PaymentMethodScreen from '../screens/setting/PaymentMethodScreen';

const MainStackNavigator = createStackNavigator({
    Splash,
    Main,
    Login,
    Facial,
    RegistCoach,
    RegistBusinessOne,
    RegistBusinessTwo,
    RegistBusinessThree,
    FaceApproval,
    SelectProgram,
    PaymentDetail,
    BankDetail,
    SuccessRegist,

    Home,
    ShopScreen,
    AddProduct,
    CreateWorkout,
    ProfileScreen,
    PaymentScreen,

    TrainScreen,
    ConductTrain,

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
