import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    //thunk to check email & password combination
    //if true change state of user in App.js
    let userId = 1;
    this.props.changeUserState(userId);
  }

  render() {
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
          onPress={() => this.handleLoginSubmit()}
        >
          <Text>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.props.changeLogInPageState()}
        >
          <Text>Sign Up</Text>
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
