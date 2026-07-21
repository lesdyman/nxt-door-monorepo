type Place = {
  id: string
  name: string
  address: string
  buildings: string[]
  latitude: number
  longitude: number
  boundary: { latitude: number; longitude: number }[]
  mgmtPhone: string | null
  securityPhone: string | null
  elevatorEmergency: string | null
}

export default Place
