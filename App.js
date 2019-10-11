import React, { Component } from 'react';
import { AUTH_TOKEN } from './constants';
import { AsyncStorage, View, Text, TouchableOpacity } from 'react-native';
import Welcome from './components/Welcome';
import AllPosts from './components/AllPosts';
import Login from './components/LogIn';

import { ViroARSceneNavigator } from 'react-viro';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FEED_QUERY = gql`
  {
    feed {
      id
      createdAt
      description
    }
  }
`;

import { APP_SECRET } from './front_secrets';

let sharedProps = {
  apiKey: APP_SECRET,
};

let InitialARScene = require('./components/HelloWorldSceneAR');

export default class postAR extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps: sharedProps,
      currentView: 'login',
      user: null,
      menu: false,
      token: '',
      newPost: '',
      newPostInd: false,
    };
    this.changeUserState = this.changeUserState.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.changeNewPostState = this.changeNewPostState.bind(this);
    this.setUserTokenAndView = this.setUserTokenAndView.bind(this);
    this.changeCurrentView = this.changeCurrentView.bind(this);
  }
  changeNewPostState() {
    this.setState({ newPostInd: !this.state.newPostInd });
  }

  renderMenu() {
    if (this.state.menu) {
      return (
        <TouchableOpacity onPress={this.changeNewPostState}>
          <Text>CREATE NEW POST</Text>
        </TouchableOpacity>
      );
    }
  }

  changeUserState(userId) {
    this.setState({
      user: userId,
      allPosts: [],
    });
  }

  //change token on state to reflect the current user's token once logged in
  setUserTokenAndView(token, view) {
    this.setState({
      token: token,
      currentView: view,
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
    if (this.state.currentView === 'login') {
      return (
        <Login
          changeCurrentView={this.changeCurrentView}
          token={this.state.token}
          setUserTokenAndView={this.setUserTokenAndView}
        />
      );
    }
    if (this.state.currentView === 'allPosts1') {
      return (
        <AllPosts
          changeCurrentView={this.changeCurrentView}
          token={this.state.token}
          setUserTokenAndView={this.setUserTokenAndView}
        />
      );
    }
    if (this.state.currentView === 'allPosts') {
      return (
        <View style={{ flex: 1 }}>
          {/* <Query query={FEED_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Fetching</Text>;
              if (error) return <Text>Error</Text>;

              const postsToRender = data.feed;
              console.log('posts ' + postsToRender);
              // this.setState({ allPosts: postsToRender });
              return <View>{postsToRender.map(post => null)}</View>;
            }}
          </Query> */}

          {this.renderMenu()}
          <ViroARSceneNavigator
            apiKey={APP_SECRET}
            initialScene={{ scene: InitialARScene }}
            viroAppProps={{
              changeMenuState: this.changeMenuState,
              newPost: this.state.newPost,
              allPosts: this.state.allPosts || [
                { id: 1, description: 'hello 1' },
                { id: 2, description: 'hello 2' },
                { id: 3, description: 'hello 3' },
              ],
            }}
          />
        </View>
      );
    }
    //   if (this.state.currentView === 'login') {
    //     return (
    //       <ViroARSceneNavigator
    //         {...this.state.sharedProps}
    //         initialScene={{ scene: InitialARScene }}
    //       />
    //     );
    //   } else {
    //     return <Login changeUserState={this.changeUserState} />;
    //   }
  }
}
