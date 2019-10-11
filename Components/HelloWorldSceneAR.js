'use strict';

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from 'react-viro';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { AUTH_TOKEN, URI } from '../constants';
import { ShowPostsInAR } from './ShowPostsInAR';

//adding token into Headers for Authorization purpose
const authLink = setContext(async (_, { headers }) => {
  try {
    let token = await AsyncStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.log(error);
  }
});

class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      scale: [1, 1, 0],
      position: [0, 0, 0],
      planeVisiblity: true,
      imageVisibility: false,
      pauseUpdates: false,
      showText: 'hello there',
      dragPos: [],
      dragAble: true,
      allPosts: [],
      i: 5,
      newPost: '',
    };
    this._onTap = this._onTap.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this.pinAndSave = this.pinAndSave.bind(this);
  }

  async componentDidMount() {
    this.setState({
      newPost: this.props.sceneNavigator.viroAppProps.newPost,
      allPosts: this.props.sceneNavigator.viroAppProps.allPosts,
    });
    console.log('allposts ', this.props.sceneNavigator.viroAppProps.allPosts);
  }

  _onTap() {
    this.setState({
      planeVisibility: false,
      imageVisibility: true,
    });
  }

  _onDrag(d, source) {
    console.log('position is ' + d[0] + ' ' + d[1] + ' ' + d[2]);
    this.setState({ dragPos: d });
  }

  //when the post is clicked, then it gets fixed and saved
  async pinAndSave() {
    if (this.state.dragAble) {
      try {
        // post newPost to DB
        // add to this.state.allPost
        // console.log('position to save is ', this.state.dragPos);
        // let allPost = await AsyncStorage.getItem('posts');
        // if (allPost) allPost = JSON.parse(allPost);
        // else allPost = [];
        // let post = { text: this.state.newPost, position: this.state.dragPos };
        // allPost.push(post);
        // console.log('new positions object is ' + allPost);
        // await AsyncStorage.setItem('posts', JSON.stringify(allPost));
        this.setState({
          allPosts: [...allPosts, { id: ++i, description: this.state.newPost }],
        });
      } catch (e) {
        console.log('pinAndSave error ' + e);
      }
      this.setState({ dragAble: false });
    }
  }

  render() {
    ViroARTrackingTargets.createTargets({
      target: {
        source: require('../js/res/postAR.jpg'),
        orientation: 'Up',
        physicalWidth: 0.09,
      },
    });
    return (
      <ViroARScene
        anchorDetection={['PlanesVertical']}
        onClick={this.props.sceneNavigator.viroAppProps.changeMenuState}
      >
        <ViroARImageMarker //looking for target to render the new world.  once found, the previous posts are posted
          target="target"
          pauseUpdates={this.state.pauseUpdates}
          onAnchorFound={() => this.setState({ pauseUpdates: true })}
          // dragType="FixedToPlane"
        >
          <ViroImage //this image appears over target once target detected. when tapped, the current post is placed and becomes draggable
            height={0.3}
            width={0.3}
            rotation={[-90, 0, 0]}
            position={[0, -0.5, 0]}
            source={require('../js/res/tap.png')}
            visible={this.state.planeVisibility}
            opacity={0.5}
            onClick={this._onTap}
          />
          <ViroText //this is the new post. stays hidden till the tap button is tapped. draggable initially. then calls onClick, which pins and saves
            text={this.state.newPost}
            height={0.5}
            width={0.5}
            rotation={[-90, 0, 0]}
            visible={this.state.imageVisibility}
            dragType="FixedToWorld"
            onDrag={this.state.dragAble ? this._onDrag : null}
            onClick={this.pinAndSave}
          />
          {this.state.allPosts.map(post => {
            let posnArray = [0, 0, 0.1 * post.id];
            console.log('post is ', post.description);
            return (
              <ViroText
                text={post.description}
                key={post.id}
                rotation={[-90, 0, 0]}
                position={posnArray}
              />
            );
          })}
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}

module.exports = HelloWorldSceneAR;
