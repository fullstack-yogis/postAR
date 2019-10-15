import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import AllPosts from './AllPosts';
// import AsyncStorage from '@react-native-community/async-storage';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      login: true, // switch between Login and SignUp
    };
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
  };

  _saveUserData = async token => {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN, token);
      this.props.setUserTokenAndView(token, 'allPosts');
    } catch (error) {
      console.log(error);
    }
  };

  _getUserData = async () => {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.props.token) {
      console.log('token at login', this.props.token);
      this.props.changeCurrentView('allPosts');
    }
    console.log('token before login', this.props.token);

    const { login, email, password, name } = this.state;
    return (
      <View>
        <Text>{login ? 'Login' : 'Sign Up'}</Text>

        <View>
          {!login && (
            <TextInput
              // multiline={true}
              style={styles.textInput}
              placeholder="Your name"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
          )}
          <TextInput
            // multiline={true}
            style={styles.textInput}
            placeholder="Your email address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            // multiline={true}
            style={styles.textInput}
            placeholder="Your password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>

        <View>
          <View>
            <Mutation
              mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
              variables={{ email, password, name }}
              onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                <Button
                  title={login ? 'login' : 'create account'}
                  color="#f194ff"
                  onPress={() => {
                    if (
                      this.state.name &&
                      this.state.email &&
                      this.state.password
                    ) {
                      mutation();
                    }
                  }}
                />
              )}
            </Mutation>

            <Button
              title={
                login
                  ? 'need to create an account?'
                  : 'already have an account?'
              }
              color="#f194ff"
              onPress={() => this.setState({ login: !login })}
            />
          </View>
        </View>
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
