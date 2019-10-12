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

class SingleComment extends Component {
  render() {
    return (
      <View style={{ marginTop: 25 }}>
        <Text>{this.props.comment.user.name}:</Text>
        <Text>{this.props.comment.text}</Text>
      </View>
    );
  }
}

export default SingleComment;
