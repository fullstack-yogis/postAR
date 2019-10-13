import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import AllComments from './AllComments';
import { client } from '../index.ios';
import gql from 'graphql-tag';

const POST_DELETE_MUTATION = gql`
  mutation PostDeleteMutation($id: ID!) {
    deletePost(id: $id) {
      id
      description
    }
  }
`;

class SinglePost extends Component {
  constructor() {
    super();

    this.state = {
      isModalVisible: false,
    };
  }

  async deletePost(postId) {
    await client.mutate({
      mutation: POST_DELETE_MUTATION,
      variables: {
        id: postId,
      },
    });

    this.setState({
      text: '',
    });
  }
  closeModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }
  render() {
    return (
      <View>
        <View>
          <TouchableOpacity
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text>{this.props.post.description}</Text>
          </TouchableOpacity>
          <AllComments
            post={this.props.post}
            isModalVisible={this.state.isModalVisible}
            closeModal={() => this.closeModal()}
          />
        </View>
        <Button
          title="Delete post"
          onPress={() => {
            this.deletePost(this.props.post.id);
          }}
        />
      </View>
    );
  }
}

export default SinglePost;
