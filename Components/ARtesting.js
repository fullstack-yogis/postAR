'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroMaterials,
  ViroFlexView,
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
      rotation
      comments {
        id
        text
        createdAt
        post {
          id
        }
        user {
          name
        }
      }
    }
  }
`;

//subscription query for new posts
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
      rotation
      postPostedBy {
        id
      }
      comments {
        id
        text
        createdAt
        # we already have postId from line 81, why query it again?
        post {
          id
        }
        user {
          name
        }
      }
    }
  }
`;

//subscription for new comments
const NEW_COMMENTS_SUBSCRIPTION = gql`
  subscription {
    newComment {
      id
      text
      createdAt
      post {
        id
      }
      user {
        name
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
      initialUserPos: [],
      finalUserPos: [],
      // dragAble: true,
      allPosts: [],
      newPost: '', //description
      clickTime: null,
    };
    this._onTap = this._onTap.bind(this);
    this._onDrag = this._onDrag.bind(this);
    this.pinAndSave = this.pinAndSave.bind(this);
    this.initializeUserPosition = this.initializeUserPosition.bind(this)
    this.createPost = this.createPost.bind(this);
    this.grabPosition = this.grabPosition.bind(this)
    this.grabInitialPosition = this.grabInitialPosition.bind(this)
    // this.distanceBetween = this.distanceBetween.bind(this);
    // this.distance = this.distance.bind(this);

    this.renderNewPost = this.renderNewPost.bind(this);
    this.updateFeed = this.updateFeed.bind(this);
    this._subscribeToNewPosts = this._subscribeToNewPosts.bind(this);
    this.updateCommentFeed = this.updateCommentFeed.bind(this);
    this._subscribeToNewComments = this._subscribeToNewComments.bind(this);
  }

  async componentDidMount() {
    try {
      //query from db
      const { data } = await client.query({
        query: FEED_QUERY,
        fetchPolicy: 'network-only',
      });
      //set to local state
      let posts = data.feed.map(post => {
        if (post.comments.length > 3) post.comments.splice(3);
        return post;
      });
      this.setState({
        allPosts: posts,
        newPost: this.props.sceneNavigator.viroAppProps.newPostText,
      });

      //register post subscription
      this._subscribeToNewPosts(this.updateFeed);
      //register comment subscription
      this._subscribeToNewComments(this.updateCommentFeed);
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

  initializeUserPosition(pos) {
    console.log('pos', pos)
    this.setState({
      userPos: pos
    })
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

  //deal with new comment coming in through subsription
  updateCommentFeed(newComment) {
    let newPosts = this.state.allPosts.map(post => {
      if (post.id === newComment.post.id) {
        let newPost = post;
        newPost.comments = newPost.comments
          .filter((comment, idx) => idx !== 0)
          .concat([newComment]);
        return newPost;
      } else {
        return post;
      }
    });
    this.setState({ allPosts: newPosts });
  }

  //subscribe to new comments
  _subscribeToNewComments(updateCommentFeed) {
    client
      .subscribe({
        query: NEW_COMMENTS_SUBSCRIPTION,
      })
      .subscribe({
        next({ data }) {
          updateCommentFeed(data.newComment);
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
    console.log('d---------', d)
    this.setState({ dragPos: d });
  }

  //when the post is clicked, then it gets fixed and saved
  async pinAndSave() {
    // if (this.state.dragAble) {
      // await this.grabPosition()
      // console.log('type/?????', typeof this.state.initialUserPos[0])
      // let x = this.state.initialUserPos[0] - this.state.finalUserPos[0]
      // let y = this.state.initialUserPos[1] - this.state.finalUserPos[1]
      // let z = this.state.initialUserPos[2] - this.state.finalUserPos[2]

      // let userDistanceFromMarker = [x, y, z]
      // console.log('user dist', userDistanceFromMarker)
      // let drag = this.state.dragPos
      // console.log('drag', drag)

    try {
      //post to DB function here
      console.log('this state', this.state);
      let xDistance = this.state.dragPos[0]
      let yDistance = this.state.dragPos[2]
      let zDistance = this.state.dragPos[1]
      console.log('distances', xDistance, yDistance, zDistance)

      let newPost = await this.createPost({
        description: this.props.sceneNavigator.viroAppProps.newPostText,
        privacy: this.props.sceneNavigator.viroAppProps.privacy,
        xDistance,
        yDistance,
        zDistance,
        height: 0.1,
        width: 0.1,
        rotation: 0.1,
      });
      console.log('newPost after pin and save', newPost);
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
    // this.props.sceneNavigator.viroAppProps.updateAppState({ dragPos: d });
  }

  renderNewPost() {
    if (this.props.sceneNavigator.viroAppProps.newPostText.length !== 0) {
      // this.setState({ dragAble: true });
      // console.log(this.props.sceneNavigator.viroAppProps.newPostText);
      // this.props.sceneNavigator.viroAppProps.toggleNmsg('DRAG_POST'); //infinite loop
      return (
        <ViroText
          text={this.props.sceneNavigator.viroAppProps.newPostText}
          height={0.5}
          width={0.5}
          rotation={this.props.sceneNavigator.viroAppProps.rotation}
          extrusionDepth={8}
          materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
          position={[0, 0, 0]}
          onDrag={this._onDrag}
          // onClick={this.pinAndSave}
          onClickState={stateValue => {
            if (stateValue === 1) {
              this.setState({ clickTime: Date.now() });
            } else if (stateValue === 2) {
              if (Date.now() - this.state.clickTime < 200) {
                this.props.sceneNavigator.viroAppProps.updateAppState({
                  rotation: [
                    -90,
                    0,
                    this.props.sceneNavigator.viroAppProps.rotation[2] + 45,
                  ],
                });
              }
            }
          }}
          // dragType="FixedDistanceOrigin"
          // onDrag={this.state.dragAble ? this._onDrag : null}
        />
      );
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
    console.log('state', this.state)
    return (
      <ViroARScene ref={scene => {this.mainScene = scene}} anchorDetection={['PlanesVertical']}>
        <ViroARImageMarker //looking for target to render the new world.  once found, the previous posts are posted
          target="target"
          pauseUpdates={this.state.pauseUpdates}

          onAnchorFound={() => {
            this.setState({ pauseUpdates: true });
            this.props.sceneNavigator.viroAppProps.changeCrosshairState();
            this.props.sceneNavigator.viroAppProps.changeMenuState();
            this.props.sceneNavigator.viroAppProps.toggleNmsg('LOOK_FOR_POST');
            // this.grabInitialPosition()
          }}
          // dragType="FixedToPlane"
        >
          {this.state.allPosts.map(post => {
            let posnArray = [
              post.xDistance,
              post.yDistance,
              post.zDistance
              // post.xDistance + 0.1,
              // post.yDistance - 0.15,
              // post.zDistance + 1.6,
            ];
            let rotation = [-90, 0, post.rotation];
            return (
              <ViroFlexView key={post.id}>
                <ViroText
                  text={post.description || ''}
                  style={styles.viroFont}
                  extrusionDepth={8}
                  materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
                  rotation={rotation}
                  position={posnArray}
                  onClick={() => {
                    // console.log('clicking');
                    this.props.sceneNavigator.viroAppProps.toggleCreateComments(
                      post.id
                    );
                    this.props.sceneNavigator.viroAppProps.toggleNmsg('');
                  }}
                />
                {post.comments.map((comment, idx) => {
                  let commentPosnArray = [
                    post.xDistance + 0.1,
                    post.yDistance - 0.15,
                    post.zDistance + 0.1 * (idx + 1) + 1.7,
                  ];

                  return (
                    <ViroText
                      text={comment.user.name + ': ' + comment.text || ''}
                      style={styles.comment}
                      extrusionDepth={8}
                      materials={[
                        'frontMaterial',
                        'backMaterial',
                        'sideMaterial',
                      ]}
                      key={comment.id}
                      rotation={rotation}
                      position={commentPosnArray}
                    />
                  );
                })}
              </ViroFlexView>
            );
          })}
          {this.renderNewPost()}
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}

// export default withApollo(HelloWorldSceneAR);

var styles = StyleSheet.create({
  // viroFont: {
  //   color: '#FFFFFF',
  // },
  comment: {
    fontSize: 10,
  },
});

// ViroMaterials.createMaterials({
//   frontMaterial: {
//     diffuseColor: Color.WHITE,
//   },
//   backMaterial: {
//     diffuseColor: Color.BLUE,
//   },
//   sideMaterial: {
//     diffuseColor: Color.RED,
//   },
// });

ViroMaterials.createMaterials({
  frontMaterial: {
    diffuseColor: 'white',
  },
  backMaterial: {
    diffuseColor: 'red',
  },
  sideMaterial: {
    diffuseColor: 'blue',
  },
});

module.exports = HelloWorldSceneAR;
