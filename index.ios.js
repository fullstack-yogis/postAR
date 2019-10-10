import { AppRegistry, AsyncStorage } from 'react-native';
import AppRoot from './App';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN } from './constants';

const authLink = setContext((_, { headers }) => {
  AsyncStorage.getItem(AUTH_TOKEN).then(function(token) {
    console.log('token  🥰  🥰  🥰  🥰 ', token);
    return {
      headers: {
        ...headers,
        // Authorization: token ? `Bearer ${token}` : '',

        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazFqaHB0NWloczRnMGIwOTZkbjJsdmJmIiwiaWF0IjoxNTcwNzIyMjM2fQ.BgNmG7i81FdOrdOzdx23iuvPQnI1L0ucwKCbbCQM4EU',
      },
    };
  });
});

const httpLink = createHttpLink({
  uri: 'https://postit-server.herokuapp.com',
  // uri: 'https://192.168.1.17',
});

const client = new ApolloClient({
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
