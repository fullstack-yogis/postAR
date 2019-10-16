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
      horRotation
      verRotation
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
      horRotation
      verRotation
      postPostedBy {
        id
      }
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
      // dragAble: true,
      allPosts: [],
      newPost: '', //description
      clickTime: null,
    };
    this._onTap = this._onTap.bind(this);
    this._onDrag = this._onDrag.bind(this);
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
        if (post.comments.length > 3) {
          let lastComments = post.comments.splice(post.comments.length - 3);
          post.comments = lastComments;
        }
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
        if (newPost.comments.length < 3) {
          newPost.comments = newPost.comments.concat([newComment]);
          return newPost;
        } else {
          newPost.comments = newPost.comments
            .filter((comment, idx) => idx !== 0)
            .concat([newComment]);
          return newPost;
        }
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
    this.props.sceneNavigator.viroAppProps.updateAppState({ dragPos: d });
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
            let posnArray = [
              post.xDistance,
              post.yDistance,
              post.zDistance,
            ];
            let rotation = [post.verRotation, 0, post.horRotation];
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
                    post.xDistance,
                    post.yDistance,
                    post.zDistance + 0.1 * (idx + 1) + 0.1,
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
          {this.props.sceneNavigator.viroAppProps.renderNewPost()}
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
}

// export default withApollo(HelloWorldSceneAR);

var styles = StyleSheet.create({
  viroFont: {
    // color: '#FFFFFF',
    width: 2
  },
  comment: {
    fontSize: 10,
    width: 2
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
    blendMode: 'None',
  },
  backMaterial: {
    diffuseColor: 'red',
    blendMode: 'None',
  },
  //
  sideMaterial: {
    diffuseColor: 'blue',
    blendMode: 'None',
  },
});

module.exports = HelloWorldSceneAR;
