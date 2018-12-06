import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';

export default class FlexBox extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{height: 100, width: 50, backgroundColor: 'blue'}} />
        <View style={{height: 100, width: 50, backgroundColor: 'white'}} />
        <View style={{height: 100, width: 50, backgroundColor: 'red'}} />
      </View>
    );
  }
};


