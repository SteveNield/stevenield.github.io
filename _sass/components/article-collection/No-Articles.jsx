import React, { Component } from 'react';

export default class NoArticles extends Component {

  render(){
    return(
      <div className="no-search-results-container">
        {this.props.message}
      </div>)
  }
}
