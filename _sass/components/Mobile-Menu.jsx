import React, { Component } from 'react';
import LanguageMenu from './Language-Menu.jsx';

export default class MobileMenu extends Component {
  render(){
    return (
      <div className="mobile-menu-container">
        <div className="mobile-language-menu-container">
          <div className="title">
            {this.props.languageMenuCopy.title}
          </div>
            <LanguageMenu
              languages={this.props.languages}
              selectedLanguage={this.props.selectedLanguage}
              onLanguageSelect={this.props.onLanguageSelect} />
        </div>
      </div>)
  }
}
