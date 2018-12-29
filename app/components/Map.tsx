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
  // filter out houses without coordinates
  return apartments.filter(x => x.lat).map(a => (
    <HouseMarker key={a.address} position={[a.lat, a.lng]} apartment={a} />
  ));
}

interface State {
  sidepanelVisible: boolean,
  markers: HouseMarker[],
}

export default class DormMap extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      sidepanelVisible: false,
      markers: createMarkers(hoasData.apartments),
    };
  }

  filterApartments = (maxPrice) => {
    const newAparts = hoasData.apartments.filter(a => (
      a.residences.filter(r => r.price <= maxPrice).length > 0
    ));

    this.setState({
      markers: createMarkers(newAparts),
    });
  }

  toggleSidepanel = () => {
    this.setState(prevState => (
      { sidepanelVisible: !prevState.sidepanelVisible }
    ));

    const selector = '.leaflet-bottom.leaflet-left, '
      + '.show-button, .leaflet-control-zoom';

    // TODO: remove queryselector hack
    const hideOnMobile = document.querySelectorAll(selector);

    hideOnMobile.forEach(element => element.classList.toggle('panel-open'));
  }

  sideContent() {
    const { sidepanelVisible } = this.state;

    if (sidepanelVisible) {
      return (
        <SidePanel
          apartments={hoasData.apartments}
          filterApartments={this.filterApartments}
          toggleSidepanel={this.toggleSidepanel}
        />);
    }

    return (
      <button
        type="button"
        onClick={this.toggleSidepanel}
        className="show-button"
      >
        <div className="show-button-icon" />
        <span className="show-button-text">suodata</span>
      </button>
    );
  }

  render() {
    const { markers } = this.state;

    const credits = '&copy <a href="http://osm.org/'
      + 'copyright">OpenStreetMap</a> contributors';

    const tileServer = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';
    return (
      <div>
        {this.sideContent()}
        <Map
          center={{ lat: 60.21, lng: 24.93 }}
          zoom={11}
          maxZoom={18}
          attributionControl={false}
          zoomControl={false}
        >
          <ZoomControl position="topright" />
          <ScaleControl imperial={false} />
          <TileLayer url={tileServer} />
          <AttributionControl prefix={credits} />
          {markers}
        </Map>
      </div>
    );
  }
}
