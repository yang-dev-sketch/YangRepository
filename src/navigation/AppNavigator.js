import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainStackNavigator from './MainStackNavigator';


export default createAppContainer(createSwitchNavigator({
  Main: MainStackNavigator,
}));
