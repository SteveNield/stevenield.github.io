import React, { Component } from 'react';
import Url from './../../lib/url';
import { GetCopy } from './../copy-store';

export default class SavedWordsTicker extends Component{

  render(){
    var component = this;
    return (
      <div className="saved-words-container">
        <div className="title">
          { this.props.copy.title }
          <a href="#" title="Edit Saved Words" alt="Edit Saved Words">
            <span className="glyphicon glyphicon-cog"></span>
          </a>
        </div>
        <div className="ticker marquee">
          <p>
          {
            this.props.savedWords.map(function(savedWord, index){
              return (
                <span key={"saved-word-"+index}>
                  <a href={Url.search({
                      category: component.props.selectedCategory.url,
                      term: savedWord.word,
                      language: component.props.selectedLanguage.code})}>
                    {savedWord.word}
                  </a> - {savedWord.numberOfResultsSinceLastVisit} { component.props.copy.link }
                </span>
              )
            })
          }
          </p>
        </div>
      </div>)
  }
}
