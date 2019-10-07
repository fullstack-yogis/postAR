import React, { Component } from 'react';

// Components
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

// View Types for state
let HOME_VIEW = 'HOME';
let LOGIN_VIEW = 'LOGIN';
let SIGN_UP_VIEW = 'SIGNUP';

let defaultScreenView = HOME_VIEW;

export default class postAR extends Component {
  constructor() {
    super();
    this.state = {
      screenView: defaultScreenView,
    };
    this.changeScreenView = this.changeScreenView.bind(this);
  }

  changeScreenView(screenView) {
    return () => {
      this.setState({
        screenView: screenView,
      });
    };
  }

  render() {
    if (this.state.screenView === HOME_VIEW) {
      return <Home changeScreenView={this.changeScreenView} />;
    } else if (this.state.screenView === LOGIN_VIEW) {
      return <LogIn />;
    } else if (this.state.screenView === SIGN_UP_VIEW) {
      return <SignUp />;
    }
  }
}
