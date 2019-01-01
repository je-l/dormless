import React, { Component, SyntheticEvent } from 'react';

import '../css/slider.css';

interface Props {
  min: number;
  max: number;
  cb(e: SyntheticEvent): void;
  changeMaxPrice(e: SyntheticEvent): void;
}

let lastSelection: number;

export default class Slider extends Component<Props> {
  value: number;

  constructor(props: Props) {
    super(props);
    this.value = lastSelection || props.max;
  }

  // Remember last selection value
  componentWillUnmount() {
    lastSelection = this.value;
  }

  changeValue = (event: SyntheticEvent<HTMLInputElement>) => {
    this.value = parseInt(event.currentTarget.value, 10);
    this.props.cb(event);
  };

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
