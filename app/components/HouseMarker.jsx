import React, { Component } from "react";
import Leaflet from "leaflet";
import { Marker, Popup } from "react-leaflet";

import Pricing from "./Pricing";

export default class HouseMarker extends Component {
  constructor() {
    super();
    const customIcon = Leaflet.icon({
      iconUrl: "./assets/marker.png",
      shadowUrl: "./assets/marker-shadow.png",

      iconSize: [30, 41],
      shadowSize: [59, 34],
      iconAnchor: [15, 40],
      shadowAnchor: [13, 32],
      popupAnchor: [0, -41],
    });
    this.state = {
      icon: customIcon,
    };
  }
  render() {
    const address = this.props.apartment.address;
    const hyperlink = address.toLowerCase()
      .replace(/ /g, "-")
      .replace(/ä/g, "a")
      .replace(/ö/g, "o")
      .replace(/å/g, "å");

    const link = `https://www.hoas.fi/kohteet/${hyperlink}/`;
    return (
      <div>
        <Marker position={this.props.position} icon={this.state.icon}>
          <Popup>
            <div>
              <a href={link} target={"_blank"}>{this.props.apartment.address}</a>
              <Pricing key={this.props.apartment.address} apartment={this.props.apartment} />
            </div>
          </Popup>
        </Marker>
      </div>
    );
  }
}
