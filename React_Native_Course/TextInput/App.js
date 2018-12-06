import React from 'react';
import { StyleSheet, Text, TextInput, View,Button } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text: '',
      toDisplayData : false
    };
    this.displayData = this.displayData.bind(this);
  }

  onTextChange(text){
    this.setState({
      text : text
    })
  }

  displayData(){
    this.setState({
      toDisplayData: true
    })
  }

  finalDisplayData(){
    if(this.state.toDisplayData){
      return(
        <Text>
          {this.state.text + " is amazing!!"}
        </Text>
      );
    }
    else{
    return(<Text></Text>);
    }
  }

  render() {
    

    return (
      <View style={styles.container}>
        <Text>Is this your good friend</Text>
        <TextInput
          style = {{height: 40}}
          placeholder = "Type your best friend name"
          onChangeText = {(text) => this.onTextChange(text)}
        />
        <Button 
        onPress = {this.displayData}
        title = "Test"
        />
        <View>{this.finalDisplayData()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
