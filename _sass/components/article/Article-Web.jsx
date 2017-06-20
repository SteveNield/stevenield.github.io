import React, { Component } from 'react';
import { UserExperience } from './../../client.conf';

export default class ArticleWeb extends Component {

  componentDidMount(){
    global.setTimeout(() => {
      this.props.onWebRedirectTimeout(this.props.article.url);
    }, UserExperience.webRedirectTimeout);
  }

  render(){
    return (
      <div className="article-web-container">
        <div className="redirecting-icon">
          <img src="/interface/gears.svg" />
        </div>
        <div className="redirecting-text">
          {this.props.copy.redirecting+'...'}
        </div>
      </div>)
  }
}
