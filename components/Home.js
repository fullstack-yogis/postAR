import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>postAR</Text>
        <View>
          <TouchableOpacity>Login</TouchableOpacity>
          <TouchableOpacity>Sign Up</TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
