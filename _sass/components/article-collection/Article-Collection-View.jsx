import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Loader from './../Loader.jsx';
import NoSearchResults from './No-Articles.jsx';
import ArticleItemList from './Article-List-View.jsx';
import ArticleItemGrid from './Article-Grid-View.jsx';

function isScrolledToBottom(parent){
  const offset = 50;
  var parentPos = ReactDOM.findDOMNode(parent).getBoundingClientRect();
  var childPos = ReactDOM.findDOMNode(parent.children[0]).getBoundingClientRect();
  var threshold = parentPos.bottom + offset;
  return (childPos.bottom < threshold);
}

function isScrolledToTop(parent){
  var parentPos = ReactDOM.findDOMNode(parent).getBoundingClientRect();
  var childPos = ReactDOM.findDOMNode(parent.children[0]).getBoundingClientRect();
  return (parentPos.top === childPos.top);
}

function ArticleItemView(props){
  if(props.isLoading){
    return <Loader />
  }

  if(props.articles.length === 0){
    return <NoSearchResults
              message={props.copy.noResults} />
  }

  if(props.viewType === 'List'){
    return <ArticleItemList
              {...props}
              isScrolledToBottom={isScrolledToBottom}
              isScrolledToTop={isScrolledToTop}  />
  }

  return <ArticleItemGrid
            {...props}
            isScrolledToBottom={isScrolledToBottom}
            isScrolledToTop={isScrolledToTop} />
}

export default class ArticleCollectionView extends Component{

  render(){
    return (<ArticleItemView
              {...this.props} />)
  }
}
