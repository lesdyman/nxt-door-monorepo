interface Coords {
  latitude: number
  longitude: number
}

const isPointInPolygon = (point: Coords, polygon: Coords[]): boolean => {
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].longitude
    const yi = polygon[i].latitude
    const xj = polygon[j].longitude
    const yj = polygon[j].latitude

    const intersects =
      yi > point.latitude !== yj > point.latitude &&
      point.longitude < ((xj - xi) * (point.latitude - yi)) / (yj - yi) + xi

    if (intersects) inside = !inside
  }

  return inside
}

export default isPointInPolygon
