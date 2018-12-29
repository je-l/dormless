import React from 'react';
import { Apartment } from './HouseMarker';

interface Props {
  apartment: Apartment
}

export default function pricing(props: Props) {
  const { apartment: { residences: residenceData } } = props;

  const residences = residenceData.map(r => (
    <tr key={r.type + r.area + r.price}>
      <td>{r.type}</td>
      <td>
        {`${r.area} m`}
        <sup>2</sup>
      </td>
      <td>
        {`${r.price} €`}
      </td>
    </tr>
  ));

  return (
    <table>
      <tbody>
        {residences}
      </tbody>
    </table>
  );
}
