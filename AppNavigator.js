import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AllPosts from './components/AllPosts';
import Login from './components/LogIn';

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Home: { screen: AllPosts },
});
const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
