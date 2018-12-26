import React, { Component } from 'react';

import min from 'lodash/min';
import max from 'lodash/max';

import Slider from './Slider';
import Statistics from './Statistics';

export default class SidePanel extends Component {
  constructor(props) {
    super(props);

    const residences = props.apartments
      .map(a => a.residences)
      .reduce((acc, cur) => (acc.concat(cur)), []);

    const highestPrice = max(props.apartments.map(a => (
      min(a.residences.map(r => r.price))
    )));

    this.state = {
      maxPrice: highestPrice,
      selectedMaxPrice: highestPrice,
      minPrice: min(residences.map(x => x.price)),
    };
  }

  updateApartments = (event) => {
    this.setState({
      selectedMaxPrice: event.target.value,
    });

    const { filterApartments } = this.props;

    filterApartments(event.target.value);
  }

  updateMaxPrice = (event) => {
    this.setState({
      selectedMaxPrice: event.target.value,
    });
  }

  render() {
    const { toggleSidepanel, apartments } = this.props;
    const { minPrice, maxPrice, selectedMaxPrice } = this.state;

    return (
      <div className="sidepanel">
        <button
          type="button"
          className="close-button"
          onClick={toggleSidepanel}
        >
          sulje
        </button>

        <p>Vuokra:</p>
        <Slider
          cb={this.updateApartments}
          changeMaxPrice={this.updateMaxPrice}
          apartments={apartments}
          min={minPrice}
          max={maxPrice}
        />

        <p className="min-price-area">
          {`${minPrice} - ${selectedMaxPrice} €`}
        </p>

        <Statistics apartments={apartments} />
      </div>
    );
  }
}
