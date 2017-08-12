import React, { Component } from 'react';
import Leaflet from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

import Pricing from './Pricing';

import markerPic from '../../assets/marker.png';
import '../css/marker.css';

export default class HouseMarker extends Component {
  constructor() {
    super();
    const customIcon = Leaflet.icon({
      iconUrl: markerPic,
      iconSize: [30, 41],
      iconAnchor: [15, 40],
      popupAnchor: [0, -41],
    });

    this.state = {
      icon: customIcon,
    };
  }
  render() {
    const { address } = this.props.apartment;
    const hyperlink = address.toLowerCase()
      .replace(/ /g, '-')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/å/g, 'å');

    const link = `https://www.hoas.fi/kohteet/${hyperlink}/`;
    return (
      <div>
        <Marker position={this.props.position} icon={this.state.icon}>
          <Popup>
            <div>
              <h3>
                <a href={link} target="_blank">
                  {this.props.apartment.address}
                </a>
              </h3>
              <Pricing
                key={this.props.apartment.address}
                apartment={this.props.apartment}
              />
            </div>
          </Popup>
        </Marker>
      </div>
    );
  }
}

HouseMarker.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  apartment: PropTypes.shape({
    address: PropTypes.string.isRequired,
    residences: PropTypes.arrayOf(PropTypes.any).isRequired,
  }).isRequired,
};
