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
import SinglePost from './SinglePost';

class AllPosts extends Component {
  render() {
    const linksToRender = [
      {
        name: '1',
        description: 'Prisma turns your database into a GraphQL API 😎',

        comments: 'https://www.prismagraphql.com',
      },
      {
        name: '2',
        description: 'The best GraphQL client',
        comments: 'https://www.apollographql.com/docs/react/',
      },
    ];

    return (
      <View>
        {linksToRender.map(post => (
          <SinglePost key={post.name} post={post} />
        ))}
      </View>
    );
  }
}

export default AllPosts;
