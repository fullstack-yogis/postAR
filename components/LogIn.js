import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

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
      email: '',
      password: '',
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
      return this.getARNavigator();
    } else {
      return this.displayLogInForm();
    }
  }

  getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }

  displayLogInForm() {
    return (
      <View style={styles.container}>
        <Text>Login Page</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          placeholderTextColor="#6e6e6e"
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.loginInput}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#6e6e6e"
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            this.handleLoginSubmit();
          }}
        >
          <Text>Log in</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginInput: {
    fontStyle: 'italic',
    color: 'grey',
    marginBottom: 10,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#eeeeee',
    borderWidth: 1,
  },
});
