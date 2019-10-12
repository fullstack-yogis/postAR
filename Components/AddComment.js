import React, { Component } from 'react';
import {
  DatePickerIOS,
  Modal,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import SingleComment from './SingleComment';
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

export default class AddComments extends Component {
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
            {this.props.post.comments.map(comment => {
              return <SingleComment comment={comment} key={comment.id} />;
            })}
          </View>

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
