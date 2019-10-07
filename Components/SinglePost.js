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
          <Text>{this.props.post.description}</Text>
          <Text>{this.props.post.id}</Text>
        </View>
      </View>
    );
  }
}

export default SinglePost;
