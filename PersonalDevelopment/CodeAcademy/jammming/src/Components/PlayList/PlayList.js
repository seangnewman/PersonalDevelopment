import React from 'react';
import './PlayList.css';
import {TrackList} from '../TrackList/TrackList';


export class PlayList extends React.Component {

  constructor(props){
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.disableAddEvent = this.disableAddEvent.bind(this);
  }
  
handleNameChange(event){
  const target = event.target.value;
  this.props.onNameChange(target);
}

disableAddEvent(){

}

  render() {
        
    return (
        <div className="Playlist">
            <input value={this.props.playlistName} onChange={this.handleNameChange} />
            {/*<!-- Add a TrackList component --> */}
             <TrackList  tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} onAdd={this.disableAddEvent} />
            <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
        </div>
   );
  }
}


 

 