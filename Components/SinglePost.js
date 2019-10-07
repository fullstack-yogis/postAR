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

class SinglePost extends Component {
  render() {
    return (
      <View>
        <View>
          {this.props.post.description} {this.props.post.name}
          {this.props.post.comments}
        </View>
      </View>
    );
  }
}

export default SinglePost;
