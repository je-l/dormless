import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/slider.css';

let lastSelection;

export default class Slider extends Component {
  constructor(props) {
    super();
    this.value = lastSelection || props.max;
  }

  // Remember last selection value
  componentWillUnmount() {
    lastSelection = this.value;
  }

  changeValue = (event) => {
    const { props: { cb } } = this;

    this.value = event.target.value;
    cb(event);
  }

  render() {
    const { min, max, changeMaxPrice } = this.props;

    return (
      <input
        className="price-slider slider"
        type="range"
        min={min}
        max={max}
        defaultValue={this.value}
        onMouseUp={this.changeValue}
        onTouchEnd={this.changeValue}
        onChange={changeMaxPrice}
      />
    );
  }
}

Slider.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  cb: PropTypes.func.isRequired,
  changeMaxPrice: PropTypes.func.isRequired,
};
