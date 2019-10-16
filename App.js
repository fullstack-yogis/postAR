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
import MovePost from './components/MovePost'

import { ViroARSceneNavigator } from 'react-viro';

import { APP_SECRET } from './front_secrets';
import { getMarkupFromTree } from 'react-apollo';
import { client } from './index.ios';
import gql from 'graphql-tag';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroMaterials,
  ViroFlexView,
} from 'react-viro';

let sharedProps = {
  apiKey: APP_SECRET,
};

// let InitialARScene = require('./components/HelloWorldSceneAR');
let InitialARScene = require('./components/ARtesting');

//moving posting to APP
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
    $horRotation: Float!
    $verRotation: Float!
  ) {
    post(
      description: $description
      privacy: $privacy
      xDistance: $xDistance
      yDistance: $yDistance
      zDistance: $zDistance
      height: $height
      width: $width
      horRotation: $horRotation
      verRotation: $verRotation
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
      horRotation
      verRotation
    }
  }
`;

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
      postPrivacy: false,
      movePost: false,
      accessAR: true,
      createPost: false,
      xDistance: 0,
      yDistance: 0,
      zDistance: 0,
      createComments: false,
      commentsForPostId: '',
      postOrPin: 'POST',
      dragPos: [0.001, 0.001, 0.001], // postition xyz
      rotation: [-90, 0, 0],
    };
    this.logout = this.logout.bind(this);
    this.changeNewPostState = this.changeNewPostState.bind(this);
    this.updateNewPostTextAndPriv = this.updateNewPostTextAndPriv.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.toggleNmsg = this.toggleNmsg.bind(this);
    this.toggleMovePost = this.toggleMovePost.bind(this)
    this.changeMenuState = this.changeMenuState.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.changeCrosshairState = this.changeCrosshairState.bind(this);
    this.renderCrosshair = this.renderCrosshair.bind(this);
    this.renderNewPost = this.renderNewPost.bind(this)
    this.setUserTokenAndView = this.setUserTokenAndView.bind(this);
    this.changeCurrentView = this.changeCurrentView.bind(this);
    this.toggleCreatePost = this.toggleCreatePost.bind(this);
    this.turnOffCreatePost = this.turnOffCreatePost.bind(this);
    this.resetNewPostText = this.resetNewPostText.bind(this);
    this.toggleCreateComments = this.toggleCreateComments.bind(this);
    this.turnOffCreateComments = this.turnOffCreateComments.bind(this);
    this.pinAndSave = this.pinAndSave.bind(this);
    this.createPost = this.createPost.bind(this);
    this.renderMovePost = this.renderMovePost.bind(this)
    this.updateAppState = this.updateAppState.bind(this);
    this.moveX = this.moveX.bind(this)
    this.moveY = this.moveY.bind(this)
    this.moveZ = this.moveZ.bind(this)
    this.rotate = this.rotate.bind(this)
  }
  //send this function to AR so that it can be called to change state here
  updateAppState(newState) {
    this.setState(newState);
  }

  moveX(distance) {
    this.setState({
      xDistance: this.state.xDistance + distance
    })
  }

  moveY(distance) {
    this.setState({
      yDistance: this.state.yDistance + distance
    })
  }

  moveZ(distance) {
    this.setState({
      zDistance: this.state.zDistance + distance
    })
  }

  rotate(dir) {
    if (dir === 'left') {
      this.setState({
        rotation: [
          this.state.rotation[0],
          0,
          this.state.rotation[2] + 45,
        ]
      })
    } else {
      this.setState({
        rotation: [
          this.state.rotation[0] + 90,
          0,
          this.state.rotation[2],
        ]
      })
    }

  }

  renderNewPost() {
    if (this.state.newPostText.length !== 0) {
      // this.setState({ dragAble: true });
      // console.log(this.props.sceneNavigator.viroAppProps.newPostText);
      // this.props.sceneNavigator.viroAppProps.toggleNmsg('DRAG_POST'); //infinite loop
      return (
        <ViroText
          text={this.state.newPostText}
          height={0.5}
          width={0.5}
          style={styles.viroFont}
          rotation={this.state.rotation}
          extrusionDepth={8}
          materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
          position={[this.state.xDistance, this.state.yDistance, this.state.zDistance]}
          // onDrag={this._onDrag}
          // onClick={this.updateAppState({
          //           rotation: [
          //             -90,
          //             0,
          //             this.state.rotation[2] + 45,
          //           ],
          //         })}

          // onClickState={stateValue => {
          //   if (stateValue === 1) {
          //     this.setState({ clickTime: Date.now() });
          //   } else if (stateValue === 2) {
          //     if (Date.now() - this.state.clickTime < 200) {
          //       this.state.updateAppState({
          //         rotation: [
          //           -90,
          //           0,
          //           this.state.rotation[2] + 45,
          //         ],
          //       });
          //     }
          //   }
          // }}
          // dragType="FixedDistanceOrigin"
          // onDrag={this.state.dragAble ? this._onDrag : null}
        />
      );
    }
  }

  //when the post is clicked, then it gets fixed and saved
  async pinAndSave() {
    // if (this.state.dragAble) {
    try {
      //post to DB function here
      let newPost = await this.createPost({
        description: this.state.newPostText,
        privacy: this.state.privacy,
        xDistance: this.state.xDistance,
        yDistance: this.state.yDistance,
        zDistance: this.state.zDistance + 0.3,
        height: 0.1,
        width: 0.1,
        verRotation: this.state.rotation[0],
        horRotation: this.state.rotation[2],
      });
      this.setState({ rotation: [-90, 0, 0] });
      if (newPost.privacy === false) {
        this.resetNewPostText();
      } else {
        //need to send private posts to AR world
        //TODO
        this.updateFeed(newPost);
        this.resetNewPostText();
      }

      // this.setState({ dragAble: false });
    } catch (e) {
      console.log('pinAndSave error ' + e);
    }
    // }
  }
  async createPost(post) {
    try {
      const { data } = await client.mutate({
        mutation: POST_MUTATION,
        variables: post,
      });
      return data.post;
    } catch (e) {
      console.log(e);
    }
  }

  // toggle create NewPost page state
  changeNewPostState() {
    this.setState({ newPostInd: !this.state.newPostInd });
  }

  // get the new post text (description)
  updateNewPostTextAndPriv(text, privacy) {
    //now toggle the post button to show 'Pin'
    //the 'pin' button should also now work to send the data to database
    //then change back to 'post' and 'post' function
    this.setState({
      newPostText: text,
      privacy,
      postOrPin: 'PIN',
    });
  }

  // reset new post text to ''
  resetNewPostText() {
    this.setState({
      newPostText: '',
      xDistance: 0,
      yDistance: 0,
      zDistance: 0

  });
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
            title={this.state.postOrPin}
            onPress={() => {
              this.toggleCreatePost();
              this.toggleNmsg('');
            }}
            style={{ color: 'white' }}
          />
          <Button
            title="HOME"
            style={{ color: 'white' }}
            onPress={() => {
              this.turnOffCreatePost();
              this.turnOffCreateComments();
              this.toggleNmsg('');
            }}
          />
          <Button
            title="LOGOUT"
            style={{ color: 'white' }}
            onPress={() => {
              this.logout();
            }}
          />
        </View>
      );
    }
  }

  //logout function to remove token from asyncStorage and redirect to login page
  async logout() {
    await AsyncStorage.removeItem(AUTH_TOKEN);
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    this.setState({
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
      commentsForPostId: '',
    });
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
            renderNewPost: this.renderNewPost,
            toggleNmsg: this.toggleNmsg,
            changeCrosshairState: this.changeCrosshairState,
            newPostText: this.state.newPostText,
            privacy: this.state.privacy,
            resetNewPostText: this.resetNewPostText,
            toggleCreateComments: this.toggleCreateComments,
            updateAppState: this.updateAppState,
            rotation: this.state.rotation,
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
          updateNewPostTextAndPriv={this.updateNewPostTextAndPriv}
          changeMenuState={this.changeMenuState}
          toggleCreatePost={this.toggleCreatePost}
          toggleMovePost={this.toggleMovePost}
        />
      );
    }
  }

   // to toggle page to move when 'POST' is submitted
   toggleMovePost() {
     console.log('movePost', this.state.movePost)
    this.setState({ movePost: !this.state.movePost });
  }

  // renders create new post page
  renderMovePost() {
    if (this.state.movePost) {
      return (
        <MovePost
          moveX={this.moveX}
          moveY={this.moveY}
          moveZ={this.moveZ}
          rotate={this.rotate}
        />
      )
    }
  }

  // to toggle page to show when 'POST' button in menu is pressed
  toggleCreatePost() {
    if (this.state.postOrPin === 'POST') {
      this.setState({ createPost: !this.state.createPost });
    } else if (this.state.postOrPin === 'PIN') {
      console.log('call the database');
      this.toggleMovePost()
      this.pinAndSave();
      //then change the state to POST
      this.setState({ postOrPin: 'POST' });
    }
  }

  // minimizes create post component (meant for home button)
  turnOffCreatePost() {
    this.setState({ createPost: false });
  }

  // render create comment
  renderCreateComments() {
    if (this.state.createComments) {
      return (
        <CreateComments commentsForPostId={this.state.commentsForPostId} />
      );
    }
  }

  // toggle create comment component
  toggleCreateComments(commentsForPostId) {
    this.setState({
      createComments: !this.state.createComments,
      commentsForPostId,
    });
  }

  // minimizes comments component (meant for home button)
  turnOffCreateComments() {
    this.setState({ createComments: false });
  }

  //change token on state to reflect the current user's token once logged in
  setUserTokenAndView(token, view) {
    this.setState({
      token: token,
      currentView: view,
      crosshair: true,
    });
  }

  //change currentView on state to navigate to a different view
  changeCurrentView(view) {
    this.setState({ view });
  }

  async componentDidMount() {
    // await AsyncStorage.removeItem(AUTH_TOKEN)
    const token = await AsyncStorage.getItem(AUTH_TOKEN);

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
          {this.renderMovePost()}
          {this.renderMenu()}
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  viroFont: {
    // color: '#FFFFFF',
    width: 2
  },
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
