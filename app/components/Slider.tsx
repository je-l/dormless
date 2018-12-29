import React, { Component } from 'react';

import '../css/slider.css';

interface Props {
  min: number,
  max: number,
  cb(e): void,
  changeMaxPrice(e): void,
};

let lastSelection: number;

export default class Slider extends Component<Props> {
  value: number;

  constructor(props) {
    super(props);
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
        defaultValue={this.value.toString()}
        onMouseUp={this.changeValue}
        onTouchEnd={this.changeValue}
        onChange={changeMaxPrice}
      />
    );
  }
}
