import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

let LOGIN_VIEW = 'LOGIN';
let SIGN_UP_VIEW = 'SIGNUP';

export function Home(props) {
  return (
    <View style={styles.container}>
      <Text>postAR</Text>
      <View>
        <TouchableHighlight
          style={styles.buttons}
          underlayColor="#68a0ff"
          onPress={props.changeScreenView(LOGIN_VIEW)}
        >
          <Text>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttons}
          underlayColor="#68a0ff"
          onPress={props.changeScreenView(SIGN_UP_VIEW)}
        >
          <Text>Sign Up</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default Home;
