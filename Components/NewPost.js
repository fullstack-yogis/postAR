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

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = { text: '', private: false };
    this.togglePrivacy = this.togglePrivacy.bind(this);
  }

  togglePrivacy = value => {
    this.setState({ private: value });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 0.5 }}
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 0.5,
                padding: 20,
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  padding: 5,
                }}
              >
                NEW POST
              </Text>
              <TextInput
                style={{ borderWidth: 1, padding: 10 }}
                placeholder="Type new post here!"
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              />

              <View
                style={{
                  flexDirection: 'row',
                  // paddingTop: 15,
                  justifyContent: 'space-evenly',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 2,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, paddingTop: 2, paddingRight: 3 }}
                  >
                    Private
                  </Text>
                  <Switch
                    style={{
                      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],

                    }}
                    onValueChange={this.togglePrivacy}
                    value={this.state.private}
                    trackColor={{ false: 'grey', true: 'red' }}
                  />
                </View>
                <Button
                  title="SUBMIT"
                  onPress={() => {
                    this.props.updateNewPostTextAndPriv(
                      this.state.text,
                      this.state.private
                    );
                    this.props.toggleMovePost();
                    this.props.toggleCreatePost();
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
