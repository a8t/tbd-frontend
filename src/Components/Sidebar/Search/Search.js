import React, {Component} from 'react';
import './Search.css'
import SearchResult from './SearchResult/SearchResult.js'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: []
    }
    this.timer = ''
  }

  componentWillUpdate(){
    this.performSearch(this.state.searchTerm)
  }

  updateSearch(event) {
    this.setState({
      searchTerm: event.target.value.substr(0, 50)
    })
  }

  fetchCourseData(course) {
    fetch(`https://tbd-scheduler-v1.herokuapp.com/courses/search?course=${course}`)
    .then(response => response.json())
    .then(jsonResponse =>
      {this.setState({searchResults: jsonResponse.slice(0, 10)})}
        )
  }

  performSearch(searchTerm){
    if (searchTerm.length > 1) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fetchCourseData(searchTerm)
      }, 100);

    }
  }

  hideSearchBar() {
    document.querySelector('.searchResults').style.height = '0px'
  }

  showSearchBar(){
    document.querySelector('.searchResults').style.height = ''
    document.querySelector('.searchResults').style.maxHeight = '500px'
  }

  render () {

    const searchResults = this.state.searchResults.map(eachResult => 
      <SearchResult 
        key={eachResult.code} 
        courseID={eachResult.id} 
        courseCode={eachResult.code} 
        courseName={eachResult.name} 
        addToShortList={this.props.addToShortList}
      />
    )


    return(
      <div id="search">
        <input className="searchBar" type="text"
          value={this.state.search}
          onBlur={() => this.hideSearchBar()}
          onFocus={() => this.showSearchBar()}
          onChange={this.updateSearch.bind(this)}
<<<<<<< HEAD
          placeholder="Search course"
        />
        <div className='searchResults'>
=======
          placeholder="Search course"/>
        <div className='searchResults' >
>>>>>>> 1add3eee9ea886465739798025c9d3957a7cb7d1
          {searchResults}
        </div>
      </div>
    )
  }
}

export default Search
