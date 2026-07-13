type Place = {
  id: string
  name: string
  address: string
  buildings: string[]
  latitude: number
  longitude: number
  boundary: { latitude: number; longitude: number }[]
}

export default Place
