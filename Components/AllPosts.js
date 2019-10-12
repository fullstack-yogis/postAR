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
`

class AllPosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
    this.updateFeed = this.updateFeed.bind(this)
  }

  async componentDidMount() {
    try {
      console.log('--------here-----------')
      const { data }= await client.query({
        query: FEED_QUERY,
      });
      console.log('s2m----------', data)
      this._subscribeToNewPosts(this.updateFeed)
      this.setState({
        posts: data.feed,
      });
    } catch (error) {
      console.error(error);
    }
  }

  updateFeed(newPosts) {
    this.setState({
      posts: newPosts
    });
  }

  _subscribeToNewPosts = (updateFeed) => {
    console.log('entered sub--------------------')

    client.subscribe({
      query: NEW_POSTS_SUBSCRIPTION,
    })
    .subscribe({
      next({data}) {
        const cacheData = client.cache.readQuery({query: FEED_QUERY})
        console.log('cacheData?????', cacheData)
        console.log('data??????', data.newPost)
        const postAlreadyExists = cacheData.feed.find(post => {
          post.id == data.newPost.id
        })

        if (!postAlreadyExists) {
          client.cache.writeQuery({query: FEED_QUERY,
          data: {...cacheData,
              feed: [...cacheData.feed, data.newPost]
          }
        })
        }

        const newPosts = client.cache.readQuery({query: FEED_QUERY})
        console.log('newCacheData?????', newPosts)
        updateFeed(newPosts)

      }})
  }

  render() {
    // console.log('client cache----------------', client.cache.data.data.ROOT_QUERY)
    if (client.cache.data.data.ROOT_QUERY) {
      console.log('client cache----------------', client.readQuery({
        query: FEED_QUERY
      }))
    }

    return (
      <View>
        <View>
          {client.cache.data.data.ROOT_QUERY
          ? client.readQuery({
            query: FEED_QUERY
          }).feed.map(post => (
            <SinglePost key={post.id} post={post} />
          ))
          : null }
        </View>
        {/* <View>
          {this.state.posts.map(post => (
            <SinglePost key={post.id} post={post} />
          ))}
        </View> */}
        <CreatePost />
      </View>
    );
  }
}

export default AllPosts;
