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
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View
              style={{
                flex: 0.5,
                padding: 20,
                flexDirection: 'column',
              }}
            >
              {/* <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  padding: 5,
                  color: 'white',
                }}
              >
                NEW POST
              </Text> */}
              <TextInput
                onChangeText={text => this.setState({ text })}
                placeholder="Type new post here!"
                placeholderTextColor="grey"
                value={this.state.text}
                style={styles.input}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  paddingTop: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    paddingTop: 2,
                    paddingRight: 3,
                    color: 'white',
                  }}
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
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.updateNewPostTextAndPriv(
                    this.state.text,
                    this.state.private
                  );
                  this.props.toggleMovePost();
                  this.props.toggleCreatePost();
                }}
              >
                <Text style={styles.buttonText}>ADD NEW POST</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: 325,
    backgroundColor: 'white',
    fontSize: 20,
    height: 40,
    paddingLeft: 8,
    margin: 4,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 325,
    height: 35,
    backgroundColor: '#4169E1',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 30,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    padding: 2,
    margin: 2,
  },
});
