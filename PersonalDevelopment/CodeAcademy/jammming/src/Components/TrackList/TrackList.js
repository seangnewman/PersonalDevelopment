import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';



export class TrackList extends React.Component {
  
  render() {
               //console.log("The Track id is " + track.id);
    return (
        <div className="TrackList">
            {/*<!-- You will add a map method that renders a set of Track components  --> */}
            {
              
              this.props.tracks.map(track =><Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
              )
            }
        </div>
   );
  }
}

 