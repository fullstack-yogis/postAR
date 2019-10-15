import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Button,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TouchableWithoutFeedback,
  Keyboard,
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
      <ImageBackground
        source={require('../js/res/loginbackground.jpg')}
        style={{ width: '100%', height: '110%' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 70,
            }}
          >
            <Image
              style={{ flex: 1, width: '80%', height: '80%' }}
              source={require('../js/res/logo.png')}
            />


            <View style={{ flex: 1, paddingTop: 0 }}>
              {!login && (
                <TextInput
                  // multiline={true}
                  style={styles.textInput}
                  placeholder="Name"
                  clearButtonMode="always"
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                />
              )}
              <TextInput
                // multiline={true}
                style={styles.textInput}
                placeholder="Email"
                keyboardType="email-address"
                clearButtonMode="always"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <TextInput
                // multiline={true}
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                clearButtonMode="always"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>

            <View style={{ flex: 1, paddingBottom: 200 }}>
              <View>
                <Mutation
                  mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                  variables={{ email, password, name }}
                  onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                    <TouchableOpacity
                      style={styles.loginScreenButton}
                      onPress={() => {
                    if (
                      this.state.name &&
                      this.state.email &&
                      this.state.password
                    ) {
                      mutation();
                    }
                  }}
                      underlayColor="#fff"
                    >
                      <Text style={styles.loginText}>
                        {login ? 'LOG IN' : 'SIGN UP'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </Mutation>

                <Text
                  style={{ alignSelf: 'center', fontSize: 18, color: 'grey' }}
                >
                  OR
                </Text>

                <TouchableOpacity
                  style={styles.loginScreenButton}
                  onPress={() => this.setState({ login: !login })}
                  underlayColor="#fff"
                >
                  <Text style={styles.loginText}>
                    {login ? 'CREATE AN ACCOUNT' : 'LOG IN'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
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
  textInput: {
    fontStyle: 'italic',
    fontSize: 18,
    color: 'grey',
    backgroundColor: 'white',
    marginBottom: 10,
    height: 50,
    width: 275,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    borderColor: '#eeeeee',
    borderWidth: 1,
  },
  loginScreenButton: {
    justifyContent: 'center',
    marginTop: 5,
    paddingTop: 10,
    marginBottom: 5,
    paddingBottom: 10,
    height: 50,
    width: 275,
    backgroundColor: '#ADD8E6',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  loginText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
