import React, { Component } from 'react';
import { Media } from './../../client.conf';
import ArticleTvSegment from './Article-Tv-Segment.jsx';
import VideoPlayer from './Video-Player.jsx';
import AudioPlayer from './Audio-Player.jsx';

function Player(props){
  if(props.article.isaudio === 'yes'){
    return (
      <AudioPlayer
        imageUrl={props.article.urlimg}
        title={props.article.source}
        audioUrl={Media.audioHost+props.article.urlaudio} />);
  }
  return (
    <VideoPlayer
      videoUrl={Media.videoHost+props.article.urlvideo} />);
}

export default class ArticleTv extends Component {

  render(){
    return (
      <div className="article-tv-container">
        <div>
          <h1>{this.props.article.source} {this.props.copy.broadcasting} {this.props.article.age} ago</h1>
        </div>
        <div className="column-container">
          <div className="previous">
            <ArticleTvSegment
              segment={this.props.previousQueue.length==0?null:this.props.previousQueue[0]}
              callToAction={this.props.copy.previous}
              icon="Previous"
              onSelected={this.props.onTvSegmentSelected}
              noSegmentToPlayMessage={this.props.copy.noSegmentToPlay} />
          </div>
          <div className="next">
            <ArticleTvSegment
              segment={this.props.nextQueue.length==0?null:this.props.nextQueue[0]}
              callToAction={this.props.copy.next}
              icon="Next"
              onSelected={this.props.onTvSegmentSelected}
              noSegmentToPlayMessage={this.props.copy.noSegmentToPlay} />
          </div>
          <div className="current">
            <div>
              <Player {...this.props} />
              <div className="text touchword-container" dangerouslySetInnerHTML={{__html: this.props.article.longFormText}}></div>
            </div>
          </div>
        </div>
      </div>)
  }
}
