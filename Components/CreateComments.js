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

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      description
      comments {
        id
        text
        user {
          name
        }
      }
    }
  }
`;

export default class CreateComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postDescription: '',
      comments: [],
      text: '',
    };
  }

  async componentDidMount() {
    try {
      //query from db
      const { data } = await client.query({
        query: POST_QUERY,
        variables: {
          id: this.props.commentsForPostId,
        },
        fetchPolicy: 'network-only',
      });

      //set to local state
      this.setState({
        postDescription: data.post.description,
        comments: data.post.comments,
      });

      //register subscription
      // this._subscribeToNewPosts(this.updateFeed);
    } catch (error) {
      console.error(error);
    }
  }

  async addComment(postId) {
    let { data } = await client.mutate({
      mutation: COMMENT_MUTATION,
      variables: {
        postId: postId,
        text: this.state.text,
      },
    });
    this.setState({
      text: '',
      comments: [...this.state.comments, data.comment],
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        {this.state.comments.map(comment => (
          <Text key={comment.id}>{comment.text}</Text>
        ))}
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
                this.addComment(this.props.commentsForPostId);
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
