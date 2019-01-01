import React, { Component, SyntheticEvent } from 'react';

import max from 'lodash/max';
import min from 'lodash/min';

import { Apartment } from './HouseMarker';
import Slider from './Slider';
import Statistics from './Statistics';

interface Props {
  apartments: Apartment[];
  filterApartments(maxPrice: number): void;
  toggleSidepanel(): void;
}

interface State {
  minPrice: number;
  maxPrice: number;
  selectedMaxPrice: number;
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
      selectedMaxPrice: highestPrice as number,
      minPrice: min(residences.map(x => x.price)) as number
    };
  }

  updateApartments = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      selectedMaxPrice: parseInt(event.currentTarget.value, 10)
    });

    const { filterApartments } = this.props;

    filterApartments(parseInt(event.currentTarget.value, 10));
  };

  updateMaxPrice = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      selectedMaxPrice: parseInt(event.currentTarget.value, 10)
    });
  };

  render() {
    const { toggleSidepanel } = this.props;
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
          min={minPrice}
          max={maxPrice}
        />

        <p className="min-price-area">
          {`${minPrice} - ${selectedMaxPrice} €`}
        </p>

        <Statistics />
      </div>
    );
  }
}
