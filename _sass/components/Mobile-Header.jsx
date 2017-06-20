import React, { Component } from 'react';
import Logo from './Logo.jsx';
import SearchForm from './Search-Form.jsx';
import CategoryMenu from './Category-Menu.jsx';
import MobileMenuButton from './Mobile-Menu-Button.jsx';
import MobileMenu from './Mobile-Menu.jsx';

export default class MobileHeader extends Component{
  render(){
    return (
      <div className="mobile-header">
        {
          this.props.showMobileMenu
            ? <MobileMenu
                languages={this.props.languages}
                selectedLanguage={this.props.selectedLanguage}
                onLanguageSelect={this.props.onLanguageSelect}
                languageMenuCopy={this.props.languageMenuCopy} />
            : null
        }
        <Logo />
        <div className="column-container">
          <MobileMenuButton
             onMobileMenuButtonClick={this.props.onMobileMenuButtonClick} />
          <SearchForm
             term={this.props.currentSearchTerm}
             copy={this.props.searchFormCopy}
             onChange={this.onSearchFormChange}
             onSubmit={this.onSearchFormSubmit} />
        </div>
        {
          this.props.showCategoryMenu ?
            <CategoryMenu
              selectedCategory={this.props.selectedCategory}
              categories={this.props.categories}
              onSelect={this.props.onCategorySelect}/> : null
        }
      </div>)
  }
}
