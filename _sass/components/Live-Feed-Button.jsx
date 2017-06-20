import React, { Component } from 'react';
import Url from './../../lib/url';

export default class LiveFeedButton extends Component {

  onClick(e){
    e.preventDefault();
    this.props.onClick();
  }

  render(){
    return (
      <div className="live-feed-button">
        <a href="#" onClick={(e) => this.onClick(e)}>
          <span className="cta">{this.props.selectedCategory.name} Feed</span>
          <span className="glyphicon glyphicon-globe"></span>
        </a>
      </div>)
  }
}
