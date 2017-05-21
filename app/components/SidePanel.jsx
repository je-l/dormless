import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Slider from './Slider';
import Statistics from './Statistics';

export default class SidePanel extends Component {
  constructor(props) {
    super();
    const residences = props.apartments.map(a => a.residences).reduce((acc, cur) => (
      acc.concat(cur)
    ), []);
    const highestPrice = _.max(props.apartments.map(a => (
      _.min(a.residences.map(r => r.price))
    )));

    this.state = {
      maxPrice: highestPrice,
      selectedMaxPrice: highestPrice,
      minPrice: _.min(residences.map(x => x.price)),
    };
    this.updateApartments = this.updateApartments.bind(this);
  }

  updateApartments(event) {
    this.setState({
      selectedMaxPrice: event.target.value,
    });
    this.props.filterApartments(event.target.value);
  }

  render() {
    return (
      <div id="mainpanel" className="sidepanel">
        <p>{'Vuokra:'}</p>
        <Slider
          cb={this.updateApartments}
          apartments={this.props.apartments}
          min={this.state.minPrice} max={this.state.maxPrice}
        />
        <p className="min-price-area">{this.state.minPrice} - {this.state.selectedMaxPrice} €</p>
        <Statistics apartments={this.props.apartments} />
      </div>
    );
  }
}

SidePanel.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.any).isRequired,
  filterApartments: PropTypes.func.isRequired,
};
