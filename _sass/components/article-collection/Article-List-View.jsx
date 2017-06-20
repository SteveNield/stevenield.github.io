import React, { Component } from 'react';
import ArticleItem from './Article-Item.jsx';

export default class ArticleListView extends Component{

  onScroll(e){
    var isScrolledToBottom = this.props.isScrolledToBottom(e.target);
    var isScrolledToTop = this.props.isScrolledToTop(e.target);

    this.props.onScroll({ isScrolledToTop, isScrolledToBottom });
  }

  render(){
    return (
      <div className="article-list-outer">
        <div className="article-grid-title">
          { this.props.copy.title }
        </div>
        <div className="scroll-container" onScroll={(e) => this.onScroll(e)}>
          <div className="article-list-inner">
            {
              this.props.articles.map((article, index) => {
                return (<ArticleItem
                  key={"article-list-item-"+index}
                  article={article} />)
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
