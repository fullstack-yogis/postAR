import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { specifiedRules } from 'graphql';
// import { client } from '../index.ios';

const FEED_QUERY = gql`
  {
    feed {
      id
      createdAt
      description
    }
  }
`;

class AllPosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    try {
      const { data } = await this.props.client.query({
        query: FEED_QUERY,
      });
      this.setState({
        posts: data.feed,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View>
        <View>
          {this.state.posts.map(post => (
            <SinglePost key={post.id} post={post} />
          ))}
        </View>
        <CreatePost />
      </View>
    );
  }
}

export default withApollo(AllPosts);
