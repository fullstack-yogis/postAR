/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
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
        behavior={Platform.OS === 'ios' ? 'height' : null}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              backgroundColor: 'black',
            }}
          >
            <ScrollView>
              <View style={{ flex: 3 }}>
                <View style={styles.post}>
                  <Text style={styles.postText}>
                    {this.state.postDescription}
                  </Text>
                </View>
                {this.state.comments.map(comment => (
                  <View style={styles.comment} key={comment.id}>
                    <Text style={styles.commentName}>{comment.user.name}</Text>
                    <Text style={styles.commentText}>{comment.text} </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.inputView}>
              <TextInput
                onChangeText={text => this.setState({ text })}
                placeholder="Add your comments here..."
                value={this.state.text}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.addComment(this.props.commentsForPostId);
                }}
              >
                <Text style={styles.buttonText}>ADD COMMENT</Text>
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
    width: 275,
    backgroundColor: 'white',
    fontSize: 18,
    height: 38,
    paddingLeft: 8,
    margin: 4,
  },
  inputView: {
    flex: 1,
  },
  post: {
    alignSelf: 'center',
    borderWidth: 1,
    width: 275,
    borderRadius: 10,
    margin: 3,
    marginTop: 10,
    backgroundColor: '#008080',
  },
  postText: {
    alignSelf: 'center',
    fontSize: 25,
    padding: 2,
    color: 'white',
  },
  comment: {
    alignSelf: 'center',
    padding: 2,
    margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    width: 275,
    backgroundColor: 'grey',
  },
  commentName: {
    color: 'blue',
    fontSize: 12,
    fontWeight: '600',
    paddingLeft: 5,
  },
  commentText: {
    paddingLeft: 5,
  },
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 275,
    height: 35,
    backgroundColor: '#4169E1',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    padding: 2,
    margin: 2,
  },
});
