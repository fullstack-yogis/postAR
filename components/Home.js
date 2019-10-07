import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import LogIn from './LogIn';
import SignUp from './SignUp';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      logInPage: true,
    };
    this.changeLogInPageState = this.changeLogInPageState.bind(this);
  }

  changeLogInPageState() {
    return () => {
      this.setState({ logInPage: false });
    };
  }

  render() {
    if (this.state.logInPage) {
      return (
        <LogIn
          changeUserState={this.props.changeUserState}
          changeLogInPageState={this.changeLogInPageState}
        />
      );
    } else {
      return <SignUp changeUserState={this.props.changeUserState} />;
    }
  }
}

export default Home;
