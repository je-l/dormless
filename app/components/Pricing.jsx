import React from 'react';
import PropTypes from 'prop-types';

export default function pricing(props) {
  const residenceData = props.apartment.residences;
  const residences = residenceData.map(r => ((
    <tr key={r.type + r.area + r.price}>
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

pricing.propTypes = {
  apartment: PropTypes.shape({
    residences: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};
