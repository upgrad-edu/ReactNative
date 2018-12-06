import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Modal,
  Picker
} from 'react-native';

const styles = StyleSheet.create({
  imageContainer : {
    paddingTop : 5,
    paddingBottom : 5
  },
  image : {
    height : 400,
    width : '100%',
  },
  imageText : {
    position : 'absolute',
    bottom: '0%',
    width : '100%',
    backgroundColor : 'black',
    opacity : 0.6,
    fontSize  : 26,
    width : 400,
    height : 100,
    justifyContent : 'center',
    color : 'white',
    paddingLeft : '8%',
    paddingTop : '8%'
  },
  filterButton : {
    position : 'absolute',
    bottom : 5,
    right : 5,
    zIndex : 2

  }
})

// import baseUrl from '../constants/url/baseUrl';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      movieName: "",
      upcomingMovies: [],
      releasedMovies: [],
      genres: [],
      artists: [],
      isFilterModalOpen : false,
      selectedGenre :'',
      selectedGenreIndex : null,
      genreOptions : [],
      artistData : [],
      selectedArtist : '',
      selectedArtistIndex : null,
      movieName : '',
      releaseDay : '',
      releaseMonth : '',
      releaseYear : '',
      releaseDate : '',
    }
    this.openFilterModal = this.openFilterModal.bind(this);
    this.closeFilterModal =  this.closeFilterModal.bind(this);
    this.onApplyFilter = this.onApplyFilter.bind(this);

  }


  onApplyFilter(){

    let queryString = "?status=RELEASED";
        if (this.state.movieName !== "") {
            queryString += "&title=" + this.state.movieName;
        }
        if (this.state.selectedGenre !== '') {
            queryString += "&genre=" + this.state.selectedGenre.toString();
        }
        if (this.state.selectedArtist !== '') {
            queryString += "&artists=" + this.state.selectedArtist.toString();
        }
        let that = this;
        let dataFilter = null;
        let xhrFilter = new XMLHttpRequest();
        xhrFilter.addEventListener("readystatechange", function () {
          
            if (this.readyState === 4) {
                that.setState({
                    releasedMovies: JSON.parse(this.responseText).movies
                });
            }
        });


        xhrFilter.open("GET", "http://10.0.2.2:8080/api/v1/movies" + encodeURI(queryString));
        xhrFilter.setRequestHeader("Cache-Control", "no-cache");
        xhrFilter.send(dataFilter);

        this.setState({
          isFilterModalOpen : false,
          selectedGenre :'',
          selectedGenreIndex : null,
          selectedArtist : '',
          selectedArtistIndex : null,
          movieName : '',
          releaseDay : '',
          releaseMonth : '',
          releaseYear : '',
          releaseDate : '',
        })
  }

  openFilterModal(){
    this.setState({
      isFilterModalOpen : true
    })
  }

  componentDidMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            that.setState({
                upcomingMovies: JSON.parse(this.responseText).movies
            });
        }
    });

    xhr.open("GET", "http://10.0.2.2:8080/api/v1/movies?page=1&limit=10");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);

    let dataReleased = null;
    let xhrReleased = new XMLHttpRequest();
    xhrReleased.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            that.setState({
                releasedMovies: JSON.parse(this.responseText).movies
            });
        }
    });

    xhrReleased.open("GET", "http://10.0.2.2:8080/api/v1/movies?page=1&limit=10");
    xhrReleased.setRequestHeader("Cache-Control", "no-cache");
    xhrReleased.send(dataReleased);

    // Artist Options XHR
    let artistXhr = new XMLHttpRequest();
    let artistUrl = 'http://10.0.2.2:8080/api/v1/artists?page=1&limit=10';
    artistXhr.open('GET',artistUrl);
    artistXhr.send();
    artistXhr.addEventListener('readystatechange',function(){
      if(this.readyState === 4 && this.status === 200){
        that.setState({
          artistData : JSON.parse(this.responseText).artists
        })
      }
    })

    // Genres Options XHR
    let genreXhr = new XMLHttpRequest();
    let genreUrl = 'http://10.0.2.2:8080/api/v1/genres';
    genreXhr.open('GET',genreUrl);
    genreXhr.send();
    genreXhr.addEventListener('readystatechange',function(){
      if(this.readyState === 4 && this.status === 200){
        that.setState({
          genreOptions : JSON.parse(this.responseText).genres
        })
      }
    })
  }

  // Look here for Navigation
  moveToDetailPage(movieData) {
    const {push} = this.props.navigation;
    push('Details',{'movieData': movieData})
  }

  closeFilterModal(){
    this.setState({
      isFilterModalOpen : false
    })
  }

  render() {
    return (
      <View>
         <View style = {styles.filterButton}>
          <Button
            onPress = {this.openFilterModal}
            title = 'Filter'
          />
        </View>
      <ScrollView>
        {this.state.releasedMovies.map(movie => (
          <View style = {styles.imageContainer} className = "imageContainer" key = {"image" + movie.id}>
            <TouchableOpacity onPress = {() => this.moveToDetailPage(movie)}>
            <Image 
              source = {{uri : movie.poster_url}}
              style={styles.image}
              key = {"movie" + movie.id}
              />
              <Text style = {styles.imageText}>{movie.title}</Text>
              </TouchableOpacity>
          </View>
        ))}
        
        <Modal
          animationType='slide'
          transparent = {false}
          visible = {this.state.isFilterModalOpen}
          onRequestClose = {() =>{
            this.setState({
              isFilterModalOpen : false
            })
          }}>
          <View>
            <View>
              <TextInput 
                style = {{padding :10}}
                placeholder = "Movie Name"
                onChangeText = {(text) => this.setState({
                  movieName : text
                })}
              />
              <Text>Genres</Text>
              <Picker 
                selectedValue = {this.state.selectedGenre}
                style = {{height : 50, width : 50}}
                onValueChange = {(itemValue, itemIndex) => this.setState({selectedGenre : itemValue, selectedGenreIndex : itemIndex})}
                label = "Genres"
                >
                  {this.state.genreOptions.map((genre)=>(
                    <Picker.Item key = {genre.id} label = {genre.genre} value = {genre.genre}></Picker.Item>
                ))}
                </Picker>
                <View>
                  <Text>
                    {this.state.selectedGenreIndex && this.state.genreOptions[this.state.selectedGenreIndex].genre}
                  </Text>
                </View>
              
              <Text>Artists</Text>
                <Picker 
                  selectedValue = {this.state.selectedArtist}
                  style = {{height : 50, width : 50}}
                  onValueChange = {(itemValue, itemIndex) => this.setState({selectedArtist : itemValue,selectedArtistIndex : itemIndex})}
                  label = "Genres"
                >
                  {this.state.artistData.map((artist)=>(
                    <Picker.Item key = {artist.id} label = {artist.first_name +' '+ artist.last_name} value = {artist.first_name}></Picker.Item>
                ))}
                </Picker>
                <View>
                  <Text>
                    {this.state.selectedArtistIndex && this.state.artistData[this.state.selectedArtistIndex].first_name}
                  </Text>
                </View>
                <View>
                  <Text>
                    {this.state.releaseDate}
                  </Text>
                </View>
                <View>
                  <Button
                    onPress = {this.onApplyFilter}
                    title = 'Apply Filter'
                  />
                </View>
            </View>
          </View>
          
          </Modal>
      </ScrollView>
     
      </View>
    );
  }
}



