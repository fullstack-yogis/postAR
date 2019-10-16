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
        <View>
          <Button
            title="Right"
            onPress={() => {
              this.props.moveX(0.25)
            }}
          />
          <Button
            title="Closer"
            onPress={() => {
              this.props.moveY(0.25)
            }}
          />
          <Button
          title="Down"
          onPress={() => {
            this.props.moveZ(0.25)
          }}
        />
        <Button
            title="Left"
            onPress={() => {
              this.props.moveX(-0.25)
            }}
          />
          <Button
            title="Further"
            onPress={() => {
              this.props.moveY(-0.25)
            }}
          />
          <Button
          title="Up"
          onPress={() => {
            this.props.moveZ(-0.25)
          }}
        />
        <Button
          title="Rotate"
          onPress={() => {
            this.props.rotate('left')
          }}
        />
         <Button
          title="Rotate Up"
          onPress={() => {
            this.props.rotate('up')
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
        </View>
    );
  }
}
