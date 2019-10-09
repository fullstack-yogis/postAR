import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AllPosts from './components/AllPosts';
import Login from './components/LogIn';

const MainNavigator = createStackNavigator({
  Home: { screen: AllPosts },
  Login: { screen: Login },
});
const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
