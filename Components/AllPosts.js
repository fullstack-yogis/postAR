import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { specifiedRules } from 'graphql';

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
  render() {
    return (
      <View>
        <Query query={FEED_QUERY}>
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
        </Query>
        <CreatePost />
      </View>
    );
  }
}

export default AllPosts;
