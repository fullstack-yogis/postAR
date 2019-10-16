import React, { Component } from 'react';
import {
  Button,
  Keyboard,
  Platform,
  TextInput,
  View,
  Text,
  Switch,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

export default class MovePost extends Component {
  constructor() {
    super();
    // this.state = { text: '', private: false };
    // this.togglePrivacy = this.togglePrivacy.bind(this);
  }

  // togglePrivacy = value => {
  //   this.setState({ private: value });
  // };

  render() {
    return (
        <ScrollView>
          <Button
            title="+X"
            onPress={() => {
              console.log('press X')
            }}
          />
          <Button
            title="+Y"
            onPress={() => {
              console.log('press Y')
            }}
          />
          <Button
          title="+Z"
          onPress={() => {
            console.log('press Y')
          }}
        />
          {/* <Button
            title="SUBMIT"
            onPress={() => {
              this.props.updateNewPostTextAndPriv(
                this.state.text,
                this.state.private
              );
              this.props.toggleCreatePost();
              this.props.toggleMovePost();
            }}
          /> */}
        </ScrollView>
    );
  }
}
