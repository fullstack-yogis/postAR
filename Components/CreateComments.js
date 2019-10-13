import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { client } from '../index.ios';
import gql from 'graphql-tag';

const COMMENT_MUTATION = gql`
  mutation CommentMutation($text: String!, $postId: ID!) {
    comment(text: $text, postId: $postId) {
      id
      text
      user {
        name
      }
    }
  }
`;

export default class CreateComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  async addComment(postId) {
    await client.mutate({
      mutation: COMMENT_MUTATION,
      variables: {
        postId: postId,
        text: this.state.text,
      },
    });
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.setState({ text })}
              placeholder="Add your comments here..."
              value={this.state.text}
              style={styles.input}
            />
            <Button
              title="Add Comments"
              onPress={() => {
                this.addComment(this.props.post.id);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    marginLeft: 10,
    fontSize: 15,
  },

  close: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});
