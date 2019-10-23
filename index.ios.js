import { AppRegistry, AsyncStorage } from 'react-native';
import AppRoot from './App';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { AUTH_TOKEN, URI } from './constants';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const getToken = async () => {
  try {
    let token = await AsyncStorage.getItem(AUTH_TOKEN);
    return token;
  } catch (error) {
    console.log(error);
  }
};

//adding token into Headers for Authorization purpose
const authLink = setContext(async (_, { headers }) => {
  try {
    let token = await getToken();
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

// in order to test locally and debug with Viro, use uri with your IP address then :4000
const httpLink = createHttpLink({
  // uri: URI,
  // uri: 'http://172.16.23.242:4000',
  uri: 'http://192.168.1.17:4000',
});

const wsLink = new WebSocketLink({
  // uri: URI,
  // uri: `ws://172.16.23.242:4000`,
  uri: 'http://192.168.1.17:4000',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: getToken()
        .then(token => {
          return token;
        })
        .catch(err => console.error(err)),
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    console.log('kind', kind, 'operation', operation);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link,
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
