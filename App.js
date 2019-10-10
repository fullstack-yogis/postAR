import React, { Component } from 'react';
import { AUTH_TOKEN } from './constants';
import { AsyncStorage, View, Text } from 'react-native';
import Welcome from './components/Welcome';
import AllPosts from './components/AllPosts';
import Login from './components/LogIn';

import { ViroARSceneNavigator } from 'react-viro';

import { APP_SECRET } from './front_secrets';

let sharedProps = {
  apiKey: APP_SECRET,
};

let InitialARScene = require('./js/HelloWorldSceneAR');

export default class postAR extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps: sharedProps,
      currentView: 'login',
      user: null,
      token: '',
    };
    this.changeUserState = this.changeUserState.bind(this);
    this.setUserTokenAndView = this.setUserTokenAndView.bind(this);
    this.changeCurrentView = this.changeCurrentView.bind(this);
  }

  changeUserState(userId) {
    this.setState({
      user: userId,
    });
  }

  //change token on state to reflect the current user's token once logged in
  setUserTokenAndView(token, view) {
    this.setState({
      token: token,
      currentView: view,
    });
  }

  changeCurrentView(view) {
    this.setState({ view });
  }

  async componentDidMount() {
    // const token = await AsyncStorage.getItem(AUTH_TOKEN);
    // console.log(
    //   'component mounted get token from asyncStorage🤩🤩🤩🤩🤩🤩',
    //   token
    // );
    // if (token) {
    //   this.setUserTokenAndView(token, 'allPosts');
    // }
    // await AsyncStorage.removeItem(AUTH_TOKEN);
  }
  render() {
    if (this.state.currentView === 'login') {
      return (
        <Login
          changeCurrentView={this.changeCurrentView}
          token={this.state.token}
          setUserTokenAndView={this.setUserTokenAndView}
        />
      );
    }
    if (this.state.currentView === 'allPosts') {
      return (
        <AllPosts
          changeCurrentView={this.changeCurrentView}
          token={this.state.token}
          setUserTokenAndView={this.setUserTokenAndView}
        />
      );
    }

    //   if (this.state.currentView === 'login') {
    //     return (
    //       <ViroARSceneNavigator
    //         {...this.state.sharedProps}
    //         initialScene={{ scene: InitialARScene }}
    //       />
    //     );
    //   } else {
    //     return <Login changeUserState={this.changeUserState} />;
    //   }
  }
}
