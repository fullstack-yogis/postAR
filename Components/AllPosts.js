import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';
import gql from 'graphql-tag';
import { withApollo, Subscription } from 'react-apollo';
import { specifiedRules } from 'graphql';
import { client } from '../index.ios';
import { useSubscription } from '@apollo/react-hooks';

const FEED_QUERY = gql`
  {
    feed {
      id
      createdAt
      description
      comments {
        id
        text
        createdAt
        user {
          name
        }
      }
    }
  }
`;

const NEW_POSTS_SUBSCRIPTION = gql`
  subscription {
    newPost {
      id
      createdAt
      privacy
      xDistance
      yDistance
      zDistance
      description
      height
      width
    }
  }
`;

class AllPosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
    this.updateFeed = this.updateFeed.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await client.query({
        query: FEED_QUERY,
      });
      this._subscribeToNewPosts(this.updateFeed);
      this.setState({
        posts: data.feed,
      });
    } catch (error) {
      console.error(error);
    }
  }

  updateFeed(newPost) {
    let prevPosts = this.state.posts;
    this.setState({
      posts: [...prevPosts, newPost],
    });
  }

  _subscribeToNewPosts = updateFeed => {
    client
      .subscribe({
        query: NEW_POSTS_SUBSCRIPTION,
      })
      .subscribe({
        next({ data }) {
          updateFeed(data.newPost);
        },
      });
  };

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

export default AllPosts;
