import React from 'react';
import './SearchBar.css';
/*
const sortByOptions = {
    'Best Match'    : 'best_match',
    'Highest Rated' : 'rating',
    "Most Reviewed" : 'review_count'
}
*/
class SearchBar extends React.Component{

    constructor(props){

        super(props);

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
       // this.getSortByClass = this.getSortByClass.bind(this);
    

        this.state = {
            term : '',
            location : '',
            sortBy : 'best_match'
        };

      
    }

    
    sortByOptions = {
    'Best Match'    : 'best_match',
    'Highest Rated' : 'rating',
    "Most Reviewed" : 'review_count'
    }


    getSortByClass(sortByOption){
       
        let sortByParam;
         
        if(this.state.sortBy === sortByOption){
            sortByParam =  'active';
        }else{
            sortByParam =  '';
        }
        return sortByParam;
    }

    

    handleSortByChange(sortByOption){
        
        let newOption = this.sortByOptions[sortByOption.target.innerText];
     
        this.setState({
            sortBy : newOption
        });
    }
    
    //
    // Event Handlers
    //
    
    handleTermChange = (event) => {
        
        this.setState({
             term: event.target.value
        });
    }

     handleLocationChange = (event) => {
        this.setState({
            location: event.target.value
        });
    }

    handleSearch = (event) => {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

     
    renderSortByOptions(){
 
        return Object.keys(this.sortByOptions).map(
            sortByOption => {
                 
               let sortByOptionValue = this.sortByOptions[sortByOption];
                return (<li key={sortByOptionValue.toString()} onClick={this.handleSortByChange} className={this.getSortByClass(sortByOptionValue)}>{sortByOption}</li>);
            }
        );
    }

    render(){
        return(
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange}  />
                    <input placeholder="Where?" onChange={this.handleLocationChange}  />
                </div>
                <div className="SearchBar-submit" onClick={this.handleSearch} >
                    <a  >Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;