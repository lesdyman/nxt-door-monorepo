import { View } from 'react-native'

import MapView, { MapPressEvent, Marker, MarkerDragStartEndEvent, Polygon } from 'react-native-maps'

import isPointInPolygon from '@utils/isPointInPolygon'

interface Coords {
  latitude: number
  longitude: number
}

interface Props {
  coords: Coords
  editable?: boolean
  boundary?: Coords[]
  height?: number
  fill?: boolean
  zoomDelta?: number
  onLocationChange?: (coords: Coords) => void
}

const PickupMap: React.FC<Props> = ({
  coords,
  editable = false,
  boundary,
  height = 160,
  fill = false,
  zoomDelta = 0.001,
  onLocationChange,
}) => {
  const isAllowed = (point: Coords) => !boundary || isPointInPolygon(point, boundary)

  const handlePress = (e: MapPressEvent) => {
    if (!editable) return
    const point = e.nativeEvent.coordinate
    if (isAllowed(point)) onLocationChange?.(point)
  }

  const handleDragEnd = (e: MarkerDragStartEndEvent) => {
    const point = e.nativeEvent.coordinate
    onLocationChange?.(isAllowed(point) ? point : coords)
  }

  return (
    <View
      style={
        fill
          ? { borderRadius: 12, overflow: 'hidden', flex: 1 }
          : { borderRadius: 12, overflow: 'hidden', height }
      }
    >
      <MapView
        style={{ flex: 1 }}
        region={{
          ...coords,
          latitudeDelta: zoomDelta,
          longitudeDelta: zoomDelta,
        }}
        userInterfaceStyle="dark"
        scrollEnabled={editable}
        zoomEnabled={editable}
        pitchEnabled={false}
        rotateEnabled={false}
        onPress={handlePress}
      >
        {boundary && (
          <Polygon
            coordinates={boundary}
            strokeColor="rgba(99,179,237,0.8)"
            fillColor="rgba(99,179,237,0.15)"
            strokeWidth={1}
          />
        )}
        <Marker coordinate={coords} draggable={editable} onDragEnd={handleDragEnd} />
      </MapView>
    </View>
  )
}

export default PickupMap
