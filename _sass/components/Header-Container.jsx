import React, { Component } from 'react';
import Header from './Header.jsx';
import MobileHeader from './Mobile-Header.jsx';

export default class HeaderContainer extends Component{
  render(){
    return(
      <div className="header-container">
        <Header
          {...this.props} />
        <MobileHeader
          {...this.props} />
      </div>)
  }
}
