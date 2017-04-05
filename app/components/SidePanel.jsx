import React, { Component } from "react";

import Slider from "./Slider";
import Statistics from "./Statistics";

export default class SidePanel extends Component {
  constructor(props) {
    super();
    const residences = props.apartments.map(a => a.residences).reduce((acc, cur) => (
      acc.concat(cur)
    ), []);
    const highestPrice = Math.max.apply(null, residences.map(x => x.price));
    this.state = {
      maxPrice: highestPrice,
      selectedMaxPrice: highestPrice,
      minPrice: Math.min.apply(null, residences.map(x => x.price)),
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
        <p>{"Vuokra:"}</p>
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
  apartments: React.PropTypes.any.isRequired,
  filterApartments: React.PropTypes.func.isRequired,
};
