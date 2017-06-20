import React, { Component } from 'react';
import Logo from './Logo.jsx';
import SearchForm from './Search-Form.jsx';
import CategoryMenu from './Category-Menu.jsx';
import SavedWordsTicker from './Saved-Words-Ticker.jsx';

export default class Header extends Component{

  render(){
    return (
      <div className="header">
        <div className="header-top container">
          <div className="row">
            <div className="logo col-sm-6 col-md-6">
              <Logo />
            </div>
            <div className="col-sm-6 col-md-6">
              <SearchForm
                term={this.props.currentSearchTerm}
                copy={this.props.searchFormCopy}
                onChange={this.props.onSearchFormChange}
                onSubmit={this.props.onSearchFormSubmit} />
            </div>
          </div>
        </div>
        <div className="header-bottom">
          {
            this.props.showCategoryMenu
              ? <CategoryMenu
                  selectedCategory={this.props.selectedCategory}
                  categories={this.props.categories}
                  onSelect={this.props.onCategorySelect} />
              : null
          }
          <div>
            <SavedWordsTicker
              savedWords={this.props.savedWords}
              copy={this.props.savedWordsCopy}
              selectedCategory={this.props.selectedCategory}
              selectedLanguage={this.props.selectedLanguage} />
          </div>
        </div>
      </div>)
  }
}
