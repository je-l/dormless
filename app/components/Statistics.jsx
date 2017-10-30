import React, { Component } from 'react';
import flatMap from 'lodash/flatMap';

import houseTypes from '../constants/residenceTypes';
import { apartments } from '../../assets/hoas-data.json';

function sum(array) {
  return array.reduce((acc, cur) => acc + cur, 0);
}

export default class Statistics extends Component {
  constructor(props) {
    super(props);
    this.residences = flatMap(apartments, 'residences');
    this.residenceCount = apartments
      .reduce((acc, apartment) => acc + apartment.residence_count, 0);
  }

  avgPriceForType(name) {
    const prices = this.residences
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
              <td>{this.residences.length}</td>
            </tr>
            <tr>
              <td>Huoneistoja yhteensä:</td>
              <td>{this.residenceCount}</td>
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
