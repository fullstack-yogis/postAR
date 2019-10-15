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

const NEW_COMMENTS_SUBSCRIPTION = gql`
  subscription {
    newComment {
      id
      text
      post {
        id
      }
      user {
        name
      }
    }
  }
`;

export default class CreateComments extends Component {
  constructor() {
    super();
    this.state = {
      postId: '',
      postDescription: '',
      comments: [],
      text: '',
    };
    this.updateFeed = this.updateFeed.bind(this);
    this._subscribeToNewComments = this._subscribeToNewComments.bind(this);
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
        postId: data.post.id,
        comments: data.post.comments,
      });

      //register subscription
      this._subscribeToNewComments(this.updateFeed);
    } catch (error) {
      console.error(error);
    }
  }

  updateFeed(newComment) {
    if (newComment.post.id === this.state.postId) {
      let prevComments = this.state.comments;
      this.setState({ comments: [...prevComments, newComment] });
    }
  }

  _subscribeToNewComments(updateFeed) {
    client
      .subscribe({
        query: NEW_COMMENTS_SUBSCRIPTION,
      })
      .subscribe({
        next({ data }) {
          updateFeed(data.newComment);
        },
      });
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
      // comments: [...this.state.comments, data.comment],
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
            <Text>POST: {this.state.postDescription}</Text>
            {this.state.comments.map(comment => (
              <Text key={comment.id}>
                {comment.text} (by {comment.user.name})
              </Text>
            ))}
            <TextInput
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
