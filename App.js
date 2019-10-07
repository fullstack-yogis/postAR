import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
// import { APP_SECRET } from './front_secrets';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

/*
 TODO: Insert your API key below
 */
// var sharedProps = {
//   apiKey: APP_SECRET,
// };

let UNSET = 'UNSET';
let LOGIN_TYPE = 'LOGIN';
let SIGN_UP_TYPE = 'SIGNUP';

let defaultNavigatorType = UNSET;

export default class postAR extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType: defaultNavigatorType,
      // sharedProps: sharedProps,
    };
    this.displayHome = this.displayHome.bind(this);
    this.displayLogIn = this.displayLogIn.bind(this);
    this.displaySignUp = this.displaySignUp.bind(this);
    this.changeNavigatorType = this.changeNavigatorType.bind(this);
  }

  render() {
    if (this.state.navigatorType === UNSET) {
      return this.displayHome();
    } else if (this.state.navigatorType === LOGIN_TYPE) {
      return this.displayLogIn();
    } else if (this.state.navigatorType === SIGN_UP_TYPE) {
      return this.displaySignUp();
    }
  }

  displayHome() {
    return (
      <View style={styles.container}>
        <Text>postAR</Text>
        <View>
          <TouchableHighlight
            style={styles.buttons}
            // underlayColor={'#68a0ff'}
            onPress={this.changeNavigatorType(LOGIN_TYPE)}
          >
            <Text>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttons}
            // underlayColor={'#68a0ff'}
            onPress={this.changeNavigatorType(SIGN_UP_TYPE)}
          >
            <Text>Sign Up</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  changeNavigatorType(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
      });
    };
  }

  displayLogIn() {
    return <LogIn />;
  }

  displaySignUp() {
    return <SignUp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
