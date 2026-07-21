import Place from '@constants/Place'

const places: Place[] = [
  {
    id: 'welcome-home',
    name: 'Welcome Home',
    address: 'Stetsenko St, 75, Kyiv',
    buildings: ['75a', '75b', '75v', '75g', '75d', '75e', '75k', '75m', '75n'],
    latitude: 50.4948,
    longitude: 30.37,
    boundary: [
      { latitude: 50.4963, longitude: 30.368 },
      { latitude: 50.4963, longitude: 30.372 },
      { latitude: 50.4933, longitude: 30.372 },
      { latitude: 50.4933, longitude: 30.368 },
    ],
    mgmt_phone: '+380 44 123 45 67',
    security_phone: '+380 44 987 65 43',
    elevator_emergency: '+380 44 555 55 55',
  },
]

export default places
