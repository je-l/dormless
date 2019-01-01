import flatMap from 'lodash/flatMap';
import React, { Component, Fragment } from 'react';

import { apartments } from '../../assets/hoas-data.json';
import houseTypes from '../constants/residenceTypes';
import { Residence } from './HouseMarker';

function sum(array: number[]) {
  return array.reduce((acc, cur) => acc + cur, 0);
}

export default class Statistics extends Component {
  avgPriceForType = (name: string, residences: Residence[]) => {
    const prices = residences
      .filter(r => houseTypes[r.type] === name)
      .map(r => r.price);
    return sum(prices) / prices.length;
  };

  houseTypePrices = (residences: Residence[]) => (
    fiName: string,
    enName: string
  ) => {
    return (
      <tr>
        <td>{fiName}</td>
        <td>{`${this.avgPriceForType(enName, residences).toFixed(2)} €`}</td>
      </tr>
    );
  };

  render() {
    const residences: Residence[] = flatMap(apartments, 'residences');
    const residenceCount = apartments.reduce(
      (acc, apartment) => acc + apartment.residence_count,
      0
    );

    const housePriceFor = this.houseTypePrices(residences);

    return (
      <Fragment>
        <table>
          <tbody>
            <tr>
              <td>Erilaiset huoneistot:</td>
              <td>{residences.length}</td>
            </tr>
            <tr>
              <td>Huoneistoja yhteensä:</td>
              <td>{residenceCount}</td>
            </tr>
          </tbody>
        </table>
        <h3>Keskimääräiset vuokrat</h3>
        <table>
          <tbody>
            {housePriceFor('Huone', 'room')}
            {housePriceFor('Yksiö', 'studio')}
            {housePriceFor('Kaksio', 'double')}
            {housePriceFor('Perhe', 'family')}
          </tbody>
        </table>
      </Fragment>
    );
  }
}
