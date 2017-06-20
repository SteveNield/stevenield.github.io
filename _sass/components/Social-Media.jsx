import React, { Component } from 'react'

export default class SocialMedia extends Component {

  render(){
    return(
      <div className="social-media-container">
        {
          this.props.socialMediaIntegrations.map((socialMedium, index) => {
            return (
              <div key={"social-medium-"+index} className="social-medium">
                <img src={socialMedium.icon} /> - {socialMedium.numberOfOccurancesOfSearchTerm}
              </div>)
          })
        }
      </div>)
  }

}
