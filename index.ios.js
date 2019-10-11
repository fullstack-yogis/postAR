import { AppRegistry, AsyncStorage } from 'react-native';
import AppRoot from './App';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from './constants';

//adding token into Headers for Authorization purpose
const authLink = setContext(async (_, { headers }) => {
  try {
    let token = await AsyncStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.log(error);
  }
});

const httpLink = createHttpLink({
  // uri: 'https://postit-server.herokuapp.com',
  uri: 'http://172.16.23.176:4000',
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    {/* calling App.js */}
    <AppRoot />
  </ApolloProvider>
);

AppRegistry.registerComponent('ViroSample', () => App);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => App);
