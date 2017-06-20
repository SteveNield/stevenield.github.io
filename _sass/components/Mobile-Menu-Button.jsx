import React, { Component } from 'react';

export default class MobileMenuButton extends Component {
  render(){
    return (
      <div className="mobile-menu-button" onClick={this.props.onMobileMenuButtonClick}>
        <span className="glyphicon glyphicon-align-justify"></span>
      </div>)
  }
}
