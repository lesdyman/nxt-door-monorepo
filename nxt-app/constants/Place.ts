type Place = {
  id: string
  name: string
  address: string
  buildings: string[]
  latitude: number
  longitude: number
  boundary: { latitude: number; longitude: number }[]
  mgmt_phone: string
  security_phone: string
  elevator_emergency: string
}

export default Place
