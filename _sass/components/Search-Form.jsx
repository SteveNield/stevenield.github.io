import React, { Component } from 'react';

export default class SearchForm extends Component{

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    this.props.onSubmit();
  }

  onChange(e){
    e.preventDefault();
    this.props.onChange(e.target.value);
  }

  render(){
    return (
      <div className="search-form">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="input-group">
            <input
              type="text"
              value={this.props.term}
              className="form-control"
              onChange={(e) => this.onChange(e)}
              placeholder={this.props.copy.placeholder+"..."}></input>
            <span className="input-group-btn">
              <button type="submit" className="form-control">
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </form>
      </div>)
  }
}
