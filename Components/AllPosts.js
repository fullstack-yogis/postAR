import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { specifiedRules } from 'graphql';
import { client } from '../index.ios';

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
      const { data } = await client.query({
        query: FEED_QUERY,
      });
      console.log('data in componentdidmount:', data);
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
        {/* <Query query={FEED_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Fetching</Text>;
            if (error) return <Text>Error</Text>;

            const postsToRender = data.feed;

            return (
              <View>
                {postsToRender.map(post => (
                  <SinglePost key={post.id} post={post} />
                ))}
              </View>
            );
          }}
        </Query> */}
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

export default AllPosts;
