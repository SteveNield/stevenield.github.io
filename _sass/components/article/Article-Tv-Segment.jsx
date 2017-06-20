import React, { Component } from 'React';

function SegmentContent(props){
  if(!props.segment){
    return (
      <div className="segment-overlay">
        {props.noSegmentToPlayMessage}
      </div>
    )
  }

  return (
    <div className="segment-container">
      <div className="segment-overlay">
        <a className="call-to-action" href="#" onClick={(e) => props.onSelected(e, props.segment)}>
          {props.callToAction}
          <span className={"glyphicon "+(props.icon === 'Next'?"glyphicon-fast-forward":"glyphicon-fast-backward")}></span>
        </a>
      </div>
      <div className="segment">
        <div className="image">
          <img src={props.segment.urlimg} />
        </div>
        <div className="text touchword-container" dangerouslySetInnerHTML={{__html: props.segment.longFormText}}></div>
      </div>
    </div>
  );
}

export default class ArticleTvSegment extends Component {

  constructor(props){
    super(props);
    this.onSelected = this.onSelected.bind(this);
  }

  onSelected(e, segment){
    e.preventDefault();
    this.props.onSelected(segment.uid);
  }

  render(){
    return (
      <SegmentContent
        {...this.props}
        onSelected={this.onSelected} />
    )
  }
}
