import React, { Component } from 'react';
import {
  Modal,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import SingleComment from './SingleComment';
import { client } from '../index.ios';
import CreateComments from './CreateComments';

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

const NEW_COMMENTS_SUBSCRIPTION = gql`
  subscription {
    newComment {
      id
      text
      user {
        name
      }
    }
  }
`;

export default class AllComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.post.comments ? this.props.post.comments : [],
    };
    this.updateFeed = this.updateFeed.bind(this);
  }

  componentDidMount() {
    this._subscribeToNewComments(this.updateFeed);
  }
  updateFeed(newComment) {
    let prevComments = this.state.comments;
    this.setState({
      comments: [...prevComments, newComment],
    });
  }
  _subscribeToNewComments = updateFeed => {
    console.log('entered comments sub--------------------');
    client
      .subscribe({
        query: NEW_COMMENTS_SUBSCRIPTION,
      })
      .subscribe({
        next({ data }) {
          console.log('data received from subscribe', data);
          updateFeed(data.newComment);
        },
      });
  };

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
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isModalVisible}
      >
        <View style={{ marginTop: 25 }}>
          <TouchableHighlight
            onPress={() => {
              this.props.closeModal();
            }}
          >
            <Image
              source={{
                uri:
                  'https://cdn4.iconfinder.com/data/icons/media-controls-4/100/close-512.png',
              }}
              style={styles.close}
            />
          </TouchableHighlight>
          <View>
            <Text style={styles.input}>Post</Text>
            <Text>{this.props.post.description}</Text>
          </View>
          <View>
            <Text style={styles.input}>Comments</Text>
            {this.state.comments.map(comment => {
              return <SingleComment comment={comment} key={comment.id} />;
            })}
          </View>

          <CreateComments post={this.props.post} />
        </View>
      </Modal>
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
