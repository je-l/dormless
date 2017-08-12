import React, { Component } from 'react';
import PropTypes from 'prop-types';

import houseTypes from '../constants/residenceTypes';

function sum(array) {
  return array.reduce((acc, cur) => acc + cur, 0);
}

export default class Statistics extends Component {
  constructor(props) {
    super();
    const residences = props.apartments
      .map(x => x.residences)
      .reduce((acc, cur) => acc.concat(cur), []);

    const residenceCount = props.apartments
      .reduce((acc, cur) => acc + cur.residence_count, 0);

    this.state = {
      residences,
      residenceCount,
    };
  }

  avgPriceForType(name) {
    const prices = this.state.residences
      .filter(r => houseTypes[r.type] === name)
      .map(r => r.price);
    return sum(prices) / prices.length;
  }

  houseTypePrices(fiName, enName) {
    return (
      <tr>
        <td>{fiName}</td>
        <td>{this.avgPriceForType(enName).toFixed(2)} €</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Erilaiset huoneistot:</td>
              <td>{this.state.residences.length}</td>
            </tr>
            <tr>
              <td>Huoneistoja yhteensä:</td>
              <td>{this.state.residenceCount}</td>
            </tr>
          </tbody>
        </table>
        <h3>Keskimääräiset vuokrat</h3>
        <table>
          <tbody>
            {this.houseTypePrices('Huone', 'room')}
            {this.houseTypePrices('Yksiö', 'studio')}
            {this.houseTypePrices('Kaksio', 'double')}
            {this.houseTypePrices('Perhe', 'family')}
          </tbody>
        </table>
      </div>
    );
  }
}

Statistics.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.any).isRequired,
};
