import React from 'react';
import './SearchBar.css';


export class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }


search(){
    const term = this.state.term;
    console.log("In the Searchbar the term is " + term);
    return this.props.onSearch(term);
}

handleTermChange(event){
    const newterm = event.target.value;
    this.setState({
      term: newterm
    });
}

  render() {
    return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                    <a onClick = {this.search}>SEARCH</a>
                </div>
    );
  }
}

 

 