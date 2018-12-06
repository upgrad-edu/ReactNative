import React from 'react';
import { StyleSheet, Text, View ,TextInput} from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state  = {
      friendName : ''
    }
   
  }

  onTextChange(text){
    this.setState({
      friendName : text
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Type your best friend name</Text>
          <TextInput
            style = {{height: 40, width: 100}}
            placeholder = "Type your best friend name"
            onChangeText = {(text) => this.onTextChange(text)}
          />
          <Text>{this.state.friendName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
