'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from 'react-viro';

// import { withApollo } from 'react-apollo';
import { client } from '../index.ios';
import gql from 'graphql-tag';

// for querying gql
const FEED_QUERY = gql`
  {
    feed {
      id
      createdAt
      description
      xDistance
      yDistance
      zDistance
    }
  }
`;

//for mutating gql
const POST_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $privacy: Boolean!
    $xDistance: Float!
    $yDistance: Float!
    $zDistance: Float!
    $height: Float!
    $width: Float!
  ) {
    post(
      description: $description
      privacy: $privacy
      xDistance: $xDistance
      yDistance: $yDistance
      zDistance: $zDistance
      height: $height
      width: $width
    ) {
      id
      createdAt
      privacy
      xDistance
      yDistance
      zDistance
      description
      height
      width
    }
  }
`;

class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      planeVisibility: true,
      imageVisibility: false,
      pauseUpdates: false,
      dragPos: [], // postition xyz
      dragAble: true,
      allPosts: [],
      newPost: '', //description
    };
    this._onTap = this._onTap.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this.pinAndSave = this.pinAndSave.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  async componentDidMount() {
    try {
      //query from db
      const { data } = await client.query({
        query: FEED_QUERY,
        fetchPolicy: 'network-only',
      });
      //set to local state
      this.setState({
        allPosts: data.feed,
        newPost: this.props.sceneNavigator.viroAppProps.newPostText,
      });
    } catch (error) {
      console.error(error);
    }
  }

  _onTap() {
    this.setState({
      planeVisibility: false,
      imageVisibility: true,
    });
  }

  _onDrag(d, source) {
    this.setState({ dragPos: d });
  }

  //when the post is clicked, then it gets fixed and saved
  async pinAndSave() {
    if (this.state.dragAble) {
      try {
        //post to DB function here
        let newPost = await this.createPost({
          description: this.state.newPost,
          privacy: false,
          xDistance: this.state.dragPos[0],
          yDistance: this.state.dragPos[1],
          zDistance: this.state.dragPos[2],
          height: 0.1,
          width: 0.1,
        });
      } catch (e) {
        console.log('pinAndSave error ' + e);
      }
      this.setState({ dragAble: false });
    }
  }

  async createPost(post) {
    try {
      const { data } = await client.mutate({
        mutation: POST_MUTATION,
        variables: post,
      });
      this.setState({
        allPosts: [...this.state.allPosts, data.post],
      });
      return data.post;
    } catch (e) {
      console.log(e);
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
        onClick={() => {
          if (!this.state.planeVisibility) {
            this.props.sceneNavigator.viroAppProps.changeMenuState();
          }
        }}
      >
        <ViroARImageMarker //looking for target to render the new world.  once found, the previous posts are posted
          target="target"
          pauseUpdates={this.state.pauseUpdates}
          onAnchorFound={() => {
            this.setState({ pauseUpdates: true });
            this.props.sceneNavigator.viroAppProps.changeCrosshairState();
          }}
          // dragType="FixedToPlane"
        >
          <ViroImage //this image appears over target once target detected. when tapped, the current post is placed and becomes draggable
            height={0.3}
            width={0.3}
            rotation={[-90, 0, 0]}
            position={[0, 0.3, 0]}
            source={require('../js/res/tap.png')}
            visible={this.state.planeVisibility}
            opacity={0.5}
            onClick={this._onTap}
          />
          <ViroText //this is the new post. stays hidden till the tap button is tapped. draggable initially. then calls onClick, which pins and saves
            style={{ color: '#258308' }}
            text={this.state.newPost}
            height={0.5}
            width={0.5}
            rotation={[-90, 0, 0]}
            position={[0, 0.3, 0]}
            visible={this.state.imageVisibility}
            dragType="FixedToWorld"
            onDrag={this.state.dragAble ? this._onDrag : null}
            onClick={this.pinAndSave}
          />
          {this.state.allPosts.map(post => {
            let posnArray = [post.xDistance, 0.2, post.zDistance];
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

// export default withApollo(HelloWorldSceneAR);

module.exports = HelloWorldSceneAR;
