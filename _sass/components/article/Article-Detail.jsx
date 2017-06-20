import React, { Component } from 'react';
import Loader from './../Loader.jsx';
import ArticleTv from './Article-Tv.jsx';
import ArticleVideo from './Article-Video.jsx';
import ArticleWeb from './Article-Web.jsx';
import * as ArticleTypes from './../../store/articles/article-types';

function ArticleContent(props){
  if(props.isLoading){
    return <Loader />
  }

  if(props.article.type === ArticleTypes.WEB){
    return <ArticleWeb {...props} />
  }

  if(props.article.type === ArticleTypes.VIDEO){
    return <ArticleVideo {...props} />
  }

  return <ArticleTv {...props} />
}

export default class ArticleDetail extends Component {
  render(){
    return (<ArticleContent {...this.props} />)
  }
}
