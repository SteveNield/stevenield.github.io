import React, { Component } from 'react';
import Url from './../../../lib/url';
import { Media } from './../../client.conf';
import * as ArticleTypes from './../../store/articles/article-types';

export default class ArticleItem extends Component {

  resolveImageUrl() {
    return this.props.article.urlimg || Media.placeholderImageUrl;
  }

  resolveTarget(){
    return this.props.article.type === ArticleTypes.WEB
      ? "_blank"
      : "_self";
  }

  render(){
    return (
      <div className="article-item">
        <div className="title">
          <div className="channel pull-left">
            {this.props.article.source}
          </div>
          <div className="time pull-right">
            {this.props.article.age}
          </div>
        </div>
        <div className="image-container">
          <a
            className="click-through"
            target={this.resolveTarget()}
            href={Url.article({ article: this.props.article, term: this.props.currentSearchTerm })}>
            <img src={this.resolveImageUrl()} alt="" title="" />
          </a>
        </div>
        <div className="text touchword-container" dangerouslySetInnerHTML={{__html: this.props.article.shortFormText}}></div>
      </div>)
  }
}
