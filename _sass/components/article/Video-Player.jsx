import React, { Component } from 'react';

export default class VideoPlayer extends Component {
  render(){
    return (
      <div className="video">
        <video
          src={this.props.videoUrl}
          preload="metadata"
          controls
          autoPlay />
      </div>)
  }
}
