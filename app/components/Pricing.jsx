import React, { Component } from "react";

export default class Pricing extends Component {
  render() {
    const residenceData = this.props.apartment.residences;
    const residences = residenceData.map(r => ((
      <tr>
        <td>{r.type}</td>
        <td>{r.area} m<sup>2</sup></td>
        <td>{r.price} €</td>
      </tr>
    )));
    return (
      <table>
        <tbody>
          {residences}
        </tbody>
      </table>
    );
  }
}
