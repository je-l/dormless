import React, { Component } from 'react';
import Leaflet, { LatLngTuple } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

import Pricing from './Pricing';

import markerPic from '../../assets/marker.png';

import '../css/marker.css';

export interface Residence {
  area: number,
  price: number,
  type: string,
}

export interface Apartment {
  address: string,
  city: string,
  district: string,
  lat: number,
  lng: number,
  residence_count: number,
  residences: Residence[],
}

interface Props {
  apartment: Apartment,
  position: LatLngTuple,
}

const icon = Leaflet.icon({
  iconUrl: markerPic,
  iconSize: [30, 41],
  iconAnchor: [15, 40],
  popupAnchor: [0, -41],
});

export default class HouseMarker extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.apartment.address !== this.props.apartment.address;
  }

  render() {
    const { apartment, apartment: { address }, position } = this.props;

    const urlId = address.toLowerCase()
      .replace(/ /g, '-')
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/å/g, 'å');

    const url = `https://www.hoas.fi/kohteet/${urlId}/`;
    return (
      <Marker position={position} icon={icon}>
        <Popup>
          <h3>
            <a href={url} rel="noopener noreferrer" target="_blank">
              {address}
            </a>
          </h3>
          <Pricing
            key={address}
            apartment={apartment}
          />
        </Popup>
      </Marker>
    );
  }
}
