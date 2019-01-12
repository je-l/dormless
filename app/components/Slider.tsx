import React, { Component, SyntheticEvent } from 'react';

import '../css/slider.css';

interface Props {
  min: number;
  max: number;
  sliderPos: string;
  changeRentFilter(e: SyntheticEvent): void;
  changeMaxPrice(e: SyntheticEvent): void;
}

export default class Slider extends Component<Props> {
  render() {
    const {
      min,
      max,
      changeMaxPrice,
      changeRentFilter: changeRestFilter,
      sliderPos
    } = this.props;

    return (
      <input
        className="price-slider slider"
        type="range"
        min={min}
        max={max}
        defaultValue={sliderPos}
        onMouseUp={changeRestFilter}
        onTouchEnd={changeRestFilter}
        onChange={changeMaxPrice}
      />
    );
  }
}
