import React from 'react';
import './Track.css';

export class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

addTrack(){
  const track = this.props.track;
  console.log("In track the value is " + track.name);
  return this.props.onAdd(this.props.track.name);
   
}

removeTrack(){
  const track = this.props.track;
  console.log("In track the value is " + track);
  return this.props.onRemove(this.props.track);
}

  render() {
             
    return (
      <div class="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
          <a className="Track-action" onClick={this.addTrack} >+{/*<!-- + or - will go here -->*/}</a>
          <a className="Track-action" onClick={this.removeTrack} >{/*<!-- + or - will go here -->*/}-</a>
      </div>
   );
  }
}

 

 