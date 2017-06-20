import React, { Component } from 'react';

export default class LanguageMenu extends Component {

  onLanguageClick(e){
    this.props.onLanguageSelect(e.target.dataset.code);
  }

  render(){
    var component = this;
    return (
      <ul>
        {
          this.props.languages.map((language, index) => {
            return (
              <li
                id={"language_"+language.code}
                key={"language-index-"+index}
                className={component.props.selectedLanguage.code===language.code?"active":""}
                data-code={language.code}
                onClick={(e) => this.onLanguageClick(e)}>{language.name}</li>)
          })
        }
      </ul>)
  }
}
