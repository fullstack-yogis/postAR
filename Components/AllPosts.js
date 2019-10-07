import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SinglePost from './SinglePost';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FEED_QUERY = gql`
  {
    feed {
      id
      createdAt
      location
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
            if (error) return <Text>{error}</Text>;

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
      </View>
    );
  }
}

export default AllPosts;
