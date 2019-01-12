import React, { Component, Fragment, SyntheticEvent } from 'react';
import {
  AttributionControl,
  Map,
  ScaleControl,
  TileLayer,
  ZoomControl
} from 'react-leaflet';

import hoasData from '../../assets/hoas-data.json';
import HouseMarker, { Apartment } from './HouseMarker';
import SidePanel from './SidePanel';

import '../css/map-large.css';
import '../css/map-small.css';
import '../css/map.css';
import '../css/sidepanel.css';

interface State {
  sidepanelVisible: boolean;
  sliderPos: string | null;
  markers: Apartment[];
}

export default class DormMap extends Component<{}, State> {
  state = {
    sidepanelVisible: false,
    sliderPos: null,
    markers: hoasData.apartments
  };

  filterApartments = (e: SyntheticEvent<HTMLInputElement>) => {
    const maxPrice = parseInt(e.currentTarget.value, 10);

    const newAparts = hoasData.apartments.filter(
      a => a.residences.filter(r => r.price <= maxPrice).length > 0
    );

    this.setState({
      markers: newAparts
    });
  };

  toggleSidepanel = () => {
    this.setState(prevState => ({
      sidepanelVisible: !prevState.sidepanelVisible
    }));

    const selector =
      '.leaflet-bottom.leaflet-left, ' + '.show-button, .leaflet-control-zoom';

    // TODO: remove queryselector hack
    const hideOnMobile = document.querySelectorAll(selector);

    hideOnMobile.forEach(element => element.classList.toggle('panel-open'));
  };

  changeSliderPos = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      sliderPos: event.currentTarget.value
    });
  };

  render() {
    const { markers, sliderPos, sidepanelVisible } = this.state;

    const credits =
      '&copy <a href="https://osm.org/' +
      'copyright">OpenStreetMap</a> contributors';

    const tileServer = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';

    return (
      <Fragment>
        {sidepanelVisible ? (
          <SidePanel
            sliderPos={sliderPos}
            apartments={hoasData.apartments}
            changeMaxPrice={this.changeSliderPos}
            filterApartments={this.filterApartments}
            toggleSidepanel={this.toggleSidepanel}
          />
        ) : (
          <button
            type="button"
            onClick={this.toggleSidepanel}
            className="show-button"
          >
            <div className="show-button-icon" />
            <span className="show-button-text">suodata</span>
          </button>
        )}
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
          {markers.map(a => (
            <HouseMarker
              key={a.address}
              position={[a.lat, a.lng]}
              apartment={a}
            />
          ))}
        </Map>
      </Fragment>
    );
  }
}
