import React, { Component } from 'react';
import PropTypes from 'prop-types';

import min from 'lodash/min';
import max from 'lodash/max';

import Slider from './Slider';
import Statistics from './Statistics';

export default class SidePanel extends Component {
  constructor(props) {
    super();
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

    this.updateApartments = this.updateApartments.bind(this);
    this.updateMaxPrice = this.updateMaxPrice.bind(this);
  }

  updateApartments(event) {
    this.setState({
      selectedMaxPrice: event.target.value,
    });

    this.props.filterApartments(event.target.value);
  }

  updateMaxPrice(event) {
    this.setState({
      selectedMaxPrice: event.target.value,
    });
  }

  render() {
    return (
      <div className="sidepanel" >
        <button
          className="close-button"
          onClick={this.props.toggleSidepanel}
        >sulje
        </button>

        <p>Vuokra:</p>
        <Slider
          cb={this.updateApartments}
          changeMaxPrice={this.updateMaxPrice}
          apartments={this.props.apartments}
          min={this.state.minPrice}
          max={this.state.maxPrice}
        />

        <p className="min-price-area">
          {this.state.minPrice} - {this.state.selectedMaxPrice} €
        </p>

        <Statistics apartments={this.props.apartments} />
      </div>
    );
  }
}

SidePanel.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.any).isRequired,
  filterApartments: PropTypes.func.isRequired,
  toggleSidepanel: PropTypes.func.isRequired,
};
