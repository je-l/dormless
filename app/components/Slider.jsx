import React, { Component } from 'react';

export default class Slider extends Component {
  constructor(props) {
    super();
    this.state = {
      val: props.max,
    };
  }
  render() {
    return (
      <input
        className="price-slider"
        type="range"
        min={this.props.min}
        max={this.props.max}
        defaultValue={this.state.val}
        onMouseUp={this.props.cb}
      />
    );
  }
}
