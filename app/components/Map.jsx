import React, { Component } from 'react';
import { Map, TileLayer, AttributionControl } from 'react-leaflet';

import SidePanel from './SidePanel';
import HouseMarker from './HouseMarker';
import hoasData from '../../assets/hoas-data.json';

function createMarkers(apartments) {
  return apartments.filter(x => x.lat).map(a => (
    <HouseMarker key={a.address} position={[a.lat, a.lng]} apartment={a} />
  ));
}

export default class DormMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 60.21,
      lng: 24.93,
      zoom: 11,
      markers: createMarkers(hoasData.apartments),
    };
    this.filterApartments = this.filterApartments.bind(this);
  }

  filterApartments(maxPrice) {
    const newAparts = hoasData.apartments.filter(a => (
      a.residences.filter(r => r.price <= maxPrice).length > 0
    ));
    this.setState({
      markers: createMarkers(newAparts),
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const credits = '&copy <a href="http://osm.org/' +
      'copyright">OpenStreetMap</a> contributors';

    const tileServer = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
    return (
      <div>
        <SidePanel
          apartments={hoasData.apartments}
          filterApartments={this.filterApartments}
        />
        <Map
          center={position}
          zoom={this.state.zoom}
          maxZoom={18}
          attributionControl={false}
        >
          <TileLayer url={tileServer} />
          <AttributionControl prefix={credits} />
          {this.state.markers}
        </Map>
      </div>
    );
  }
}
