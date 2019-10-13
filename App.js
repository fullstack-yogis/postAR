import React, { Component } from 'react';
import { AUTH_TOKEN } from './constants';
import {
  AsyncStorage,
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import NewPost from './components/NewPost';
import Login from './components/LogIn';
import CreateComments from './components/CreateComments';

import { ViroARSceneNavigator } from 'react-viro';

import { APP_SECRET } from './front_secrets';
import { getMarkupFromTree } from 'react-apollo';

let sharedProps = {
  apiKey: APP_SECRET,
};

// let InitialARScene = require('./components/HelloWorldSceneAR');
let InitialARScene = require('./components/ARtesting');

export default class postAR extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps: sharedProps, //api key
      currentView: 'login',
      token: '',
      notification: true,
      notificationCase: 'SCAN_MARKER',
      menu: false,
      newPostText: '',
      newPostInd: false,
      accessAR: true,
      createPost: false,
      createComments: false,
    };
    this.changeNewPostState = this.changeNewPostState.bind(this);
    this.updateNewPostText = this.updateNewPostText.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.toggleNmsg = this.toggleNmsg.bind(this);
    this.changeMenuState = this.changeMenuState.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.changeCrosshairState = this.changeCrosshairState.bind(this);
    this.renderCrosshair = this.renderCrosshair.bind(this);
    this.setUserTokenAndView = this.setUserTokenAndView.bind(this);
    this.changeCurrentView = this.changeCurrentView.bind(this);
    this.toggleCreatePost = this.toggleCreatePost.bind(this);
    this.turnOffCreatePost = this.turnOffCreatePost.bind(this);
    this.resetNewPostText = this.resetNewPostText.bind(this);
    this.toggleCreateComments = this.toggleCreateComments.bind(this);
  }

  // toggle create NewPost page state
  changeNewPostState() {
    this.setState({ newPostInd: !this.state.newPostInd });
  }

  // get the new post text (description)
  updateNewPostText(text) {
    this.setState({ newPostText: text });
  }

  // reset new post text to ''
  resetNewPostText() {
    this.setState({ newPostText: '' });
  }

  // toggle create NewPost page
  renderMenu() {
    if (this.state.menu) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: 'black',
            padding: 8,
            paddingBottom: 30,
          }}
        >
          <Button
            title="POST"
            onPress={this.toggleCreatePost}
            style={{ color: 'white' }}
          />
          <Button
            title="HOME"
            style={{ color: 'white' }}
            onPress={this.turnOffCreatePost}
          />
          <Button title="ACCOUNT" style={{ color: 'white' }} />
        </View>
      );
    }
  }

  // toggle create new post menu (on top of screen)
  changeMenuState() {
    this.setState({ menu: !this.state.menu });
  }

  // renders crosshair
  renderCrosshair() {
    if (this.state.crosshair) {
      return <View style={styles.crosshair} />;
    }
  }

  // toggles crosshair state (off after finding marker)
  changeCrosshairState() {
    this.setState({ crosshair: false });
  }

  // render notification
  renderNotification() {
    if (this.state.notification) {
      switch (this.state.notificationCase) {
        case 'SCAN_MARKER':
          return <Text style={styles.notification}>HOVER OVER MARKER</Text>;
        case 'LOOK_FOR_POST':
          return (
            <Text style={styles.notification}>
              STEP BACK, LOOK AROUND FOR POST
            </Text>
          );
        case 'DRAG_POST':
          return <Text style={styles.notification}>DRAG AND PLACE POST</Text>;
        default:
          return <Text style={styles.notification} />;
      }
    }
  }

  // change Notification message
  toggleNmsg(nCase) {
    this.setState({ notificationCase: nCase });
  }

  renderAR() {
    if (this.state.accessAR) {
      return (
        <ViroARSceneNavigator
          apiKey={APP_SECRET}
          initialScene={{ scene: InitialARScene }}
          viroAppProps={{
            changeMenuState: this.changeMenuState,
            toggleNmsg: this.toggleNmsg,
            changeCrosshairState: this.changeCrosshairState,
            newPostText: this.state.newPostText,
            resetNewPostText: this.resetNewPostText,
            toggleCreateComments: this.toggleCreateComments,
          }}
        />
      );
    }
  }

  // renders create new post page
  renderCreatePost() {
    if (this.state.createPost) {
      return (
        <NewPost
          changeNewPostState={this.changeNewPostState}
          updateNewPostText={this.updateNewPostText}
          changeMenuState={this.changeMenuState}
          toggleCreatePost={this.toggleCreatePost}
        />
      );
    }
  }

  // to toggle page to show when 'POST' button in menu is pressed
  toggleCreatePost() {
    this.setState({ createPost: !this.state.createPost });
  }

  // minimizes create post component (meant for home button)
  turnOffCreatePost() {
    this.setState({ createPost: false });
  }

  // render create comment
  renderCreateComments() {
    if (this.state.createComments) {
      return <CreateComments />;
    }
  }

  // toggle create comment component
  toggleCreateComments() {
    this.setState({ createComments: !this.state.createComments });
  }

  //change token on state to reflect the current user's token once logged in
  setUserTokenAndView(token, view) {
    this.setState({
      token: token,
      currentView: view,
      crosshair: true,
    });
  }

  changeCurrentView(view) {
    this.setState({ view });
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    console.log(
      'component mounted get token from asyncStorage🤩🤩🤩🤩🤩🤩',
      token
    );
    if (token) {
      this.setUserTokenAndView(token, 'allPosts');
    }
    // await AsyncStorage.removeItem(AUTH_TOKEN);
  }

  render() {
    // login page
    if (this.state.currentView === 'login') {
      return (
        <Login
          changeCurrentView={this.changeCurrentView}
          token={this.state.token}
          setUserTokenAndView={this.setUserTokenAndView}
        />
      );
    }
    // AR world
    else if (this.state.currentView === 'allPosts') {
      return (
        <View style={{ flex: 1 }}>
          {this.renderNotification()}
          {this.renderAR()}
          {this.renderCreatePost()}
          {this.renderCreateComments()}
          {this.renderCrosshair()}
          {this.renderMenu()}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  crosshair: {
    alignSelf: 'center',
    position: 'absolute',
    top: '40%',
    width: 150,
    height: 150,
    borderWidth: 5,
  },
  notification: {
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white',
    fontSize: 20,
    padding: 10,
    paddingTop: 35,
  },
});
