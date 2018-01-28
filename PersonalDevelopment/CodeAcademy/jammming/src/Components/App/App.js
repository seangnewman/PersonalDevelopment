import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {PlayList} from '../PlayList/PlayList';
import {Spotify} from '../../util/Spotify'

class App extends Component {

  constructor(props){
    super(props);
    this.state = { searchResults:[],
    playlistName : '',
    playlistTracks : []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    console.log('The track id is ' + track.id);
    var elementPos = this.state.playlistTracks.map(function(x) {return x.id; }).indexOf(track.id);
    
    const newTrack = {
      name : track.name,
      artist : track.artist,
      album : track.album,
      id : track.id,
      uri : track.uri
    };

    console.log("The new track is " + newTrack);

    if(elementPos === -1){
        let currentTracks = this.state.playlistTracks;
        currentTracks[currentTracks.length] =  newTrack;
        this.setState({
          playlistTracks : currentTracks
        });
    }
   }


  removeTrack(track){

    var elementPos = this.state.playlistTracks.map(function(x) {return x.id; }).indexOf(track.id);
    
    

    console.log("In removeTrack the element position is " + elementPos);
    
    

    if(elementPos > -1){
     //let currentTracks = this.state.playlistTracks.splice(elementPos, 1);

     var curElementTracks = this.state.playlistTracks;

     var removedElement = curElementTracks.splice(elementPos, 1);
     
     console.log('The new array is :');    
     console.log(curElementTracks);
     this.setState({
          playlistTracks :curElementTracks
        });
     
     console.log(this.state.playlistTracks);
    }

  }

  updatePlaylistName(name){
    this.setState({
      playlistName : name
    });
  }

  search(searchTerm){
    console.log(Spotify.search(searchTerm));
    var PromiseObject = Spotify.search(searchTerm);
    
    PromiseObject.then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  savePlaylist(){
    //Generates an array of uri values called trackURIs from the playlistTracks property
    let trackURIs = this.state.playlistTracks;

    let tracks = trackURIs.map(function(uri){
      return uri.uri;
    });

    Spotify.savePlaylist(this.state.playlistName, tracks);
    this.state.playlistName = 'New Playlist';
    this.searchResults = [];
  }

  render() {
       
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
              {/*<!-- Add a SearchBar component --> */}
              <SearchBar  onSearch={this.search}/>
              <div className="App-playlist">
              {/*<!-- Add a SearchResults component -->*/}
              <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack} isRemoval={false} />
              {/*<!-- Add a Playlist component --> */}
              <PlayList  playlistName={this.state.playlistName} playlistTracks = {this.state.playlistTracks}  
              onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} isRemoval={true} />
              </div>
            </div>
          </div>
    );
  }
}

export default App;
