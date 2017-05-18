import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Slider.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  cb: PropTypes.func.isRequired,
};
