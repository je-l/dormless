import React, { Component } from 'react';
import {
  Map,
  TileLayer,
  AttributionControl,
  ScaleControl,
  ZoomControl,
} from 'react-leaflet';

import SidePanel from './SidePanel';
import HouseMarker from './HouseMarker';
import hoasData from '../../assets/hoas-data.json';

import '../css/map.css';
import '../css/sidepanel.css';
import '../css/map-large.css';
import '../css/map-small.css';

function createMarkers(apartments) {
  return apartments.filter(x => x.lat).map(a => (
    <HouseMarker key={a.address} position={[a.lat, a.lng]} apartment={a} />
  ));
}

export default class DormMap extends Component {
  constructor() {
    super();
    this.state = {
      sidepanelVisible: false,
      lat: 60.21,
      lng: 24.93,
      zoom: 11,
      markers: createMarkers(hoasData.apartments),
    };
    this.filterApartments = this.filterApartments.bind(this);
    this.toggleSidepanel = this.toggleSidepanel.bind(this);
  }

  filterApartments(maxPrice) {
    const newAparts = hoasData.apartments.filter(a => (
      a.residences.filter(r => r.price <= maxPrice).length > 0
    ));
    this.setState({
      markers: createMarkers(newAparts),
    });
  }

  toggleSidepanel() {
    this.setState({ sidepanelVisible: !this.state.sidepanelVisible });
    const selector =
      '.leaflet-bottom.leaflet-left, .show-button, .leaflet-control-zoom';
    const hideOnMobile = document.querySelectorAll(selector);

    hideOnMobile.forEach(element => element.classList.toggle('panel-open'));
  }

  sideContent() {
    if (this.state.sidepanelVisible) {
      return (
        <SidePanel
          apartments={hoasData.apartments}
          filterApartments={this.filterApartments}
          toggleSidepanel={this.toggleSidepanel}
        />);
    }
    return (
      <button
        onClick={this.toggleSidepanel}
        className="show-button"
      >
        <div className="show-button-icon" />
        <span className="show-button-text">suodata</span>
      </button>
    );
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const credits = '&copy <a href="http://osm.org/' +
      'copyright">OpenStreetMap</a> contributors';

    const tileServer = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';
    return (
      <div>
        {this.sideContent()}
        <Map
          center={position}
          zoom={this.state.zoom}
          maxZoom={18}
          attributionControl={false}
          zoomControl={false}
        >
          <ZoomControl position="topright" />
          <ScaleControl imperial={false} />
          <TileLayer url={tileServer} />
          <AttributionControl prefix={credits} />
          {this.state.markers}
        </Map>
      </div>
    );
  }
}
