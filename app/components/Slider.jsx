import React, { Component } from 'react';
import PropTypes from 'prop-types';

let lastSelection;

export default class Slider extends Component {
  constructor(props) {
    super();
    this.value = lastSelection || props.max;

    this.changeValue = this.changeValue.bind(this);
  }

  // Remember last selection value
  componentWillUnmount() {
    lastSelection = this.value;
  }

  changeValue(event) {
    this.value = event.target.value;
    this.props.cb(event);
  }

  render() {
    return (
      <input
        className="price-slider"
        type="range"
        min={this.props.min}
        max={this.props.max}
        defaultValue={this.value}
        onMouseUp={this.changeValue}
        onTouchEnd={this.changeValue}
      />
    );
  }
}

Slider.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  cb: PropTypes.func.isRequired,
};
