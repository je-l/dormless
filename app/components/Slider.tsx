import React, { Component } from 'react';

import '../css/slider.css';

interface Props {
  min: number,
  max: number,
  cb(e: Event): void,
  changeMaxPrice(e: Event): void,
};

export interface Event {
  currentTarget: {
    value: string
  }
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

  changeValue = (event: Event) => {
    const { props: { cb } } = this;

    this.value = parseInt(event.currentTarget.value);
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
