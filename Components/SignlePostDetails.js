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

class SinglePostDetails extends Component {
  render() {
    return (
      <View>
        <View>
          <Text>{this.props.post.description}</Text>
          <Text>{this.props.post.id}</Text>
          <Button
            title="Add Comments"
            color="#f194ff"
            onPress={() => {
              this.props.changeCurrentView('addComment');
            }}
          />
        </View>
      </View>
    );
  }
}

export default SinglePostDetails;
