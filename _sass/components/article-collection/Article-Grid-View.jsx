import React, { Component } from 'react';
import ArticleItem from './Article-Item.jsx';

export default class ArticleGridView extends Component {

  onScroll(e){
    var isScrolledToBottom = this.props.isScrolledToBottom(e.target);
    var isScrolledToTop = this.props.isScrolledToTop(e.target);

    this.props.onScroll({ isScrolledToTop, isScrolledToBottom });
  }

  resolveGridSize(){
    const gridSizes = {
      'LargeGrid': 'col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xxs-12 col-tn-12 col-tn-12',
      'MidGrid': 'col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6 col-xxs-12 col-tn-12'
    };

    return gridSizes[this.props.viewType];
  }

  render(){
    var component = this;
    return(
      <div className="article-grid-container">
        <div className="article-grid-outer">
          <div className="article-grid-title">
            { this.props.copy.title }
          </div>
          <div className="scroll-container" onScroll={(e) => this.onScroll(e)}>
            <div className="article-grid-inner">
              <div className="container-fluid">
                <div className="flex-row row">
                {
                  this.props.articles.map((article, index) => {
                    return (
                      <div key={"article-"+index} className={"article-grid-cell "+this.resolveGridSize()}>
                        <ArticleItem
                          article={article}
                          currentSearchTerm={component.props.currentSearchTerm} />
                      </div>)
                  })
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}
