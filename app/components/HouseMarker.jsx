import React, { Component } from 'react';
import Leaflet from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

import Pricing from './Pricing';

import markerPic from '../../assets/marker.png';
import '../css/marker.css';

export default class HouseMarker extends Component {
  constructor(props) {
    super(props);

    this.customIcon = Leaflet.icon({
      iconUrl: markerPic,
      iconSize: [30, 41],
      iconAnchor: [15, 40],
      popupAnchor: [0, -41],
    });
  }

  render() {
    const { address } = this.props.apartment;
    const urlId = address.toLowerCase()
      .replace(/ /g, '-')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/å/g, 'å');

    const url = `https://www.hoas.fi/kohteet/${urlId}/`;
    return (
      <div>
        <Marker position={this.props.position} icon={this.customIcon}>
          <Popup>
            <div>
              <h3>
                <a href={url} target="_blank">
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
