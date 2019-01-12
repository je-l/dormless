import React, { Component, SyntheticEvent } from 'react';

import max from 'lodash/max';
import min from 'lodash/min';

import { Apartment } from './HouseMarker';
import Slider from './Slider';
import Statistics from './Statistics';

interface Props {
  apartments: Apartment[];
  sliderPos: string | null;
  changeMaxPrice(e: SyntheticEvent): void;
  filterApartments(e: SyntheticEvent): void;
  toggleSidepanel(): void;
}

interface State {
  minPrice: number;
  maxPrice: number;
}

export default class SidePanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const residences = props.apartments
      .map(a => a.residences)
      .reduce((acc, cur) => acc.concat(cur), []);

    const highestPrice = max(
      props.apartments.map(a => min(a.residences.map(r => r.price)))
    );

    this.state = {
      maxPrice: highestPrice as number,
      minPrice: min(residences.map(x => x.price)) as number
    };
  }

  render() {
    const {
      toggleSidepanel,
      sliderPos,
      filterApartments,
      changeMaxPrice
    } = this.props;

    const { minPrice, maxPrice } = this.state;

    const rentSelection = sliderPos || maxPrice.toString();

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
          sliderPos={rentSelection}
          changeRentFilter={filterApartments}
          changeMaxPrice={changeMaxPrice}
          min={minPrice}
          max={maxPrice}
        />

        <p className="min-price-area">{`${minPrice} - ${rentSelection} €`}</p>

        <Statistics />
      </div>
    );
  }
}
