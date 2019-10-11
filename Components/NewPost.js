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
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  flex: 1,
                  padding: 40,
                  flexDirection: 'column',
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    padding: 15,
                  }}
                >
                  NEW POST
                </Text>
                <TextInput
                  multiline
                  style={{ borderWidth: 1, padding: 10, height: 400 }}
                  placeholder="Type new post here!"
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 15,
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Private?</Text>
                  <Switch
                    onValueChange={this.togglePrivacy}
                    value={this.state.private}
                    trackColor={{ false: 'grey', true: 'red' }}
                  />
                </View>
                <Button
                  title="SUBMIT"
                  onPress={() => {
                    this.props.updateNewPost(this.state.text);
                    this.props.changeMenuState();
                    this.props.changeNewPostState();
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
