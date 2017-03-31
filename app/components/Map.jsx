import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";

import SidePanel from "./SidePanel";
import HouseMarker from "./HouseMarker";
import hoasData from "../../assets/hoas-data.json";

export default class DormMap extends Component {
  constructor() {
    super();
    this.state = {
      lat: 60.21,
      lng: 24.93,
      zoom: 11,
      markers: this.createMarkers(hoasData.apartments),
    };

    this.filterApartments = this.filterApartments.bind(this);
  }

  createMarkers(apartments) {
    const marks = apartments.filter(x => x.lat).map(a => (
      <HouseMarker key={a.address} position={[a.lat, a.lng]} apartment={a} />
    ));
    return marks;
  }

  filterApartments(maxPrice) {
    const newAparts = hoasData.apartments.filter(a => (
      a.residences.filter(r => r.price <= maxPrice).length > 0
    ));
    this.setState({
      markers: this.createMarkers(newAparts),
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const credits = "&copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors";
    const tileServer = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png";
    return (
      <div>
        <SidePanel apartments={hoasData.apartments} filterApartments={this.filterApartments} />
        <Map center={position} zoom={this.state.zoom} maxZoom={18}>
          <TileLayer
            attribution={credits}
            url={tileServer}
          />
          {this.state.markers}
        </Map>
      </div>
    );
  }
}
