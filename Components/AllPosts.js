import React, { Component } from 'react';
import { Text, View } from 'react-native';
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
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
  }

  async componentDidMount() {
    try {
      console.log('--------here-----------')
      const { data }= await client.query({
        query: FEED_QUERY,
      });
      console.log('s2m----------', data)
      this._subscribeToNewPosts()
      this.setState({
        posts: data.feed,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getFeed() {
    try {
      const { data }= await client.query({
        query: FEED_QUERY,
      });
      this.setState({
        posts: data.feed,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // secondTry({ repoFullName }) {
  //   const { data: { commentAdded }, loading } = useSubscription(
  //     COMMENTS_SUBSCRIPTION,
  //     { variables: { repoFullName } }
  //   );
  //   return <h4>New comment: {!loading && commentAdded.content}</h4>;
  // }

  _subscribeToNewPosts = () => {
    console.log('entered sub--------------------')
    // client.subscribe({
    //   query: NEW_POSTS_SUBSCRIPTION,
    // },
    // (err, result) => {
    //   this.setState({
    //     posts: [result]
    //   })
    //   console.log('err', err, '-------------result', result)
    // })
    let prevPosts = this.state.posts


    client.subscribe({
      query: NEW_POSTS_SUBSCRIPTION,
      // updateQuery: (prev, {data}) => {
              // if (!data.newPost) return prev
              // const newPost = data.newPost
              // const exists = prev.feed.posts.find(({ id }) => id === newPost.id);
              // if (exists) return prev;
              // console.log('newPost', newPost)
            // console.log('--------data', data)
            // },
    })
    .subscribe({
      updateQuery: (prev, {data}) => {
        return {
          posts: [...prev.posts, data.newPost]
        }
        // return Object.assign({}, prev, {
        //   feed: {
        //     posts: [newPost, ...prev.feed.post],

        //   }
        // })
        console.log('--------data', data)
      },
    })
    //   next(data) {
    //     // const { data }= await client.query({
    //     //   query: FEED_QUERY,
    //     // });
    //     updateQuery: (prev, data) => {
    //       if (!data.newPost) return prev
    //       const newPost = data.newPost
    //       const exists = prev.feed.posts.find(({ id }) => id === newPost.id);
    //       if (exists) return prev;
    //       console.log('newPost', newPost)
    //     console.log('--------data', data)
    //     },

        // return data.newPost

        // this.setState({
        //   posts: [...prevPosts, data.newPost]
        // })

    //   error(err) {
    //     console.error(err)
    //   }
    // })


    // this.setState({
    //   posts: [...prevPosts, newPost]
    // })

    // client.subscribe({
    //   document: NEW_POSTS_SUBSCRIPTION,
    //   updateQuery: (prev, { subscriptionData }) => {
    //     const newPost = subscriptionData.data.newPost
    //     console.log('newpost=------------', newPost)

    //     if (!subscriptionData.data) return prev
    //     const newLink = subscriptionData.data.newLink
    //     const exists = prev.feed.links.find(({ id }) => id === newLink.id);
    //     if (exists) return prev;

    //     return Object.assign({}, prev, {
    //       feed: {
    //         links: [newLink, ...prev.feed.links],
    //         count: prev.feed.links.length + 1,
    //         __typename: prev.feed.__typename
    //       }
    //     })
    //   }
    // })
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

export default AllPosts;
