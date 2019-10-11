'use strict';

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Text, View } from 'react-native';
import { ViroText } from 'react-viro';
import SinglePost from './SinglePost';
import { specifiedRules } from 'graphql';

export class ShowPostsInAR extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View>
        {this.props.allPosts.map(post => (
          <SinglePost key={post.id} post={post} />
        ))}
      </View>
    );
  }

  // render() {
  //   return (
  //     <View>
  //       <Query query={FEED_QUERY}>
  //         {({ loading, error, data }) => {
  //           if (loading) return <Text>Fetching</Text>;
  //           if (error) return <Text>Error</Text>;

  //           const postsToRender = data.feed;
  //           postsToRender.map((post, idx) => {
  //             let posnArray = [0, 0, 0.1 * idx];
  //             return (
  //               <ViroText
  //                 text={post.description}
  //                 key={post.id}
  //                 rotation={[-90, 0, 0]}
  //                 position={posnArray}
  //               />
  //             );
  //           });
  //         }}
  //       </Query>
  //     </View>
  //   );
  // }
}
