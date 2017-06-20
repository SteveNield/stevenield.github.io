import React, { Component } from 'react';
import VideoPlayer from './Video-Player.jsx';

function StaticVideo(props){
  return (
    <VideoPlayer
      videoUrl={props.article.urlvideo} />);
}

function EmbeddedStream(props){
  var autoPlaySwitch = props.article.urlvideo.indexOf('?') === -1
    ? '?autoplay=1'
    : '&autoplay=1';

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src={props.article.urlvideo+autoPlaySwitch}
        allowFullScreen></iframe>
    </div>);
}

function VideoContent(props){
  if(props.article.urlvideo.indexOf('youtube.com') !== -1){
    return <EmbeddedStream
            {...props} />
  }

  return <StaticVideo
          {...props} />
}

export default class ArticleVideo extends Component {
  render(){
    return (
      <div className="article-video-container">
        <div className="article-title">
          <h1>{this.props.article.title}</h1>
        </div>
        <div className="row">
          <div className="article-content col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 col-tn-12">
            <VideoContent
              {...this.props} />
          </div>
          <div
            className="text touchword-container col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 col-tn-12"
            dangerouslySetInnerHTML={{__html: this.props.article.longFormText}}></div>
        </div>
      </div>)
  }
}
