import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import {WebBrowser} from 'expo';

export default class DetailsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      movieData : {
        title : 'MovieData'
      }
    }
  }

  componentWillMount(){
    let movieData = this.props.navigation.getParam('movieData');
    this.setState({
      movieData: movieData
    })
  }

  onTitlePress(wikiUrl){
    WebBrowser.openBrowserAsync(wikiUrl);
  }

  render() {
    let movieData = this.state.movieData;
    if(movieData === undefined)
    {
      return(<View>
        </View>)
    }
    else {
      return (
        <ScrollView style={styles.container}>
          <View>
          <View>
            </View>
            <Text style = {styles.title}>
              {movieData.title}
            </Text>
            <TouchableOpacity  onPress = {() =>this.onTitlePress(movieData.wiki_url)}>
              <Text>Wikipedia</Text>
            </TouchableOpacity>
            <View style = {styles.storylineView}>
              <Image 
                source = {{uri : movieData.poster_url}}
                style={{width: '100%', height: 400}}
                key = {"movie" + movieData.id}
              />
              <Text style = {styles.storyline}>
                {movieData.storyline}
              </Text>
            </View>
            <View>
              <Text style = {styles.artistsTitle}>Artists</Text>
              <View>
                {movieData.artists.map((artist) => (
                  <Text key = {'artistName' + artist.id}>
                    {artist.first_name}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'lightgrey',
    paddingLeft : 5
  },
  title : {
    fontSize : 32
  },
  storyline : {
    fontStyle : 'italic'
  },
  storylineView : {
    paddingTop : 10,
    paddingBottom : 10,
  },
  artistsTitle : {
    fontSize : 28
  },
  trailer : {
    height : 400,
    width :600
  }
});

