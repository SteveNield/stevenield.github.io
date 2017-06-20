import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default class AudioPlayer extends Component {
  render(){
    return (
      <div className="audio">
        <div className="image">
            <img
                src={this.props.imageUrl}
                alt={this.props.title}
                title={this.props.title} />
        </div>
        <ReactAudioPlayer src={this.props.audioUrl} autoPlay={true} />
      </div>)
  }
}
