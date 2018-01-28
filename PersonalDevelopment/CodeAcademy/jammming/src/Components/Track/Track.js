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
  console.log("In add track the value is " + track.id);
  return this.props.onAdd(this.props.track);
   
}


removeTrack(){
  const track = this.props.track;
  console.log("In remove track the value is " + track.name);
  return this.props.onRemove(this.props.track);
}

 

  render() {
    
    let anchor = null;
    if(this.props.isRemoval){
      anchor = <a className="Track-action" onClick={this.removeTrack} >-{/*<!-- + or - will go here -->*/}</a>
    }else{
      anchor = <a className="Track-action" onClick={this.addTrack} >+{/*<!-- + or - will go here -->*/}</a>
    }
             
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
          {anchor}
      </div>
   );
  }
}

 

 