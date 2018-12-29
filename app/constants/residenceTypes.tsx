interface HouseClass {
  [a: string]: string
}

export default {
  '1h+yhteiskeittiö': 'room',
  Huone: 'room',
  '1h+kt': 'studio',
  '1h+tpk': 'studio',
  '1h+minikeittiö': 'studio',
  '1h+kk': 'studio',
  '1h+oh+kk': 'double',
  '1h+k': 'double',
  '1h+oh+k': 'double',
  '1h+oh+kt': 'double',
  '1h+oh+tpk': 'double',
  '1h+parvi+tpk': 'double',
  '2h+k': 'double',
  '2h+kt': 'double',
  '2h+tpk': 'double',
  '2h+kk': 'double',
  '2h+oh+tpk': 'double',
  '2h+k+parvihuone': 'double',
  '2h+oh+k': 'family',
  '2h+oh+kk': 'family',
  '3h+tpk': 'family',
  '3h+k': 'family',
  '3h+oh+k': 'family',
  '3h+kk': 'family',
  '3h+oh+kk': 'family',
  '4h+k': 'family',
  '8h+oh+tpk': 'family',
} as HouseClass;
