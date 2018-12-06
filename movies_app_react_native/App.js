import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';


export default class App extends React.Component {
  

  render() {
   
      return (
        <View style={styles.container}>
          
          <AppNavigator style = {{display : 'none'}} />
        </View>
      );
    
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});

