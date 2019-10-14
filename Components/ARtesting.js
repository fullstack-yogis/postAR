'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroMaterials,
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

//subscription query
const NEW_POSTS_SUBSCRIPTION = gql`
  subscription {
    newPost {
      id
      createdAt
      privacy
      xDistance
      yDistance
      zDistance
      description
      height
      width
      postPostedBy {
        id
      }
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
      dragPos: [0, 0, 0], // postition xyz
      // dragAble: true,
      allPosts: [],
      newPost: '', //description
    };
    this._onTap = this._onTap.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this.pinAndSave = this.pinAndSave.bind(this);
    this.createPost = this.createPost.bind(this);

    this.renderNewPost = this.renderNewPost.bind(this);
    this.updateFeed = this.updateFeed.bind(this);
    this._subscribeToNewPosts = this._subscribeToNewPosts.bind(this);
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

      //register subscription
      this._subscribeToNewPosts(this.updateFeed);
    } catch (error) {
      console.error(error);
    }
  }

  //update allPosts with a new post
  updateFeed(newPost) {
    let prevPosts = this.state.allPosts;
    this.setState({
      allPosts: [...prevPosts, newPost],
    });
  }

  //subscription method
  _subscribeToNewPosts(updateFeed) {
    client
      .subscribe({
        query: NEW_POSTS_SUBSCRIPTION,
      })
      .subscribe({
        next({ data }) {
          console.log('data', data);
          if (data.newPost) {
            console.log('entering this');
            updateFeed(data.newPost);
          }
        },
      });
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
    // if (this.state.dragAble) {
    try {
      //post to DB function here
      console.log('this state', this.state);
      let newPost = await this.createPost({
        description: this.props.sceneNavigator.viroAppProps.newPostText,
        privacy: this.props.sceneNavigator.viroAppProps.privacy,
        xDistance: this.state.dragPos[0],
        yDistance: this.state.dragPos[1],
        zDistance: this.state.dragPos[2],
        height: 0.1,
        width: 0.1,
      });

      if (newPost.privacy === false) {
        this.props.sceneNavigator.viroAppProps.resetNewPostText();
      } else {
        this.updateFeed(newPost);
        this.props.sceneNavigator.viroAppProps.resetNewPostText();
      }

      // this.setState({ dragAble: false });
    } catch (e) {
      console.log('pinAndSave error ' + e);
    }
    // }
  }

  renderNewPost() {
    if (this.props.sceneNavigator.viroAppProps.newPostText.length !== 0) {
      // this.setState({ dragAble: true });
      // console.log(this.props.sceneNavigator.viroAppProps.newPostText);
      // this.props.sceneNavigator.viroAppProps.toggleNmsg('DRAG_POST'); //infinite loop
      return (
        <ViroText
          style={{ color: '#258308' }}
          text={this.props.sceneNavigator.viroAppProps.newPostText}
          height={0.5}
          width={0.5}
          rotation={[-90, 0, 0]}
          extrusionDepth={8}
          materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
          position={[0, 0.3, 0]}
          visible={true}
          dragType="FixedToWorld"
          // onDrag={this.state.dragAble ? this._onDrag : null}
          onDrag={this._onDrag}
          onClick={this.pinAndSave}
        />
      );
    }
  }

  async createPost(post) {
    try {
      const { data } = await client.mutate({
        mutation: POST_MUTATION,
        variables: post,
      });
      // console.log('data is ', data);
      // this.setState({
      //   allPosts: [...this.state.allPosts, data.post],
      // });
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
      <ViroARScene anchorDetection={['PlanesVertical']}>
        <ViroARImageMarker //looking for target to render the new world.  once found, the previous posts are posted
          target="target"
          pauseUpdates={this.state.pauseUpdates}
          onAnchorFound={() => {
            this.setState({ pauseUpdates: true });
            this.props.sceneNavigator.viroAppProps.changeCrosshairState();
            this.props.sceneNavigator.viroAppProps.changeMenuState();
            this.props.sceneNavigator.viroAppProps.toggleNmsg('LOOK_FOR_POST');
          }}
          // dragType="FixedToPlane"
        >
          {this.state.allPosts.map(post => {
            let posnArray = [post.xDistance, 0.2, post.zDistance];
            // console.log('post is ', post.description);
            return (
              <ViroText
                text={post.description}
                key={post.id}
                extrusionDepth={8}
                materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
                rotation={[-90, 0, 0]}
                position={posnArray}
                onClick={() =>
                  this.props.sceneNavigator.viroAppProps.toggleCreateComments(
                    post.id
                  )
                }
              />
            );
          })}
          {this.renderNewPost()}
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}

// export default withApollo(HelloWorldSceneAR);

ViroMaterials.createMaterials({
  frontMaterial: {
    diffuseColor: '#FFFFFF',
  },
  backMaterial: {
    diffuseColor: '#FF0000',
  },
  sideMaterial: {
    diffuseColor: '#0000FF',
  },
});

module.exports = HelloWorldSceneAR;
