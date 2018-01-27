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
    this.state = { searchResults:[ {
        name    : 'Higher Ground', 
        artist  : 'Stevie Wonder', 
        album   : 'Innervisions',
        id      : 1
    } ],
    playlistName : 'WonderMan!',
    playlistTracks : [{
        name    : 'That Girl', 
        artist  : 'Stevie Wonder', 
        album   : 'Musicqaurium',
        id      : 2
    }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    
    var elementPos = this.state.playlistTracks.map(function(x) {return x.id; }).indexOf(track.id);
    
    if(elementPos = -1){
        let currentTracks = this.state.playlistTracks;

        currentTracks[currentTracks.length] = {  
          name: track.name,
          artist : track.artist,
          album : track.album
        }

        this.setState({
          playlistTracks : currentTracks
        });
    }
   }


  removeTrack(track){

    var elementPos = this.state.playlistTracks.map(function(x) {return x.id; }).indexOf(track.id);
    
    if(elementPos > -1){
     let currentTracks = this.state.playlistTracks.splice(elementPos, 1);
     this.setState({
          playlistTracks : currentTracks
        });
    }

  }

  updatePlaylistName(name){
    console.log("Updating Playlist Name");
    this.setState({
      playlistName : name
    });
  }

  search(searchTerm){
    console.log("In App.js the search term is " + searchTerm);
    console.log(Spotify.search(searchTerm));
    var PromiseObject = Spotify.search(searchTerm);
    console.log(PromiseObject);
    this.state.searchResults = PromiseObject;
    console.log("The searchResult value is " + this.state.searchResults);
    console.log(this.state.searchResults.id);
  }

  savePlaylist(){
    //Generates an array of uri values called trackURIs from the playlistTracks property
    let trackURIs = this.state.playlistTracks;
    console.log("About to savePlayList()");
    Spotify.savePlaylist();
    console.log("Updating playlist name from " + this.state.playlistName);
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
              <SearchResults searchResults = {this.state.searchResults} onAdd={this.addTrack} />
              {/*<!-- Add a Playlist component --> */}
              <PlayList  playlistName={this.state.playlistName} playlistTracks = {this.state.playlistTracks}  
              onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
              </div>
            </div>
          </div>
    );
  }
}

export default App;
