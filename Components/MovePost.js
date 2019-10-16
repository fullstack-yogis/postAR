import React, { Component } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class MovePost extends Component {
  constructor() {
    super();
    // this.state = { text: '', private: false };
    // this.togglePrivacy = this.togglePrivacy.bind(this);
  }

  // togglePrivacy = value => {
  //   this.setState({ private: value });
  // };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableOpacity
            style={styles.upButton}
            onPress={() => {
              this.props.moveZ(-0.25);
            }}
          >
            <Text style={styles.buttonText}>Up</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={styles.leftButton}
              onPress={() => {
                this.props.moveX(-0.25);
              }}
            >
              <Text style={styles.buttonText}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rightButton}
              onPress={() => {
                this.props.moveX(0.25);
              }}
            >
              <Text style={styles.buttonText}>Right</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.downButton}
            onPress={() => {
              this.props.moveZ(0.25);
            }}
          >
            <Text style={styles.buttonText}>Down</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <View>
            <TouchableOpacity
              style={styles.futherButton}
              onPress={() => {
                this.props.moveY(-0.25);
              }}
            >
              <Text style={styles.buttonText}>Further</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closerButton}
              onPress={() => {
                this.props.moveY(0.25);
              }}
            >
              <Text style={styles.buttonText}>Closer</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.rotateButton}
              onPress={() => {
                this.props.rotate('left');
              }}
            >
              <Text style={styles.buttonText}>Rotate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rotateButton}
              onPress={() => {
                this.props.rotate('up');
              }}
            >
              <Text style={styles.buttonText}>Rotate Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Button
            title="SUBMIT"
            onPress={() => {
              this.props.updateNewPostTextAndPriv(
                this.state.text,
                this.state.private
              );
              this.props.toggleCreatePost();
              this.props.toggleMovePost();
            }}
          /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  upButton: {
    borderWidth: 1,
    justifyContent: 'center',
    margin: 10,
    height: 50,
    width: 50,
    backgroundColor: '#7B68EE',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  leftButton: {
    borderWidth: 1,
    justifyContent: 'center',
    margin: 10,
    height: 50,
    width: 50,
    backgroundColor: '#7B68EE',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  rightButton: {
    borderWidth: 1,
    justifyContent: 'center',
    margin: 10,
    height: 50,
    width: 50,
    backgroundColor: '#7B68EE',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  downButton: {
    borderWidth: 1,
    justifyContent: 'center',
    margin: 10,
    height: 50,
    width: 50,
    backgroundColor: '#7B68EE',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  futherButton: {
    justifyContent: 'center',
    backgroundColor: '#3CB371',
    borderWidth: 1,
    width: 60,
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closerButton: {
    justifyContent: 'center',
    backgroundColor: '#3CB371',
    borderWidth: 1,
    width: 60,
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  rotateButton: {
    justifyContent: 'center',
    backgroundColor: '#ded01f',
    borderWidth: 1,
    height: 70,
    width: 70,
    borderRadius: 60,
  },
});
