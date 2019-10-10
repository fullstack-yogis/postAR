import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TextInput,
  Picker,
  Button,
} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const POST_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $privacy: Boolean!
    $location: String!
  ) {
    post(description: $description, privacy: $privacy, location: $location) {
      id
      createdAt
      privacy
      location
      description
    }
  }
`;

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      privacy: false,
      location: 'NYC',
    };
  }

  render() {
    const { description, location, privacy } = this.state;
    return (
      <View>
        <TextInput
          // multiline={true}
          style={styles.textInput}
          placeholder="Speak up!"
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />
        <Picker
          selectedValue={this.state.privacy}
          style={{ height: 50, width: 100 }}
          onValueChange={(privacy, itemIndex) => this.setState({ privacy })}
        >
          <Picker.Item label="Public" value={false} />
          <Picker.Item label="Private" value={true} />
        </Picker>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, privacy, location }}
        >
          {postMutation => (
            <Button title="Press me" color="#f194ff" onPress={postMutation} />
          )}
        </Mutation>
      </View>
    );
  }
}

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    marginTop: 40,
    // flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginLeft: 40,
    // color: 'white',
    fontWeight: 'bold',
    flex: 1,
  },
  headerContainer: {
    // height: 30,
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#800000',

    // justifyContent: 'center',
    // marginTop: 40,
    alignItems: 'center',
    // paddingLeft: 30,
    // borderBottomWidth: 1,
    // backgroundColor: '#800000',
    // color: 'white',
    // borderBottomColor: '#800000'
  },
  close: {
    width: 30,
    height: 30,
    // marginLeft: 340,
    // alignSelf: 'flex-end',
    marginRight: 2,
    // marginBottom: 10
  },
  button: {
    // width: 300,
    // marginLeft: 60
    // alignContent: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center'
    // borderWidth: 4
  },
  timing: {
    // flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // justifyContent: 'center',
    flexDirection: 'row',
    // paddingTop: 50,
    paddingBottom: 50,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    paddingTop: 20,
  },
  textInput: {
    paddingLeft: 40,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'white',
    // borderBottomColor: 'grey',
    borderWidth: 3,

    marginTop: 30,
    width: 400,
    marginBottom: 30,
    borderColor: '#f0f0f5',
    // flex: 1
    // height: 80
  },
  day: {
    width: 20,
  },
});
