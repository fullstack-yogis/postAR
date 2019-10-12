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

export default class AddComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
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
            <Text>--------</Text>
            <Text style={styles.input}>Comments</Text>
            {this.props.post.comments.map(comment => {
              return <SingleComment comment={comment} key={comment.id} />;
            })}
          </View>

          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={eventName => this.setState({ comments })}
            placeholder="Add your comments here..."
            value={this.state.comments}
            style={styles.input}
          />
          <Button title="Add Comments" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 120,
    marginLeft: 10,
    fontSize: 30,
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
