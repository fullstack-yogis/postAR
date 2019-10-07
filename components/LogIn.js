import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import LogInForm from './LogInForm';

import { ViroARSceneNavigator } from 'react-viro';
import { APP_SECRET } from '../front_secrets';

let sharedProps = {
  apiKey: APP_SECRET,
};

let InitialARScene = require('../js/HelloWorldSceneAR');

export default class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps: sharedProps,
      loggedIn: false,
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    //thunk to check email & password combination
    //if true change state of loggedIn to true to render AR Component
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
      );
    } else {
      return <LogInForm handleLoginSubmit={this.handleLoginSubmit} />;
    }
  }
}
