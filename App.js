import React, { Component } from 'react';

import Home from './components/Home';

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
      user: null,
    };
    this.changeUserState = this.changeUserState.bind(this);
  }

  changeUserState(userId) {
    this.setState({
      user: userId,
    });
  }

  render() {
    if (this.state.user) {
      return (
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
      );
    } else {
      return <Home changeUserState={this.changeUserState} />;
    }
  }
}
